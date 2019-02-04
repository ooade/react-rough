import React from 'react';
import { configure, mount, render } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import ReactRough, { RoughConsumer } from '../src';

configure({ adapter: new Adapter() });

describe('ReactRough', () => {
	describe('Core', () => {
		it('should render properly', () => {
			const wrapper = render(<ReactRough width={200} height={400} />);
			expect(wrapper).toMatchSnapshot();
		});

		it('should render properly with children', () => {
			const wrapper = render(
				<ReactRough width={200} height={400}>
					<ReactRough.Circle />
				</ReactRough>
			);
			expect(wrapper).toMatchSnapshot();
		});
	});

	describe('Arc', () => {
		it('should render properly with props', () => {
			const wrapper = mount(
				<ReactRough width={200} height={400}>
					<ReactRough.Arc points={[50, 50, 80]} fill="red" />
				</ReactRough>
			);

			expect(wrapper).toMatchSnapshot();
		});
	});

	describe('Circle', () => {
		it('should render properly with props', () => {
			const wrapper = mount(
				<ReactRough width={200} height={400}>
					<ReactRough.Circle points={[50, 50, 80]} fill="red" />
				</ReactRough>
			);

			expect(wrapper).toMatchSnapshot();
		});
	});

	describe('Ellipse', () => {
		it('should render properly with props', () => {
			const wrapper = mount(
				<ReactRough width={200} height={400}>
					<ReactRough.Ellipse
						points={[10, 50, 150, 80]}
						fill="blue"
						stroke="red"
					/>
				</ReactRough>
			);

			expect(wrapper).toMatchSnapshot();
		});
	});

	describe('Line', () => {
		it('should render properly with props', () => {
			const wrapper = mount(
				<ReactRough width={200} height={400}>
					<ReactRough.Line
						points={[60, 60, 190, 60]}
						fill="blue"
						stroke="red"
					/>
				</ReactRough>
			);

			expect(wrapper).toMatchSnapshot();
		});
	});

	describe('Path', () => {
		it('should render properly with props', () => {
			const wrapper = mount(
				<ReactRough width={200} height={400}>
					<ReactRough.Path
						dataString="M80 80 A 45 45, 0, 0, 0, 125 125 L 125 80 Z"
						fill="blue"
						stroke="red"
					/>
				</ReactRough>
			);

			expect(wrapper).toMatchSnapshot();
		});

		// it('should throw error when points is used', () => {
		// 	expect(() => {
		// 		mount(
		// 			<ReactRough width={200} height={400}>
		// 				<ReactRough.Path
		// 					points="M80 80 A 45 45, 0, 0, 0, 125 125 L 125 80 Z"
		// 					fill="blue"
		// 					stroke="red"
		// 				/>
		// 			</ReactRough>
		// 		);
		// 	}).toThrowError('You need a dataString property for path, not points');
		// });
	});
});
