![svelte-popperjs-banner](https://user-images.githubusercontent.com/42545742/102723166-49801c80-4341-11eb-8067-ebc66fdd47f4.png)

# svelte-popperjs

[![npm version](http://img.shields.io/npm/v/svelte-popperjs.svg)](https://www.npmjs.com/package/svelte-popperjs)
[![npm downloads](https://img.shields.io/npm/dm/svelte-popperjs.svg)](https://www.npmjs.com/package/svelte-popperjs)
![license](https://img.shields.io/npm/l/svelte-popperjs)
![build](https://img.shields.io/github/workflow/status/bryanmylee/svelte-popperjs/publish)
[![coverage](https://coveralls.io/repos/github/bryanmylee/svelte-popperjs/badge.svg?branch=master)](https://coveralls.io/github/bryanmylee/svelte-popperjs?branch=master)
[![size](https://img.shields.io/bundlephobia/min/svelte-popperjs)](https://bundlephobia.com/result?p=svelte-popperjs)

Popper for Svelte with actions, no wrapper components or component bindings required!

Other Popper libraries for Svelte (including the official `@popperjs/svelte` library) use a wrapper component that takes the required DOM elements as props. Not only does this require multiple `bind:this`, you also have to pollute your `script` tag with multiple DOM references.

We can do better with Svelte [actions](https://svelte.dev/tutorial/actions)!

## Installation

```bash
$ npm i -D svelte-popperjs
```

Since Svelte automatically bundles all required dependencies, you only need to install this package as a dev dependency with the `-D` flag.

## Usage

`createPopperActions` takes an optional [options object](https://popper.js.org/docs/v2/constructors/#options) for configuring the popper instance, and returns a pair of actions to be used on the [reference and popper elements](https://popper.js.org/docs/v2/constructors/#usage).

The content action also takes an [options object](https://popper.js.org/docs/v2/constructors/#options) for updating the options of the popper instance.

### Example

A Svelte version of the standard [tutorial](https://popper.js.org/docs/v2/tutorial/).

```svelte
<script>
  import { createPopperActions } from 'svelte-popperjs';
  const [popperRef, popperContent] = createPopperActions({
    placement: 'right',
    strategy: 'fixed',
  });
  const extraOpts = {
    modifiers: [
      { name: 'offset', options: { offset: [0, 8] } }
    ],
  };

  let showTooltip = false;
</script>

<button
  use:popperRef
  on:mouseenter={() => showTooltip = true}
  on:mouseleave={() => showTooltip = false}
>
  My button
</button>
{#if showTooltip}
  <div id="tooltip" use:popperContent={extraOpts}>
    My tooltip
    <div id="arrow" data-popper-arrow />
  </div>
{/if}
```

## API

### Setting popper options

Popper options can be set statically when creating the popper actions, or dynamically on the content action.

If both are set, then the dynamic options will be merged with the initial options.

```svelte
<script>
  // set once and no longer updated
  const [popperRef, popperContent] = createPopperActions(initOptions);
</script>

<!-- will be merged with initOptions -->
<div use:popperContent={dynamicOptions}/>
```

### Virtual elements

PopperJS allows the reference node to be a [virtual element](https://popper.js.org/docs/v2/virtual-elements/) which is not mounted on the DOM and cannot be used with Svelte actions.

Despite this, `svelte-popperjs` provides first-class support for virtual elements, and even supports reactive updates to the virtual element with Svelte [stores](https://svelte.dev/tutorial/writable-stores).

Here's an example creating a tooltip that follows the mouse cursor.

```svelte
<script>
  import { writable } from 'svelte/store';
  import { createPopperActions } from 'svelte-popperjs';
  const [popperRef, popperContent] = createPopperActions({
    strategy: 'fixed',
  });
  
  let x = 0;
  let y = 0;
  const mousemove = (ev: MouseEvent) => {
    x = ev.clientX;
    y = ev.clientY;
  }
  
  $: getBoundingClientRect = () => ({
    width: 0, height: 0,
    top: y, bottom: y,
    left: x, right: x,
  });
  const virtualElement = writable({ getBoundingClientRect });
  $: $virtualElement = { getBoundingClientRect };
  popperRef(virtualElement);
</script>
<svelte:window on:mousemove={mousemove} />

<main>
  <div use:popperContent>Tooltip</div>
</main>
```

### Accessing the Popper instance

If access is needed to the raw [Popper instance](https://popper.js.org/docs/v2/constructors/#instance) created by the actions, you can reference the third element returned by `createPopperActions`. The third element is a function that will return the current Popper instance used by the actions.

Using the raw Popper instance to [manually recompute the popper's position](https://popper.js.org/docs/v2/lifecycle/#manual-update).

```svelte
<script>
  import { createPopperActions } from 'svelte-popperjs';
  const [popperRef, popperContent, getInstance] = createPopperActions();

  async function refreshTooltip() {
    const newState = await getInstance().update();
  }
</script>
```
