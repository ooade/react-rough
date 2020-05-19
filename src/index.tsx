import React, { FC, MutableRefObject, RefObject } from 'react';
import { Config } from 'roughjs/bin/core';

type SvgRef = MutableRefObject<SVGSVGElement>;
type CanvasRef = MutableRefObject<HTMLCanvasElement>;
type renderer = 'canvas' | 'svg';

interface RoughProps {
	width?: number;
	height?: number;
	config?: Config;
	renderer?: renderer;
}

interface RoughCompProps extends RoughProps {
	forwardedRef?: RefObject<unknown>;
}

interface RoughContextProps {
	ref?: SvgRef | CanvasRef;
	config?: Config;
	width?: number;
	height?: number;
}

export const RoughContext = React.createContext<RoughContextProps>({
	width: 300,
	height: 150
});
RoughContext.displayName = 'RoughContext';

export const ReactRoughComp: FC<RoughCompProps> = ({
	config,
	width = 300,
	height = 150,
	renderer = 'canvas',
	forwardedRef,
	children
}) => {
	const svgRef = React.useRef<SVGSVGElement>();
	const canvasRef = React.useRef<HTMLCanvasElement>();

	if (forwardedRef) {
		return (
			<RoughContext.Provider
				value={{
					config,
					width,
					height,
					ref: forwardedRef as SvgRef
				}}
			>
				{children}
			</RoughContext.Provider>
		);
	}

	if (renderer === 'svg') {
		return (
			<RoughContext.Provider
				value={{
					config,
					ref: svgRef as SvgRef
				}}
			>
				<svg width={width} height={height} ref={svgRef as SvgRef}>
					{children}
				</svg>
			</RoughContext.Provider>
		);
	}

	return (
		<RoughContext.Provider
			value={{
				config,
				width,
				height,
				ref: canvasRef as CanvasRef
			}}
		>
			<canvas width={width} height={height} ref={canvasRef as CanvasRef}>
				{children}
			</canvas>
		</RoughContext.Provider>
	);
};

export const ReactRough: React.FC<RoughCompProps> = React.forwardRef(
	(props, ref) => {
		return (
			<ReactRoughComp {...props} forwardedRef={ref as RefObject<unknown>} />
		);
	}
);

ReactRough.displayName = 'ReactRough';

export * from './RoughComponents';
export default ReactRough;
