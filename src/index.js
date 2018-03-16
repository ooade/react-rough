import React, { Component } from 'react'
import Rough from 'roughjs'
import PropTypes from 'prop-types'
import createReactContext from 'create-react-context'

const RoughContext = createReactContext('rough')

class RoughProvider extends Component {
	setCanvas = canvas => (this.canvas = canvas)

	setData = data => (this.data = data)

	setWidth = width => (this.width = width)

	setHeight = height => (this.height = height)

	setShape = shape => (this.shape = shape)

	componentDidMount() {
		console.log(this.canvas)
		let rc = Rough.canvas(this.canvas)

		switch (this.shape) {
			case 'circle':
				rc.circle(...this.data)
				break
		}
	}

	render() {
		return (
			<RoughContext.Provider
				value={{
					setCanvas: this.setCanvas,
					setData: this.setData,
					setWidth: this.setWidth,
					setHeight: this.setHeight,
					setShape: this.setShape
				}}
			>
				{this.props.children}
			</RoughContext.Provider>
		)
	}
}

class ReactRough extends Component {
	render() {
		return (
			<RoughProvider>
				<RoughContext.Consumer>
					{({ setCanvas, setData, setHeight, setWidth, setShape }) => {
						let canvas = document.createElement('canvas')
						canvas.id = 'rough'

						if (!document.getElementById('rough')) {
							document.body.appendChild(canvas)
						}

						setWidth(500)
						setHeight(200)
						setCanvas(canvas)

						return React.cloneElement(this.props.children, {
							hasParent: true,
							setData,
							setShape
						})
					}}
				</RoughContext.Consumer>
			</RoughProvider>
		)
	}
}

class Circle extends Component {
	render() {
		const { data, height, width, hasParent, setData, setShape } = this.props

		if (!this.hasParent)
			return (
				<div>
					<canvas ref={i => (this.canvas = i)} />
					<RoughProvider>
						<RoughContext.Consumer>
							{({ setCanvas, setData, setHeight, setWidth, setShape }) => {
								console.log(this.canvas)
								setCanvas(this.canvas)
								setData(data)
								setHeight(height)
								setWidth(width)
								setShape('circle')

								return null
							}}
						</RoughContext.Consumer>
					</RoughProvider>
				</div>
			)

		setData(this.data)
		setShape(shape)
		return null
	}
}

export { Circle }
export default ReactRough
