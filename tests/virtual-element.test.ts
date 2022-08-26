import { createPopperActions, VirtualElement } from '../src/index';
import { render, screen } from '@testing-library/svelte';
import VirtualElementTest from './virtual-element.test.svelte';

test('content is placed at the virtual element', () => {
	const x = '250px';
	const y = '350px';
	const virtualElement: VirtualElement = {
		getBoundingClientRect: () =>
			({
				top: +y,
				bottom: +y,
				left: +x,
				right: +x,
			} as DOMRect),
	};
	render(VirtualElementTest, { virtualElement });
});
