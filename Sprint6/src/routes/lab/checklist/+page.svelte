<a href="/">Go to default page</a>
<script lang="ts">
	import ChecklistProgress from '$lib/components/ChecklistProgress.svelte';

	const items = [
		{ id: '1', label: 'Task 1', done: false },
		{ id: '2', label: 'Task 2', done: false },
		{ id: '3', label: 'Task 3', done: false },
		{ id: '4', label: 'Task 4', done: false },
		{ id: '5', label: 'Task 5', done: false }
	];
</script>

<div class="container">
	<h1 data-testid="title">Progress Checklist</h1>
	
	<ChecklistProgress {items} />
</div>

<style>
	.container {
		max-width: 800px;
		margin: 2rem auto;
		padding: 2rem;
	}

	h1 {
		color: #333;
		margin-bottom: 2rem;
	}
</style>