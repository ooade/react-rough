<p align="center">
  <img src="https://raw.githubusercontent.com/ooade/react-rough/6a550a44fd92b34102ff74dad0703fb3c7418dcb/logo.png" height="150" />
  <h3 align="center">React Bindings for <a href="https://github.com/pshihn/rough">Rough.js</a></h3>
  <p align="center">
  <a href="https://app.netlify.com/sites/react-rough/deploys"><img src="https://api.netlify.com/api/v1/badges/7d704f8b-50ef-41d8-862e-aad4b811e809/deploy-status" alt="Netlify Status"></a>
  <a href="https://www.npmjs.org/package/react-rough"><img src="https://img.shields.io/npm/v/react-rough.svg?style=flat-square" alt="npm"></a>
  <a href="https://github.com/ooade/react-rough"><img src="https://img.shields.io/npm/dm/react-rough.svg?style=flat-square" alt="downloads/month"></a>
  <a href="https://snyk.io/test/github/ooade/react-rough"><img src="https://snyk.io/test/github/ooade/react-rough/badge.svg?style=flat-square" alt="Known Vulnerabilities" data-canonical-src="https://snyk.io/test/github/ooade/react-rough" style="max-width:100%;"></a>
  <a href="http://makeapullrequest.com"><img src="https://img.shields.io/badge/PR(s)-welcome-brightgreen.svg?style=flat-square" alt="pullrequest"></a>
  <a href="http://www.firsttimersonly.com"><img src="https://img.shields.io/badge/first--timers--only-friendly-blue.svg?style=flat-square" alt="firsttimersonly"></a>
  </p>
</p>

## Installation

#### npm

```sh
npm install react-rough roughjs
```

or

#### yarn

```sh
yarn add react-rough roughjs
```

### Render a Rectangle on a canvas element

```js
import ReactRough, { Rectangle } from 'react-rough';

render(
	<ReactRough>
		<Rectangle x={15} y={15} width={90} height={80} fill="red" />
	</ReactRough>
);
```

## Learn More

To learn more, go through our [StoryBook](https://react-rough.dev.adegbuyi.me).

Visit the [Website](https://react-rough.dev.adegbuyi.me)
![Storybook Preview](./assets/storybook.png)

## License

MIT
