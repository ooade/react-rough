import React from 'react'
import ReactDOM from 'react-dom'
import ReactRough from '../../src'

const App = () => (
	<div>
		<ReactRough
			width="500"
			height="200"
			render={rc => {
				rc.circle(80, 120, 50) // centerX, centerY, diameter
				rc.ellipse(300, 100, 150, 80) // centerX, centerY, width, height
				rc.line(80, 120, 300, 100) // x1, y1, x2, y2
			}}
		>
			{/* <Circle data={[80, 120, 50]} />
		<Ellipse data={[300, 100, 150, 80]} />
		<Line data={[80, 120, 300, 100]} /> */}
		</ReactRough>
	</div>
)

ReactDOM.render(<App />, document.getElementById('root'))
