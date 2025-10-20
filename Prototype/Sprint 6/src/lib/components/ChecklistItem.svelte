<script lang="ts">
	interface Props {
		id: string;
		label: string;
		done?: boolean;
		onchange?: (detail: { id: string; done: boolean }) => void;
	}

	let { id, label, done = $bindable(false), onchange }: Props = $props();

	function handleChange(event: Event) {
		const target = event.target as HTMLInputElement;
		done = target.checked;
		onchange?.({ id, done });
	}
</script>

<label class="item-wrapper">  <!-- RENAMED from label -->
	<input type="checkbox" checked={done} onchange={handleChange} class="check-input" />  <!-- Added class -->
	{label}
</label>

<style>
	.item-wrapper {  /* RENAMED */
		display: flex;
		align-items: center;
		gap: 0.5rem;
		cursor: pointer;
		padding: 0.5rem;
	}

	.check-input {  /* RENAMED */
		cursor: pointer;
	}
</style>