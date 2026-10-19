"use client"

import { useEffect, useMemo, useState } from "react"
import { geoGraticule10, geoMercator, geoNaturalEarth1, geoPath } from "d3-geo"
import { feature } from "topojson-client"
import type { Feature, FeatureCollection, Geometry } from "geojson"
import type { Topology } from "topojson-specification"
import worldLow from "world-atlas/countries-110m.json"

type CountryProps = { name?: string }
type CountryFeature = Feature<Geometry, CountryProps>
type CountryCollection = FeatureCollection<Geometry, CountryProps>

const BOX_WIDTH = 800
const BOX_HEIGHT = 460
const PAD = 16

/**
 * Regions are defined by the countries we want in frame, not by a hand-tuned
 * zoom number. Fitting the projection to the actual outlines means every map
 * stays correctly framed no matter which projection is used.
 */
const REGIONS: Record<string, string[]> = {
  world: [],
  asia: [
    "India", "China", "Pakistan", "Russia", "Japan", "Mongolia", "Indonesia",
    "Vietnam", "Thailand", "Myanmar", "Bangladesh", "Nepal", "South Korea",
    "North Korea", "Kazakhstan",
  ],
  india: ["India", "Pakistan", "Bangladesh", "Nepal", "Bhutan", "Myanmar", "Sri Lanka", "China"],
  "indian-ocean": [
    "India", "Oman", "Djibouti", "Madagascar", "Indonesia", "Sri Lanka", "Myanmar",
    "Malaysia", "Thailand", "Vietnam", "Tanzania", "Kenya", "Somalia", "South Africa",
    "Seychelles", "Comoros", "Mauritius", "Maldives", "Singapore",
  ],
  "middle-east": [
    "Saudi Arabia", "Iran", "Iraq", "Israel", "United Arab Emirates", "Egypt",
    "Turkey", "Syria", "Jordan", "Kuwait", "Qatar", "Bahrain", "Oman", "Yemen",
  ],
  europe: ["France", "Germany", "United Kingdom", "Poland", "Spain", "Italy", "Ukraine", "Sweden", "Norway"],
}

const NEVER_FITTED = "antarctica"

const NAME_ALIASES: Record<string, string> = {
  usa: "united states of america",
  us: "united states of america",
  "united states": "united states of america",
  america: "united states of america",
  uk: "united kingdom",
  britain: "united kingdom",
  england: "united kingdom",
  uae: "united arab emirates",
  drc: "dem. rep. congo",
  czechrepublic: "czechia",
  ivorycoast: "côte d'ivoire",
  dominicanrepublic: "dominican rep.",
  srilanka: "sri lanka",
  "southsudan": "s. sudan",
  "northcyprus": "n. cyprus",
  swaziland: "eswatini",
  dprk: "north korea",
}

function squash(value: string) {
  return value.toLowerCase().replace(/[^a-z]/g, "")
}

function buildMatcher(input?: string) {
  const tokens = (input ?? "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean)
  if (!tokens.length) return () => false

  const names = new Set<string>()
  const ids = new Set<string>()

  for (const token of tokens) {
    const lower = token.toLowerCase()
    const digits = lower.replace(/\D/g, "")
    if (/^\d{3}$/.test(digits)) {
      ids.add(digits)
      continue
    }
    const compact = squash(token)
    names.add(NAME_ALIASES[compact] ?? compact)
  }

  return (country: CountryFeature) => {
    const id = String(country.id ?? "").replace(/\D/g, "")
    if (id && ids.has(id)) return true
    const name = squash(country.properties?.name ?? "")
    return name ? names.has(name) : false
  }
}

type Marker = { lon: number; lat: number; label?: string }

function parseMarkers(input?: string): Marker[] {
  return (input ?? "")
    .split("|")
    .map((chunk) => chunk.trim())
    .filter(Boolean)
    .map((chunk) => {
      const [coords, ...rest] = chunk.split(":")
      const [lon, lat] = coords.split(",").map((n) => parseFloat(n.trim()))
      return { lon, lat, label: rest.join(":").trim() || undefined }
    })
    .filter((m) => Number.isFinite(m.lon) && Number.isFinite(m.lat))
}

export function GeoMap({
  zoom = "auto",
  projection = "natural-earth",
  highlight,
  labels,
  detail = "low",
  markers,
  caption,
}: {
  zoom?: string
  projection?: string
  highlight?: string
  labels?: string
  detail?: string
  markers?: string
  caption?: string
}) {
  const wantsHigh = detail === "high"
  const [highData, setHighData] = useState<CountryCollection | null>(null)

  useEffect(() => {
    if (!wantsHigh || highData) return
    let cancelled = false
    import("world-atlas/countries-50m.json").then((mod) => {
      if (!cancelled) setHighData(toCollection(mod.default as unknown as Topology))
    })
    return () => {
      cancelled = true
    }
  }, [wantsHigh, highData])

  const lowData = useMemo(() => toCollection(worldLow as unknown as Topology), [])
  const countries = wantsHigh ? highData ?? lowData : lowData
  const detailReady = !wantsHigh || highData !== null

  const isHighlighted = useMemo(() => buildMatcher(highlight), [highlight])
  const isLabelled = useMemo(() => buildMatcher(labels), [labels])
  const markerList = useMemo(() => parseMarkers(markers), [markers])

  const fitFeatures = useMemo(() => {
    if (zoom === "auto") {
      const picked = countries.features.filter(isHighlighted)
      if (picked.length) return picked
    }
    const region = REGIONS[zoom]
    if (region === undefined) return []
    if (!region.length) {
      return countries.features.filter((c) => squash(c.properties?.name ?? "") !== NEVER_FITTED)
    }
    return countries.features.filter((c) => region.includes(c.properties?.name ?? ""))
  }, [zoom, countries, isHighlighted])

  const map = useMemo(() => {
    const create = projection === "mercator" ? geoMercator : geoNaturalEarth1
    const proj = create()
    const path = geoPath(proj)

    const drawable = countries.features.filter(
      (c) => projection !== "mercator" || squash(c.properties?.name ?? "") !== NEVER_FITTED
    )
    const drawn: CountryCollection = { type: "FeatureCollection", features: drawable }

    const fitTo: CountryFeature[] = fitFeatures.length ? fitFeatures : drawable
    const fitCollection: CountryCollection = { type: "FeatureCollection", features: fitTo }

    proj.fitExtent(
      [
        [PAD, PAD],
        [BOX_WIDTH - PAD, BOX_HEIGHT - PAD],
      ],
      fitCollection
    )

    // The viewBox follows the region we fitted to, not every country on the
    // planet. Bounding all of them would let far-away shapes (Russia, Fiji)
    // stretch the frame until the actual region is a speck.
    const [[x0, y0], [x1, y1]] = path.bounds(fitCollection)
    const vx = x0 - 8
    const vy = y0 - 8
    const vw = Math.max(x1 - x0, 1) + 16
    const vh = Math.max(y1 - y0, 1) + 16

    return {
      path,
      proj,
      graticule: geoGraticule10(),
      drawn,
      viewBoxWidth: vw,
      viewBox: `${vx} ${vy} ${vw} ${vh}`,
    }
  }, [projection, countries, fitFeatures])

  return (
    <figure className="my-6 rounded-xl border border-border/60 bg-card/40 p-3 sm:p-4">
      <svg
        viewBox={map.viewBox}
        className="w-full h-auto rounded-lg"
        role="img"
        aria-label={caption ?? `Map, ${zoom} view`}
      >
        <path
          d={map.path(map.graticule) ?? undefined}
          fill="none"
          className="stroke-slate-400/45 dark:stroke-slate-600/45"
          strokeWidth={0.5}
        />

        {map.drawn.features.map((country, index) => {
          const name = country.properties?.name ?? "Unknown"
          const d = map.path(country)
          if (!d) return null
          const highlighted = isHighlighted(country)
          return (
            <path
              key={`${country.id ?? "x"}-${index}`}
              d={d}
              strokeWidth={0.4}
              className={
                highlighted
                  ? "fill-slate-900 dark:fill-blue-500 stroke-slate-900 dark:stroke-blue-400"
                  : "fill-slate-300 dark:fill-slate-700 stroke-white dark:stroke-slate-900"
              }
            >
              <title>{name}</title>
            </path>
          )
        })}

        {map.drawn.features.map((country, index) => {
          if (!isLabelled(country)) return null
          const centroid = map.path.centroid(country)
          if (!Number.isFinite(centroid[0]) || !Number.isFinite(centroid[1])) return null
          const highlighted = isHighlighted(country)
          return (
            <text
              key={`label-${country.id ?? index}`}
              x={centroid[0]}
              y={centroid[1]}
              textAnchor="middle"
              dominantBaseline="middle"
              className={`pointer-events-none font-bold ${
                highlighted
                  ? "fill-white dark:fill-slate-950"
                  : "fill-slate-600 dark:fill-slate-300"
              }`}
              style={{ fontSize: Math.max(map.viewBoxWidth / 78, 9) }}
            >
              {country.properties?.name}
            </text>
          )
        })}

        {markerList.map((marker, index) => {
          const point = map.proj([marker.lon, marker.lat])
          if (!point || !Number.isFinite(point[0]) || !Number.isFinite(point[1])) return null
          const fontSize = Math.max(map.viewBoxWidth / 80, 9)
          return (
            <g key={`marker-${index}`} className="text-slate-900 dark:text-blue-400">
              <circle
                cx={point[0]}
                cy={point[1]}
                r={fontSize * 0.62}
                fill="none"
                stroke="currentColor"
                strokeWidth={fontSize / 9}
                opacity={0.45}
              />
              <circle cx={point[0]} cy={point[1]} r={fontSize * 0.28} fill="currentColor" />
              {marker.label ? (
                <text
                  x={point[0] + fontSize * 0.85}
                  y={point[1] + fontSize * 0.32}
                  className="pointer-events-none fill-current font-bold"
                  style={{ fontSize }}
                >
                  {marker.label}
                </text>
              ) : null}
            </g>
          )
        })}
      </svg>

      {!detailReady ? (
        <p className="mt-2 text-xs text-muted-foreground">Loading higher detail map…</p>
      ) : null}
      {caption ? (
        <figcaption className="mt-3 text-sm text-muted-foreground">{caption}</figcaption>
      ) : null}
    </figure>
  )
}

function toCollection(topology: Topology): CountryCollection {
  return feature(topology, topology.objects.countries) as unknown as CountryCollection
}
