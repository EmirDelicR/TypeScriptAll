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
 * https://typescript-exercises.github.io/
 * https://github.com/MichiganTypeScript/type-testing/blob/main/src/IsTuple.test.ts
 * https://github.com/type-challenges/type-challenges/blob/main/README.md
 *
 *  */

/** ## Content ## **/

/*
1. Why enums are bad
2. TypeScript Template Literal Types
3. TypeScript Mapped Types as clauses
4. TypeScript satisfies operator 
5. Lookup Types
6. What does KEYOF mean in TypeScript (return proper type from function @ed important)
7. Extract values of specific key
8. Remove keys from object
9. Deep partial of the object
10. TypeScript MAPPED Types
11. extends in ts - constrains type
12. DeepReadonly
13. is in typescript 
14. Generic ReactJS Render Functions 
15. Force function to get proper parameters (@ed important) 
16. Preserving AutoComplete for Literal Unions
17. Create type assertion functions
18. Prettify for nested types
19. Derive a union type from an object
20. Use 'in' operator to transform a union to another union
*/

/* 1. Why enums are bad */
enum LoginMode {
  email,
  social,
}

/** To access keys the main problem will be */
const keys = Object.keys(LoginMode);
// [ '0', '1', 'email', 'social' ]

// Fix is to use type
type LoginModeType = "email" | "social";

// Other option is to use
const LoginModeConst = {
  email: "email",
  social: "social",
} as const;

// It will be same as LoginModeType
type LoginModeFromConstType = keyof typeof LoginModeConst;

/** ################################################################################################################################################################################################# */
/* 2. TypeScript Template Literal Types */
type CSSItem = "px" | "em" | "rem";
type CSSValue = `${number}${CSSItem}`;
const css: CSSValue = "20px";

type ButtonSize = "small" | "medium" | "large";
type ButtonType = "primary" | "secondary";
type ButtonStyle = `${ButtonSize}-${ButtonType}`;
const but: ButtonStyle = "large-primary";

/** ################################################################################################################################################################################################# */
/** 3. TypeScript Mapped Types as clauses */

type State = {
  name: string;
  age: number;
};

// Example of setter declaration
type SetProperty<K extends string> = `set${Capitalize<K>}`;
type ExampleName = SetProperty<"name">; // setName

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
personStore.setName("John");
const personName = personStore.getName();
const personAge = personStore.getAge();

/** ################################################################################################################################################################################################# */
/** 4. TypeScript satisfies operator  */

type ColorString = "red" | "blue";
type ColorRGB = [red: number, green: number, blue: number];
type Color = ColorString | ColorRGB;

type Theme = Record<string, Color>;

const theme = {
  primary: "red",
  secondary: [0, 255, 255],
  tertiary: "blue",
} satisfies Theme;

// If we do theme: Theme = g: string | number but with satisfies we get g: number
const [r, g, b] = theme.secondary;

/** ################################################################################################################################################################################################# */
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
    super: ["view", "create", "update", "delete"];
  };
};

type CardTokenType = Pick<ExampleLookup["user"]["billing"], "cardToken">;
type Billing = ExampleLookup["user"]["billing"]["card"];
type Alias = ExampleLookup["user"]["aliases"][0];
type AllBillings = keyof ExampleLookup["user"]["billing"];
type AllUserTypes = ExampleLookup[keyof ExampleLookup];
type AllUserTypesFromInner =
  ExampleLookup[keyof ExampleLookup][keyof ExampleLookup["user"]];
type AllUserSuperTypes = ExampleLookup["user"]["super"][number];
function getBillingCardToken(): CardTokenType {
  return {
    cardToken: "12345-XXXX",
  };
}

// Remove object prefix

type ApiData = {
  "maps:log": string;
  "maps:lat": string;
};

type RemoveMaps<T> = T extends `maps:${infer U}` ? U : T;

type RemoveMapsFromObject<TObj> = {
  [K in keyof TObj as RemoveMaps<K>]: TObj[K];
};

// now this will be type {log: string, lat: string}

type DesiredShape = RemoveMapsFromObject<ApiData>;

/** ################################################################################################################################################################################################# */
/** 6. What does KEYOF mean in TypeScript */
type PersonKeyofExample = {
  name: string;
  age: number;
};

type PersonKeys = keyof PersonKeyofExample; // 'name' | 'age' | 'location'

// @ed Important
function getPersonItem<TObj, TKey extends keyof TObj>(object: TObj, key: TKey) {
  return object[key];
}

// @ed Important - Pick have same implementation
type x = Pick<PersonKeyofExample, "age">;

const PExample: PersonKeyofExample = {
  name: "John",
  age: 32,
};

// String can be done in this way but other are more generic
type itemX = ReturnType<typeof getPersonItem<typeof PExample, "name">>;
// string
const item1 = getPersonItem(PExample, "name");
// number
const item2 = getPersonItem(PExample, "age");

/** Get deepValue of object */
const getDeepValue = <T, FKey extends keyof T, SKey extends keyof T[FKey]>(
  obj: T,
  firstKey: FKey,
  secondKey: SKey
) => {
  return obj[firstKey][secondKey];
};

const DeepReturnExample = {
  foo: {
    a: true,
    b: 2,
  },
  bar: {
    c: "cool",
    d: 2,
  },
};

const itemExample = getDeepValue(DeepReturnExample, "bar", "d");

/** ################################################################################################################################################################################################# */
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

/** ################################################################################################################################################################################################# */
/** 8. Remove keys from object */

const makeKeyRemover =
  <TKey extends string>(keys: TKey[]) =>
  <TObj>(obj: TObj) => {
    return {} as Omit<TObj, TKey>;
  };

const keyRemover = makeKeyRemover(["a", "b"]);

const keyRemoveObject = keyRemover({ a: 1, b: 2, c: 3 });
// Now you only have keyRemoveObject.c

/** ################################################################################################################################################################################################# */

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

/** ################################################################################################################################################################################################# */

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

/** ################################################################################################################################################################################################# */
/** 11. extends in ts  constrains type*/

type ResultInf = true extends boolean ? "true" : "false"; // Use extends to check if item is of specific type

// Example of extends
type TypeName<T> = T extends string
  ? "string"
  : T extends number
  ? "number"
  : T extends boolean
  ? "boolean"
  : T extends undefined
  ? "undefined"
  : T extends Function
  ? "function"
  : "object";

function getTypeName<T>(t: T): TypeName<T> {
  return typeof t as TypeName<T>;
}

const str = getTypeName("some_string");
const bol = getTypeName(true);

// This will return "hello__world--friend"
const stringUtil = "hello_world-friend".replace(
  /(_|-)/g,
  (item) => `${item}${item}`
);

/** ################################################################################################################################################################################################# */
/** 12. DeepReadonly */

type DeepReadonly<T> = {
  readonly [P in keyof T]: DeepReadonly<T[P]>;
};

const exampleDeepReadonly: DeepReadonly<{ a: { b: number } }> = {
  a: { b: 123 },
};
// This will throw error now NOTE: Readonly util goes only one level deep
// exampleDeepReadonly.a.b = 213

/** ################################################################################################################################################################################################# */
/** 13. is in typescript */

type Square = {
  type: "square";
  size: number;
};

type Rectangle = {
  type: "rectangle";
  height: number;
  width: number;
};

type Shape = Square | Rectangle;

const shape: Shape[] = [
  { type: "square", size: 2 },
  { type: "rectangle", height: 2, width: 2 },
];

// It will cast to proper type
const isSquare = (s: Shape): s is Square => s.type === "square";
const isRectangle = (s: Shape): s is Rectangle => s.type === "rectangle";

const square = shape.find(isSquare);
const size = square?.size;
const rectangle = shape.find(isRectangle);
const width = rectangle?.width;

/** ################################################################################################################################################################################################# */
/** 14. Generic ReactJS Render Functions */

// type DataGeneric = {name: string, location: string};
// function App() {
//   return (
//     <List<DataGeneric>
//       items={[{name: 'test', location: 'Austria'}]}
//       render={(item) => <strong>{item.name}</strong>}
//     />
//   )
// }

// type ListProps<T> = {
//   items: T[];
//   render: (item: T) => ReactNode;
// }

// function List<T>({items, render}: ListProps<T>) {
//   return (
//     {items.map(item) => render(item)}
//   )
// }

/** ################################################################################################################################################################################################# */
/** 15. Force function to get proper parameters */

// With out this we can pass accBalance as first arg to function
type AccountNumber = number & { _: "accNumber" };
type AccountBalance = number & { _: "accBalance" };

const makeAccNumber = (accNumber: number) => accNumber as AccountNumber;
const makeAccBalance = (accBalance: number) => accBalance as AccountBalance;

function setupAccount(accNumber: AccountNumber, accBalance: AccountBalance) {
  const doubleBalance = accBalance * 2;

  return {
    account: accNumber,
    balance: doubleBalance,
  };
}

const accNumber = makeAccNumber(1234);
const accBalance = makeAccBalance(100);

setupAccount(accNumber, accBalance);
// This will throw error
// setupAccount(accBalance, accNumber);

/** Dynamic function arguments with GENERICS */
type CustomEvent =
  | {
      type: "LOG_IN";
      payload: {
        userId: string;
      };
    }
  | {
      type: "SIGN_OUT";
    };

const sendEvent = <T extends CustomEvent["type"]>(
  ...args: Extract<CustomEvent, { type: T }> extends { payload: infer P }
    ? [type: T, payload: P]
    : [type: T]
) => {};

/** Correct */
sendEvent("SIGN_OUT");
sendEvent("LOG_IN", { userId: "123" });

/** Incorrect */
// sendEvent("SIGN_OUT", {});
// sendEvent("LOG_IN", { userId: 123 });
// sendEvent("LOG_IN");

/** ################################################################################################################################################################################################# */
/** 16. Preserving AutoComplete for Literal Unions */

// solution one
type Padding = "sm" | "md" | "lg" | (string & {});
// solution two
type LooseAutocomplete<T extends string> = T | Omit<string, T>;
type LoosePadding = LooseAutocomplete<"sm" | "md" | "lg">;

// Now we will have auto complete
const padding: Padding = "lg";
const padding2: Padding = "8px";
const padding3: LoosePadding = "md";
const padding4: LoosePadding = "8px";

/** ################################################################################################################################################################################################# */
/** 17. Create type assertion functions */

// Type assertion repo : https://github.com/MichiganTypeScript/type-testing/blob/main/src/IsTuple.test.ts

/**
 * returns `true` if the provided arguments resolve to the same TypeScript value.
 *
 * `Equal` is the cornerstone of TypeScript type testing.
 */
type Equal<A, B> = (<T>() => T extends A ? 1 : 2) extends <T>() => T extends B
  ? 1
  : 2
  ? true
  : false;

/**
 * errors at TypeScript compile-time if passed a value that is not `true`:
 *
 * the following will not error and will return `true`;
 *
 * ```ts
 * Expect<true>;
 * ```
 *
 * all other inputs will return `false`.
 *
 * all other inputs will error, except for `never`.
 */
type Expect<T extends true> = Equal<T, true>;

type Length<T extends readonly string[]> = T["length"];

const a = ["A", "B", "C"] as const;
const bx = ["A", "B"] as const;

type CasesLength = [
  Expect<Equal<Length<typeof a>, 3>>,
  Expect<Equal<Length<typeof bx>, 2>>
];

type First<T extends any[]> = T extends [] ? never : T[0];

type CasesFirst = [
  Expect<Equal<First<[3, 2, 1]>, 3>>,
  Expect<Equal<First<[() => 123, { a: string }]>, () => 123>>,
  Expect<Equal<First<[]>, never>>,
  Expect<Equal<First<[undefined]>, undefined>>
];

type ErrorsFirst = [
  // @ts-expect-error
  First<"noArray">,
  // @ts-expect-error
  First<{ 0: "arrayLike" }>
];

/** ################################################################################################################################################################################################# */
/** 18. Prettify for nested types */
type MainType = {
  name: string;
  age: number;
};

type NestedType = MainType & { isUser: boolean };

type Prettify<T> = {
  [K in keyof T]: T[K];
} & {};

// Now we can see all types
type Check = Prettify<NestedType>;

/** ################################################################################################################################################################################################# */
/** 19. Derive a union type from an object */
const fruitsCount = {
  apple: 1,
  banana: 6,
};

type FruitsCount = typeof fruitsCount;

type NewNestedFruitCount<TObj> = {
  [TKey in keyof TObj]: {
    [TKey in keyof TObj]: TObj[TKey];
  };
};

const nestedFruitCount: NewNestedFruitCount<FruitsCount> = {
  apple: {
    apple: 1,
    banana: 6,
  },
  banana: {
    apple: 1,
    banana: 6,
  },
};

/** This will omit keys and bring back to initial */
type NewXNestedFruitCount<TObj> = {
  [TKey in keyof TObj]: {
    [TKey in keyof TObj]: TObj[TKey];
  };
}[keyof TObj];

const nestedXFruitCount: NewXNestedFruitCount<FruitsCount> = {
  apple: 1,
  banana: 6,
};

type NewSingleFruitCount<TObj> = {
  [TKey in keyof TObj]: {
    [TKey2 in TKey]: number;
  };
}[keyof TObj];

const singleFruitCount: NewSingleFruitCount<FruitsCount> = {
  banana: 2,
};

type NewXSingleFruitCount<TObj> = {
  [TKey in keyof TObj]: {
    [TKey2 in TKey]: TObj[TKey];
  };
}[keyof TObj];

const singleXFruitCount: NewXSingleFruitCount<FruitsCount> = {
  banana: 2,
};

/** ################################################################################################################################################################################################# */

/** 20. Use 'in' operator to transform a union to another union */
type Entity =
  | {
      type: "user";
    }
  | {
      type: "admin";
    }
  | {
      type: "superAdmin";
    };

// Goal is to add id to this elements like userId, adminId, superAdminId

type EntityWithId = {
  [TEntityType in Entity["type"]]: {
    type: TEntityType;
  } & Record<`${TEntityType}Id`, string>;
}[Entity["type"]];

const entityWithId: EntityWithId = {
  type: "admin",
  adminId: "121",
};

/** ################################################################################################################################################################################################# */

/*** Exercises  */

/* Exercises 1

Intro:

    Filtering requirements have grown. We need to be
    able to filter any kind of Persons.

Exercise:

    Fix typing for the filterPersons so that it can filter users
    and return User[] when personType='user' and return Admin[]
    when personType='admin'. Also filterPersons should accept
    partial User/Admin type according to the personType.
    `criteria` argument should behave according to the
    `personType` argument value. `type` field is not allowed in
    the `criteria` field.

Higher difficulty bonus exercise:

    Implement a function `getObjectKeys()` which returns more
    convenient result for any argument given, so that you don't
    need to cast it.

    let criteriaKeys = Object.keys(criteria) as (keyof User)[];
    -->
    let criteriaKeys = getObjectKeys(criteria);

*/

interface User {
  type: "user";
  name: string;
  age: number;
  occupation: string;
}

interface Admin {
  type: "admin";
  name: string;
  age: number;
  role: string;
}

export type Person = User | Admin;

export const persons: Person[] = [
  {
    type: "user",
    name: "Max Mustermann",
    age: 25,
    occupation: "Chimney sweep",
  },
  { type: "admin", name: "Jane Doe", age: 32, role: "Administrator" },
  { type: "user", name: "Kate Müller", age: 23, occupation: "Astronaut" },
  { type: "admin", name: "Bruce Willis", age: 64, role: "World saver" },
  { type: "user", name: "Wilson", age: 23, occupation: "Ball" },
  { type: "admin", name: "Agent Smith", age: 23, role: "Anti-virus engineer" },
];

export function logPerson(person: Person) {
  console.log(
    ` - ${person.name}, ${person.age}, ${
      person.type === "admin" ? person.role : person.occupation
    }`
  );
}

type Criteria<T> = Partial<Omit<T, "type">>;

export function getObjectKeys<T>(criteria: Criteria<T>) {
  return Object.keys(criteria) as (keyof Criteria<T>)[];
}

export function filterPersons(
  persons: Person[],
  personType: User["type"],
  criteria: Criteria<User>
): User[];
export function filterPersons(
  persons: Person[],
  personType: Admin["type"],
  criteria: Criteria<Admin>
): Admin[];
export function filterPersons(
  persons: Person[],
  personType: string,
  criteria: Criteria<Person>
): Person[] {
  return persons
    .filter((person) => person.type === personType)
    .filter((person) => {
      let criteriaKeys = getObjectKeys(criteria);
      return criteriaKeys.every((fieldName) => {
        return person[fieldName] === criteria[fieldName];
      });
    });
}

export const usersOfAge23 = filterPersons(persons, "user", { age: 23 });
export const adminsOfAge23 = filterPersons(persons, "admin", { age: 23 });

console.log("Users of age 23:");
usersOfAge23.forEach(logPerson);

console.log();

console.log("Admins of age 23:");
adminsOfAge23.forEach(logPerson);

// In case you are stuck:
// https://www.typescriptlang.org/docs/handbook/2/functions.html#function-overloads
