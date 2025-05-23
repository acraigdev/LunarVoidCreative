export type Maybe<T> = T | undefined;

export type NonMaybe<T> = Exclude<T, undefined>;

export function isNonMaybe<T>(val: T): val is NonMaybe<T> {
  return val !== undefined;
}

export type Nullable<T> = null | Maybe<T>;

export function isNonNullable<T>(val: T): val is NonNullable<T> {
  return isNonMaybe(val) && val !== null;
}

export interface ValidationDelegate {
  validate: ({ shouldFocus }: { shouldFocus: boolean }) => boolean;
}

export type WithRequired<T, K extends keyof T> = T & { [P in K]-?: T[P] };

export type PartialMaybe<T> = { [P in keyof T]?: T[P] | undefined };
