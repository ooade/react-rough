import React from 'react';
import { render } from '@testing-library/react';

import ReactRough from '../src';

it('should render Rough Component properly', () => {
	const { container } = render(<ReactRough></ReactRough>);
	expect(container).toMatchSnapshot();
});
