import { Options } from 'roughjs/bin/core';
import { Point } from 'roughjs/bin/geometry';

export interface LineProps extends Options {
	x1: number;
	y1: number;
	x2: number;
	y2: number;
}

export interface RectangleProps extends Options {
	x: number;
	y: number;
	width: number;
	height: number;
}

export interface EllipseProps extends Options {
	x: number;
	y: number;
	width: number;
	height: number;
}

export interface CircleProps extends Options {
	x: number;
	y: number;
	diameter: number;
}

export interface LinearPathProps extends Options {
	points: Point[];
}

export interface PolygonProps extends Options {
	points: Point[];
}

export interface ArcProps extends Options {
	x: number;
	y: number;
	width: number;
	height: number;
	start: number;
	stop: number;
	closed?: boolean;
}

export interface CurveProps extends Options {
	points: Point[];
}

export interface PathProps extends Options {
	d: string;
}
