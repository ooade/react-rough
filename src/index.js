import React, { Component, PropTypes } from 'react';
import RoughCanvas from './rough';

class CanvasComponent extends Component {
  componentDidMount() {
    this._updateCanvas();
  }

  componentDidUpdate() {
    this._updateCanvas();
  }

  _updateCanvas() {
    const {
      width,
      height,
      shape,
      data,
      ...props
    } = this.props;

    const rough = new RoughCanvas(this.refs.roughcanvas, width, height);

    // Iterate over props and apply each prop to our element
    Object.keys(props).forEach(prop => rough[prop] = props[prop]);

    // Apply our supplied data to rough
    rough[shape](...data);
  }

  render() {
    return <canvas ref='roughcanvas'/> ;
  }
}

export default class extends React.Component {
  // Add the PropTypes we care about
  static propTypes = {
    width: React.PropTypes.number.isRequired,
    height: React.PropTypes.number.isRequired,
    shape: React.PropTypes.string.isRequired,
    data: React.PropTypes.array.isRequired
  }

  // Defaultprops to create Canvas
  static defaultProps = {
    width: 100,
    height: 100
  }

  render() {
    return <CanvasComponent {...this.props}/>;
  }
}
