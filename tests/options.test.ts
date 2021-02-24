/* eslint-disable @typescript-eslint/no-explicit-any */
import { createPopperActions } from '../src/index';
import { getElements, mountWithAction } from './helpers';
import type { OptionsGeneric } from '@popperjs/core';

test('options should be set on create', () => {
  // Arrange
  const [refDiv, contentDiv] = getElements();
  const options: OptionsGeneric<any> = {
    modifiers: [],
    placement: 'right-start',
    strategy: 'absolute',
  };

  // Act
  const [refAction, contentAction, getInstance] = createPopperActions(options);
  mountWithAction(refDiv, refAction);
  mountWithAction(contentDiv, contentAction);

  // Assert
  expect(getInstance()).not.toBeNull();
  expect(getInstance()?.state.options).toEqual(options);
});

test('options should be set on create and merged from content action props', () => {
  // Arrange
  const [refDiv, contentDiv] = getElements();
  const options: OptionsGeneric<any> = {
    modifiers: [],
    placement: 'right-start',
    strategy: 'absolute',
  };
  const newOptionsPartial: Partial<OptionsGeneric<any>> = {
    placement: 'left-start',
  };

  // Act
  const [refAction, contentAction, getInstance] = createPopperActions(options);
  mountWithAction(refDiv, refAction);
  mountWithAction(contentDiv, contentAction, newOptionsPartial);

  // Assert
  expect(getInstance()).not.toBeNull();
  expect(getInstance()?.state.options).toEqual({ ...options, ...newOptionsPartial });
});

test('options should be set on content action', () => {
  // Arrange
  const [refDiv, contentDiv] = getElements();
  const [refAction, contentAction, getInstance] = createPopperActions();
  const options: OptionsGeneric<any> = {
    modifiers: [],
    placement: 'right-start',
    strategy: 'absolute',
  };

  // Act
  mountWithAction(refDiv, refAction);
  mountWithAction(contentDiv, contentAction, options);

  // Assert
  expect(getInstance()).not.toBeNull();
  expect(getInstance()?.state.options).toEqual(options);
});

test('options should be updated when content action props update', () => {
  // Arrange
  const [refDiv, contentDiv] = getElements();
  const [refAction, contentAction, getInstance] = createPopperActions();
  const options: OptionsGeneric<any> = {
    modifiers: [],
    placement: 'right-start',
    strategy: 'absolute',
  };
  const newOptionsPartial: Partial<OptionsGeneric<any>> = {
    placement: 'left-start'
  };

  // Act
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  mountWithAction(refDiv, refAction);
  const { update } = mountWithAction(contentDiv, contentAction, options);
  if (update) update(newOptionsPartial);

  // Assert
  expect(getInstance()).not.toBeNull();
  expect(getInstance()?.state.options).toEqual({ ...options, ...newOptionsPartial });
});

test('options should be updated when content action props update before ref action is mounted', () => {
  // Arrange
  const [refDiv, contentDiv] = getElements();
  const [refAction, contentAction, getInstance] = createPopperActions();
  const options: OptionsGeneric<any> = {
    modifiers: [],
    placement: 'right-start',
    strategy: 'absolute',
  };
  const newOptionsPartial: Partial<OptionsGeneric<any>> = {
    placement: 'left-start'
  };

  // Act
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const { update } = mountWithAction(contentDiv, contentAction, options);
  if (update) update(newOptionsPartial);
  mountWithAction(refDiv, refAction);

  // Assert
  expect(getInstance()).not.toBeNull();
  expect(getInstance()?.state.options).toEqual({ ...options, ...newOptionsPartial });
});

