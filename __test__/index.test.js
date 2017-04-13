import React from 'react';
import { render } from 'enzyme';

import {
  Arc,
  Circle,
  Curve,
  Ellipse,
  Line,
  Path,
  Polygon,
  Rectangle,
  ReactRough
} from '../src';

/* Global => expect */
const options = {
  arc: {
    data: [200, 100, 200, 180, -Math.PI + (Math.PI / 3), -Math.PI / 2, true]
  },
  rectangle: {
    fill: 'red',
    data: [10, 10, 200, 200]
  },
  circle: {
    data: [80, 120, 50] // centerX, centerY, radius
  },
  curve: {
    data: [[10, 10], [150, 65], [180, 165], [300, 20], [400, 200]]
  },
  ellipse: {
    data: [300, 100, 150, 80] // centerX, centerY, radiusX, radiusY
  },
  line: {
    data: [80, 120, 300, 100] // x1, y1, x2, y2
  },
  path: {
    data: 'M213.1,6.7c-32.4-14.4-73.7,0-88.1,30.6C110.6,4.9,67.5-9.5,36.9,6.7C2.8,22.9-13.4,62.4,13.5,110.9 C33.3,145.1,67.5,170.3,125,217c59.3-46.7,93.5-71.9,111.5-106.1C263.4,64.2,247.2,22.9,213.1,6.7z'
  }
};

const increaseWidth = rect => {
  if (rect.width < 200) {
    rect.width = rect.width + 10;
    setTimeout(() => increaseWidth(rect), 100);
  }
};

it ('renders ReactRough with nested Components', () => {
  const wrapper = render(
    <ReactRough width={800} height={700} >
      <Arc options={options.arc}/>
      <Rectangle options={options.rectangle}/>
    </ReactRough>
  );

  expect(wrapper).toMatchSnapshot();
});

it ('renders Arc correctly', () => {
  const wrapper = render(
    <Arc width={120} height={120} options={options.arc}/>
  );
  expect(wrapper).toMatchSnapshot();
});

it ('renders Circle correctly', () => {
  const wrapper = render(
    <Circle width={120} height={120} options={options.circle}/>
  );

  expect(wrapper).toMatchSnapshot();
});

it ('renders Curve correctly', () => {
  const wrapper = render(
    <Curve width={120} height={120} options={options.curve}/>
  );

  expect(wrapper).toMatchSnapshot();
});

it ('renders Ellipse correctly', () => {
  const wrapper = render(
    <Ellipse width={120} height={120} options={options.ellipse}/>
  );

  expect(wrapper).toMatchSnapshot();
});

it ('renders Line correctly', () => {
  const wrapper = render(
    <Line width={120} height={120} options={options.line}/>
  );

  expect(wrapper).toMatchSnapshot();
});

it ('renders Path correctly', () => {
  const wrapper = render(
    <Path width={120} height={120} options={options.path}/>
  );

  expect(wrapper).toMatchSnapshot();
});

it ('renders Polygon correctly', () => {
  const wrapper = render(
    <Polygon width={120} height={120} options={options.rectangle}/>
  );

  expect(wrapper).toMatchSnapshot();
});

it ('renders Rectangle correctly', () => {
  const wrapper = render(
    <Rectangle width={120} height={120} options={options.rectangle}/>
  );

  expect(wrapper).toMatchSnapshot();
});

it ('renders Rectangle with the onRender Hook correctly', () => {
  const wrapper = render(
    <Rectangle
      width={120}
      height={120}
      options={options.rectangle}
      onRender={increaseWidth}
    />
  );

  expect(wrapper).toMatchSnapshot();
});
