import React from 'react'
import ReactDOM from 'react-dom'
import ReactRough, { Circle, Ellipse, Line } from '../../src'

const App = () => (
	<div>
		<ReactRough
			width="500"
			height="200"
			// render={rc => {
			// 	rc.circle(80, 120, 50) // centerX, centerY, diameter
			// 	rc.ellipse(300, 100, 150, 80) // centerX, centerY, width, height
			// 	rc.line(80, 120, 300, 100) // x1, y1, x2, y2
			// }}
		>
			<Circle points={[80, 120, 50]} roughness="2.8" fill="blue" />
			<Ellipse points={[300, 100, 150, 80]} />
			<Line points={[80, 120, 300, 100]} />
		</ReactRough>
		<Circle width="500" height="200" points={[80, 120, 50]} fill="red" />
	</div>
)

ReactDOM.render(<App />, document.getElementById('root'))
