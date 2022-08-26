<script>
	import { createPopperActions } from '../src';

	export let virtualElement;
	const [ref, content] = createPopperActions();
	ref(virtualElement);
</script>

<div data-testid="content" use:content>positioned content</div>
