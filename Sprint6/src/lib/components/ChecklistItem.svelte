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

<label>
	<input type="checkbox" checked={done} onchange={handleChange} />
	{label}
</label>

<style>
	label {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		cursor: pointer;
		padding: 0.5rem;
	}

	input[type='checkbox'] {
		cursor: pointer;
	}
</style>