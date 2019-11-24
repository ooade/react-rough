import React from 'react';
import ReactRough from '../src';

it('should render Rough Component properly', () => {
	expect(<ReactRough></ReactRough>).toMatchSnapshot();
});
