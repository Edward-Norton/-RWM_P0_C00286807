<script lang="ts">
  import { largestNumbers } from '$lib/filters';
  let raw = '5 10 120 58 2017 231';
  $: input = raw.trim().split(/\s+/).filter(Boolean).map(Number);
  $: output = largestNumbers(input);
</script>

<h1>Sequence Filter Demo</h1>
<label>
  Input (space-separated integers)
  <input bind:value={raw} placeholder="e.g., 4 3 2 1 0" />
</label>

<h2>Output</h2>
<p>{output.join(' ')}</p>

<style>
  label { display: block; margin: 1rem 0; }
  input { width: 100%; max-width: 30rem; }
  </style>
<a href="/combined">Go to combined filter demo</a>