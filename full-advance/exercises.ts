/* _______________ UTILS ______________ */

import type { Alike, Equal, Expect, Prettify } from './index.d';

/* _______________ CONTENT ______________ */

/*

1. CUSTOM PICK
2. CUSTOM EXCLUDE
3. CUSTOM OMIT
4. CUSTOM READONLY and PARTIAL READONLY and DEEP_READONLY
5. CUSTOM AWAITED
6. CUSTOM RETURN TYPE
7. CREATE OBJECT FROM TUPLE
8. GET LENGTH OF TUPLE
9. GET FIRST ITEM TYPE FROM ARRAY
10. GET LAST ITEM TYPE FROM ARRAY
11. CONCAT TUPLE
12. CUSTOM INCLUDES
13. CUSTOM PUSH
14. CUSTOM POP
15. CUSTOM UNSHIFT
16. PARAMETER TYPE FROM FUNCTION RETURN
17. CUSTOM ERRORS IN TypeScript 
18. TRIM TEXT
19. CUSTOM CAPITALIZE
20. REPLACE STRING
21. APPEND ARGUMENT TO FUNCTION PROPS
*/
/* _______________--------------------------------- ______________ */

/* _____________ TASK 1 - CUSTOM PICK  _____________ */

type MyPick<T, K extends keyof T> = {
  [P in K]: T[P];
};

/* _____________ Test Cases _____________ */

type CasesPick = [
  Expect<Equal<ExpectedPick1, MyPick<PickExample, 'title'>>>,
  Expect<Equal<ExpectedPick2, MyPick<PickExample, 'title' | 'completed'>>>,
  // @ts-expect-error
  MyPick<Todo, 'title' | 'completed' | 'invalid'>
];

type PickExample = {
  title: string;
  description: string;
  completed: boolean;
};

type ExpectedPick1 = {
  title: string;
};

type ExpectedPick2 = {
  title: string;
  completed: boolean;
};

/* _____________ TASK 1 - END _____________ */

/** ########################################################################################################################## */

/* _____________ TASK 2 - CUSTOM EXCLUDE _____________ */

/*  
    T extends K - if T type have K Type 
    return never 
    otherwise return T -- This will exclude passed type 
*/

/* solution */
type MyExclude<T, K> = T extends K ? never : T;
/* _____________ Test Cases _____________ */

type CasesExclude = [
  Expect<Equal<'b' | 'c', MyExclude<ExcludeExample, 'a'>>>,
  Expect<Equal<'a' | 'c', MyExclude<ExcludeExample, 'b'>>>,
  Expect<Equal<'a' | 'b' | 'c', MyExclude<ExcludeExample, 'title'>>>
];

type ExcludeExample = 'a' | 'b' | 'c';
/* _____________ TASK 2 - END _____________ */

/** ########################################################################################################################## */

/* _____________ TASK 3 - CUSTOM OMIT _____________ */

/* solution */
type MyOmit<T, K extends keyof T> = MyPick<T, MyExclude<keyof T, K>>;

type MyOmitWithoutHelpers<T, K extends keyof T> = {
  [P in keyof T as P extends K ? never : P]: T[P];
};

type CasesOmit = [
  Expect<Equal<ExpectedOmit1, MyOmit<PickExample, 'title'>>>,
  Expect<Equal<ExpectedOmit2, MyOmit<PickExample, 'title' | 'completed'>>>,
  Expect<Equal<ExpectedOmit1, MyOmitWithoutHelpers<PickExample, 'title'>>>,
  Expect<
    Equal<
      ExpectedOmit2,
      MyOmitWithoutHelpers<PickExample, 'title' | 'completed'>
    >
  >,
  // @ts-expect-error
  MyOmit<OmitExample, 'title' | 'completed' | 'invalid'>,
  // @ts-expect-error
  MyOmitWithoutHelpers<OmitExample, 'title' | 'completed' | 'invalid'>
];

type OmitExample = {
  title: string;
  description: string;
  completed: boolean;
};

type ExpectedOmit1 = {
  description: string;
  completed: boolean;
};

type ExpectedOmit2 = {
  description: string;
};
/* _____________ TASK 3 - END _____________ */

/** ########################################################################################################################## */

/* _____________ TASK 4 - CUSTOM READONLY and PARTIAL READONLY and DEEP_READONLY_____________ */

/* solution */
type MyReadonly<T> = {
  readonly [K in keyof T]: T[K];
};

/* _____________ Test Cases _____________ */
type CasesReadonly = [
  Expect<Equal<MyReadonly<PickExample>, Readonly<PickExample>>>
];

/** PARTIAL Readonly */
/* solution */
type MyPartialReadonly<T, K extends keyof T = keyof T> = Omit<T, K> &
  Readonly<Pick<T, K>>;

type MyPartialReadonlyWithoutHelpers<T, K extends keyof T = keyof T> = {
  [P in keyof T as P extends K ? never : P]: T[P];
} & {
  readonly [P in K]: T[P];
};

type CasesPartialReadonly = [
  Expect<Alike<MyPartialReadonly<OmitExample>, Readonly<OmitExample>>>,
  Expect<
    Alike<
      MyPartialReadonly<PartialReadonlyExample, 'title' | 'description'>,
      ExpectedPartialReadonly2
    >
  >,
  Expect<
    Alike<
      MyPartialReadonly<PartialReadonlyExample, 'title' | 'description'>,
      ExpectedPartialReadonly2
    >
  >,
  Expect<
    Alike<
      MyPartialReadonly<PartialReadonlyExample, 'description'>,
      ExpectedPartialReadonly2
    >
  >,

  Expect<
    Alike<MyPartialReadonlyWithoutHelpers<OmitExample>, Readonly<OmitExample>>
  >,
  Expect<
    Alike<
      MyPartialReadonlyWithoutHelpers<
        PartialReadonlyExample,
        'title' | 'description'
      >,
      ExpectedPartialReadonly2
    >
  >,
  Expect<
    Alike<
      MyPartialReadonlyWithoutHelpers<
        PartialReadonlyExample,
        'title' | 'description'
      >,
      ExpectedPartialReadonly2
    >
  >,
  Expect<
    Alike<
      MyPartialReadonlyWithoutHelpers<PartialReadonlyExample, 'description'>,
      ExpectedPartialReadonly2
    >
  >
];

// @ts-expect-error
type e1 = MyPartialReadonly<OmitExample, 'title' | 'invalid'>;
// @ts-expect-error
type e2 = MyPartialReadonlyWithoutHelpers<OmitExample, 'title' | 'invalid'>;

interface PartialReadonlyExample {
  readonly title: string;
  description?: string;
  completed: boolean;
}

interface ExpectedPartialReadonly2 {
  readonly title: string;
  readonly description?: string;
  completed: boolean;
}

/** Deep Readonly */
/** 12. DeepReadonly */

type DeepReadonly<T> = {
  readonly [K in keyof T]: keyof T[K] extends never ? T[K] : DeepReadonly<T[K]>;
};

type A = Prettify<DeepReadonly<DeepReadonlyExample1>>;

type CasesDeepReadonly = [
  Expect<Equal<DeepReadonly<DeepReadonlyExample1>, ExpectedDeepReadonly1>>,
  Expect<Equal<DeepReadonly<DeepReadonlyExample2>, ExpectedDeepReadonly2>>
];

type DeepReadonlyExample1 = {
  a: () => 22;
  b: string;
  c: {
    d: boolean;
    e: {
      g: {
        h: {
          i: true;
          j: 'string';
        };
        k: 'hello';
      };
      l: [
        'hi',
        {
          m: ['hey'];
        }
      ];
    };
  };
};

type DeepReadonlyExample2 = { a: string } | { b: number };

type ExpectedDeepReadonly1 = {
  readonly a: () => 22;
  readonly b: string;
  readonly c: {
    readonly d: boolean;
    readonly e: {
      readonly g: {
        readonly h: {
          readonly i: true;
          readonly j: 'string';
        };
        readonly k: 'hello';
      };
      readonly l: readonly [
        'hi',
        {
          readonly m: readonly ['hey'];
        }
      ];
    };
  };
};

type ExpectedDeepReadonly2 = { readonly a: string } | { readonly b: number };
/* _____________ TASK 4 - END _____________ */

/** ########################################################################################################################## */

/* _____________ TASK 5 - CUSTOM  AWAITED _____________ */

type MyAwaited<T> = T extends PromiseLike<infer U>
  ? U extends PromiseLike<any>
    ? MyAwaited<U>
    : U
  : never;

/* _____________ Test Cases _____________ */
type X = Promise<string>;
type Y = Promise<{ field: number }>;
type Z = Promise<Promise<string | number>>;
type Z1 = Promise<Promise<Promise<string | boolean>>>;
type T = { then: (onfulfilled: (arg: number) => any) => any };

type CasesAwaited = [
  Expect<Equal<MyAwaited<X>, string>>,
  Expect<Equal<MyAwaited<Y>, { field: number }>>,
  Expect<Equal<MyAwaited<Z>, string | number>>,
  Expect<Equal<MyAwaited<Z1>, string | boolean>>,
  Expect<Equal<MyAwaited<T>, number>>
];

/* _____________ TASK 5 - END _____________ */

/** ########################################################################################################################## */
/* _____________ TASK 6 - CUSTOM RETURN TYPE  _____________ */
// T extends (...args: any) => unknown -> constrains to function
// infer R ? R : any - it will infer type
type CustomReturnType<T extends (...args: any) => unknown> = T extends (
  ...args: any
) => infer R
  ? R
  : any;

/* _____________ Test Cases _____________ */
type CasesReturnType = [
  Expect<Equal<string, CustomReturnType<() => string>>>,
  Expect<Equal<123, CustomReturnType<() => 123>>>,
  Expect<Equal<ComplexObject, CustomReturnType<() => ComplexObject>>>,
  Expect<Equal<Promise<boolean>, CustomReturnType<() => Promise<boolean>>>>,
  Expect<Equal<() => 'foo', CustomReturnType<() => () => 'foo'>>>,
  Expect<Equal<1 | 2, CustomReturnType<typeof fn>>>,
  Expect<Equal<1 | 2, CustomReturnType<typeof fn1>>>,
  Expect<Equal<void, CustomReturnType<() => void>>>,
  Expect<Equal<{}, CustomReturnType<() => {}>>>
];

type ComplexObject = {
  a: [12, 'foo'];
  bar: 'hello';
  prev(): number;
};

const fn = (v: boolean) => (v ? 1 : 2);
const fn1 = (v: boolean, w: any) => (v ? 1 : 2);

/* _____________ TASK 6 - END _____________ */

/** ########################################################################################################################## */

/* _____________ TASK 7 - CREATE OBJECT FROM TUPLE _____________ */

/*  
    T[number] - T of the index
    P in T[number] - will  give you value of that index [1, 2] -> P in T[1] => 2 
*/

/* solution */

type TupleToObject<T extends readonly PropertyKey[]> = {
  [P in T[number]]: P;
};
/* _____________ Test Cases _____________ */

const tuple = ['tesla', 'model 3', 'model X', 'model Y'] as const;
const tupleNumber = [1, 2, 3, 4] as const;
const sym1 = Symbol(1);
const sym2 = Symbol(2);
const tupleSymbol = [sym1, sym2] as const;
const tupleMix = [1, '2', 3, '4', sym1] as const;

type CasesTuple = [
  Expect<
    Equal<
      TupleToObject<typeof tuple>,
      {
        tesla: 'tesla';
        'model 3': 'model 3';
        'model X': 'model X';
        'model Y': 'model Y';
      }
    >
  >,
  Expect<Equal<TupleToObject<typeof tupleNumber>, { 1: 1; 2: 2; 3: 3; 4: 4 }>>,
  Expect<
    Equal<
      TupleToObject<typeof tupleSymbol>,
      { [sym1]: typeof sym1; [sym2]: typeof sym2 }
    >
  >,
  Expect<
    Equal<
      TupleToObject<typeof tupleMix>,
      { 1: 1; '2': '2'; 3: 3; '4': '4'; [sym1]: typeof sym1 }
    >
  >
];

// @ts-expect-error
type error = TupleToObject<[[1, 2], {}]>;

/* _____________ TASK 7 - END _____________ */

/** ########################################################################################################################## */

/* _____________ TASK 8 - GET LENGTH OF TUPLE _____________ */

/*  
    T extends [] - if T is empty array return never
*/

/* solution */
type Length<T extends readonly string[]> = T['length'];

/* _____________ Test Cases _____________ */
const tesla = ['tesla', 'model 3', 'model X', 'model Y'] as const;
const spaceX = [
  'FALCON 9',
  'FALCON HEAVY',
  'DRAGON',
  'STARSHIP',
  'HUMAN SPACEFLIGHT',
] as const;

type CasesLength = [
  Expect<Equal<Length<typeof tesla>, 4>>,
  Expect<Equal<Length<typeof spaceX>, 5>>,
  // @ts-expect-error
  Length<5>,
  // @ts-expect-error
  Length<'hello world'>
];

/* _____________ TASK 8 - END _____________ */

/** ########################################################################################################################## */

/* _____________ TASK 9 - GET FIRST ITEM TYPE FROM ARRAY_____________ */

/*  
    T extends [] - if T is empty array return never
*/

/* solution */
type First<T extends any[]> = T extends [] ? never : T[0];

/* _____________ Test Cases _____________ */
type CasesFirst = [
  Expect<Equal<First<[3, 2, 1]>, 3>>,
  Expect<Equal<First<[() => 123, { a: string }]>, () => 123>>,
  Expect<Equal<First<[]>, never>>,
  Expect<Equal<First<[undefined]>, undefined>>,
  // @ts-expect-error
  First<'notArray'>,
  // @ts-expect-error
  First<{ 0: 'arrayLike' }>
];

/* _____________ TASK 9 - END _____________ */

/** ########################################################################################################################## */

/* _____________ TASK 10 - GET LAST ITEM TYPE FROM ARRAY   _____________ */

// type Last<T extends unknown[]> = [unknown, ...T][T['length']];
type Last<T extends any[]> = T extends [...infer _, infer L] ? L : never;
/* _____________ Test Cases _____________ */

type CasesLastOfArray = [
  Expect<Equal<Last<[2]>, 2>>,
  Expect<Equal<Last<[3, 2, 1]>, 1>>,
  Expect<Equal<Last<[() => 123, { a: string }]>, { a: string }>>
];

/* _____________ TASK 10 - END _____________ */

/** ########################################################################################################################## */

/*  
    [...T, ...U] - we can spreed items in TS same as in JS
*/

/* _____________ TASK 11 - CONCAT TUPLE _____________ */

type Concat<T extends readonly unknown[], U extends readonly unknown[]> = [
  ...T,
  ...U
];

/* _____________ Test Cases _____________ */
const tupleExample = [1] as const;

type CasesConcat = [
  Expect<Equal<Concat<[], []>, []>>,
  Expect<Equal<Concat<[], [1]>, [1]>>,
  Expect<Equal<Concat<typeof tupleExample, typeof tupleExample>, [1, 1]>>,
  Expect<Equal<Concat<[1, 2], [3, 4]>, [1, 2, 3, 4]>>,
  Expect<
    Equal<
      Concat<['1', 2, '3'], [false, boolean, '4']>,
      ['1', 2, '3', false, boolean, '4']
    >
  >,
  // @ts-expect-error
  Concat<null, undefined>
];

/* _____________ TASK 11 - END _____________ */

/** ########################################################################################################################## */

/* _____________ TASK 12 - CUSTOM INCLUDES  _____________ */

type Includes<T extends readonly unknown[], U> = T extends [
  infer First,
  ...infer Rest
]
  ? Equal<First, U> extends true
    ? true
    : Includes<Rest, U>
  : false;

/* _____________ Test Cases _____________ */
type CasesIncludes = [
  Expect<
    Equal<Includes<['Kars', 'Esidisi', 'Wamuu', 'Santana'], 'Kars'>, true>
  >,
  Expect<
    Equal<Includes<['Kars', 'Esidisi', 'Wamuu', 'Santana'], 'Dio'>, false>
  >,
  Expect<Equal<Includes<[1, 2, 3, 5, 6, 7], 7>, true>>,
  Expect<Equal<Includes<[1, 2, 3, 5, 6, 7], 4>, false>>,
  Expect<Equal<Includes<[1, 2, 3], 2>, true>>,
  Expect<Equal<Includes<[1, 2, 3], 1>, true>>,
  Expect<Equal<Includes<[{}], { a: 'A' }>, false>>,
  Expect<Equal<Includes<[boolean, 2, 3, 5, 6, 7], false>, false>>,
  Expect<Equal<Includes<[true, 2, 3, 5, 6, 7], boolean>, false>>,
  Expect<Equal<Includes<[false, 2, 3, 5, 6, 7], false>, true>>,
  Expect<Equal<Includes<[{ a: 'A' }], { readonly a: 'A' }>, false>>,
  Expect<Equal<Includes<[{ readonly a: 'A' }], { a: 'A' }>, false>>,
  Expect<Equal<Includes<[1], 1 | 2>, false>>,
  Expect<Equal<Includes<[1 | 2], 1>, false>>,
  Expect<Equal<Includes<[null], undefined>, false>>,
  Expect<Equal<Includes<[undefined], null>, false>>,
  Expect<Equal<Includes<[null], null>, true>>,
  Expect<Equal<Includes<[undefined], undefined>, true>>
];

/* _____________ TASK 12 - END _____________ */

/** ########################################################################################################################## */

/* _____________ TASK 13 - CUSTOM PUSH _____________ */

type Push<T extends (string | number)[], U> = U extends unknown[]
  ? [...T, ...U]
  : U extends boolean
  ? [...T, boolean]
  : [...T, U];

/* _____________ Test Cases _____________ */
type CasesPush = [
  Expect<Equal<Push<[], 1>, [1]>>,
  Expect<Equal<Push<[1, 2], '3'>, [1, 2, '3']>>,
  Expect<Equal<Push<['1', 2, '3'], boolean>, ['1', 2, '3', boolean]>>,
  Expect<Equal<Push<['1', 2, '3'], [4, 5]>, ['1', 2, '3', 4, 5]>>
];

/* _____________ TASK 13 - END _____________ */

/** ########################################################################################################################## */

/* _____________ TASK 14 - CUSTOM POP   _____________ */

type Pop<T extends any[]> = T extends []
  ? []
  : T extends [...infer I, infer _]
  ? I
  : never;

/* _____________ Test Cases _____________ */
type CasesCustomPop = [
  Expect<Equal<Pop<[3, 2, 1]>, [3, 2]>>,
  Expect<Equal<Pop<['a', 'b', 'c', 'd']>, ['a', 'b', 'c']>>,
  Expect<Equal<Pop<[]>, []>>
];

/* _____________ TASK 14 - END _____________ */

/** ########################################################################################################################## */

/* _____________ TASK 15 - CUSTOM UNSHIFT  _____________ */

type Unshift<T extends (string | number)[], U> = U extends unknown[]
  ? [...U, ...T]
  : U extends boolean
  ? [boolean, ...T]
  : [U, ...T];

/* _____________ Test Cases _____________ */

type CasesUnshift = [
  Expect<Equal<Unshift<[], 1>, [1]>>,
  Expect<Equal<Unshift<[1, 2], 0>, [0, 1, 2]>>,
  Expect<Equal<Unshift<['1', 2, '3'], boolean>, [boolean, '1', 2, '3']>>,
  Expect<Equal<Unshift<['1', 2, '3'], [0]>, [0, '1', 2, '3']>>
];

/* _____________ TASK 15 - END _____________ */

/** ########################################################################################################################## */

/* _____________ TASK 16 - PARAMETER TYPE FROM FUNCTION RETURN _____________ */

type MyParameters<T> = T extends (...any: infer S) => any ? S : any;

/* _____________ Test Cases _____________ */
function foo(arg1: string, arg2: number): void {}
function bar(arg1: boolean, arg2: { a: 'A' }): void {}
function baz(): void {}

type CasesMyParameters = [
  Expect<Equal<MyParameters<typeof foo>, [string, number]>>,
  Expect<Equal<MyParameters<typeof bar>, [boolean, { a: 'A' }]>>,
  Expect<Equal<MyParameters<typeof baz>, []>>
];

/* _____________ TASK 16 - END _____________ */

/** ########################################################################################################################## */
/* _____________ TASK 17 - CUSTOM ERRORS IN TypeScript   _____________ */

type CheckForBadArgs<Arg> = Arg extends any[]
  ? 'Error: can not check two arrays'
  : Arg extends string | boolean | number
  ? Arg
  : 'Error can not check object';

const deepEqualCompare = <Arg>(
  a: CheckForBadArgs<Arg>,
  b: CheckForBadArgs<Arg>
) => {
  return a === b;
};

/* _____________ Test Cases _____________ */

deepEqualCompare(1, 1);
deepEqualCompare('a', 'b');
deepEqualCompare(true, false);
// This will throw runtime error
// deepEqualCompare({ a: "a" }, { b: "b" });
// deepEqualCompare(null, undefined);
// deepEqualCompare(undefined, null);
// deepEqualCompare([], []);

/* _____________ TASK 17 - END _____________ */

/** ########################################################################################################################## */
/* _____________ TASK 18 - TRIM TEXT  _____________ */

type Space = ' ' | '\n' | '\t';
type TrimLeft<S extends string> = S extends `${Space}${infer R}`
  ? TrimLeft<R>
  : S;
type TrimRight<S extends string> = S extends `${infer R}${Space}`
  ? TrimRight<R>
  : S;

// type Trim<S extends string> = TrimRight<TrimLeft<S>>;
type Trim<S extends string> = S extends
  | `${Space}${infer T}`
  | `${infer T}${Space}`
  ? Trim<T>
  : S;
/* _____________ Test Cases _____________ */
type CasesTrim = [
  Expect<Equal<TrimLeft<'str'>, 'str'>>,
  Expect<Equal<TrimLeft<' str'>, 'str'>>,
  Expect<Equal<TrimLeft<'     str'>, 'str'>>,
  Expect<Equal<TrimLeft<'     str     '>, 'str     '>>,
  Expect<Equal<TrimLeft<'   \n\t foo bar '>, 'foo bar '>>,
  Expect<Equal<TrimLeft<''>, ''>>,
  Expect<Equal<TrimLeft<' \n\t'>, ''>>,

  Expect<Equal<TrimRight<'str'>, 'str'>>,
  Expect<Equal<TrimRight<' str'>, ' str'>>,
  Expect<Equal<TrimRight<'     str'>, '     str'>>,
  Expect<Equal<TrimRight<'     str     '>, '     str'>>,
  Expect<Equal<TrimRight<'   \n\t foo bar '>, '   \n\t foo bar'>>,
  Expect<Equal<TrimRight<''>, ''>>,
  Expect<Equal<TrimRight<' \n\t'>, ''>>,

  Expect<Equal<Trim<'str'>, 'str'>>,
  Expect<Equal<Trim<' str'>, 'str'>>,
  Expect<Equal<Trim<'     str'>, 'str'>>,
  Expect<Equal<Trim<'     str     '>, 'str'>>,
  Expect<Equal<Trim<'foo bar'>, 'foo bar'>>,
  Expect<Equal<Trim<''>, ''>>,
  Expect<Equal<Trim<' \n\t'>, ''>>
];

/* _____________ TASK 18 - END _____________ */

/** ########################################################################################################################## */
/* _____________ TASK 19 - CUSTOM CAPITALIZE  _____________ */
type MyCapitalize<S extends string> = S extends `${infer first}${infer rest}`
  ? `${Uppercase<first>}${rest}`
  : S;

/* _____________ Test Cases _____________ */

type CasesCapitalize = [
  Expect<Equal<MyCapitalize<'foobar'>, 'Foobar'>>,
  Expect<Equal<MyCapitalize<'FOOBAR'>, 'FOOBAR'>>,
  Expect<Equal<MyCapitalize<'foo bar'>, 'Foo bar'>>,
  Expect<Equal<MyCapitalize<''>, ''>>,
  Expect<Equal<MyCapitalize<'a'>, 'A'>>,
  Expect<Equal<MyCapitalize<'b'>, 'B'>>,
  Expect<Equal<MyCapitalize<'c'>, 'C'>>,
  Expect<Equal<MyCapitalize<'d'>, 'D'>>,
  Expect<Equal<MyCapitalize<'e'>, 'E'>>,
  Expect<Equal<MyCapitalize<'f'>, 'F'>>,
  Expect<Equal<MyCapitalize<'g'>, 'G'>>,
  Expect<Equal<MyCapitalize<'h'>, 'H'>>,
  Expect<Equal<MyCapitalize<'i'>, 'I'>>,
  Expect<Equal<MyCapitalize<'j'>, 'J'>>,
  Expect<Equal<MyCapitalize<'k'>, 'K'>>,
  Expect<Equal<MyCapitalize<'l'>, 'L'>>,
  Expect<Equal<MyCapitalize<'m'>, 'M'>>,
  Expect<Equal<MyCapitalize<'n'>, 'N'>>,
  Expect<Equal<MyCapitalize<'o'>, 'O'>>,
  Expect<Equal<MyCapitalize<'p'>, 'P'>>,
  Expect<Equal<MyCapitalize<'q'>, 'Q'>>,
  Expect<Equal<MyCapitalize<'r'>, 'R'>>,
  Expect<Equal<MyCapitalize<'s'>, 'S'>>,
  Expect<Equal<MyCapitalize<'t'>, 'T'>>,
  Expect<Equal<MyCapitalize<'u'>, 'U'>>,
  Expect<Equal<MyCapitalize<'v'>, 'V'>>,
  Expect<Equal<MyCapitalize<'w'>, 'W'>>,
  Expect<Equal<MyCapitalize<'x'>, 'X'>>,
  Expect<Equal<MyCapitalize<'y'>, 'Y'>>,
  Expect<Equal<MyCapitalize<'z'>, 'Z'>>
];

/* _____________ TASK 19 - END _____________ */

/** ########################################################################################################################## */
/* _____________ TASK 20 - REPLACE STRING  _____________ */
type Replace<
  S extends string,
  From extends string,
  To extends string
> = From extends ''
  ? S
  : S extends `${infer V}${From}${infer R}`
  ? `${V}${To}${R}`
  : S;

/* _____________ Test Cases _____________ */

type CasesReplace = [
  Expect<Equal<Replace<'foobar', 'bar', 'foo'>, 'foofoo'>>,
  Expect<Equal<Replace<'foobarbar', 'bar', 'foo'>, 'foofoobar'>>,
  Expect<Equal<Replace<'foobarbar', '', 'foo'>, 'foobarbar'>>,
  Expect<Equal<Replace<'foobarbar', 'bar', ''>, 'foobar'>>,
  Expect<Equal<Replace<'foobarbar', 'bra', 'foo'>, 'foobarbar'>>,
  Expect<Equal<Replace<'', '', ''>, ''>>
];

/* _____________ TASK 20 - END _____________ */

/** ########################################################################################################################## */
/* _____________ TASK 21 - APPEND ARGUMENT TO FUNCTION PROPS  _____________ */

type AppendArgument<Fn extends (...args: any[]) => any, A> = Fn extends (
  ...args: infer R
) => infer T
  ? (...args: [...R, x: A]) => T
  : Fn;

/* _____________ Test Cases _____________ */
type Case1 = AppendArgument<(a: number, b: string) => number, boolean>;
type Result1 = (a: number, b: string, x: boolean) => number;

type Case2 = AppendArgument<() => void, undefined>;
type Result2 = (x: undefined) => void;

type cases = [
  Expect<Equal<Case1, Result1>>,
  Expect<Equal<Case2, Result2>>,
  // @ts-expect-error
  AppendArgument<unknown, undefined>
];
/* _____________ TASK 21 - END _____________ */

/** ########################################################################################################################## */
