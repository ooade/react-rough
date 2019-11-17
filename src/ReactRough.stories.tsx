import React from 'react';
import { storiesOf } from '@storybook/react';
import { number, text, array, color, boolean } from '@storybook/addon-knobs';
import ReactRough, {
	ReactRoughSvg,
	Rectangle,
	Line,
	Arc,
	Curve,
	Ellipse,
	Circle,
	LinearPath,
	Polygon,
	Path,
	Point
} from './index';

const stories = storiesOf('Basic Rough Renders', module);

stories.add('Basic Canvas Rough Element', () => {
	return (
		<ReactRough>
			<Rectangle
				x={number('x', 15)}
				y={number('y', 15)}
				width={number('width', 80)}
				fill={color('color', 'red')}
				height={number('height', 80)}
			/>
		</ReactRough>
	);
});

stories.add('Basic Svg Rough Element', () => {
	return (
		<>
			<ReactRoughSvg>
				<Rectangle
					x={number('x', 15)}
					y={number('y', 15)}
					width={number('width', 80)}
					fill={color('color', 'red')}
					height={number('height', 80)}
				/>
				<Circle
					x={number('centerX', 80)}
					y={number('centerY', 50)}
					diameter={number('diameter', 80)}
					fill={color('color', 'rgba(202, 122, 98, 0.7)')}
				/>
			</ReactRoughSvg>
		</>
	);
});

const roughStories = storiesOf('Basic Element Stories', module);

roughStories.add('Basic Line Element', () => {
	return (
		<ReactRough>
			<Line
				x1={number('x1', 80)}
				y1={number('y1', 120)}
				x2={number('x2', 300)}
				y2={number('y2', 100)}
			/>
		</ReactRough>
	);
});

roughStories.add('Basic Ellipse Element', () => {
	return (
		<ReactRough>
			<Ellipse
				x={number('centerX', 100)}
				y={number('centerY', 100)}
				width={number('width', 150)}
				height={number('height', 80)}
			/>
		</ReactRough>
	);
});

roughStories.add('Basic Circle Element', () => {
	return (
		<ReactRough>
			<Circle
				x={number('centerX', 80)}
				y={number('centerY', 50)}
				diameter={number('diameter', 80)}
				fill={color('color', 'rgba(202, 122, 98, 0.7)')}
			/>
		</ReactRough>
	);
});

roughStories.add('Basic Linear Path Element', () => {
	return (
		<ReactRough width={700} height={500}>
			<LinearPath
				points={[
					[490, 10],
					[590, 20],
					[550, 120],
					[490, 100]
				]}
			/>
		</ReactRough>
	);
});

roughStories.add('Basic Polygon Element', () => {
	return (
		<ReactRough width={700} height={500}>
			<Polygon
				points={[
					[490, 130],
					[590, 120],
					[550, 160],
					[490, 200]
				]}
				fill={color('color', 'red')}
			/>
		</ReactRough>
	);
});

roughStories.add('Basic Arc Element', () => {
	return (
		<ReactRough width={400} height={400}>
			<Arc
				x={number('x', 350)}
				y={number('y', 300)}
				width={number('width', 200)}
				height={number('height', 180)}
				start={number('start', Math.PI)}
				stop={number('stop', Math.PI * 1.6)}
				closed={boolean('closed', true)}
				fill={color('color', 'red')}
			/>
		</ReactRough>
	);
});

roughStories.add('Basic Curve Element', () => {
	// draw sine curve
	let points: Point[] = [];
	for (let i = 0; i < 20; i++) {
		let x = (400 / 20) * i + 10;
		let xdeg = (Math.PI / 100) * x;
		let y = Math.round(Math.sin(xdeg) * 90) + 200;
		points.push([x, y]);
	}
	return (
		<ReactRough width={600} height={600}>
			<Curve points={points} stroke={color('color', 'red')} />
		</ReactRough>
	);
});

roughStories.add('Basic Path Element', () => {
	return (
		<ReactRough width={600} height={600}>
			<Path
				d="M80 80 A 45 45, 0, 0, 0, 125 125 L 125 80 Z"
				stroke={color('color', 'red')}
			/>
		</ReactRough>
	);
});

roughStories.add('Combo of Path and Circle', () => {
	return (
		<>
			<ReactRoughSvg width={600} height={600}>
				<Path d="M234.4,182.8c-3.5,0-6.4,2.9-6.4,6.4c0,3.5,2.9,6.4,6.4,6.4c3.5,0,6.4-2.9,6.4-6.4C240.8,185.6,238,182.8,234.4,182.8z" />
				<Circle x={234.4} y={189.2} diameter={2.8} />
			</ReactRoughSvg>
		</>
	);
});
