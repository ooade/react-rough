import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';

import {
  Arc,
  Circle,
  Curve,
  Ellipse,
  Line,
  Path,
  Polygon,
  Rectangle
} from '../src';

/* Global => expect */
const options = {
  fill: '#3ef6ad',
  data: [200, 100, 200, 180, -Math.PI + (Math.PI / 3), -Math.PI / 2, true]
};

it ('renders Arc correctly', () => {
  const wrapper = shallow(
    <Arc width={120} height={120} options={options}/>
  );
  console.log(toJSON(wrapper));
  expect(toJSON(wrapper)).toMatchSnapshot();
});

it ('renders Circle correctly', () => {
  const wrapper = shallow(
    <Circle width={120} height={120} options={options}/>
  );

  expect(wrapper).toMatchSnapshot();
});

it ('renders Curve correctly', () => {
  const wrapper = shallow(
    <Curve width={120} height={120} options={options}/>
  );

  expect(wrapper).toMatchSnapshot();
});

it ('renders Ellipse correctly', () => {
  const wrapper = shallow(
    <Ellipse width={120} height={120} options={options}/>
  );

  expect(wrapper).toMatchSnapshot();
});

it ('renders Line correctly', () => {
  const wrapper = shallow(
    <Line width={120} height={120} options={options}/>
  );

  expect(wrapper).toMatchSnapshot();
});

it ('renders Path correctly', () => {
  const wrapper = shallow(
    <Path width={120} height={120} options={options}/>
  );

  expect(wrapper).toMatchSnapshot();
});

it ('renders Polygon correctly', () => {
  const wrapper = shallow(
    <Polygon width={120} height={120} options={options}/>
  );

  expect(wrapper).toMatchSnapshot();
});

it ('renders Rectangle correctly', () => {
  const wrapper = shallow(
    <Rectangle width={120} height={120} options={options}/>
  );

  expect(wrapper).toMatchSnapshot();
});
