import useDeepCompareEffect from 'use-deep-compare-effect';
import React, { useContext, FC } from 'react';
import { RoughSVG } from 'roughjs/bin/svg';
import { Drawable } from 'roughjs/bin/core';
import { RoughContext } from './';
import * as Props from './RoughComponentProps';
import { RoughCanvas } from 'roughjs/bin/canvas';

export { Point } from 'roughjs/bin/geometry';

// export const Line: FC<Props.LineProps> = ({ x1, y1, x2, y2, ...props }) => {
// 	const { render } = useContext(RoughContext);

// 	useDeepCompareEffect(() => {
// 		render(rc => rc.line(x1, y1, x2, y2, props));
// 	}, [x1, y1, x2, y2, props]);

// 	return null;
// };
// Line.displayName = 'Line';

interface RendererProps {
	render: (rc: RoughSVG | RoughCanvas) => Node | Drawable;
}

// const CRenderer: FC<RendererProps> = ({ render }) => {
// 	const { ref, config } = useContext(RoughContext);

// 	useDeepCompareEffect(() => {
// 		if (!ref) return;

// 		const svg = ref.current;

// 		if (!svg) return;

// 		const roughSvg = new RoughSVG(svg, config);
// 		const node = render(roughSvg);
// 		svg.appendChild(node);

// 		return (): void => {
// 			svg.removeChild(node);
// 		};
// 	}, [ref]);

// 	return null;
// };

const Renderer: FC<RendererProps> = ({ render }) => {
	const { ref, config, renderer, width, height } = useContext(RoughContext);

	const clearCanvas = (): void => {
		const canvas = ref && (ref.current as HTMLCanvasElement);
		const ctx = canvas && canvas.getContext('2d');
		ctx && ctx.clearRect(0, 0, width as number, height as number);
	};

	useDeepCompareEffect(() => {
		const rendererElement = ref!.current;
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
	}, [ref, renderer, render]);

	if (renderer === 'canvas') clearCanvas();
	return null;
};

export const Rectangle: FC<Props.RectangleProps> = ({
	x,
	y,
	width,
	height,
	...props
}) => {
	const renderProps = React.useCallback(
		(rc: RoughCanvas | RoughSVG) => rc.rectangle(x, y, width, height, props),
		[x, y, width, height, props]
	);

	return (
		<Renderer
			render={(rc: RoughCanvas | RoughSVG): SVGGElement | Drawable =>
				renderProps(rc)
			}
		/>
	);
};
Rectangle.displayName = 'Rectangle';

// export const Ellipse: FC<Props.EllipseProps> = ({
// 	x,
// 	y,
// 	width,
// 	height,
// 	...props
// }) => {
// 	const { render } = useContext(RoughContext);

// 	useDeepCompareEffect(() => {
// 		render(rc => rc.ellipse(x, y, width, height, props));
// 	}, [x, y, width, height, props]);

// 	return null;
// };
// Ellipse.displayName = 'Ellipse';

export const Circle: FC<Props.CircleProps> = ({ x, y, diameter, ...props }) => {
	const { ref } = useContext(RoughContext);

	// useDeepCompareEffect(() => {
	// 	render(rc => rc.circle(x, y, diameter, props));
	// }, [x, y, diameter, props]);

	return null;
};
Circle.displayName = 'Circle';

// export const LinearPath: FC<Props.LinearPathProps> = ({ points, ...props }) => {
// 	const { render } = useContext(RoughContext);

// 	useDeepCompareEffect(() => {
// 		render(rc => rc.linearPath(points, props));
// 	}, [points, props]);

// 	return null;
// };
// LinearPath.displayName = 'LinearPath';

// export const Polygon: FC<Props.PolygonProps> = ({ points, ...props }) => {
// 	const { render } = useContext(RoughContext);

// 	useDeepCompareEffect(() => {
// 		render(rc => rc.polygon(points, props));
// 	}, [points, props]);

// 	return null;
// };
// Polygon.displayName = 'Polygon';

// export const Arc: FC<Props.ArcProps> = ({
// 	x,
// 	y,
// 	width,
// 	height,
// 	start,
// 	stop,
// 	closed,
// 	...props
// }) => {
// 	const { render } = useContext(RoughContext);

// 	useDeepCompareEffect(() => {
// 		render(rc => rc.arc(x, y, width, height, start, stop, closed, props));
// 	}, [x, y, width, height, start, stop, closed, props]);

// 	return null;
// };
// Arc.displayName = 'Arc';

// export const Curve: FC<Props.CurveProps> = ({ points, ...props }) => {
// 	const { render } = useContext(RoughContext);

// 	useDeepCompareEffect(() => {
// 		render(rc => rc.curve(points, props));
// 	}, [points, props]);

// 	return null;
// };
// Curve.displayName = 'Curve';

// export const Path: FC<Props.PathProps> = ({ d, ...props }) => {
// 	const { render } = useContext(RoughContext);

// 	useDeepCompareEffect(() => {
// 		render(rc => rc.path(d, props));
// 	}, [d, props]);

// 	return null;
// };
// Path.displayName = 'Path';
