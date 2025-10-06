<script lang="ts">
	import ChecklistItem from '$lib/components/ChecklistItem.svelte';

	let item1Done = $state(false);
	let item2Done = $state(false);
	let item3Done = $state(false);

	function handleChange(detail: { id: string; done: boolean }) {
		console.log('Change event:', detail);
	}
</script>

<div class="container">
	<h1>ChecklistItem Test Page</h1>

	<div class="test-section">
		<h2>Test 1: Basic Items</h2>
		<ChecklistItem id="1" label="Task 1" bind:done={item1Done} onchange={handleChange} />
		<ChecklistItem id="2" label="Task 2" bind:done={item2Done} onchange={handleChange} />
		<ChecklistItem id="3" label="Task 3" bind:done={item3Done} onchange={handleChange} />
	</div>

	<div class="test-section">
		<h2>State Display</h2>
		<pre>
Item 1: {item1Done}
Item 2: {item2Done}
Item 3: {item3Done}
		</pre>
	</div>
</div>

<style>
	.container {
		max-width: 800px;
		margin: 2rem auto;
		padding: 2rem;
	}

	.test-section {
		margin: 2rem 0;
		padding: 1rem;
		border: 1px solid #ddd;
		border-radius: 0.5rem;
	}

	h1 {
		color: #333;
	}

	h2 {
		font-size: 1.2rem;
		margin-bottom: 1rem;
		color: #666;
	}

	pre {
		background: #f5f5f5;
		padding: 1rem;
		border-radius: 0.25rem;
	}
</style>