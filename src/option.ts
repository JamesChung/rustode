/* It's an interface that defines the methods that the Option class will have. */
export interface IOption<T> {
  contains(value: Option<T>): boolean;
  expect(msg: string): T;
  isNone(): boolean;
  isSome(): boolean;
  unwrap(): T;
  unwrapOr(value: T): T;
  unwrapOrElse(fn: () => T): T;
}

/* `Option<T>` is a class that represents a value that may or may not exist */
export class Option<T> implements IOption<T> {
  #value?: T;

  /**
   * Creates an Option<T> with a `value` of `Some` or `None`.
   * @param {T} [value] - The value to be wrapped.
   */
  constructor(value?: T) {
    this.#value = value;
  }

  /**
   * Returns `true` if the option is a `Some` value containing the given value.
   * @param value - `Option<T>`
   * @returns A `boolean` value.
   */
  contains(value: Option<T>): boolean {
    if (value.isNone()) {
      return false;
    }
    return this.#value === value.unwrap();
  }

  /**
   * Returns the contained `Some` value.
   *
   * Throws `Error` if the value is a `None` with a custom panic message provided by `msg`.
   * @param {string} msg - `string` - The message to throw if the `Option` is `None`.
   * @returns The value of the `Option<T>`.
   */
  expect(msg: string): T {
    if (this.isNone()) {
      throw new Error(msg);
    }
    return this.#value!;
  }

  /**
   * Returns `true` if the option is a `None` value.
   * @returns A `boolean` value.
   */
  isNone(): boolean {
    return typeof this.#value === "undefined";
  }

  /**
   * Returns `true` if the option is a `Some` value.
   * @returns A `boolean` value.
   */
  isSome(): boolean {
    return typeof this.#value !== "undefined";
  }


  /**
   * Returns the contained Some value.
   *
   * Throws Error if the value equals `None`.
   * @returns The value of the `Option<T>`.
   */
  unwrap(): T {
    if (this.isNone()) {
      throw new Error("failed to unwrap value.");
    }
    return this.#value!;
  }

  /**
   * Returns the contained Some value or a provided default.
   * @param {T} value - T - The value to return if the Option is None.
   * @returns The value of the `Option<T>` if it is `Some`, otherwise the value passed in.
   */
  unwrapOr(value: T): T {
    if (this.isNone()) {
      return value;
    }
    return this.#value!;
  }

  /**
   * Returns the contained `Some` value or computes it from a closure.
   * @param fn - `() => T`
   * @returns The value of the `Option<T>` if it is `Some`, otherwise the result of the function.
   */
  unwrapOrElse(fn: () => T): T {
    if (this.isNone()) {
      return fn();
    }
    return this.#value!;
  }
}

/**
 * It takes a value of type T and returns an Option<T> that contains that value
 * @param {T} value - T - The value to wrap in an Option.
 * @returns Option<T>
 */
export function some<T>(value: T): Option<T> {
  return new Option<T>(value);
}

/**
 * It returns an Option<T> with a value of undefined
 * @returns An Option<T> object with a value of undefined.
 */
export function none<T>(): Option<T> {
  return new Option<T>(undefined);
}
