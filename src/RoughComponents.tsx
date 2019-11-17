import useDeepCompareEffect from 'use-deep-compare-effect';
import { useContext, FC } from 'react';

import { RoughContext } from './';
import * as Props from './RoughComponentProps';

export { Point } from 'roughjs/bin/geometry';

export const Line: FC<Props.LineProps> = ({ x1, y1, x2, y2, ...props }) => {
	const { render } = useContext(RoughContext);

	useDeepCompareEffect(() => {
		render(rc => rc.line(x1, y1, x2, y2, props));
	}, [x1, y1, x2, y2, props]);

	return null;
};
Line.displayName = 'Line';

export const Rectangle: FC<Props.RectangleProps> = ({
	x,
	y,
	width,
	height,
	...props
}) => {
	const { render } = useContext(RoughContext);

	useDeepCompareEffect(() => {
		render(rc => rc.rectangle(x, y, width, height, props));
	}, [x, y, width, height, props]);

	return null;
};
Rectangle.displayName = 'Rectangle';

export const Ellipse: FC<Props.EllipseProps> = ({
	x,
	y,
	width,
	height,
	...props
}) => {
	const { render } = useContext(RoughContext);

	useDeepCompareEffect(() => {
		render(rc => rc.ellipse(x, y, width, height, props));
	}, [x, y, width, height, props]);

	return null;
};
Ellipse.displayName = 'Ellipse';

export const Circle: FC<Props.CircleProps> = ({ x, y, diameter, ...props }) => {
	const { render } = useContext(RoughContext);

	useDeepCompareEffect(() => {
		render(rc => rc.circle(x, y, diameter, props));
	}, [x, y, diameter, props]);

	return null;
};
Circle.displayName = 'Circle';

export const LinearPath: FC<Props.LinearPathProps> = ({ points, ...props }) => {
	const { render } = useContext(RoughContext);

	useDeepCompareEffect(() => {
		render(rc => rc.linearPath(points, props));
	}, [points, props]);

	return null;
};
LinearPath.displayName = 'LinearPath';

export const Polygon: FC<Props.PolygonProps> = ({ points, ...props }) => {
	const { render } = useContext(RoughContext);

	useDeepCompareEffect(() => {
		render(rc => rc.polygon(points, props));
	}, [points, props]);

	return null;
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
	const { render } = useContext(RoughContext);

	useDeepCompareEffect(() => {
		render(rc => rc.arc(x, y, width, height, start, stop, closed, props));
	}, [x, y, width, height, start, stop, closed, props]);

	return null;
};
Arc.displayName = 'Arc';

export const Curve: FC<Props.CurveProps> = ({ points, ...props }) => {
	const { render } = useContext(RoughContext);

	useDeepCompareEffect(() => {
		render(rc => rc.curve(points, props));
	}, [points, props]);

	return null;
};
Curve.displayName = 'Curve';

export const Path: FC<Props.PathProps> = ({ d, ...props }) => {
	const { render } = useContext(RoughContext);

	useDeepCompareEffect(() => {
		render(rc => rc.path(d, props));
	}, [d, props]);

	return null;
};
Path.displayName = 'Path';
