/**
 * React Rough - Binds React with Rough.js
 * A RR Component takes in:
 * - width <Number>
 * - height <Number>
 * - onRender <Function>
 * - options <Object => data, ...>
 */

/* @flow */

import React from 'react';
import RoughCanvas from './rough';

type Props = {
  name: string,
  width: number,
  height: number,
  'data-rough-id': string,
  onRender: () => void,
  options: {
    id: string,
    data: string | Array<number> | Array<Array<number>>
  }
}

class RoughComponent extends React.Component {
  props: Props;

  name: string;

  canvas: HTMLCanvasElement;

  _prepareRough() {
  let canvas, rough;

  // Transverse through child components
  if (this.props.children) {
    // Is Canvas Created?
    // Yea, fetch the canvas (0_0)
    canvas = [
      ...document.querySelectorAll('[data-rough-id]')
    ].find(rough => rough.dataset.roughId === this.props['data-rough-id']);

    if (canvas === undefined) {
      // Create one ;)
      canvas = document.createElement('canvas');
      canvas.dataset.roughId = this.props['data-rough-id'];
      document.body.appendChild(canvas);

      // Create RoughCanvas
      rough = new RoughCanvas(canvas, this.props.width, this.props.height);
    } else { return; }

    React.Children.toArray(this.props.children).forEach(child => {
      // Create instance of children
      let cc = new child.type();
      this._updateCanvas({ name: cc.name, rough, ...child.props })
    });

  } else {
    // No Child, Create a canvas without an id :p
    canvas = document.createElement('canvas');
    document.body.appendChild(canvas);

    rough = new RoughCanvas(canvas, this.props.width, this.props.height);

    this._updateCanvas({ name: this.name, rough, ...this.props });
  }
}

_updateCanvas({ name, rough, onRender, options: { data, ...rest }}) {
  let shape;

  // Apply our supplied data to rough
  // path => String, curve and polygon => Array
  if (name.match(/curve|path|polygon/)) {
    shape = rough[name](data);
  } else {
    shape = rough[name](...data);
  }

  // Iterate over props and apply each prop to our element
  Object.keys(rest).forEach(prop => shape[prop] = rest[prop]);

  // Apply our Hook
  if (typeof onRender !== 'undefined') {
    onRender(shape);
  }
}

  _deleteCanvas() {
    document.body.removeChild(this.canvas);
  }

  componentDidMount() {
    this._prepareRough();
  }

  componentWillUnmount() {
    this._deleteCanvas();
  }

  render() {
    return null;
  }
}

class ReactRough extends RoughComponent {
  name = 'react-rough';
}

class Arc extends RoughComponent {
  name = 'arc';
}

class Circle extends RoughComponent {
  name = 'circle';
}

class Curve extends RoughComponent {
  name = 'curve';
}

class Ellipse extends RoughComponent {
  name = 'ellipse';
}

class Line extends RoughComponent {
  name = 'line';
}

class Path extends RoughComponent {
  name = 'path';
}

class Polygon extends RoughComponent {
  name = 'polygon';
}

class Rectangle extends RoughComponent {
  name = 'rectangle';
}

export {
  Arc,
  Circle,
  Curve,
  Ellipse,
  Line,
  Path,
  Polygon,
  Rectangle
};
