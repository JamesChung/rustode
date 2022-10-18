import { Option, some, none } from "./option";

/* It's defining an interface that is used to type the Result class. */
export interface IResult<T, E = Error> {
  expect(msg: string): T;
  expectErr(msg: string): E;
  isErr(): boolean;
  isOk(): boolean;
  unwrap(): T;
  unwrapOr(value: T): T;
}

/* `Result<T, E>` is a class that represents a value of type `T` or an error of type `E` */
export class Result<T, E = Error> implements IResult<T, E> {
  #value?: T;
  #err?: E;

  /**
   * Creates a `Result<T, E>` with a `value` of `Ok` or `Err`.
   * @param {T} [value] - The value to be returned if the result is successful.
   * @param {E} [err] - E
   */
  constructor(value?: T, err?: E) {
    if (value) {
      this.#value = value;
    } else {
      this.#err = err;
    }
  }

  /**
   * Returns the contained `Ok` value.
   *
   * Throws `Error` if the value is an `Err`, with an error message including the
   * passed `msg`, and the content of the `Err`.
   * @param {string} msg - string - The message to throw if the `Result` is an `Err`.
   * @returns The value of the `Ok` variant.
   */
  expect(msg: string): T {
    if (this.isErr()) {
      throw new Error(`${msg}: ${this.#err?.toString()}`);
    }
    return this.#value!;
  }

  /**
   * Returns the contained Err value.
   *
   * Throws `Error` if the value is an `Ok`, with an error message including
   * the passed `msg`, and the content of the `Ok`.
   * @param {string} msg - string - The message to throw if the `Result` is `Ok`.
   * @returns The error value.
   */
  expectErr(msg: string): E {
    if (this.isOk()) {
      throw new Error(`${msg}: ${this.#value?.toString()}`);
    }
    return this.#err!;
  }

  /**
   * Returns `true` if the result is `Ok`.
   * @returns A `boolean` value.
   */
  isOk(): boolean {
    return typeof this.#value !== "undefined";
  }

  /**
   * Returns `true` if the result is `Err`.
   * @returns A `boolean` value.
   */
  isErr(): boolean {
    return typeof this.#err !== "undefined";
  }

  /**
   * Returns the contained `Ok` value.
   *
   * Returns error if the value is an `Err`, with an error message
   * provided by the `Err`’s value.
   * @returns The value of the `Result`.
   */
  unwrap(): T {
    if (this.isErr()) {
      throw (this.#err) ? this.#err : new Error("unwrap error");
    }
    return this.#value!;
  }

  /**
   * Returns the contained `Ok` value or a provided default.
   * @param {T} value - The value to return if the Result is an Err.
   * @returns The value of the `Result` if it is `Ok`, otherwise the `value` passed in.
   */
  unwrapOr(value: T): T {
    if (this.isErr()) {
      return value;
    }
    return this.#value!;
  }
}

/**
 * It takes a value of type `T` and returns a `Result<T, E>` where E is an `Err`.
 * @param {T} value - The value to be wrapped in a `Result`.
 * @returns A `Result<T, E>`.
 */
export function ok<T, E = Error>(value: T): Result<T, E> {
  return new Result<T, E>(value);
}

/**
 * It returns a new `Err`.
 * @param {E} err - E - The error to return.
 * @returns A `Result<T, E>`.
 */
export function err<T, E = Error>(err: E): Result<T, E> {
  return new Result<T, E>(undefined, err);
}
