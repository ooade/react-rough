import React, { FC, useEffect } from 'react';
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
	const ref = React.createRef<HTMLCanvasElement>();
	const nextRoughCanvas = React.useRef<RoughCanvas>();
	const node = React.useRef<Drawable>();

	const render = (callback: RoughCallback): void => {
		const canvas = ref.current;
		if (canvas) {
			const roughCanvas = new RoughCanvas(canvas, config);
			node.current = callback(roughCanvas.generator);
			nextRoughCanvas.current = roughCanvas;
		}
	};

	useEffect(() => {
		console.log(node);
	});

	useEffect(() => {
		const roughCanvas = ref.current;

		if (!nextRoughCanvas.current || !node.current || !roughCanvas) return;

		nextRoughCanvas.current.draw(node.current);

		return (): void => {
			const ctx = roughCanvas.getContext('2d');
			if (ctx) {
				ctx.clearRect(0, 0, width, height);
			}
		};
	}, [height, width, ref]);

	return (
		<RoughContext.Provider value={{ render }}>
			<canvas width={width} height={height} ref={ref}>
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
	const ref = React.createRef<SVGSVGElement>();
	const nextRoughSvg = React.useRef<RoughSVG>();
	const node = React.useRef<Drawable>();

	const render = (callback: RoughCallback): void => {
		const svg = ref.current;
		if (svg) {
			const roughSvg = new RoughSVG(svg, config);
			node.current = callback(roughSvg.generator);
			nextRoughSvg.current = roughSvg;
		}
	};

	useEffect(() => {
		const roughSvg = ref.current;

		if (!nextRoughSvg.current || !node.current || !roughSvg) return;

		const g = nextRoughSvg.current.draw(node.current);
		roughSvg.appendChild(g);

		return (): void => {
			roughSvg.removeChild(g);
		};
	}, [ref]);

	return (
		<RoughContext.Provider value={{ render }}>
			<svg width={width} height={height} ref={ref}>
				{children}
			</svg>
		</RoughContext.Provider>
	);
};

ReactRoughSvg.displayName = 'ReactRoughSvg';
ReactRoughCanvas.displayName = 'ReactRough';

export * from './RoughComponents';
export default ReactRoughCanvas;
