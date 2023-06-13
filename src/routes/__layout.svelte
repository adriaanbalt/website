<script>
	import { page } from '$app/stores';
	import Ga from '$lib/GA.svelte';
	import Logo from '$lib/Logo.svelte';
	import { SegmentInit } from 'svelte-segment-events';
	import './../styles/fonts.scss';
	import './../styles/globals.scss';
// Track client-side navigation events
$: if (typeof window !== 'undefined' && window.analytics && $page.path) {
	window.analytics.page();
}
</script>

<Ga/>
<SegmentInit writeKey="MGD3bXulTraB5nB5eVenEJDOiA1ed12S" />
<main>
	<div class="page">
		<Logo />
		<slot />
	</div>
</main>
