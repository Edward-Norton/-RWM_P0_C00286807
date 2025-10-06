<script lang="ts">
	import ChecklistItem from './ChecklistItem.svelte';

	interface Props {
		items?: Array<{ id: string; label: string; done: boolean }>;
	}

	let { items = [] }: Props = $props();

	// Internal state (live tracking as user checks/unchecks)
	let currentItems = $state(items.map(item => ({ ...item })));

	// Submitted/visible state (gated behind button)
	let submittedCompleted = $state(0);
	let submittedTotal = $state(items.length);
	let submittedPercent = $state(0);

	function handleItemChange(detail: { id: string; done: boolean }) {
		const { id, done } = detail;
		const item = currentItems.find((item) => item.id === id);
		if (item) {
			item.done = done;
		}
	}

	function handleSubmit() {
		submittedCompleted = currentItems.filter((item) => item.done).length;
		submittedTotal = currentItems.length;
		submittedPercent =
			submittedTotal > 0 ? Math.round((submittedCompleted / submittedTotal) * 100) : 0;
	}
</script>

<div class="checklist-progress">
	<div class="items">
		{#each currentItems as item (item.id)}
			<ChecklistItem 
				id={item.id} 
				label={item.label} 
				bind:done={item.done} 
				onchange={handleItemChange} 
			/>
		{/each}
	</div>

	<div class="controls">
		<button onclick={handleSubmit}>Submit version</button>
		<div data-testid="progress-label">
			{submittedCompleted}/{submittedTotal} ({submittedPercent}%)
		</div>
	</div>
</div>

<style>
	.checklist-progress {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		padding: 1rem;
		border: 1px solid #ccc;
		border-radius: 0.5rem;
	}

	.items {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}

	.controls {
		display: flex;
		align-items: center;
		gap: 1rem;
		padding-top: 1rem;
		border-top: 1px solid #eee;
	}

	button {
		padding: 0.5rem 1rem;
		background: #4caf50;
		color: white;
		border: none;
		border-radius: 0.25rem;
		cursor: pointer;
	}

	button:hover {
		background: #45a049;
	}
</style>