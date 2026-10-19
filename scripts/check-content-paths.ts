import { existsSync } from "node:fs";
import { subjects as codingSubjects } from "../lib/coding-data";
import { algotradingSubject } from "../lib/finance-subjects/algotrading.subject";
import { cfoSubject } from "../lib/finance-subjects/cfo.subject";
import { spokenEnglishSubject } from "../lib/general-subjects/spoken-english.subject";
import { chessSubject } from "../lib/general-subjects/chess-to-1000.subject";
import { geopoliticsSubject } from "../lib/general-subjects/geopolitics.subject";

type L = { id: string; title: string; path: string };
type S = {
  id: string;
  lectures?: L[];
  phases?: { lectures?: L[]; quizzes?: L[]; groups?: { lectures?: L[]; quizzes?: L[] }[] }[];
};

function walk(s: S): [string, L][] {
  const out: [string, L][] = [];
  for (const l of s.lectures ?? []) out.push([s.id, l]);
  for (const p of s.phases ?? []) {
    for (const l of p.lectures ?? []) out.push([s.id, l]);
    for (const q of p.quizzes ?? []) out.push([s.id, q]);
    for (const g of p.groups ?? []) {
      for (const l of g.lectures ?? []) out.push([s.id, l]);
      for (const q of g.quizzes ?? []) out.push([s.id, q]);
    }
  }
  return out;
}

const allSubjects: S[] = [
  ...codingSubjects,
  algotradingSubject,
  cfoSubject,
  spokenEnglishSubject,
  chessSubject,
  geopoliticsSubject,
];

const all = allSubjects.flatMap(walk);
const missing = all.filter(([, l]) => !existsSync(l.path));

const geoPaths = all.filter(([s]) => s === "geopolitics");
console.log(`geopolitics: ${geoPaths.length} registered lectures`);

console.log(`\nchecked ${all.length} registered lecture paths across ${allSubjects.length} subjects`);
if (missing.length === 0) {
  console.log("ALL PATHS EXIST");
} else {
  console.log(`\nMISSING (${missing.length}):`);
  for (const [sid, l] of missing) console.log(`  [${sid}] ${l.id} -> ${l.path}`);
  process.exitCode = 1;
}
