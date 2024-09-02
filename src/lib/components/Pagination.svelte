<script lang="ts">
  import { RepositoryResponse } from "../countries.store.svelte";
  let { res }: { res: RepositoryResponse } = $props();

  const changePageSize = ($event: Event): void => {
    res.size = +$event.target?.["value"] || 20;
    res.fetchFirstPage();
  };
  const changeUiType = ($event: Event) => {
    res.uiType = $event.target?.getAttribute("data-val") ?? 'card'
  }
</script>

<div class="page-bar">
  <div class="page-size">
    <select class="ff-sm" bind:value={res.size} onchange={changePageSize}>
      {#each res.pageSizes as p (p)}
        <option value={p} selected={p === res.size ? true : null}>{p}</option>
      {/each}
    </select>
    <button
      onclick={res.fetchData}
      title="First"
      class="btn btn-sm {res.isFirstPage ? 'disabled' : ''}"
    >
      🔄
    </button>
  </div>
  <div class="page-nav">
    <div class="btn-grp {res.isFirstPage ? 'disabled' : ''}">
      <button
        onclick={res.fetchFirstPage}
        title="First"
        class="btn btn-sm {res.isFirstPage ? 'disabled' : ''}"
      >
        ⏮️
      </button>
      <button
        onclick={res.fetchPrevPage}
        title="Previous"
        class="btn btn-sm {res.isFirstPage ? 'disabled' : ''}"
      >
        ◀️
      </button>
    </div>
    {res.pagedPageLabel}

    <div class="btn-grp {res.isLastPage ? 'disabled' : ''}">
    <button
      onclick={res.fetchNextPage}
      title="Next"
      class="btn btn-sm {res.isLastPage ? 'disabled' : ''}"
    >
      ▶️
    </button>
    <button
      onclick={res.fetchLastPage}
      title="Last"
      class="btn btn-sm {res.isLastPage ? 'disabled' : ''}"
    >
      ⏭️
    </button>
    </div>
  </div>
  <div class="page-api">
    <div class="btn-grp">
      <button class="{res.uiType==='row'?'bg-pml':''} btn btn-sm " onclick={changeUiType} data-val="row">☰</button>
      <button class="{res.uiType==='card'?'bg-pml':''} btn btn-sm  " onclick={changeUiType} data-val="card">⊞</button>
    </div>
    <small class="api-time">
      in <b>{(res.timeTaken + "").padStart(2, "0")}</b>ms
    </small>
  </div>
  <div class="page-row-stat">
    {res.pagedRowLabel}
  </div>
</div>
