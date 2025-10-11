<script lang="ts">
	import { writable, derived } from 'svelte/store';
	import ChecklistItem from './ChecklistItem.svelte';
	import type { Item } from '$lib/stores/checklist';

	interface Props {
		items?: Item[];
	}

	let { items = [] }: Props = $props();

	const localItemsStore = writable<Item[]>([]);
	const localCompletedStore = derived(
		localItemsStore,
		($items) => $items.filter((item) => item.done).length
	);
	const localPercentStore = derived(localItemsStore, ($items) =>
		$items.length ? Math.round((100 * $items.filter((item) => item.done).length) / $items.length) : 0
	);

	$effect(() => {
		localItemsStore.set(items.map(item => ({ ...item })));
	});

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
		submittedCompleted = $localCompletedStore;
		submittedTotal = $localItemsStore.length;
		submittedPercent = $localPercentStore;
	}
</script>

<div class="wrapper-container">  <!-- RENAMED from checklist-progress -->
	<div class="task-list">  <!-- RENAMED from items -->
		{#each $localItemsStore as item (item.id)}
			<ChecklistItem 
				id={item.id} 
				label={item.label} 
				bind:done={item.done} 
				onchange={handleItemChange} 
			/>
		{/each}
	</div>

	<div class="action-bar">  <!-- RENAMED from controls -->
		<button onclick={handleSubmit}>Submit version</button>
		<div data-testid="progress-label">
			{submittedCompleted}/{submittedTotal} ({submittedPercent}%)
		</div>
	</div>
</div>

<style>
	.wrapper-container {  /* RENAMED */
		display: flex;
		flex-direction: column;
		gap: 1rem;
		padding: 1rem;
		border: 1px solid #ccc;
		border-radius: 0.5rem;
	}

	.task-list {  /* RENAMED */
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}

	.action-bar {  /* RENAMED */
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