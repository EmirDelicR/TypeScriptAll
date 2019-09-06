# TypeScriptAll

## content

[Intro](#intro) <br/>
[Types](#types) <br/>
[Compiler](#compiler) <br/>
[TS with ES6](#es6) <br/>
[Classes](#classes) <br/>
[Namespaces and modules](#namespaces) <br/>
[Interfaces](#interfaces) <br/>
[Generic](#generic) <br/>

## intro

[Official page](https://www.typescriptlang.org/docs/home.html)

VS code Addon : TypeScript Extension Pack

```console
# install
sudo npm -g install typescript

# check version
tsc -v

# compile to js
tsc script.ts (file name)

# compile to js ES6
tsc script.ts --target es6

# make tsconfig.json file
tsc --init

# to compile now use only
tsc

# to compile with watcher
tsc -w
```

### Setup small server

```console
npm init
npm install lite-server --save-dev
```

```javascript
/** In package.json */
"scripts": {
    "start": "lite-server"
},
```

[TOP](#content)

## types

Check the 1-Types folder

[TOP](#content)

## compiler

NOTE! -> set "strictNullChecks": true

[Documentation](http://www.typescriptlang.org/docs/handbook/tsconfig-json.html)

[Compiler options](http://www.typescriptlang.org/docs/handbook/compiler-options.html)

[TOP](#content)

## es6

[Support table](http://kangax.github.io/compat-table/es6/)

```javascript
/* Name is just to show how to pass more args */
const makeArray = (name: string, ...args: number[]) => {
  return args;
};
makeArray("Test", 1, 2, 3);
// Output [1, 2, 3]

/** Passing default value */

const testing = (name: string = "Max"): void => {
  console.log(name);
};
```

[TOP](#content)

## classes

Look at file _2-Classes_

[TOP](#content)

## namespaces

**_ Namespaces _**

```javascript
namespace MyMath {
  const PI = 3.14;

  export const calculateCircum = (diameter: number): number => {
    return diameter * PI;
  };
}

MyMath.calculateRectangle(10, 20)

// TO import use :
/// <reference path="./circleMath.ts" />
/// <reference path="./rectangleMath.ts" />
```

NOTE! Use modules instead of namespaces

**_ Modules _**

```console
npm install --save systemjs@0.21.5
```

```javascript
// in index.html
<script src="node_modules/systemjs/dist/system.js"></script>
<script>
    SystemJS.config({
        baseURL: "/js",
        // defaultJSExtension: true,
        packages: {
          "/": {
            defaultExtension: "js"
          }
        }
    });
    SystemJS.import("script.js");
</script>

// Now can use:
export { calculateRectangle };
import { calculateRectangle } from "./Math/rectangle";
```

[TOP](#content)

## interfaces

Look file _5-Interfaces_

[TOP](#content)

## generic

To use generic add Type of T like

```javascript
const echo = <T>(data: T): T => {
  return data;
};
```

Look file _5-Generic_

[TOP](#content)
