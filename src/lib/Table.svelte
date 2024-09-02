<script lang="ts">
  import { onMount } from "svelte";
  import { draw, fly, fade } from "svelte/transition";
  import useFetchCountries from "./countries.store.svelte";
  import Country from "./geography/Country.svelte";
  import State from "./geography/State.svelte";
  import Pagination from "./components/Pagination.svelte";

  const res = useFetchCountries("countries");
  const resStates = useFetchCountries("states");

  const onSelected = (dRow) => {
    res.selected = dRow;
    const context = { parentPathKey: "countries", parentId: dRow.id };
    const pathKey = "states";
    resStates.apiPath = `/api/${context.parentPathKey}/${context.parentId}/${pathKey}`;
    resStates.size = 10;
    resStates.fetchFirstPage();
  };

  const onStateSelected = (dRow) => {
    resStates.selected = dRow;
  };

  onMount(async () => {
    await res.fetchFirstPage();
  });
</script>

<div class="container-table">
  [{res.selected?.id}] Data from spring/[redis/valkey/drangonflydb]/postgres
  <h1>Countries Table</h1>
  <div class="container" transition:fly={{ x: 100, delay: 500 }}>
    {#if res.isLoading}
      <p class="pa-tr">Fetching ...</p>
    {:else if res.error["error"]}
      <p class="error">
        {res.error["error"]} |
        {res.error["status"]} | {res.error["message"]}
      </p>
    {:else if res.rows}
      <Pagination {res}></Pagination>
      <ul
        class="grid-big {res.uiType}"
        transition:fade={{ delay: 250, duration: 300 }}
      >
        {#each res.rows as dRow (dRow.id)}
          <li class={dRow.id === res.selected?.id ? "active" : ""}>
            <Country
              {...dRow}
              onSelected={onSelected(dRow)}
              uiType={res.uiType}
            />
          </li>
        {/each}
      </ul>
      {#if res.size > 10}
      <Pagination {res}></Pagination>
      {/if}
    {/if}
    {#if res.selected && resStates.rows}
      <div class="states-container">
        <div class="title">
          {resStates.totalElements ? "#" : ""}{resStates.totalElements || "No"} STATES
          of <b>{res.selected.name}</b>
        </div>
        <Pagination res={resStates}></Pagination>
        <ul class="grid-big">
          {#each resStates.rows as dRow}
            <li>
              <State {...dRow} onSelected={onStateSelected(dRow)} />
            </li>
          {/each}
        </ul>
      </div>
    {/if}
  </div>
</div>

<style lang="scss">
  .container {
    min-height: 20em;
    transition: height 2s;
  }
  .container-table {
    margin-bottom: 1em;
  }
  .states-container {
    margin-top: var(--gtr);
    padding: var(--gtr-s);
    .title {
      background-color: var(--pm-color-l);
      padding-left: var(--gtr-s);
    }
  }
  ul {
    &.card {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(10em, 1fr));
      grid-auto-rows: 6em;
      gap: 0.5em;
    }
    &.row {
      display: flex;
      flex-flow: column nowrap;
      & > li {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(10em, 1fr));
        padding: 0.5em;
        :global(.inner-row) {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(10em, 1fr));
        }
        &:nth-of-type(odd) {
          background-color: var(--bg-color-l);
          &.active {
            background-color: var(--pm-color-l);
          }
        }
        &:nth-of-type(even) {
          background-color: var(--bg-color);
          &.active {
            background-color: var(--pm-color);
          }
        }
      }
    }

    li {
      color: var(--text-color);
      border-top: 1px solid var(--tx-disabled);
      padding-right: 0.5em;
      box-shadow: 1px 2px 6px var(--bg-color-l);

      &.active {
        background-color: var(--pm-color-l);
        color: var(--tx-color);
        padding-left: var(--gtr-s);
        border-left: var(--gtr-xs2) solid var(--sd-color);
      }
    }
  }
</style>
