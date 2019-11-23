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

type RoughCallback = (rc: RoughGenerator) => [Drawable, string];

interface RoughContextProps {
	render: (callback: RoughCallback) => void;
	remove: (token: string) => void;
}

export const RoughContext = React.createContext<RoughContextProps>({
	render: () => {},
	remove: () => {}
});

const ReactRoughCanvas: FC<RoughProps> = ({
	config,
	width = 300,
	height = 150,
	children
}) => {
	const canvasRef = React.createRef<HTMLCanvasElement>();
	const roughCanvasRef = React.useRef<RoughCanvas>();
	const nodes = React.useRef<{ [key: string]: Drawable }>({});

	const remove = (token: string) => delete nodes.current[token];

	const render = (callback: RoughCallback): void => {
		if (!canvasRef.current) return;
		if (canvasRef.current && !roughCanvasRef.current) {
			roughCanvasRef.current = new RoughCanvas(canvasRef.current, config);
		}
		const [node, token] = callback(roughCanvasRef.current!.generator);
		nodes.current[token] = node;
	};

	useDeepCompareEffect(() => {
		roughCanvasRef.current = new RoughCanvas(canvasRef.current!, config);
		Object.values(nodes.current).forEach(node =>
			roughCanvasRef.current!.draw(node)
		);
		const canvas = canvasRef.current;
		return () => {
			if (!canvas) return;
			canvas.getContext('2d')!.clearRect(0, 0, width, height);
		};
	}, [height, width, canvasRef, config]);

	return (
		<RoughContext.Provider value={{ render, remove }}>
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
	const nodes = React.useRef<{ [key: string]: Drawable }>({});

	const remove = (token: string) => {
		delete nodes.current[token];
	};

	const render = (callback: RoughCallback): void => {
		const svg = svgRef.current;
		if (!svg) return;
		if (svg && !roughSvgRef.current) {
			roughSvgRef.current = new RoughSVG(svg, config);
		}
		const [node, token] = callback(roughSvgRef.current!.generator);
		nodes.current[token] = node;
	};

	useDeepCompareEffect(() => {
		const svg = svgRef.current;
		if (!svg) return;
		Object.values(nodes.current)
			.map(s => roughSvgRef.current!.draw(s))
			.map(svgEl => svg.appendChild(svgEl));
		return () => {
			svg.innerHTML = '';
		};
	}, [height, width, svgRef, config]);

	return (
		<RoughContext.Provider value={{ render, remove }}>
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
