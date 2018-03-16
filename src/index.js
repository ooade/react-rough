import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import Rough from 'roughjs'

class ReactRough extends Component {
	componentDidMount() {
		const { height, width, render } = this.props

		let canvas = document.createElement('canvas')
		canvas.height = height
		canvas.width = width

		let rc = Rough.canvas(canvas)

		render(rc)

		ReactDOM.findDOMNode(this).appendChild(canvas)
	}

	render() {
		return <div />
	}
}

export default ReactRough
