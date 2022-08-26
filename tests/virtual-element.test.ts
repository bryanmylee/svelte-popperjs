import { VirtualElement } from '../src/index';
import { act, cleanup, render, screen } from '@testing-library/svelte';
import VirtualElementTest from './virtual-element.test.svelte';
import { writable } from 'svelte/store';

afterEach(() => {
	cleanup();
});

test('content is placed at the virtual element', async () => {
	const x = 250;
	const y = 350;
	const virtualElement: VirtualElement = {
		getBoundingClientRect: () =>
			({
				width: 0,
				height: 0,
				top: y,
				bottom: y,
				left: x,
				right: x,
			} as DOMRect),
	};
	render(VirtualElementTest, { virtualElement });
	await act();
	const contentElement = screen.getByTestId('content');
	expect(contentElement).toHaveStyle({
		transform: `translate(${x}px, ${y}px)`,
	});
});

test('content follows a readable virtual element', async () => {
	const firstX = 250;
	const firstY = 350;
	const virtualElement = writable({
		getBoundingClientRect: () =>
			({
				width: 0,
				height: 0,
				top: firstY,
				bottom: firstY,
				left: firstX,
				right: firstX,
			} as DOMRect),
	});
	render(VirtualElementTest, { virtualElement });
	await act();

	const contentElement = screen.getByTestId('content');
	expect(contentElement).toHaveStyle({
		transform: `translate(${firstX}px, ${firstY}px)`,
	});

	const secondX = 500;
	const secondY = 200;
	virtualElement.set({
		getBoundingClientRect: () =>
			({
				width: 0,
				height: 0,
				top: secondY,
				bottom: secondY,
				left: secondX,
				right: secondX,
			} as DOMRect),
	});
	await act();
	expect(contentElement).toHaveStyle({
		transform: `translate(${secondX}px, ${secondY}px)`,
	});
});
