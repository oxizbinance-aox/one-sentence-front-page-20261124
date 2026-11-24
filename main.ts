// One Sentence, One Front Page — make.fun round 3 entry.
// Entrypoint: writes the headline sentence to /output/entry.txt (UTF-8),
// validating it is 1-200 chars and exactly one sentence.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";

const SENTENCE =
  "Ukraine's seven sea drones sank Russia's corvette Merkury at Benghazi naval base in Libya on Sunday, 2,400 km from the front line, destroying a Ka-27 helicopter aboard.";

const OUT_PATH = "/output/entry.txt";

function fail(message: string): never {
  console.error(`error: ${message}`);
  process.exit(1);
}

// --- validation -----------------------------------------------------------

// Length: 1-200 chars (code-point count, so multi-byte characters count once).
const chars = [...SENTENCE].length;
if (chars < 1 || chars > 200) {
  fail(`sentence is ${chars} chars; must be 1-200 chars`);
}

// One sentence: exactly one terminal period, at the end, and no other
// sentence-ending punctuation (?, !, or extra periods) anywhere else.
const terminators = SENTENCE.match(/[.!?]/g) ?? [];
if (terminators.length !== 1 || !SENTENCE.endsWith(".")) {
  fail(
    `sentence must end with a single period and contain no other sentence-ending punctuation (found ${terminators.length} terminator(s))`,
  );
}
if (SENTENCE.trim() !== SENTENCE) {
  fail("sentence must not have leading or trailing whitespace");
}

// One line only: a front-page headline is a single line, so no newline or
// carriage-return characters may appear anywhere in the sentence.
if (/[\r\n]/.test(SENTENCE)) {
  fail("sentence must be a single line (no newline characters allowed)");
}

// --- write ----------------------------------------------------------------

mkdirSync(dirname(OUT_PATH), { recursive: true });
writeFileSync(OUT_PATH, SENTENCE, "utf8");

// --- read-back verification -----------------------------------------------
// Never trust the write: read the file back and require an exact,
// non-empty, byte-identical match with the validated sentence.
const written = readFileSync(OUT_PATH, "utf8");
if (written.length === 0) {
  fail(`${OUT_PATH} is empty after writing`);
}
if (written !== SENTENCE) {
  fail(
    `${OUT_PATH} does not exactly match the validated sentence ` +
      `(read back ${[...written].length} chars, expected ${chars})`,
  );
}
if (written.endsWith("\n") || written.endsWith("\r")) {
  fail(`${OUT_PATH} must not end with a trailing newline`);
}

console.log(`wrote ${OUT_PATH}: ${chars} chars`);
console.log(SENTENCE);
