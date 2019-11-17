import { configure, setAddon, addDecorator } from '@storybook/react';
import { jsxDecorator } from 'storybook-addon-jsx';
import { withKnobs } from '@storybook/addon-knobs/react';

addDecorator(jsxDecorator);
addDecorator(withKnobs);

const req = require.context('../src', true, /\.stories\.tsx?$/);

const loadStories = () => {
	req.keys().forEach(file => req(file));
};

configure(loadStories, module);
