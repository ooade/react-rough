<p align="center">
  <img src="https://raw.githubusercontent.com/ooade/react-rough/6a550a44fd92b34102ff74dad0703fb3c7418dcb/logo.png" height="150" />
  <h3 align="center">React Bindings for <a href="https://github.com/pshihn/rough">Rough.js</a></h3>
  <p align="center">
  <a href="https://www.npmjs.org/package/react-rough"><img src="https://img.shields.io/npm/v/react-rough.svg?style=flat" alt="npm"></a>
  <a href="https://travis-ci.org/ooade/react-rough"><img src="https://travis-ci.org/ooade/react-rough.svg?branch=master" alt="travis"></a>
  <a href="https://github.com/ooade/react-rough"><img src="https://img.shields.io/codecov/c/github/ooade/react-rough.svg?style=flat-square" alt="code coverage"></a>
  <a href="https://snyk.io/test/github/ooade/react-rough"><img src="https://snyk.io/test/github/ooade/react-rough/badge.svg" alt="Known Vulnerabilities" data-canonical-src="https://snyk.io/test/github/ooade/react-rough" style="max-width:100%;"></a>
  <a href="http://makeapullrequest.com"><img src="https://img.shields.io/badge/PR(s)-welcome-brightgreen.svg?style=flat" alt="pullrequest"></a>
  <a href="http://www.firsttimersonly.com"><img src="https://img.shields.io/badge/first--timers--only-friendly-blue.svg" alt="firsttimersonly"></a>
  </p>
</p>

## Installation

```sh
- npm add react-rough
- npm add roughjs
```

`Note: The documentation is for the beta release. For the stable release check out the [master branch](https://github.com/ooade/react-rough/tree/master)`

### Render a Rectangle

```js
import ReactRough, { Rectangle } from 'react-rough';

render(
	<ReactRough width={220} height={220}>
		<Rectangle points={[10, 10, 200, 200]} fill="red" fillWeight={3} />
	</ReactRough>
);
```

`Note: All shapes must be nested within a ReactRough Component, it could have other surrounding elements, but it's GrandParent must be a ReactRough Component`

When you grab a shape from ReactRough, it renders each shape to a canvas element. So how can we render different shapes on a single canvas element? We'll answer that below.

### Render multiple shapes on one canvas element

```js
import { ReactRough, Rectangle, Circle } from 'react-rough';

render(
	<ReactRough width={200} height={400}>
		<Circle points={[50, 50, 80]} fill="red" />
		<Polygon
			points={[[[690, 130], [790, 140], [750, 240], [690, 220]]]}
			fill="blue"
			stroke="green"
		/>
	</ReactRough>
);
```

## Examples

- [CodeSandBox](https://codesandbox.io/s/r582mor7wq)
- [ReactRough animated logo](https://jsfiddle.net/ooade/f8cmbfwL/)
- Add yours...

## License

MIT
