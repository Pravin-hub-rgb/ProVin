bunx --bun shadcn@latest add @magicui/retro-grid

import { RetroGrid } from "@/components/ui/retro-grid"

<div className="relative h-[500px] w-full overflow-hidden">
  <RetroGrid />
</div>

Props
Prop	Type	Default	Description
className	string	-	Additional CSS classes for the grid container
angle	number	65	Rotation angle of the grid in degrees
cellSize	number	60	Grid cell size in pixels
opacity	number	0.5	Grid opacity value between 0 and 1
lightLineColor	string	"gray"	Grid line color in light mode
darkLineColor	string	"gray"	Grid line color in dark mode