<script lang="ts">
	import type { Readable } from 'svelte/store';
	import { createPopperActions, type VirtualElement } from '../src';

	export let virtualElement: VirtualElement | Readable<VirtualElement>;
	const [ref, content] = createPopperActions();
	ref(virtualElement);
</script>

<div data-testid="content" use:content>positioned content</div>
