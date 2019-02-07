import React from 'react';
import Proptypes from 'prop-types';
import Rough from 'roughjs';

const RoughContext = React.createContext();

const __VALID_KEYS__ = [
	'bowing',
	'dataString',
	'fill',
	'fillStyle',
	'fillWeight',
	'hachureAngle',
	'hachureGap',
	'height',
	'width',
	'roughness',
	'stroke',
	'strokeWidth'
];

class NodeMounter extends React.Component {
	constructor(props) {
		super(props);
		this.ref = React.createRef();
	}

	componentDidMount() {
		const { node } = this.props;
		this.ref.current.appendChild(node);
	}

	componentDidUpdate({node: prevNode}) {
		const {node} = this.props;
		if(prevNode !== node) {
			this.ref.current.removeChild(prevNode);
			this.ref.current.appendChild(node);
		}
	}

	componentWillUnmount() {
		const { node } = this.props;
		this.ref.current.removeChild(node);
	}

	render() {
		return <g ref={this.ref} />;
	}
}

export const RoughConsumer = ({ type, dataString, points, ...data }) => (
	<RoughContext.Consumer>
		{contextValue => {
			if (typeof contextValue === 'undefined') {
				throw new Error('ReactRough Component not found!');
			}

			const dataArray = Object.keys(data);

			for (let i = 0, len = dataArray.length; i < len; i++) {
				if (!__VALID_KEYS__.includes(dataArray[i])) {
					throw new Error(
						`Invalid key "${dataArray[i]}" assigned to "${type} component"`
					);
				}
			}
			let node = null
			if (contextValue.rc) {
				if (type === 'path') {
					if (typeof points !== 'undefined') {
						throw new Error(
							'You need a dataString property for path, not points'
						);
					}

					node = contextValue.rc[type](dataString, data);
				} else {
					node = contextValue.rc[type](...points, data);
				}
				return contextValue.backend === 'svg' ? <NodeMounter node={node} /> : null;
			}

			return null;
		}}
	</RoughContext.Consumer>
);

export const Arc = props => <RoughConsumer type="arc" {...props} />;

export const Circle = props => <RoughConsumer type="circle" {...props} />;

export const Curve = props => <RoughConsumer type="curve" {...props} />;

export const Ellipse = props => <RoughConsumer type="ellipse" {...props} />;

export const Line = props => <RoughConsumer type="line" {...props} />;

export const Path = props => <RoughConsumer type="path" {...props} />;

export const LinearPath = props => (
	<RoughConsumer type="linearPath" {...props} />
);

export const Polygon = props => <RoughConsumer type="polygon" {...props} />;

export const Rectangle = props => <RoughConsumer type="rectangle" {...props} />;

class ReactRough extends React.Component {
	backendRef = React.createRef();

	constructor(props) {
		super(props);
		this.rc = null;
		this.ctx = null;
	}

	componentDidMount() {
		const { backend } = this.props
		this.ctx = backend == 'canvas' && this.backendRef.current.getContext('2d');
		this.rc = Rough[backend](this.backendRef.current);
		// Force a render now that we have the canvas
		this.forceUpdate();
	}

	clearCanvas() {
		const { backgroundColor, width, height } = this.props;
		// If this is the first render the ctx will be null
		// It will be cleared later on componentDidMount
		if (!this.ctx) {
			return;
		}

		if (backgroundColor) {
			this.ctx.save();
			this.ctx.fillStyle = backgroundColor;
			this.ctx.fillRect(0, 0, width, height);
			this.ctx.restore();
		} else {
			this.ctx.clearRect(0, 0, width, height);
		}
	}

	redraw() {
		this.forceUpdate();
	}

	render() {
		const { width, height, backend } = this.props;
		let children = this.props.children

		// First clear the canvas in case of a new render
		if (backend === 'canvas') {
			this.clearCanvas();
		}

		const Backend = backend

		return (
			<RoughContext.Provider value={{ rc: this.rc, backend }}>
				<Backend width={width} height={height} ref={this.backendRef}>
					{children}
				</Backend>
			</RoughContext.Provider>
		);
	}
}

ReactRough.defaultProps = {
	width: 500,
	height: 500,
	backend: 'canvas'
};

export default ReactRough;
