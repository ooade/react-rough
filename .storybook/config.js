import { configure, addDecorator } from '@storybook/react';
import { jsxDecorator } from 'storybook-addon-jsx';
import { withKnobs } from '@storybook/addon-knobs/react';
import { withInfo } from '@storybook/addon-info';

addDecorator(jsxDecorator);
addDecorator(withKnobs);
addDecorator(withInfo);

const req = require.context('../src', true, /\.stories\.tsx?$/);

const loadStories = () => {
	req.keys().forEach(file => req(file));
};

configure(loadStories, module);
