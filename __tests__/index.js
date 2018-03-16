import React from 'react'
import { mount } from 'enzyme'

import Adapter from 'enzyme-adapter-react-16'
import EnzymeToJSON from 'enzyme-to-json'

import ReactRough from '../src'

// Setup Enzyme Adapter
configure({ adapter: new Adapter() })

// describe('ReactRough', () => {
// test('renders correctly', () => {
// 	const component = mount(<ReactRough />)
// 	expect(EnzymeToJSON(component)).toMatchSnapshot()
// })
// })
