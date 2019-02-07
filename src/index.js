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

			if (contextValue.rc) {
				if (type === 'path') {
					if (typeof points !== 'undefined') {
						throw new Error(
							'You need a dataString property for path, not points'
						);
					}

					contextValue.rc[type](dataString, data);
				} else {
					contextValue.rc[type](...points, data);
				}
				return null;
			}

			return null;
		}}
	</RoughContext.Consumer>
);

class ReactRough extends React.Component {
	static Arc = props => {
		return <RoughConsumer type="arc" {...props} />;
	};

	static Circle = props => {
		return <RoughConsumer type="circle" {...props} />;
	};

	static Curve = props => {
		return <RoughConsumer type="curve" {...props} />;
	};

	static Ellipse = props => {
		return <RoughConsumer type="ellipse" {...props} />;
	};

	static Line = props => {
		return <RoughConsumer type="line" {...props} />;
	};

	static LinearPath = props => {
		return <RoughConsumer type="linearPath" {...props} />;
	};

	static Path = props => {
		return <RoughConsumer type="path" {...props} />;
	};

	static Polygon = props => {
		return <RoughConsumer type="polygon" {...props} />;
	};

	static Rectangle = props => {
		return <RoughConsumer type="rectangle" {...props} />;
	};

	constructor(props) {
		super(props);
		this.canvasRef = React.createRef();
		this.rc = null;
		this.ctx = null;
	}

	componentDidMount() {
		this.ctx = this.canvasRef.current.getContext('2d');
		// First render canvas clear
		this.clearCanvas();
		this.rc = Rough.canvas(this.canvasRef.current);

	}

	clearCanvas() {
		const { backgroundColor, width, height } = this.props;
		// If this is the first render the ctx will be null
		// It will be cleared later on componentDidMount
		if (!this.ctx) {
			return
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
		this.forceUpdate()
	}

	render() {
		const { width, height, children } = this.props;

		// First clear the canvas in case of a new render
		this.clearCanvas();

		return (
			<RoughContext.Provider value={{ rc: this.rc }}>
				<canvas width={width} height={height} ref={this.canvasRef}>
					{children}
				</canvas>
			</RoughContext.Provider>
		);
	}
}

ReactRough.defaultProps = {
	width: 500,
	height: 500
};

ReactRough.propTypes = {
	bowing: Proptypes.number,
	dataString: Proptypes.string,
	fill: Proptypes.string,
	fillStyle: Proptypes.string,
	fillWeight: Proptypes.number,
	hachureAngle: Proptypes.number,
	hachureGap: Proptypes.number,
	height: Proptypes.number,
	width: Proptypes.number,
	points: Proptypes.arrayOf(Number),
	roughness: Proptypes.number,
	stroke: Proptypes.string,
	strokeWidth: Proptypes.number
};

export default ReactRough;
