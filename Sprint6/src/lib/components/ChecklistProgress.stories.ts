import type { Meta, StoryObj } from '@storybook/svelte';
import ChecklistProgress from './ChecklistProgress.svelte';
import { itemsStore } from '$lib/stores/checklist';

const meta = {
	title: 'Components/ChecklistProgress',
	component: ChecklistProgress as any,
	tags: ['autodocs'],
	parameters: {
		docs: {
			description: {
				component: `
# ChecklistProgress

A progress tracking component with a **submit gate pattern**. 

The component tracks checkbox state internally as users interact with it, but the displayed progress 
percentage is only updated when the user clicks the "Submit version" button. This prevents premature 
or accidental progress updates and gives users explicit control over when their progress is recorded.

**Key Features:**
- Live state tracking (checkboxes update immediately)
- Gated progress display (percentage only updates on submit)
- Uses Svelte stores for reactive state management
- Handles edge cases: all checked, none checked, partial selections
				`
			}
		}
	},
	// Reset store before each story renders
	beforeEach: () => {
		itemsStore.set([]);
	}
} satisfies Meta<ChecklistProgress>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		items: [
			{ id: '1', label: 'Task 1', done: false },
			{ id: '2', label: 'Task 2', done: true },
			{ id: '3', label: 'Task 3', done: false },
			{ id: '4', label: 'Task 4', done: true },
			{ id: '5', label: 'Task 5', done: false }
		]
	}
};

export const NoneChecked: Story = {
	args: {
		items: [
			{ id: '1', label: 'Task 1', done: false },
			{ id: '2', label: 'Task 2', done: false },
			{ id: '3', label: 'Task 3', done: false },
			{ id: '4', label: 'Task 4', done: false },
			{ id: '5', label: 'Task 5', done: false }
		]
	}
};

export const AllChecked: Story = {
	args: {
		items: [
			{ id: '1', label: 'Task 1', done: true },
			{ id: '2', label: 'Task 2', done: true },
			{ id: '3', label: 'Task 3', done: true },
			{ id: '4', label: 'Task 4', done: true },
			{ id: '5', label: 'Task 5', done: true }
		]
	}
};

export const LongLabels: Story = {
	args: {
		items: [
			{
				id: '1',
				label: 'Complete comprehensive project setup including environment configuration, dependency management, and initial scaffolding',
				done: false
			},
			{
				id: '2',
				label: 'Write thorough test coverage including unit tests, integration tests, and end-to-end testing scenarios',
				done: false
			},
			{
				id: '3',
				label: 'Implement all core features according to specifications with proper error handling and edge case management',
				done: true
			}
		]
	}
};

export const MixedState: Story = {
	args: {
		items: [
			{ id: '1', label: 'Completed task', done: true },
			{ id: '2', label: 'Pending task', done: false },
			{ id: '3', label: 'Another completed task', done: true },
			{ id: '4', label: 'Another pending task', done: false },
			{ id: '5', label: 'Final completed task', done: true }
		]
	}
};