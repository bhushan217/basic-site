<script>
let {onSelected, id, name='', state_name,iso2, latitude, longitude} =  $props();
</script>
<div class="container card" >
  <div class="title" data-id={id} data-test-id="state_{id}" title="{name}">{name}</div>
  <span class="description">{state_name}</span>
  <span class="description">{latitude}'{longitude}''</span>
  <button class="sym" onclick={onSelected}>{iso2}</button>
</div>