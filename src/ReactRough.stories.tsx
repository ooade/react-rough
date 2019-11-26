import React from 'react';
import { storiesOf } from '@storybook/react';
import { number, text, color, boolean } from '@storybook/addon-knobs';
import ReactRough, {
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
		<ReactRough
			renderer="svg"
			config={{ options: { fill: text('Rough Color', 'green') } }}
		>
			<Rectangle
				x={number('x', 15)}
				y={number('y', 15)}
				width={number('width', 80)}
				// fill={color('color', 'red')}
				height={number('height', 80)}
			/>
			<Circle
				x={number('centerX', 80)}
				y={number('centerY', 50)}
				diameter={number('diameter', 80)}
				fill={color('color', 'rgba(202, 122, 98, 0.7)')}
			/>
		</ReactRough>
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
	const points: Point[] = [];
	for (let i = 0; i < 20; i++) {
		const x = (400 / 20) * i + 10;
		const xdeg = (Math.PI / 100) * x;
		const y = Math.round(Math.sin(xdeg) * 90) + 200;
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

roughStories.add(
	'A Car with Path and Circle',
	() => {
		return (
			<ReactRough
				renderer="svg"
				width={600}
				height={600}
				config={{ options: { roughness: 0 } }}
			>
				<Path d="M234.4,182.8c-3.5,0-6.4,2.9-6.4,6.4c0,3.5,2.9,6.4,6.4,6.4c3.5,0,6.4-2.9,6.4-6.4C240.8,185.6,238,182.8,234.4,182.8z" />
				<Circle x={234.4} y={189.2} diameter={2.8} />
				<Path d="M263,182.8c-3.5,0-6.4,2.9-6.4,6.4c0,3.5,2.9,6.4,6.4,6.4c3.5,0,6.4-2.9,6.4-6.4C269.4,185.6,266.6,182.8,263,182.8z" />
				<Circle x={263} y={189.2} diameter={2.8} />
				<Path
					d="M275,171.4c-2.8-0.7-5.2-3-6.3-5.1l-3.9-7.4c-1.1-2.1-3.9-3.8-6.3-3.8h-22.6c-2.4,0-5,1.8-5.7,4.1l-2.4,7
        c-0.2,0.9-1.8,5.5-5,5.5c-2.4,0-5,3.1-5,5.5v8.2c0,2.4,1.9,4.3,4.3,4.3h4.5c0-0.2,0-0.3,0-0.5c0-4.3,3.5-7.8,7.8-7.8
        c4.3,0,7.8,3.5,7.8,7.8c0,0.2,0,0.3,0,0.5h13.1c0-0.2,0-0.3,0-0.5c0-4.3,3.5-7.8,7.8-7.8s7.8,3.5,7.8,7.8c0,0.2,0,0.3,0,0.5h8.1
        c2.4,0,4.3-1.9,4.3-4.3v-6.5C283.2,172,277.3,172,275,171.4z"
				/>
				<Path d="M241.8,170.3h-12.5c0.7-1.1,1.1-2.2,1.2-2.6l2-5.9c0.6-1.9,2.8-3.5,4.8-3.5h4.5V170.3z" />
				<Path d="M246.1,170.3v-12h10.4c2,0,4.4,1.5,5.3,3.3l3.3,6.3c0.4,0.8,1.1,1.7,2,2.4H246.1z" />
			</ReactRough>
		);
	},
	{
		info: 'Full Credits: https://codepen.io/tinasweetpooja/pen/jAwAZz'
	}
);
