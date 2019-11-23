import useDeepCompareEffect from 'use-deep-compare-effect';
import { useContext, FC } from 'react';

import { RoughContext } from './';
import * as Props from './RoughComponentProps';

export { Point } from 'roughjs/bin/geometry';

const random = () => `${Math.round(Math.random() * 100000)}`.padEnd(7, '0');

export const Line: FC<Props.LineProps> = ({ x1, y1, x2, y2, ...props }) => {
	const { render, remove } = useContext(RoughContext);
	const token = `line-${random()}`;

	useDeepCompareEffect(() => {
		render(rc => [rc.line(x1, y1, x2, y2, props), token]);
		return () => remove(token);
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
	const { render, remove } = useContext(RoughContext);
	const token = `rect-${random()}`;

	useDeepCompareEffect(() => {
		render(rc => [rc.rectangle(x, y, width, height, props), token]);
		return () => remove(token);
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
	const { render, remove } = useContext(RoughContext);
	const token = `ellipse-${random()}`;

	useDeepCompareEffect(() => {
		render(rc => [rc.ellipse(x, y, width, height, props), token]);
		return () => remove(token);
	}, [x, y, width, height, props]);

	return null;
};
Ellipse.displayName = 'Ellipse';

export const Circle: FC<Props.CircleProps> = ({ x, y, diameter, ...props }) => {
	const { render, remove } = useContext(RoughContext);
	const token = `circle-${random()}`;

	useDeepCompareEffect(() => {
		render(rc => [rc.circle(x, y, diameter, props), token]);
		return () => remove(token);
	}, [x, y, diameter, props]);

	return null;
};
Circle.displayName = 'Circle';

export const LinearPath: FC<Props.LinearPathProps> = ({ points, ...props }) => {
	const { render, remove } = useContext(RoughContext);
	const token = `linear-${random()}`;

	useDeepCompareEffect(() => {
		render(rc => [rc.linearPath(points, props), token]);
		return () => remove(token);
	}, [points, props]);

	return null;
};
LinearPath.displayName = 'LinearPath';

export const Polygon: FC<Props.PolygonProps> = ({ points, ...props }) => {
	const { render, remove } = useContext(RoughContext);
	const token = `poly-${random()}`;

	useDeepCompareEffect(() => {
		render(rc => [rc.polygon(points, props), token]);
		return () => remove(token);
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
	const { render, remove } = useContext(RoughContext);
	const token = `arc-${random()}`;

	useDeepCompareEffect(() => {
		render(rc => [
			rc.arc(x, y, width, height, start, stop, closed, props),
			token
		]);
		return () => remove(token);
	}, [x, y, width, height, start, stop, closed, props]);

	return null;
};
Arc.displayName = 'Arc';

export const Curve: FC<Props.CurveProps> = ({ points, ...props }) => {
	const { render, remove } = useContext(RoughContext);
	const token = `curve-${random()}`;

	useDeepCompareEffect(() => {
		render(rc => [rc.curve(points, props), token]);
		return () => remove(token);
	}, [points, props]);

	return null;
};
Curve.displayName = 'Curve';

export const Path: FC<Props.PathProps> = ({ d, ...props }) => {
	const { render, remove } = useContext(RoughContext);
	const token = `path-${random()}`;

	useDeepCompareEffect(() => {
		render(rc => [rc.path(d, props), token]);
		return () => remove(token);
	}, [d, props]);

	return null;
};
Path.displayName = 'Path';
