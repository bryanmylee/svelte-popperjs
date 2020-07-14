# svelte-popperjs
Popper for Svelte with actions, no wrapper components or component bindings required!

## Installation

```bash
$ npm i -D svelte-popperjs
```

Since Svelte automatically bundles all required dependencies, you only need to install this package as a dev dependency with the `-D` flag.

## Usage

`createPopperActions` returns a pair of actions to be used on the [reference and popper elements](https://popper.js.org/docs/v2/constructors/#usage).

The content action takes an [options object](https://popper.js.org/docs/v2/constructors/#options) for configuring the popper instance.

## Examples

A Svelte version of the standard [tutorial](https://popper.js.org/docs/v2/tutorial/).

```svelte
<script>
  import { createPopperActions } from 'svelte-popperjs';
  const [ refAction, popperAction ] = createPopperActions();
  
  let showTooltip = false;
  const popperOptions = {
    modifiers: [
      {
        name: 'offset',
        options: {
          offset: [0, 8],
        },
      },
    ],
  };
</script>

<button
  use:refAction
  on:mouseenter={_ => showTooltip = true}
  on:mouseleave={_ => showTooltip = false}
>
  My button
</button>

{#if showTooltip}
  <div id="tooltip" use:popperAction={popperOptions}>
    My tooltip
    <div id="arrow" data-popper-arrow />
  </div>
{/if}
```
