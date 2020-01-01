# TypeScriptAll

## content

[Intro](#intro) <br/>
[Types](#types) <br/>
[Compiler](#compiler) <br/>
[TS with ES6](#es6) <br/>
[Classes](#classes) <br/>
[Namespaces and modules](#namespaces) <br/>
[Interfaces](#interfaces) <br/>
[Advance Types](#advancetypes) <br/>
[Generic](#generic) <br/>
[Decorators](#decorators) <br/>
[Library](#library) <br/>
[Workflow (Gulp/Webpack/Libraries)](#workflow) <br/>
[TS with React](#react)<br/>
[TS with Vue](#vue)<br/>
[TS with NODE](#node)<br/>>
[Projects](#projects)<br/>

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

[Documentation](http://www.typescriptlang.org/docs/handbook/tsconfig-json.html)

[Compiler options](http://www.typescriptlang.org/docs/handbook/compiler-options.html)

```console
# check version
tsc -v

# compile to js
tsc script.ts (file name)

# compile to js ES6
tsc script.ts --target es6

# make tsconfig.json file
tsc --init

# to compile now use only this need  (tsc --init command)
tsc

# to compile with watcher
tsc -w
```

in tsconfig.json file

```javascript
{
  "compilerOptions": { /** */ },
  "exclude": ["paths_to_file_to_exclude_from_compiling", "**/*.dev.ts", "node_modules"],
  "include": ["same as above"],

}

// **/*.dev.ts -> any file with ext .dev.ts in any folder

```

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

[More on (JS) Classes](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes)

[More on TS Interfaces](https://www.typescriptlang.org/docs/handbook/interfaces.html)

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

[JavaScript Modules (Overview)](https://medium.com/computed-comparisons/commonjs-vs-amd-vs-requirejs-vs-es6-modules-2e814b114a0b)

[More on ES Modules:](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules)

```javascript
export interface Draggable {
  dragStartHandler(event: DragEvent): void;
  dragEndHandler(event: DragEvent): void;
}

export interface DragTarget {
  dragOverHandler(event: DragEvent): void;
  dropHandler(event: DragEvent): void;
  dragLeaveHandler(event: DragEvent): void;
}

// in file just import but as .js file
import { Draggable } from "../interfaces/drag-drop.js";

// in index.html file where import script set type="module"
<script src="js/script.js" type="module"></script>;
// in tsconfig.json
"target": "es6"
"module": "es2015"
```

This is old way

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

[More on TS Interfaces](https://www.typescriptlang.org/docs/handbook/interfaces.html)

Look file _5-Interfaces_

[TOP](#content)

## advancetypes

[More on Advanced Types](https://www.typescriptlang.org/docs/handbook/advanced-types.html)

Look file _12-AdvanceTypes_

[TOP](#content)

## generic

[More on Generics](https://www.typescriptlang.org/docs/handbook/generics.html)

To use generic add Type of T like

```javascript
const echo = <T>(data: T): T => {
  return data;
};
```

Look file _5-Generic_

[TOP](#content)

## decorators

[More on Decorators](https://www.typescriptlang.org/docs/handbook/decorators.html)

In tsconfig.json

```javascript
"experimentalDecorators": true
```

```javascript
/**
 * Decorator is simple function that can be attached to something
 *
 */
const logged = (constructorFn: Function) => {
  console.log(constructorFn);
};

/** Decorator attached to class */
@logged
class Person {
  constructor() {
    console.log("HI");
  }
}
```

Look file _6-Decorators_

[TOP](#content)

## library

```javascript
npm install @types/nameOfLibrary --save-dev
```

[TOP](#content)

## workflow

_Gulp_

[Gulp typescript](https://www.npmjs.com/package/gulp-typescript)

```console
npm install --save-dev gulp gulp-typescript typescript
```

```javascript
// Create an file gulpfile.js
let gulp = require("gulp");
let ts = require("gulp-typescript");

let tsProject = ts.createProject("tsconfig.json");

gulp.task("typescript", () =>
  tsProject
    .src()
    .pipe(tsProject()))
    .pipe(gulp.dest("./js"))
);

// Create an watcher (replace tsc -w)
gulp.task("watch", () => {
  gulp.watch("*.ts", gulp.series("typescript"));
});

gulp.task("default", gulp.series("watch"));

// In package.json add
"scripts": {
  "build": "gulp"
},

```

```console
npm run build
```

_Webpack_

[Official Webpack Docs:](https://webpack.js.org/)

```console
npm install webpack webpack-cli webpack-dev-server typescript ts-loader --save-dev
```

```javascript
// in tsconfig.json file
"target": "es6",
"module": "es2015"

// create webpack.config.js file
const path = require("path");

module.exports = {
  mode: "development",
  entry: "./script.ts",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "js"),
    publicPath: "js"
  },
  devtool: "inline-source-map",
  resolve: {
    extensions: [".ts", ".js"]
  },
  module: {
    rules: [{ test: /\.ts$/, use: "ts-loader", exclude: /node_modules/ }]
  }
};


// Add this to package.json
"scripts": {
  "build": "webpack -d --watch",
  "build:prod": "webpack -p",
  // OR
  "build:prod": "webpack --config webpack.config.prod.js",

  "start": "webpack-dev-server",
},
```

```console
npm run build
```

Clean up webpack package see webpack.config.prod.js file

```console
npm i --save-dev clean-webpack-plugin
```

_3rd Party Libraries_

[class-transformer](https://github.com/typestack/class-transformer)

[class-validator](https://github.com/typestack/class-validator)

```console
npm i --save lodash
npm i --save-dev @types/lodash
```

```javascript
import _ from "lodash";

console.log(_.shuffle([1, 2, 3, 4]));
```

if @types/library does not exists

```javascript
// but avoid to use this
declare var GLOBAL: any;
```

[TOP](#content)

## react

[React docks](https://reactjs.org/docs/create-a-new-react-app.html)

[create-react-app](https://github.com/facebook/create-react-app)

```console
sudo npm install -g create-react-app
```

Create react app with typescript

```console
create-react-app my-app --typescript
```

[TOP](#content)

## vue

Instal vue-cli

```console
npm install --global @vue/cli
```

Create vue app

```console
vue create my-project-name
```

Choose manually options and pick Typescript and that is all

[TOP](#content)

## node

```console
npm init
tsc --init

npm i --save express body-parser
npm i --save-dev nodemon @types/node @types/express

tsc -w
npm start
```

in tsconfig.js file

```javascript
"target": "es2018"
"module": "commonjs"
"moduleResolution": "Node",
```

[TOP](#content)

## projects

#### TS Calculator

Calculator using TypeScript, gulp, sass

Setup

```console
npm init -y
```

Instal gulp-cli

```console
sudo npm install -g gulp-cli

# Instal typeScript and dependency for gulp

npm install --save-dev typescript gulp gulp-typescript gulp-sourcemaps gulp-sass browser-sync

# Create TypeScript tsconfig.json file

tsc --init
```

```javascript
/* package.json */

"scripts": {
  "start": "gulp"
},
  "devDependencies": {
  "browser-sync": "^2.23.6",
  "gulp": "^3.9.1",
  "gulp-sass": "^3.1.0",
  "gulp-sourcemaps": "^2.6.4",
  "gulp-typescript": "^4.0.1",
  "typescript": "^2.7.2"
},
```

Look gulpfile.js setup

```console
npm run start
```

[TOP](#content)
