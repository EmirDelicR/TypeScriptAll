/**
 * To Run this in terminal do:
 * tsc advance.ts | node advance.js
 *
 */

/**
 * LINKS:
 * https://www.totaltypescript.com/books/total-typescript-essentials/essential-types-and-annotations
 * https://www.youtube.com/watch?v=dLPgQRbVquo
 * https://www.youtube.com/watch?v=fn12l_8LfxI&list=PLYvdvJlnTOjF6aJsWWAt7kZRJvzw-en8B&index=10
 *
 *  */

/* 1. Why enums are bad */
enum LoginMode {
  email,
  social,
}

/** To access keys the main problem will be */
const keys = Object.keys(LoginMode);
// [ '0', '1', 'email', 'social' ]

// Fix is to use type
type LoginModeType = 'email' | 'social';

// Other option is to use
const LoginModeConst = {
  email: 'email',
  social: 'social',
} as const;

// It will be same as LoginModeType
type LoginModeFromConstType = keyof typeof LoginModeConst;

/** ############################################### */
/* 2. TypeScript Template Literal Types */
type CSSItem = 'px' | 'em' | 'rem';
type CSSValue = `${number}${CSSItem}`;
const css: CSSValue = '20px';

type ButtonSize = 'small' | 'medium' | 'large';
type ButtonType = 'primary' | 'secondary';
type ButtonStyle = `${ButtonSize}-${ButtonType}`;
const but: ButtonStyle = 'large-primary';

/** ############################################### */
/** 3. TypeScript Mapped Types as clauses */

type State = {
  name: string;
  age: number;
};

// Example of setter declaration
type SetProperty<K extends string> = `set${Capitalize<K>}`;
type ExampleName = SetProperty<'name'>; // setName

// Generic type for store
type Setters<State> = {
  [K in keyof State & string as `set${Capitalize<K>}`]: (
    value: State[K]
  ) => void;
};

type Getters<State> = {
  [K in keyof State & string as `get${Capitalize<K>}`]: () => State[K];
};

type Store<State> = Setters<State> & Getters<State>;

// How to use
type PersonStore = Store<State>;

declare const personStore: PersonStore;

personStore.setAge(20);
personStore.setName('John');
const personName = personStore.getName();
const personAge = personStore.getAge();

/** ############################################### */
/** 4. TypeScript satisfies operator  */

type ColorString = 'red' | 'blue';
type ColorRGB = [red: number, green: number, blue: number];
type Color = ColorString | ColorRGB;

type Theme = Record<string, Color>;

const theme = {
  primary: 'red',
  secondary: [0, 255, 255],
  tertiary: 'blue',
} satisfies Theme;

// If we do theme: Theme = g: string | number but with satisfies we get g: number
const [r, g, b] = theme.secondary;

/** ############################################### */
/** 5. Lookup Types */

type ExampleLookup = {
  user: {
    billing: {
      card: number;
      cardToken: string;
    };
    aliases: {
      name: string;
      userName: string;
    }[];
  };
};

type CardTokenType = Pick<ExampleLookup['user']['billing'], 'cardToken'>;
type Alias = ExampleLookup['user']['aliases'][0];

function getBillingCardToken(): CardTokenType {
  return {
    cardToken: '12345-XXXX',
  };
}

/** ############################################### */
/** 6. What does KEYOF mean in TypeScript */
type PersonKeyofExample = {
  name: string;
  age: number;
};

type PersonKeys = keyof PersonKeyofExample; // 'name' | 'age' | 'location'

function getPersonItem<TObj, TKey extends keyof TObj>(object: TObj, key: TKey) {
  return object[key];
}

const PExample: PersonKeyofExample = {
  name: 'John',
  age: 32,
};
// string
const item1 = getPersonItem(PExample, 'name');
// number
const item2 = getPersonItem(PExample, 'age');

/** ############################################### */
/** 7. Extract values of specific key */
type ExtractExample = {
  a: string;
  a1: number;
  b: boolean;
};

type ObjectOfKeysStartingWithA<
  TObj,
  ExtractedKeys extends keyof TObj = Extract<keyof TObj, `a${string}`>
> = {
  [K in ExtractedKeys]: TObj[K];
};

type ValuesOfKeysStartingWithA<
  TObj,
  ExtractedKeys extends keyof TObj = Extract<keyof TObj, `a${string}`>
> = {
  [K in ExtractedKeys]: TObj[K];
}[ExtractedKeys];

// string | number
type NewExtractedUnion = ValuesOfKeysStartingWithA<ExtractExample>;
// {a: string, a1: number}
type NewExtractedType = ObjectOfKeysStartingWithA<ExtractExample>;

/** ############################################### */
/** 8. Remove keys from object */

const makeKeyRemover =
  <TKey extends string>(keys: TKey[]) =>
  <TObj>(obj: TObj) => {
    return {} as Omit<TObj, TKey>;
  };

const keyRemover = makeKeyRemover(['a', 'b']);

const keyRemoveObject = keyRemover({ a: 1, b: 2, c: 3 });
// Now you only have keyRemoveObject.c

/** ############################################### */

/** 9. Deep partial of the object */

type DeepPartialExample = {
  a: string;
  b: {
    c: {
      d: string;
    };
    e: string;
    f: { name: string }[];
  };
};

interface DeepPartialArray<T> extends Array<DeepPartial<T>> {}

type DeepPartialObject<T> = {
  [TKey in keyof T]?: DeepPartial<T[TKey]>;
};

type DeepPartial<T> = T extends Function
  ? T
  : T extends Array<infer InferredArrayMember>
  ? DeepPartialArray<InferredArrayMember>
  : T extends object
  ? DeepPartialObject<T>
  : T | undefined;

const x: DeepPartial<DeepPartialExample> = {
  b: {
    c: {},
    f: [],
  },
};

/** ############################################### */

/** 10. TypeScript MAPPED Types */

type Point = {
  readonly x: number;
  y?: number;
};

// Implementation of mapped type
type MappedCustom<T> = {
  [TKey in keyof T]: T[TKey];
};

type MappedCustomReadonlyOptional<T> = {
  readonly [TKey in keyof T]?: T[TKey];
};

type MappedCustomOmitReadonlyOptional<T> = {
  -readonly [TKey in keyof T]-?: T[TKey];
};

type Result = MappedCustom<Point>;
type Result2 = MappedCustomReadonlyOptional<Point>;
type Result3 = MappedCustomOmitReadonlyOptional<Point>;

// Implementation of Readonly TS util type
type ReadonlyCustom<T extends {}> = {
  readonly [TKey in keyof T]: T[TKey];
};

const pointItem: ReadonlyCustom<Point> = {
  x: 2,
  y: 3,
};

const pointItemGenericReadonly: Readonly<Point> = {
  x: 2,
  y: 3,
};
// This will throw error
// pointItem.x = 3
