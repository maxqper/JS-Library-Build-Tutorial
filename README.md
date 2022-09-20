# Experiments with JS Modules and Webpack

## Code

### Modules

#### ModuleOne

* ModuleOne has one ClassOne with MethodOne.
* (compilation) ModuleOne is written in ES6 and transpiled to js with babel.
* (bundling) ModuleOne is packaged as an UMD (universal module) with webpack.

Use below commmand in `module-one` folder to build ModuleOne.
```
npm run build
```

#### ModuleTwo

* ModuleTwo has one ClassTwo with MethodTwo.
* ModuleTwo uses ES6 import/export to use ClassOne in ModuleOne. (But ModuleOne is **only a dev dependency** for ModuleTwo).
* (compilation) ModuleTwo is written in ES6 and transpiled to js with babel.
* (bundling) Module is packaged as an UMD (universal module) with webpack.

Use below commmand in `module-two` folder to build ModuleOne.
```
npm run build
```

### Apps

#### NodeApp

* NodeApp uses npm to install both ModuleOne and ModuleTwo dependencies statically.
* NodeApp accesses ClassOne and ClassTwo from ModuleOne and ModuleTwo using ES6 import/export.
* (compilation) NodeApp is written in ES6 and transpiled to js with babel.

Use below commmand in `app-node` folder to build and run NodeApp.
```
npm start
```

#### BrowserApp

* BrowserApp uses script tags to download both ModuleOne and ModuleTwo dependencies dynamically.
* BrowserApp accesses ClassOne and ClassTwo from ModuleOne and ModuleTwo using namespaced global variables.
* NOTE that ModuleTwo was writter to access ClassOne from ModuleOne using ES6 import/export.
* (compilation) BrowserApp is written in ES6 and transpiled to js with babel.
* (loading) BrwoserApp uses script tags to download its own index.js dynamically.

Use below commmand in `app-browser` folder to build and run BrowserApp.
```
npm start
```

## Questions

* What is the output of webpack for module-one and module-two?

Webpack config has libraryTarget set to UMD (Universal Module Definition). This generates a bundle that can be installed and used with ES6 import/export OR downloaded with script tag to be used with a namespaced global variable. Essentially, there is a wrapper script in the generated bundle file that detects the environment and exposes the bundle accordingly.

* How is the ES6 'import ClassOne from ModuleOne' inside ModuleTwo executed correctly when ModuleOne is loaded as a browser script with global variable webpackModuleOne? (i.e., we expect to use module one as 'new webpackModuleOne.ClassOne()' whereas ModuleTwo has code 'import ClassOne from ModuleOne')?

This depends on how the "externals" config is set in ModuleTwo. Externals config determines (1) if any dependencies of ModuleOne are excluded from its final bundle and (2) if excluded, how they are expected to be included later at runtime.

* Option 1: NO Externals Config

With this option, ModuleTwo **includes** Module One classes by default (and does not exclude anything) in its final generated webpack bundle. So, Module Two will NOT be dependent on the app's node installed or browser downloaded ModuleOne. Look at Experiment 1 to understand this better.

* Option 2: Externals Config to exclude ModuleOne from ModuleTwo

With this option, there is an externals config in the `webpack.config.babel.js` which explicitly excludes ModuleOne from being included in the final generate webpack bundle for ModuleTwo. Further, the config also specifies the root or global variable to use when in browser environment and the AMD module name to use when in node environment to find the excluded module and map it to the 'import ClassOne from ModuleOne' statements.

## Experiments

### Experiment 1 - Module Two with NO Externals Config
* [Step 1] Comment out the externals config completely from `webpack.config.babel.js` in module-two. This indicates to webpack that all dependent modules (including Module One) should be included in the final `dist/webpack-module-two.js`.
* [Step 2] Build module two so it includes current definition of module one.
* [Step 3] Add 'console.log("updated method one")' to change method one in class one in module one.
* [Step 4] Build module one.
* [Step 5] Now run app-node or app-browser. 

You'll notice that the direct method call to ModuleOne::ClassOne::MethodOne has the updated console.log() statement BUT the ModuleTwo::ClassTwo::MethodTwo which internall calls ModuleOne::ClassOne::MethodOne does not as it still includes the older ModuleOne definition.

### Experiment 2 - Module Two with External Config for Module One as UMD

* [Step 1] Uncomment the externals config completely from `webpack.config.babel.js` in module-two. This indicates to webpack that the dependent modules ModuleOne should be excluded in the final `dist/webpack-module-two.js`.
* [Step 2] Build module two so it excludes current definition of module one.
* [Step 3] Add 'console.log("updated method one")' to change method one in class one in module one.
* [Step 4] Build module one.
* [Step 5] Now run app-node or app-browser. 

You'll notice that the direct method call to ModuleOne::ClassOne::MethodOne has the updated log statement AND the ModuleTwo::ClassTwo::MethodTwo which internall calls ModuleOne::ClassOne::MethodOne also has the log statement. This is because ModuleOne is being dynamically mapped at runtime as a dependency for Module Two.





