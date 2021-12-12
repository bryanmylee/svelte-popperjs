import {
	createPopper,
	Instance,
	OptionsGeneric,
	Modifier,
} from '@popperjs/core';

export type PopperOptions<TModifier> =
	| Partial<OptionsGeneric<TModifier>>
	| undefined;

export type ReferenceAction = (node: HTMLElement) => { destroy(): void };

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
	let referenceNode: HTMLElement;
	let contentNode: HTMLElement;
	let options: PopperOptions<TModifier> | undefined = initOptions;

	const initPopper = () => {
		if (referenceNode && contentNode) {
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
		referenceNode = node;
		initPopper();
		return {
			destroy() {
				deinitPopper();
			},
		};
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
