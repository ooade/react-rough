import React, {useState, useEffect, useRef } from 'react';
import Rough from 'roughjs/dist/rough.umd';

const RoughContext = React.createContext();

const __VALID_KEYS__ = [
	'bowing',
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

export const NodeMounter = props => {
    const ref = useRef('');
    const { node } = props;
    ref.appendChild(node);

    useEffect(() => {
        //Perhaps there's something fishy here ?
        ref.current.removeChild(node);
        ref.current.appendChild(node);

        return () => {
            const { node } = props;
            ref.current.removeChild(node);
        }
    }, []);
    return <g ref={ref} />;
};



const RoughConsumer = ({ type, dataString, points, ...data }) => (
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
			let node = null;
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
				return contextValue.renderer === 'svg' ? (
					<NodeMounter node={node} />
				) : null;
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

const ReactRough = props => {

    const { renderer, width, height, backgroundColor } = props;

    const useForceUpdate = () => useState()[1];

    const forceUpdate = useForceUpdate();

    let ctx, rc;

    let rendererRef = useRef('');

    useEffect(() => {
        const { renderer } = props;
        ctx =
            renderer === 'canvas' && rendererRef.current.getContext('2d');
        rc = Rough[renderer](rendererRef.current);

        forceUpdate();
    }, []);


    const clearCanvas = () => {
        const { backgroundColor, width, height } = props;
        // If this is the first render the ctx will be null
        // It will be cleared later in the useEffect arc
        if ( !ctx ) {
            return;
        }

        if ( backgroundColor ) {
            ctx.save();
            ctx.fillstyle = backgroundColor;
            ctx.fillRect(0, 0, width, height);
            ctx.restore();
        } else {
            ctx.clearRect(0, 0, width, height);
        }
    };

    const redraw = () => forceUpdate();

    let children = props.children;


    const rendererOptions = {
        width,
        height
    };

//    First clear the canvas in case of a new render.
    if ( renderer === 'canvas') {
        clearCanvas();
    } else {
        rendererOptions.style = { backgroundColor };
    }

    const Renderer = renderer;


    return(
        <RoughContext.Provider value={{ rc: rc, renderer }}>
            <Renderer {...rendererOptions} ref={rendererRef}>
                {children}
            </Renderer>
        </RoughContext.Provider>
    );
};


ReactRough.defaultProps = {
	width: 500,
	height: 500,
	renderer: 'canvas'
};

export default ReactRough;
