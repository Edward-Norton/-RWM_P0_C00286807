<script lang="ts">
  import { combinedFilter } from '$lib/filters/combined/combined';
  import { largestNumbers } from '$lib/filters/biggestWithSameDigits';

  let c00286807Raw = "5 10 120 58 2017 231";
  $: c00286807Input = c00286807Raw.trim().split(/\s+/).filter(Boolean).map(Number);
  $: c00286807Output = largestNumbers(c00286807Input);

  let c00281735Raw = "4 2 8 3 9 4 10";
  $: c00281735Input = c00281735Raw.trim().split(/\s+/).filter(Boolean).map(Number);
  $: c00281735Output = combinedFilter(c00281735Input);
</script>

<h1>Combined (mine -- peer)</h1>
<label>Edward Input: <input bind:value={c00286807Raw} /></label> 
<p>{"Edward's Test BiggestWithSameDigits: " + c00286807Output.join(" ")}</p>
<label>Jonathan Input: <input bind:value={c00281735Raw} /></label> 
<p>{"Jonathan's Test XOR21: " + c00281735Output.join(" ")}</p>
<a href="/">Go to sequence filter demo</a>