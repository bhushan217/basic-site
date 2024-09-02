<script>
let {onSelected, uiType = 'card', id, name='', currency_name, currency_symbol, currency} =  $props();
// const onSelected=()=>{}
</script>
<div class="inner-{uiType}" >
  <div class="title" data-id={id} data-test-id="country_{id}" title="{name}">{name}</div>
  <span class="description">{currency_name}</span>
  <div class="cur-code">{currency}</div>
  <button class="sym" onclick={onSelected}>{currency_symbol}</button>
</div>
<style lang="scss">
</style>