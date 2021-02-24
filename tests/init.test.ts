import { createPopperActions } from '../src/index';
import { getElements, mountWithAction, unmount } from './helpers';

test('instance should init if and only if ref and content is mounted', () => {
  // Arrange
  const [refDiv, contentDiv] = getElements();
  const [refAction, contentAction, getInstance] = createPopperActions();

  // Act and Assert
  expect(getInstance()).toBeNull();
  mountWithAction(refDiv, refAction);

  expect(getInstance()).toBeNull();
  mountWithAction(contentDiv, contentAction);

  expect(getInstance()).not.toBeNull();
});

test('instance should deinit if ref is unmounted', () => {
  // Arrange
  const [refDiv, contentDiv] = getElements();
  const [refAction, contentAction, getInstance] = createPopperActions();
  mountWithAction(contentDiv, contentAction);
  const refLifecycle = mountWithAction(refDiv, refAction);

  // Act
  unmount(refDiv, refLifecycle);

  // Assert
  expect(getInstance()).toBeNull();
});

test('instance should deinit if content is unmounted', () => {
  // Arrange
  const [refDiv, contentDiv] = getElements();
  const [refAction, contentAction, getInstance] = createPopperActions();
  mountWithAction(refDiv, refAction);
  const contentLifecycle = mountWithAction(contentDiv, contentAction);

  // Act
  unmount(contentDiv, contentLifecycle);

  // Assert
  expect(getInstance()).toBeNull();
});

test('instance should deinit if ref and content is unmounted', () => {
  // Arrange
  const [refDiv, contentDiv] = getElements();
  const [refAction, contentAction, getInstance] = createPopperActions();
  const refLifecycle = mountWithAction(refDiv, refAction);
  const contentLifecycle = mountWithAction(contentDiv, contentAction);

  // Act
  unmount(refDiv, refLifecycle);
  unmount(contentDiv, contentLifecycle);

  // Assert
  expect(getInstance()).toBeNull();
});

