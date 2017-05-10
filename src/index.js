/**
 * React Rough - Binds React with Rough.js
 */

/* @flow */

import React from 'react';
import RoughCanvas from './rough';

type Props = {
	width: number,
	height: number,
	children?: Node,
	options: {
		data: string | Array<number> | Array<Array<number>>
	},
	onRender?: () => void
};

class RoughComponent extends React.Component {
	props: Props;

	name: string;

	_prepareRough() {
		const { width, height, onRender } = this.props;

		// Transverse through child components
		if (this.props.children) {
			// Create RoughCanvas
			let rough = new RoughCanvas(this.refs.roughCanvas, width, height);

			React.Children.toArray(this.props.children).forEach(child => {
				const ChildComponent = new child.type();
				this._updateRough({ name: ChildComponent.name, rough, ...child.props });
			});

			//Apply our Hook to rough
			if (typeof onRender !== 'undefined') {
				onRender(rough);
			}
		} else if (this.name === 'react-rough' && !this.props.children) {
			throw new Error('ReactRough requires a child component');
		} else {
			// No Child, Create a canvas without tranversing through each child
			let rough = new RoughCanvas(this.refs.roughCanvas, width, height);

			// Update it ;)
			this._updateRough({ name: this.name, rough, ...this.props });
		}
	}

	_updateRough({ name, rough, onRender, options: { data, ...rest } }) {
		let shape;

		// Apply our supplied data to rough
		// path => String, curve and polygon => Array
		if (name.match(/curve|path|polygon/)) {
			shape = rough[name](data);
		} else {
			shape = rough[name](...data);
		}

		// Iterate over props and apply each prop to our element
		Object.keys(rest).forEach(prop => (shape[prop] = rest[prop]));

		//Apply Hook to each shape
		if (typeof onRender !== 'undefined') {
			onRender(shape);
		}
	}

	componentDidMount() {
		this._prepareRough();
	}

	render() {
		return <canvas ref="roughCanvas" />;
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
	Rectangle,
	ReactRough
};
