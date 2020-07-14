import { createPopper, Instance, OptionsGeneric, Modifier } from '@popperjs/core';

type PopperOptions = Partial<OptionsGeneric<Partial<Modifier<any, any>>>>;
type ReferenceAction = (node: HTMLElement) => {
  destroy(): void;
};
type ContentAction = (node: HTMLElement, popperOptions: PopperOptions) => {
  update(popperOptions: PopperOptions): void;
  destroy(): void;
};

export function createPopperActions() {
  let popperInstance: Instance | null;
  let referenceNode: HTMLElement;
  let contentNode: HTMLElement;
  let options: PopperOptions | undefined;

  function referenceAction(node: HTMLElement) {
    referenceNode = node;
    return {
      destroy() {
        if (popperInstance) {
          popperInstance.destroy();
          popperInstance = null;
        }
      }
    }
  }

  function contentAction(node: HTMLElement, popperOptions?: PopperOptions) {
    contentNode = node;
    options = popperOptions;
    popperInstance = createPopper(referenceNode, contentNode, options);
    return {
      update(popperOptions: PopperOptions) {
        options = popperOptions;
        if (popperInstance) popperInstance.setOptions(options);
      },
      destroy() {
        if (popperInstance) {
          popperInstance.destroy();
          popperInstance = null;
        }
      }
    }
  }

  return [ referenceAction, contentAction ] as [ ReferenceAction, ContentAction ];
}