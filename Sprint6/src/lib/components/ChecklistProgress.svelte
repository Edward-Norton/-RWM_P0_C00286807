<script lang="ts">
	import { writable, derived } from 'svelte/store';
	import ChecklistItem from './ChecklistItem.svelte';
	import type { Item } from '$lib/stores/checklist';

	interface Props {
		items?: Item[];
	}

	let { items = [] }: Props = $props();

	// Create LOCAL stores for this instance (not global)
	const localItemsStore = writable<Item[]>([]);
	const localCompletedStore = derived(
		localItemsStore,
		($items) => $items.filter((item) => item.done).length
	);
	const localPercentStore = derived(localItemsStore, ($items) =>
		$items.length ? Math.round((100 * $items.filter((item) => item.done).length) / $items.length) : 0
	);

	// Initialize local store with items
	$effect(() => {
		localItemsStore.set(items.map(item => ({ ...item })));
	});

	// Submitted/visible state (gated behind button)
	let submittedCompleted = $state(0);
	let submittedTotal = $state(items.length);
	let submittedPercent = $state(0);

	function handleItemChange(detail: { id: string; done: boolean }) {
		const { id, done } = detail;
		localItemsStore.update(items => {
			const item = items.find(item => item.id === id);
			if (item) {
				item.done = done;
			}
			return items;
		});
	}

	function handleSubmit() {
		// Copy from derived stores to visible UI only on submit
		submittedCompleted = $localCompletedStore;
		submittedTotal = $localItemsStore.length;
		submittedPercent = $localPercentStore;
	}
</script>

<div class="checklist-progress">
	<div class="items">
		{#each $localItemsStore as item (item.id)}
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