import { createPopperActions } from './index';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Action = (node: HTMLElement, params?: any) => ActionLifecycleHandlers;
type ActionLifecycleHandlers = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  update?: (params: any) => void,
  destroy? : () => void,
}

const getElements = () => [
  global.document.createElement('div'),
  global.document.createElement('div'),
];

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const mountWithAction = (node: HTMLElement, action: Action, params?: any) => {
  return action(node, params);
};

const unmount = (node: HTMLElement, lifecycle: ActionLifecycleHandlers) => {
  if (lifecycle.destroy) {
    lifecycle.destroy();
  }
};

test('init', () => {
  // Arrange
  const [refDiv, contentDiv] = getElements();
  const [refAction, contentAction, getInstance] = createPopperActions();

  // Act and Assert
  expect(getInstance()).toBeNull();
  mountWithAction(refDiv, refAction);

  expect(getInstance()).toBeNull();
  mountWithAction(contentDiv, contentAction, {});

  expect(getInstance()).not.toBeNull();
});

test('deinit unmount ref', () => {
  // Arrange
  const [refDiv, contentDiv] = getElements();
  const [refAction, contentAction, getInstance] = createPopperActions();
  mountWithAction(contentDiv, contentAction, {});
  const refLifecycle = mountWithAction(refDiv, refAction);

  // Act
  unmount(refDiv, refLifecycle);

  // Assert
  expect(getInstance()).toBeNull();
});

test('deinit unmount content', () => {
  // Arrange
  const [refDiv, contentDiv] = getElements();
  const [refAction, contentAction, getInstance] = createPopperActions();
  mountWithAction(refDiv, refAction);
  const contentLifecycle = mountWithAction(contentDiv, contentAction, {});

  // Act
  unmount(contentDiv, contentLifecycle);

  // Assert
  expect(getInstance()).toBeNull();
});

test('deinit unmount both', () => {
  // Arrange
  const [refDiv, contentDiv] = getElements();
  const [refAction, contentAction, getInstance] = createPopperActions();
  const refLifecycle = mountWithAction(refDiv, refAction);
  const contentLifecycle = mountWithAction(contentDiv, contentAction, {});

  // Act
  unmount(refDiv, refLifecycle);
  unmount(contentDiv, contentLifecycle);

  // Assert
  expect(getInstance()).toBeNull();
});

