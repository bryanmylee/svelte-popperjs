/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
export type Action = (
	node: HTMLElement,
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	params?: any
) => ActionLifecycleHandlers;
export type ActionLifecycleHandlers = {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	update?: (params: any) => void;
	destroy?: () => void;
};

export const getElements = () => [
	global.document.createElement('div'),
	global.document.createElement('div'),
];

export const mountWithAction =
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	(node: HTMLElement, action: Action, params?: any) => action(node, params);

export const unmount = (_: HTMLElement, lifecycle: ActionLifecycleHandlers) => {
	if (lifecycle.destroy) {
		lifecycle.destroy();
	}
};
