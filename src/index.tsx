import React, { FC, useEffect } from 'react';
import useDeepCompareEffect from 'use-deep-compare-effect';
import { RoughSVG } from 'roughjs/bin/svg';
import { RoughCanvas } from 'roughjs/bin/canvas';
import { Config, Drawable } from 'roughjs/bin/core';
import { RoughGenerator } from 'roughjs/bin/generator';

interface RoughProps {
	width?: number;
	height?: number;
	config?: Config;
}

type RoughCallback = (rc: RoughGenerator) => Drawable;

interface RoughContextProps {
	render: (callback: RoughCallback) => void;
}

export const RoughContext = React.createContext<RoughContextProps>({
	render: () => {}
});

const ReactRoughCanvas: FC<RoughProps> = ({
	config,
	width = 300,
	height = 150,
	children
}) => {
	const canvasRef = React.createRef<HTMLCanvasElement>();
	const roughCanvasRef = React.useRef<RoughCanvas>();
	const nodes = React.useRef<Drawable[]>([]);

	const render = (callback: RoughCallback): void => {
		if (canvasRef.current && !roughCanvasRef.current) {
			roughCanvasRef.current = new RoughCanvas(canvasRef.current, config);
		}
		const elem = callback(roughCanvasRef.current!.generator);
		nodes.current.push(elem);
	};

	useDeepCompareEffect(() => {
		roughCanvasRef.current = new RoughCanvas(canvasRef.current!, config);
		nodes.current.map(node => roughCanvasRef.current!.draw(node));
		const canvas = canvasRef.current;
		return () => {
			if (!canvas) return;
			canvas.getContext('2d')!.clearRect(0, 0, width, height);
		};
	}, [height, width, canvasRef, config]);

	return (
		<RoughContext.Provider value={{ render }}>
			<canvas width={width} height={height} ref={canvasRef}>
				{children}
			</canvas>
		</RoughContext.Provider>
	);
};

export const ReactRoughSvg: FC<RoughProps> = ({
	config,
	width = 300,
	height = 150,
	children
}) => {
	const svgRef = React.createRef<SVGSVGElement>();
	const roughSvgRef = React.useRef<RoughSVG>();

	const render = (callback: RoughCallback): void => {
		const svg = svgRef.current;
		if (!svg) return;
		if (svg && !roughSvgRef.current) {
			roughSvgRef.current = new RoughSVG(svg, config);
		}
		const node = callback(roughSvgRef.current!.generator);
		const g = roughSvgRef.current!.draw(node);
		svg.appendChild(g);
	};

	return (
		<RoughContext.Provider value={{ render }}>
			<svg width={width} height={height} ref={svgRef}>
				{children}
			</svg>
		</RoughContext.Provider>
	);
};

ReactRoughSvg.displayName = 'ReactRoughSvg';
ReactRoughCanvas.displayName = 'ReactRough';

export * from './RoughComponents';
export default ReactRoughCanvas;
