<p align="center">
  <img src="https://github.com/ooade/react-rough/raw/master/logo.png" height="150" />
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

## Usage

Grab the Shape to be rendered from ReactRough, pass some options to it, pass an optional [onRender](https://github.com/ooade/react-rough/blob/master/src/index.js#L17) hook to spin up some animation logic or so.

**Latest Release (next):** Check [this](https://github.com/ooade/react-rough/releases/tag/v1.0.0-alpha.1) guide which uses a very simple render prop approach.

### Render a Rectangle

```js
import { Rectangle } from 'react-rough';

const options = {
	data: [10, 10, 200, 200], // x, y, width, height
	fill: 'red',
	fillWeight: 3
};

render(<Rectangle width={220} height={220} options={options} />);
```

When you grab a shape from ReactRough, it renders each shape to a canvas element. So how can we render different shapes on a single canvas element? We'll answer that below.

### Render shapes on one canvas element

```js
import { ReactRough, Rectangle, Circle } from 'react-rough';

render(
	<ReactRough width={500} height={500}>
		<Rectangle
			options={{
				data: [10, 10, 200, 200], // x, y, width, height
				fill: 'red',
				fillWeight: 3
			}}
		/>
		<Circle
			options={{
				data: [80, 120, 50], // centerX, centerY, radius
				fill: 'blue'
			}}
		/>
	</ReactRough>
);
```

### onRender hook

We can have the hook on a shape element, ReactRough element or both. Here's an example on a shape element.

```js
const increaseWidth = rect => {
	if (rect.width < 200) {
		rect.width = rect.width + 10;
		setTimeout(() => increaseWidth(rect), 100);
	}
};

const options = {
	data: [10, 10, 20, 100],
	fill: 'red',
	hachureGap: 8
};

render(
	<Rectangle
		width={220}
		height={220}
		options={options}
		onRender={increaseWidth}
	/>
);
```

This increases the rectangle's width from 20px to 200px. Wanna see it in action on a ReactRough component? Check out our ReactRough animated logo example.

## Examples

- [ReactRough animated logo](https://jsfiddle.net/ooade/f8cmbfwL/)
- Add yours...

## License

MIT
