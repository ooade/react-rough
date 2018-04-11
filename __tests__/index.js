import React from 'react'
import { mount } from 'enzyme'

import ReactRough from '../src'

describe('ReactRough', () => {
	test('renders correctly', () => {
		const component = mount(<ReactRough />)
		expect(component).toMatchSnapshot()
	})
})
