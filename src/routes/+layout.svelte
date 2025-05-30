<script lang="ts">
  import { goto } from '$app/navigation';
	import strawberry from '$lib/assets/img/strawberry.png'
	import { CircleUser } from '@lucide/svelte';
	import '../app.css';
	
	let { children } = $props();
</script>
<!-- <div class="flex flex-col items-center justify-center"> -->
	{@render children()}
<!-- </div> -->
