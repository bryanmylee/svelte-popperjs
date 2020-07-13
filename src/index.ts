import { createPopper, Instance, OptionsGeneric, Modifier } from '@popperjs/core';

type PopperOptions = Partial<OptionsGeneric<Partial<Modifier<any, any>>>>;
type ReferenceAction = (node: HTMLElement, popperOptions: PopperOptions) => {
  update(popperOptions: PopperOptions): void;
  destroy(): void;
};
type ContentAction = (node: HTMLElement) => {
  destroy(): void;
};

export function createPopperActions() {
  let popperInstance: Instance;
  let referenceNode: HTMLElement;
  let contentNode: HTMLElement;
  let options: PopperOptions | undefined;

  function referenceAction(node: HTMLElement, popperOptions?: PopperOptions) {
    referenceNode = node;
    options = popperOptions;
    return {
      update(popperOptions: PopperOptions) {
        options = popperOptions;
        popperInstance.setOptions(options);
      },
      destroy() {
        popperInstance.destroy();
      }
    }
  }

  function contentAction(node: HTMLElement) {
    contentNode = node;
    popperInstance = createPopper(referenceNode, contentNode, options);
    return {
      destroy() {
        popperInstance.destroy();
      }
    }
  }

  return [ referenceAction, contentAction ] as [ ReferenceAction, ContentAction ];
}