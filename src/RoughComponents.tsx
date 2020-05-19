import useDeepCompareEffect from 'use-deep-compare-effect';
import React, { useContext, FC } from 'react';
import { RoughSVG } from 'roughjs/bin/svg';
import { Drawable } from 'roughjs/bin/core';
import { RoughCanvas } from 'roughjs/bin/canvas';
export { Point } from 'roughjs/bin/geometry';
import * as Props from './RoughComponentProps';
import RoughContext from './RoughContext';

type RoughRenderer = RoughSVG | RoughCanvas;
type RoughOutput = Node | Drawable;

interface RendererProps {
	render: (rc: RoughRenderer) => RoughOutput;
}

const Renderer: FC<RendererProps> = ({ render }) => {
	const { ref, config, width, height } = useContext(RoughContext);

	const getRenderer = (): string | undefined =>
		ref && ref.current && ref.current.tagName.toLowerCase();

	const clearCanvas = (): void => {
		if (!(width && height)) {
			throw new Error('Canvas should have a defined width and height');
		}
		const canvas = ref && (ref.current as HTMLCanvasElement);
		const ctx = canvas && canvas.getContext('2d');
		ctx && ctx.clearRect(0, 0, width, height);
	};

	useDeepCompareEffect(() => {
		const rendererElement = ref && ref.current;
		const renderer = getRenderer();

		if (!rendererElement) return;

		if (renderer === 'svg') {
			const roughSvg = new RoughSVG(rendererElement as SVGSVGElement, config);
			const node = render(roughSvg) as Node;
			rendererElement.appendChild(node);

			return (): void => {
				rendererElement.removeChild(node);
			};
		} else {
			const roughCanvas = new RoughCanvas(
				rendererElement as HTMLCanvasElement,
				config
			);
			render(roughCanvas);
		}
	}, [ref, render]);

	if (getRenderer() === 'canvas') clearCanvas();
	return null;
};

export const Line: FC<Props.LineProps> = ({ x1, y1, x2, y2, ...props }) => {
	const renderProps = React.useCallback(
		(rc: RoughRenderer) => rc.line(x1, y1, x2, y2, props),
		[x1, y1, x2, y2, props]
	);

	return (
		<Renderer render={(rc: RoughRenderer): RoughOutput => renderProps(rc)} />
	);
};
Line.displayName = 'Line';

export const Rectangle: FC<Props.RectangleProps> = ({
	x,
	y,
	width,
	height,
	...props
}) => {
	const renderProps = React.useCallback(
		(rc: RoughRenderer) => rc.rectangle(x, y, width, height, props),
		[x, y, width, height, props]
	);

	return (
		<Renderer render={(rc: RoughRenderer): RoughOutput => renderProps(rc)} />
	);
};
Rectangle.displayName = 'Rectangle';

export const Ellipse: FC<Props.EllipseProps> = ({
	x,
	y,
	width,
	height,
	...props
}) => {
	const renderProps = React.useCallback(
		(rc: RoughRenderer) => rc.ellipse(x, y, width, height, props),
		[x, y, width, height, props]
	);

	return (
		<Renderer render={(rc: RoughRenderer): RoughOutput => renderProps(rc)} />
	);
};
Ellipse.displayName = 'Ellipse';

export const Circle: FC<Props.CircleProps> = ({ x, y, diameter, ...props }) => {
	const renderProps = React.useCallback(
		(rc: RoughRenderer) => rc.circle(x, y, diameter, props),
		[x, y, diameter, props]
	);

	return (
		<Renderer render={(rc: RoughRenderer): RoughOutput => renderProps(rc)} />
	);
};
Circle.displayName = 'Circle';

export const LinearPath: FC<Props.LinearPathProps> = ({ points, ...props }) => {
	const renderProps = React.useCallback(
		(rc: RoughRenderer) => rc.linearPath(points, props),
		[points, props]
	);

	return (
		<Renderer render={(rc: RoughRenderer): RoughOutput => renderProps(rc)} />
	);
};
LinearPath.displayName = 'LinearPath';

export const Polygon: FC<Props.PolygonProps> = ({ points, ...props }) => {
	const renderProps = React.useCallback(
		(rc: RoughRenderer) => rc.polygon(points, props),
		[points, props]
	);

	return (
		<Renderer render={(rc: RoughRenderer): RoughOutput => renderProps(rc)} />
	);
};
Polygon.displayName = 'Polygon';

export const Arc: FC<Props.ArcProps> = ({
	x,
	y,
	width,
	height,
	start,
	stop,
	closed,
	...props
}) => {
	const renderProps = React.useCallback(
		(rc: RoughRenderer) =>
			rc.arc(x, y, width, height, start, stop, closed, props),
		[x, y, width, height, start, stop, closed, props]
	);

	return (
		<Renderer render={(rc: RoughRenderer): RoughOutput => renderProps(rc)} />
	);
};
Arc.displayName = 'Arc';

export const Curve: FC<Props.CurveProps> = ({ points, ...props }) => {
	const renderProps = React.useCallback(
		(rc: RoughRenderer) => rc.curve(points, props),
		[points, props]
	);

	return (
		<Renderer render={(rc: RoughRenderer): RoughOutput => renderProps(rc)} />
	);
};
Curve.displayName = 'Curve';

export const Path: FC<Props.PathProps> = ({ d, ...props }) => {
	const renderProps = React.useCallback(
		(rc: RoughRenderer) => rc.path(d, props),
		[d, props]
	);

	return (
		<Renderer render={(rc: RoughRenderer): RoughOutput => renderProps(rc)} />
	);
};
Path.displayName = 'Path';
