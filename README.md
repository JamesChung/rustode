
# rustode

Rust-like Result and Option syntax for TS/JS.

[![Version](https://img.shields.io/npm/v/rustode)](https://npmjs.org/package/rustode)
[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/)

## Installation

```bash
npm install rustode
```

## Usage/Examples

### `Option<T>`

```typescript
import { Option, some } from "rustode";

let something: Option<string>;
something = some("Hello, World!");
if (something.isSome()) {
  console.log(something.unwrap());  // Hello, World!
}
```

```typescript
import { Option, none } from "rustode";

let something: Option<string>;
something = none();
if (something.isNone()) {
  console.log(something.unwrap());  // Error was thrown, attempting to unwrap a None.
}
```

### `Result<T, E>`

```typescript
import { Result, ok } from "rustode";

let something: Result<string>;
something = ok("Hello, World!");
if (something.isOk()) {
  console.log(something.unwrap());  // Hello, World!
}
```

```typescript
import { Result, err } from "rustode";

let something: Result<string, string>;
something = err("this isn't good...");
if (something.isNone()) {
  console.log(something.unwrap());  // Error was thrown, attempting to unwrap an Err.
}
```

## Documentation

### `Option<T>` methods

- `contains(value: Option<T>): boolean`
    - Returns `true` if the option is a `Some` value containing the given value.
- `expect(msg: string): T`
    - Returns the contained `Some` value. Throws `Error` if the value is a `None` with a custom panic message provided by `msg`.
- `isNone(): boolean`
    - Returns `true` if the option is a `None` value.
- `isSome(): boolean`
    - Returns `true` if the option is a `Some` value.
- `unwrap(): T`
    - Returns the contained `Some` value. Throws Error if the value equals `None`.
- `unwrapOr(value: T): T`
    - Returns the contained `Some` value or a provided default.
- `unwrapOrElse(fn: () => T): T`
    - Returns the contained `Some` value or computes it from a closure.

### `Result<T, E>` methods

- `expect(msg: string): T`
    - Returns the contained `Ok` value. Throws `Error` if the value is an `Err`, with an error message including the passed `msg`, and the content of the `Err`.
- `expectErr(msg: string): E`
    - Returns the contained Err value. Throws `Error` if the value is an `Ok`, with an error message including the passed `msg`, and the content of the `Ok`.
- `isErr(): boolean`
    - Returns `true` if the result is `Err`.
- `isOk(): boolean`
    - Returns `true` if the result is `Ok`.
- `unwrap(): T`
    - Returns the contained `Ok` value. Returns error if the value is an `Err`, with an error message
- `unwrapOr(value: T): T`
    - Returns the contained `Ok` value or a provided default.
