# vue-inline-devtools

> This package provides a browser-side devtools client. It can be used to debug Vue applications inside of same-domain iframes. It also works in any browser-like environment (Chrome, Safari, Firefox, and Edge)

### :cd: Installation

Install the package globally:
```bash
npm i vue-inline-devtools -D
```

### :rocket: Usage

#### Using global package

Once you installed the package, you can import it in your application and bind it where you'd like the devtools to render:
```js
import { inlineDevtools } from 'vue-inline-devtools'

// talk to a Vue app rendered inside of a same-domain iframe
inlineDevtools('#container', document.getElementsByTagName('iframe')[0])
```

This will only work on `development` build of your app.

### :beers: Development

1. Install all dependencies
```
yarn
```

2. Run:
```
yarn build
```
This will watch `src` folder and compile files on change

3. Demo:
```
cd example
yarn install
yarn watch
```

### :lock: License

[MIT](http://opensource.org/licenses/MIT)
