Root::
├─build
├─config
├─dist
├─static
├─test
├─src
│  ├─assets
│  ├─components
│  │  ├─mixin
│  │  ├─partial
│  │  │  ├─modal
│  │  │  └─plugin
│  │  └─pages
│  │       ├─member
│  │       ├─register
│  │       └─.....(etc)
│  ├─lib
│  │  ├─lang
│  │  │   ├─en
│  │  │   ├─ja
│  │  │   ├─ch
│  │  │   └─.....(etc)
│  │  │─functions
│  │  └─definition
│  ├─router
│  ├─setup
│  └─store




/example
　├ webpack.config.js
　├ dist
　│ ├ app.js
　│ └ index.html
　└ src
　　└ assets
　　　├ script
　　　│ ├ app.js
　　　│ └ App.vue
　　　└ style
　　　  ├ global.scss
　　　  ├ _mixins.scss
　　　  └ _variables.scss




インストールするもの
npm install sass-loader node-sass --save-dev