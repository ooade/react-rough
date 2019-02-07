import React from 'react';
import { configure, mount, render } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import ReactRough, {
	NodeMounter,
	Arc,
	Circle,
	Curve,
	Ellipse,
	Line,
	LinearPath,
	Path,
	Polygon,
	Rectangle
} from '../src';

configure({ adapter: new Adapter() });

describe('ReactRough', () => {
	let consoleError;

	beforeAll(() => {
		jest.spyOn(window._virtualConsole, 'emit').mockImplementation(() => false);

		consoleError = jest.spyOn(console, 'error').mockImplementation(() => false);
	});

	afterAll(() => {
		consoleError.mockClear();
	});

	describe('Core', () => {
		it('should render properly', () => {
			const wrapper = render(<ReactRough width={200} height={400} />);
			expect(wrapper).toMatchSnapshot();
		});

		it('should render properly with svg renderer', () => {
			const wrapper = render(<ReactRough width={200} height={400} renderer="svg" />);
			expect(wrapper).toMatchSnapshot();
		});

		it('should clear the canvas on first render', () => {
			const spy = jest.spyOn(ReactRough.prototype, 'clearCanvas');
			const wrapper = mount(
				<ReactRough width={200} height={400}>
					<Circle points={[50, 50, 80]} fill="red" />
				</ReactRough>
			);
			expect(wrapper.instance().ctx).not.toBeNull()
			expect(spy).toHaveBeenCalledTimes(2);
			spy.mockRestore();
		});

		it('should clear the canvas on redraw', () => {
			const spy = jest.spyOn(ReactRough.prototype, 'clearCanvas');
			const wrapper = mount(
				<ReactRough width={200} height={400}>
					<Circle points={[50, 50, 80]} fill="red" />
				</ReactRough>
			);
			expect(spy).toHaveBeenCalledTimes(2);
			wrapper.instance().redraw();
			expect(spy).toHaveBeenCalledTimes(3);
			spy.mockRestore();
		});

		it('should use backgroundColor as canvas background color', () => {
			const wrapper = mount(
				<ReactRough
					width={200}
					height={400}
					backgroundColor="rgba(126, 255, 0, 0.1)"
				>
					<Circle points={[50, 50, 80]} fill="red" />
				</ReactRough>
			);
			expect(wrapper).toMatchSnapshot();
		});

		it('should use backgroundColor as svg background color', () => {
			const wrapper = mount(
				<ReactRough
					width={200}
					height={400}
					backgroundColor="rgba(126, 255, 0, 0.1)"
					renderer="svg"
				/>
			);
			expect(wrapper).toMatchSnapshot();
		});

		it('should render properly with children', () => {
			const wrapper = mount(
				<ReactRough width={200} height={400}>
					<Circle points={[50, 50, 80]} fill="red" />
				</ReactRough>
			);
			expect(wrapper).toMatchSnapshot();
		});

		it('should render properly when nested within other components', () => {
			const SomeComponent = () => <div>Some Component </div>;

			const wrapper = mount(
				<ReactRough width={200} height={400}>
					<SomeComponent>
						<Circle points={[50, 50, 80]} fill="red" />
					</SomeComponent>
				</ReactRough>
			);
			expect(wrapper).toMatchSnapshot();
		});

		it('should throw an error if the Provider component isnt found', () => {
			expect(() =>
				mount(<Circle points={[50, 50, 80]} fill="red" />)
			).toThrowError('ReactRough Component not found!');
		});

		it('should throw an error if an invalid key is provided to a static component', () => {
			expect(() =>
				mount(
					<ReactRough width={200} height={400}>
						<Circle points={[50, 50, 80]} fsill="red" />
					</ReactRough>
				)
			).toThrowError('Invalid key "fsill" assigned to "circle component"');
		});

		it('should update svg as the props update', () => {
			const cDMspy = jest.spyOn(NodeMounter.prototype, 'componentDidMount');
			const cDUspy = jest.spyOn(NodeMounter.prototype, 'componentDidUpdate');
			const cWUspy = jest.spyOn(NodeMounter.prototype, 'componentWillUnmount');
			const wrapper = mount(
				<ReactRough width={200} height={400} renderer="svg">
					<Circle points={[50, 50, 80]} fill="red" />
				</ReactRough>
			);
			expect(cDMspy).toHaveBeenCalledTimes(1)
			expect(cDUspy).toHaveBeenCalledTimes(0)
			expect(cWUspy).toHaveBeenCalledTimes(0)
			const firstRender = wrapper.find('g').html();

			wrapper.setProps({
				children: React.cloneElement(wrapper.props().children, { points: [60, 60, 90] })
			});
			expect(cDMspy).toHaveBeenCalledTimes(1)
			expect(cDUspy).toHaveBeenCalledTimes(1)
			expect(cWUspy).toHaveBeenCalledTimes(0)

			const secondRender = wrapper.find('g').html();
			expect(secondRender).not.toEqual(firstRender);

			wrapper.unmount();
			expect(cDMspy).toHaveBeenCalledTimes(1)
			expect(cDUspy).toHaveBeenCalledTimes(1)
			expect(cWUspy).toHaveBeenCalledTimes(1)
		});
	});

	describe('Arc', () => {
		it('should render properly with props', () => {
			const wrapper = mount(
				<ReactRough width={200} height={400}>
					<Arc points={[50, 50, 80]} fill="red" />
				</ReactRough>
			);

			expect(wrapper).toMatchSnapshot();
		});
	});

	describe('Circle', () => {
		it('should render properly with props', () => {
			const wrapper = mount(
				<ReactRough width={200} height={400}>
					<Circle points={[50, 50, 80]} fill="red" />
				</ReactRough>
			);

			expect(wrapper).toMatchSnapshot();
		});
	});

	describe('Curve', () => {
		it('should render properly with props', () => {
			// draw sine curve
			let points = [];
			for (let i = 0; i < 20; i++) {
				let x = (400 / 20) * i + 10;
				let xdeg = (Math.PI / 100) * x;
				let y = Math.round(Math.sin(xdeg) * 90) + 500;
				points.push([x, y]);
			}

			const wrapper = mount(
				<ReactRough width={200} height={400}>
					<Curve points={points} fill="red" />
				</ReactRough>
			);

			expect(wrapper).toMatchSnapshot();
		});
	});

	describe('Ellipse', () => {
		it('should render properly with props', () => {
			const wrapper = mount(
				<ReactRough width={200} height={400}>
					<Ellipse points={[10, 50, 150, 80]} fill="blue" stroke="red" />
				</ReactRough>
			);

			expect(wrapper).toMatchSnapshot();
		});
	});

	describe('Line', () => {
		it('should render properly with props', () => {
			const wrapper = mount(
				<ReactRough width={200} height={400}>
					<Line points={[60, 60, 190, 60]} fill="blue" stroke="red" />
				</ReactRough>
			);

			expect(wrapper).toMatchSnapshot();
		});
	});

	describe('Path', () => {
		it('should render properly with props', () => {
			const wrapper = mount(
				<ReactRough width={200} height={400}>
					<Path
						dataString="M80 80 A 45 45, 0, 0, 0, 125 125 L 125 80 Z"
						fill="blue"
						stroke="red"
					/>
				</ReactRough>
			);

			expect(wrapper).toMatchSnapshot();
		});

		it('should throw error when points is used', () => {
			expect(() => {
				mount(
					<ReactRough width={200} height={400}>
						<Path
							points="M80 80 A 45 45, 0, 0, 0, 125 125 L 125 80 Z"
							fill="blue"
							stroke="red"
						/>
					</ReactRough>
				);
			}).toThrowError('You need a dataString property for path, not points');
		});
	});

	describe('Polygon', () => {
		it('should render properly with props', () => {
			const wrapper = mount(
				<ReactRough width={200} height={400}>
					<Polygon
						points={[[690, 130], [790, 140], [750, 240], [690, 220]]}
						fill="blue"
						stroke="red"
					/>
				</ReactRough>
			);

			expect(wrapper).toMatchSnapshot();
		});
	});

	describe('Rectangle', () => {
		it('should render properly with props', () => {
			const wrapper = mount(
				<ReactRough width={200} height={400}>
					<Rectangle points={[10, 10, 100, 100]} fill="blue" stroke="red" />
				</ReactRough>
			);

			expect(wrapper).toMatchSnapshot();
		});
	});

	describe('LinearPath', () => {
		it('should render properly with props', () => {
			const wrapper = mount(
				<ReactRough width={200} height={400}>
					<LinearPath
						points={[[690, 130], [790, 140], [750, 240], [690, 220]]}
						fill="blue"
						stroke="red"
					/>
				</ReactRough>
			);

			expect(wrapper).toMatchSnapshot();
		});
	});
});
