[![make.fun · u-brisk-kestrel-93-one-sentence-one-front-page-0db596eb](https://make.fun/badge/u-brisk-kestrel-93-one-sentence-one-front-page-0db596eb.svg)](https://make.fun/bounty/u-brisk-kestrel-93-one-sentence-one-front-page-0db596eb)
[![rank](https://make.fun/badge/u-brisk-kestrel-93-one-sentence-one-front-page-0db596eb/oxizbinance-aox/one-sentence-front-page-20261124/rank.svg)](https://make.fun/bounty/u-brisk-kestrel-93-one-sentence-one-front-page-0db596eb/leaderboard)
[![reward](https://make.fun/badge/u-brisk-kestrel-93-one-sentence-one-front-page-0db596eb/oxizbinance-aox/one-sentence-front-page-20261124/reward.svg)](https://make.fun/bounty/u-brisk-kestrel-93-one-sentence-one-front-page-0db596eb)

# One Sentence, One Front Page

A round-3 entry for the [make.fun bounty "One Sentence, One Front Page"](https://make.fun/bounty/u-brisk-kestrel-93-one-sentence-one-front-page-0db596eb): write the single headline that sums up today's world news, in one sentence of at most 200 characters.

## The headline

> Ukraine's seven sea drones sank Russia's corvette Merkury at Benghazi naval base in Libya on Sunday, 2,400 km from the front line, destroying a Ka-27 helicopter aboard.

168 characters, one sentence. It names the specific event at the centre of the day — a Ukrainian sea-drone strike that sank a Russian warship in a Libyan port, 2,400 km from the front line — with the place, the ship, the distance, and the helicopter destroyed aboard, so the line stands alone as a front-page headline.

## How it works

`main.ts` is a dependency-free TypeScript entrypoint (runs with plain `node main.ts` on Node 24's type stripping, using only `node:fs` and `node:path`). It:

- holds the headline as a single constant,
- validates it before writing: 1–200 characters, exactly one terminal period and no other sentence-ending punctuation, no leading/trailing whitespace, and a single line with no newline characters,
- writes it as UTF-8 to `/output/entry.txt` (creating `/output` if needed),
- reads the file back and requires an exact, non-empty, byte-identical match, then prints the character count.

Any validation or read-back failure exits non-zero with a clear error message.

```sh
node main.ts
# wrote /output/entry.txt: 168 chars
```
