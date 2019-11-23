import React, { FC, MutableRefObject } from 'react';
import { Config } from 'roughjs/bin/core';

interface RoughProps {
	width?: number;
	height?: number;
	config?: Config;
	renderer?: string;
}

type svgRef = MutableRefObject<SVGSVGElement>;
type canvasRef = MutableRefObject<HTMLCanvasElement>;

interface RoughContextProps {
	ref?: svgRef | canvasRef;
	config?: Config;
	width?: number;
	height?: number;
	renderer?: string;
}

export const RoughContext = React.createContext<RoughContextProps>({});

export const ReactRough: FC<RoughProps> = ({
	config,
	width = 300,
	height = 150,
	renderer = 'canvas',
	children
}) => {
	const svgRef = React.useRef<SVGSVGElement>();
	const canvasRef = React.useRef<HTMLCanvasElement>();

	if (renderer === 'svg') {
		return (
			<RoughContext.Provider
				value={{
					ref: svgRef as MutableRefObject<SVGSVGElement>,
					config,
					renderer: 'svg'
				}}
			>
				<svg
					width={width}
					height={height}
					ref={svgRef as MutableRefObject<SVGSVGElement>}
				>
					{children}
				</svg>
			</RoughContext.Provider>
		);
	}

	return (
		<RoughContext.Provider
			value={{
				ref: canvasRef as MutableRefObject<HTMLCanvasElement>,
				config,
				renderer: 'canvas',
				width,
				height
			}}
		>
			<canvas
				width={width}
				height={height}
				ref={canvasRef as MutableRefObject<HTMLCanvasElement>}
			>
				{children}
			</canvas>
		</RoughContext.Provider>
	);
};
ReactRough.displayName = 'ReactRough';

export * from './RoughComponents';
export default ReactRough;
