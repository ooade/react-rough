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

export const Arc = props => <RoughConsumer type="arc" {...props} />;

export const Circle = props => <RoughConsumer type="circle" {...props} />;

export const Curve = props => <RoughConsumer type="curve" {...props} />;

export const Ellipse = props => <RoughConsumer type="ellipse" {...props} />;

export const Line = props => <RoughConsumer type="line" {...props} />;

export const Path = props => <RoughConsumer type="path" {...props} />;

export const Polygon = props => <RoughConsumer type="polygon" {...props} />;


export const Rectangle = props => <RoughConsumer type="rectangle" {...props} />;

class ReactRough extends React.Component {
	canvasRef = React.createRef();

	componentDidMount() {
		const rc = Rough.canvas(this.canvasRef.current);
		this.rc = rc;

		this.forceUpdate();
	}

	render() {
		const { width, height, children } = this.props;

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
