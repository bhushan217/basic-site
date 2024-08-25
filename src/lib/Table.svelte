<script lang="ts">
  import { onMount } from "svelte";
  import useFetchCountries from "./countries.store.svelte";

  const res = useFetchCountries("countries");

  onMount(async () => {
    await res.fetchFirstPage();
  });
</script>

Data from spring/[redis/valkey/drangonflydb]/postgres
<h1>Countries Table</h1>
<small> in {(res.timeTaken + "").padStart(2, "0")}ms</small>
<button onclick={res.fetchPrevPage} class={res.page <= 1 ? "disabled" : ""}>
  &lt;| Previous
</button>
{(res.page + "").padStart(2, "0")} of {res.totalPages}
<button
  onclick={res.fetchNextPage}
  class={res.page > res.totalPages - 1 ? "disabled" : ""}
>
  Next |&gt;
</button>
{#if res.isLoading}
  <p>Fetching counties...</p>
{:else if res.error["error"]}
  <p class="error">
    {res.error["error"]} | 
    {res.error["status"]} | {res.error["message"]}
  </p>
{:else if res.rows}
  <ul>
    {#each res.rows as dRow}
      <li>
        #{dRow.id} | {dRow.name} | {dRow.currency_name}({dRow.currency_symbol})
        | {dRow.currency}
      </li>
    {/each}
  </ul>
{/if}

<style lang="scss">
  ul {
    display: flex;
    flex-flow: row wrap;
    flex-basis: 10rem;
    gap: 0.5em;
    justify-content: flex-start;
    align-items: center;
    align-content: center;

    li {
      color: var(--text-color);
      border-right: 1px solid var(--sd-color);
      padding-right: 0.5em;
    }
  }
</style>
