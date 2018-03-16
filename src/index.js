import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import Rough from 'roughjs'
import PropTypes from 'prop-types'

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
		const { height, width, render } = this.props

		return <div />
	}
}

export default ReactRough
