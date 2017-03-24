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
  onRender: () => void,
  options: {
    data: Array<Array<number>> | string
  }
}

class ReactRough extends React.Component {
  props: Props;

  name: string;

  canvas: HTMLCanvasElement;

  _createCanvas() {
    this.canvas = document.createElement('canvas');
    document.body.appendChild(this.canvas);
  }

  _updateCanvas() {
    const {
      width,
      height,
      onRender,
      options: { data, ...rest }
    } = this.props;

    let rough = new RoughCanvas(this.canvas, width, height);

    // Iterate over props and apply each prop to our element
    Object.keys(rest).forEach(prop => rough[prop] = rest[prop]);

    let shape;

    // Apply our supplied data to rough
    // path => String, curve and polygon => Array
    if (this.name.match(/curve|path|polygon/)) {
      shape = rough[this.name](data);
    } else {
      shape = rough[this.name](...data);
    }

    // Apply our Hook
    if (typeof onRender !== 'undefined') {
      onRender(shape);
    }
  }

  _deleteCanvas() {
    document.body.removeChild(this.canvas);
  }

  componentDidMount() {
    this._createCanvas();
    this._updateCanvas();
  }

  componentDidUpdate() {
    this._updateCanvas();
  }

  componentWillUnmount() {
    this._deleteCanvas();
  }

  render() {
    return null;
  }
}

class Arc extends ReactRough {
  name = 'arc';
}

class Circle extends ReactRough {
  name = 'circle';
}

class Curve extends ReactRough {
  name = 'curve';
}

class Ellipse extends ReactRough {
  name = 'ellipse';
}

class Line extends ReactRough {
  name = 'line';
}

class Path extends ReactRough {
  name = 'path';
}

class Polygon extends ReactRough {
  name = 'polygon';
}

class Rectangle extends ReactRough {
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
