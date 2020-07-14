# svelte-popperjs
Popper for Svelte with actions, no wrapper components or component bindings required!

Other Popper libraries for Svelte (including the official `@popperjs/svelte` library) use a wrapper component that takes the required DOM elements as props. Not only does this require multiple `bind:this`, you also have to pollute your `script` tag with multiple DOM references.

We can do better with Svelte [actions](https://svelte.dev/tutorial/actions)!

## Installation

```bash
$ npm i -D svelte-popperjs
```

Since Svelte automatically bundles all required dependencies, you only need to install this package as a dev dependency with the `-D` flag.

## Usage

`createPopperActions` returns a pair of actions to be used on the [reference and popper elements](https://popper.js.org/docs/v2/constructors/#usage).

The content action takes an [options object](https://popper.js.org/docs/v2/constructors/#options) for configuring the popper instance.

### Examples

A Svelte version of the standard [tutorial](https://popper.js.org/docs/v2/tutorial/).

*styles not included\**

```svelte
<script>
  import { createPopperActions } from 'svelte-popperjs';
  const [ popperRef, popperContent ] = createPopperActions();
  const popperOptions = {
    modifiers: [
      { name: 'offset', options: { offset: [0, 8] } }
    ],
  };

  let showTooltip = false;
</script>

<button
  use:popperRef
  on:mouseenter={_ => showTooltip = true}
  on:mouseleave={_ => showTooltip = false}
>
  My button
</button>
{#if showTooltip}
  <div id="tooltip" use:popperContent={popperOptions}>
    My tooltip
    <div id="arrow" data-popper-arrow />
  </div>
{/if}
```
