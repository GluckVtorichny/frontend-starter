# Frontend Starter

Frontend default project structure. Start new frontend project without any pain.

## Structure

```
+-- src
|   +-- css //Source SCSS files
|   |   +-- base //Global code
|   |   |   +-- _global.scss //Global styles goes here
|   |   |   +-- _variables.scss //Global variables goes here
|   |   +-- components //Components' styles
|   |   |   +-- _footer.scss //Footer styles
|   |   |   +-- _header.scss //Header styles
|   |   +-- layouts //Layouts (pages)
|   |   |   +-- _index.scss //Index page styles
|   |   +-- app.scss //Main SCSS file
|   +-- fonts //Fonts goes here
|   +-- html //Source HTML files
|   |   +-- components //Components' html code
|   |   |   +-- footer.html //Footer html code
|   |   |   +-- header.html //Header html code
|   |   |   +-- meta.html //Some header meta
|   |   +-- index.html //Index page html
|   +-- images //Images goes here
|   +-- js //Scripts goes here
|   |   +-- components //Components' js code
|   |   +-- vendor //Third party libraries
|   |   |   +-- bundle.js //Bundled third party libraries
|   |   +-- common.js //Common javascript code
|   |   +-- index.js //Index page js
+-- bower.json //Bower file
+-- gulpfile.js //Gulpfile
+-- package.json //NPM file 
+-- README.md //Readme file
```

## Quick tutorial

Download the repository and unpack it into a folder.

Then execute three commands:

```
npm install
```

```
bower install
```

```
gulp
```

Remember: you should have npm, bower and gulp installed.