import React from 'react'
import ReactDOM from 'react-dom'
import ReactRough, { Circle } from '../../src'

const App = () => (
	<div>
		<Circle width="300" height="500" data={[50, 50, 80]} />
		<Circle width="300" height="500" data={[50, 50, 80]} />
	</div>
)

ReactDOM.render(<App />, document.getElementById('root'))
