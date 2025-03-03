# extract-alphanumeric

extract-alphanumeric is a small utility designed to extract alphanumeric characters
from a given string.

---
## Installation

```bash
npm install extract-alphanumeric
```

## Function Signature

```typescript
const extract = (
  input: string,
  options?: Options
): string
```

### Parameters

### `input` (string)

The input string from which alphanumeric characters will be extracted.

### `options` (Options)

An object containing configuration options.

| Option    | Type   | Default | Description                                                                                             |
| --------- | ------ | ------- | ------------------------------------------------------------------------------------------------------- |
| `include` | string | `""`    | A string of characters to explicitly include in the extracted output, even if they aren't alphanumeric. |
| `exclude` | string | `""`    | A string of characters to exclude from the extracted output.                                            |

## Notes
- White spaces are filtered out of an input string by default. `include` can be
  used if you wish to retain whitespaces (although it may be necessary to trim
  the output afterwards manually)
- `include` and `exclude` will treat each character individually. This means that it is not possible to whitelist or blacklist specific words or phrases.
- If the same characters appear in both `include` and `exclude`, `exclude` will take priority

## Example Usage

```typescript
import { extract } from "extract-alphanumeric";

console.log(extract("Hello Everyone")); 
// Output: "HelloEveryone"

console.log(extract("I'll have two number 9s, and a large soda.", { include: "'. " })); 
// Output: "I'll have two number 9s and a large soda." -> Missing comma

console.log(extract("I'll have two number 9s, and a large soda.", { exclude: "123456789" })); 
// Output: "Ill have two number s and a large soda" -> other numbers ignored, punctuation all removed

console.log(extract("some input", { include: "some input", exclude: "some input" })); 
// Output: ""
```