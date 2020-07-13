# svelte-popperjs
Popper for Svelte with actions, no wrapper components required!

## Installation

```bash
$ npm i -D svelte-popperjs
```

Since Svelte automatically bundles all required dependencies, you only need to install this package as a dev dependency with the `-D` flag.

## Usage

`createPopperActions` returns a pair of actions to be used on the [reference and popper element](https://popper.js.org/docs/v2/constructors/#usage).

The reference action takes an [options object](https://popper.js.org/docs/v2/constructors/#options) for configuring the popper instance.

```html
<script>
  import { createPopperActions } from 'svelte-popperjs';
  const [ refAction, popperAction ] = createPopperActions();
</script>

<button use:refAction={{ placement: 'right' }}>My button</button>
<div use:popperAction>
  My tooltip
  <div id="arrow" data-popper-arrow />
</div>
```
