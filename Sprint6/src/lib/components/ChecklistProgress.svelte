<script lang="ts">
	import { writable, derived } from 'svelte/store';
	import ChecklistItem from './ChecklistItem.svelte';
	import type { Item } from '$lib/stores/checklist';

	interface Props {
		items?: Item[];
		target?: number;
	}

	let { items = [], target=80 }: Props = $props();

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
	
	// Progress bar values
	let targetPercent = $state(0); // Snaps immediately (light bar)
	let animatedPercent = $state(0); // Animates smoothly (dark bar)

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
		
		// Target snaps immediately
		targetPercent = submittedPercent;
		
		// Animated bar transitions smoothly (CSS will handle the animation)
		// We use a tiny delay to ensure the target has updated first
		requestAnimationFrame(() => {
			animatedPercent = submittedPercent;
		});
	}
</script>

<div class="wrapper-container">
	<div class="task-list">
		{#each $localItemsStore as item (item.id)}
			<ChecklistItem 
				id={item.id} 
				label={item.label} 
				bind:done={item.done} 
				onchange={handleItemChange} 
			/>
		{/each}
	</div>

	<div class="action-bar">
		<button onclick={handleSubmit}>Submit version</button>
		<div data-testid="progress-label">
			{submittedCompleted}/{submittedTotal} ({submittedPercent}%)
		</div>
	</div>

	<!-- Progress Bar -->
	<div class="progress-container">
		<div class="progress-track">
			<!-- Light bar (target) - snaps immediately -->
			<div 
				class="progress-target" 
				style="width: {targetPercent}%"
				data-testid="progress-target"
				data-percent={targetPercent}
			></div>
			<!-- Dark bar (animated) - animates smoothly -->
			<div 
				class="progress-animated" 
				style="width: {animatedPercent}%"
				data-testid="progress-animated"
				data-percent={animatedPercent}
			></div>
			<!-- Goal Line -->
			 <div 
				class="goal-line {animatedPercent >= target ? 'goal-reached' : ''}" 
				style="left: calc({target}% - 1px)"
				data-testid="goal-line"
			>
				<span class="goal-label">{target}%</span>
			</div>
		</div>
	</div>
</div>

<style>
	.wrapper-container {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		padding: 1rem;
		border: 1px solid #ccc;
		border-radius: 0.5rem;
	}

	.task-list {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}

	.action-bar {
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

	/* Progress Bar Styles */
	.progress-container {
		margin-top: 1rem;
	}

	.progress-track {
		position: relative;
		width: 100%;
		height: 24px;
		background: #e0e0e0;
		border-radius: 12px;
		overflow: hidden;
	}

	.progress-target {
		position: absolute;
		top: 0;
		left: 0;
		height: 100%;
		background: #a5d6a7; /* Light green - snaps immediately */
		border-radius: 12px;
		transition: none; /* No animation - snaps instantly */
	}

	.progress-animated {
		position: absolute;
		top: 0;
		left: 0;
		height: 100%;
		background: #4caf50; /* Dark green - animates */
		border-radius: 12px;
		transition: width 1s ease-out; /* 1 second animation */
	}

	.goal-line {
		position: absolute;
		top: 0;
		height: 100%;
		width: 2px;
		background: #f44336;
	}

	.goal-line.goal-reached {
		background: #2e7d32;
	}

	.goal-label {
		position: absolute;
		top: -1.25rem;
		left: 50%;
		transform: translateX(-50%);
		font-size: 0.75rem;
		color: #555;
		font-weight: 500;
		white-space: nowrap;
	}
</style>