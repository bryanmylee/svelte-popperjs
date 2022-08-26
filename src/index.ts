import type { Readable } from 'svelte/store';
import {
	createPopper,
	Instance,
	OptionsGeneric,
	Modifier,
	type VirtualElement,
} from '@popperjs/core';
import { onDestroy } from 'svelte';
export type { VirtualElement } from '@popperjs/core';

export type PopperOptions<TModifier> =
	| Partial<OptionsGeneric<TModifier>>
	| undefined;

export type ReferenceAction = (
	node: Element | VirtualElement | Readable<VirtualElement>
) => {
	destroy?(): void;
};

export type ContentAction<TModifier> = (
	node: HTMLElement,
	popperOptions?: PopperOptions<TModifier>
) => {
	update(popperOptions: PopperOptions<TModifier>): void;
	destroy(): void;
};

export function createPopperActions<
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	TModifier extends Partial<Modifier<any, any>>
>(
	initOptions?: PopperOptions<TModifier>
): [ReferenceAction, ContentAction<TModifier>, () => Instance | null] {
	let popperInstance: Instance | null = null;
	let referenceNode: VirtualElement | Element | undefined;
	let contentNode: HTMLElement | undefined;
	let options: PopperOptions<TModifier> | undefined = initOptions;

	const initPopper = () => {
		if (referenceNode !== undefined && contentNode !== undefined) {
			popperInstance = createPopper(referenceNode, contentNode, options);
		}
	};

	const deinitPopper = () => {
		if (popperInstance) {
			popperInstance.destroy();
			popperInstance = null;
		}
	};

	const referenceAction: ReferenceAction = (node) => {
		if ('subscribe' in node) {
			setupVirtualElementObserver(node);
			return {};
		} else {
			referenceNode = node;
			initPopper();
			return {
				destroy() {
					deinitPopper();
				},
			};
		}
	};

	const setupVirtualElementObserver = (node: Readable<VirtualElement>) => {
		const unsubscribe = node.subscribe(($node) => {
			if (referenceNode === undefined) {
				referenceNode = $node;
				initPopper();
			} else {
				// Preserve the reference to the virtual element.
				Object.assign(referenceNode, $node);
				popperInstance?.update();
			}
		});
		onDestroy(unsubscribe);
	};

	const contentAction: ContentAction<TModifier> = (node, contentOptions?) => {
		contentNode = node;
		options = { ...initOptions, ...contentOptions };
		initPopper();
		return {
			update(newContentOptions: PopperOptions<TModifier>) {
				options = { ...initOptions, ...newContentOptions };
				if (popperInstance && options) {
					popperInstance.setOptions(options);
				}
			},
			destroy() {
				deinitPopper();
			},
		};
	};

	return [referenceAction, contentAction, () => popperInstance];
}
