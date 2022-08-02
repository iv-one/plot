import {expectError, expectType} from "tsd";
import type {TypedArray, Value, ValueArray} from "../../src/data.js";
import {ColorAccessor, IdentityTransformMethod, maybeZero, TransformMethod} from "../../src/options.js";

import {
  constant,
  field,
  identity,
  labelof,
  maybeColorChannel,
  maybeKeyword,
  maybeNumberChannel,
  percentile,
  valueof
} from "../../src/options.js";

// valueof
// _____________________________________________________________________

const numberTransform: TransformMethod<number> = {
  transform: (data) => (data ? Array.from(data, (d) => d + 1) : [])
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const nullTransform: TransformMethod<any> = {
  transform: () => [1, 2, 3]
};

expectType<ValueArray>(valueof({length: 10}, (d, i) => i));
expectType<ValueArray>(valueof([1, 2, 3], numberTransform));
expectType<ValueArray>(valueof([1, 2, 3], nullTransform));
expectType<ValueArray>(valueof({length: 10}, nullTransform));
expectType<ValueArray>(valueof([{one: "one", two: "two"}], "one"));
expectType<Date[]>(valueof({length: 10}, new Date()));
expectType<undefined>(valueof(undefined, (_, i) => i + 10));
expectType<ValueArray>(valueof(undefined, nullTransform));
expectType<ValueArray>(valueof(null, nullTransform));
expectType<number[]>(valueof({length: 10}, 1));
expectType<boolean[]>(valueof({length: 10}, true));
valueof([{one: "one", two: "two"}], (d) => {
  expectType<{one: string; two: string}>(d);
  return d.one;
});
valueof([true, false], (d) => {
  expectType<boolean>(d);
  return d;
});
expectType<TypedArray>(valueof([1, 2, 3], (d) => d * 2, Float32Array));
expectType<TypedArray>(valueof([1, 2, 3], (d) => d * 2, Float64Array));
expectType<ValueArray>(valueof([1, 2, 3], (d) => d * 2, Array));

// @ts-expect-error: can't do a number transform on "one"
expectError(() => valueof(["one", 2, 3], numberTransform));
// @ts-expect-error: red is not one of the keys, and valueof doesn't support colors
expectError(() => valueof([{one: "one", two: "two"}], "red"));
// @ts-expect-error: red is not one of the keys, and valueof doesn't support colors
expectType<null>(valueof(null, "red"));

// field
// _____________________________________________________________________

expectType<Value>(field("key")({key: "value"}));
expectType<Value>(field("foo")({key: "value"}));

// identity
// _____________________________________________________________________

expectType<number[]>(identity.transform([2, 3, 4]));
expectType<boolean[]>(identity.transform([true]));
expectType<Set<string>>(identity.transform(new Set(["one", "two"])));
expectType<Set<string>>(identity.transform(new Set(["one", "two"])));
// @ts-expect-error: not supported.
expectType<Set<string>>(identity.transform(null));
// @ts-expect-error: needs a proper accessor.
expectError(valueof({length: 10}, identity));
// @ts-expect-error: has to be array like.
expectError(identity.transform(true));
// @ts-expect-error: need to use non-identity accessor here.
expectError(identity.transform({length: 10}));

// constant
// _____________________________________________________________________

expectType<"foo">(constant("foo")());
expectType<1>(constant(1)());
expectType<true>(constant(true)());
expectType<false>(constant(false)());
expectType<null>(constant(null)());

// percentile
// _____________________________________________________________________

expectType<number | undefined>(percentile("p99")([1, 2, 3, 4, 5], (i) => i));

// @ts-expect-error: the accessor function is required by percentile'e return type.
expectError(percentile("p99")([1, 2, 3, 4, 5]));

// maybeColorChannel
// _____________________________________________________________________

expectType<[ColorAccessor<string> | undefined, undefined] | [undefined, string]>(maybeColorChannel("red"));
// eslint-disable-next-line @typescript-eslint/no-explicit-any
expectType<[ColorAccessor<any> | undefined, undefined] | [undefined, string]>(maybeColorChannel(1));

// maybeNumberChannel
// _____________________________________________________________________

expectType<[ColorAccessor<number> | null | undefined, undefined] | [undefined, number | null]>(
  maybeNumberChannel("red")
);
expectType<[ColorAccessor<number> | null | undefined, undefined] | [undefined, number | null]>(maybeNumberChannel(1));

// maybeKeyword
// _____________________________________________________________________

expectType<undefined>(maybeKeyword(null, "foo", ["bar"]));
expectType<undefined>(maybeKeyword(undefined, "foo", ["bar"]));
expectType<string | undefined>(maybeKeyword("bar", "foo", ["bar"]));

// keyword
// _____________________________________________________________________

// arrayify
// _____________________________________________________________________

// map
// _____________________________________________________________________

// slice
// _____________________________________________________________________

// maybeZero
// _____________________________________________________________________

expectType<[0, IdentityTransformMethod]>(maybeZero(undefined, undefined, undefined));
expectType<[0, 10]>(maybeZero(10, undefined, undefined));
expectType<[0, 10]>(maybeZero(undefined, undefined, 10));
expectType<[0, 10]>(maybeZero(10, undefined, 10));
expectType<[20, 10]>(maybeZero(10, 20, undefined));

// maybeTuple
// _____________________________________________________________________

// maybeZ
// _____________________________________________________________________

// range
// _____________________________________________________________________

// where
// _____________________________________________________________________

// take
// _____________________________________________________________________

// keyof
// _____________________________________________________________________

// maybeInput
// _____________________________________________________________________

// column
// _____________________________________________________________________

// maybeColumn
// _____________________________________________________________________

// labelof
// _____________________________________________________________________

expectType<string>(labelof("some label"));
expectType<string>(labelof(undefined, "fallback"));
expectType<string>(labelof(null, "fallback"));
expectType<undefined>(labelof(undefined));
expectType<undefined>(labelof(null));
expectType<string>(labelof({label: "my label"}, "fallback"));
expectType<string>(labelof({label: "my label"}));
expectError(() => labelof(1));

// mid
// _____________________________________________________________________

// maybeValue
// _____________________________________________________________________

// numberChannel
// _____________________________________________________________________

// isIterable
// _____________________________________________________________________

// isTextual
// _____________________________________________________________________

// isOrdinal
// _____________________________________________________________________

// isTemporalString
// _____________________________________________________________________

// isNumericString
// _____________________________________________________________________

// isNumeric
// _____________________________________________________________________

// isFirst
// _____________________________________________________________________

// isEvery
// _____________________________________________________________________

// isColor
// _____________________________________________________________________

// isNoneish
// _____________________________________________________________________

// isNone
// _____________________________________________________________________

// isRound
// _____________________________________________________________________

// maybeFrameAnchor
// _____________________________________________________________________

// order
// _____________________________________________________________________

// inherit
// _____________________________________________________________________

// Named
// _____________________________________________________________________

// maybeNamed
// _____________________________________________________________________