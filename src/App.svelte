<script>
  import SvelteLogo from './assets/svelte.svg'
  import viteLogo from '/vite.svg'
  import Counter from './lib/Counter.svelte'
    import Breadcrumb from './lib/Breadcrumb.svelte';
    import Table from './lib/Table.svelte';

</script>

<div class="grid-container ">
  <header class="stick-yt">
    <div class="menu-tog"><label class="icon"><input class="ic" type="checkbox" name="menu-tag" id="menu-tog"/></label></div>
  </header>
  <aside class="left-bar">
    <nav class="logo stick-yt"> <img src="{SvelteLogo}" alt="logo"/>RukBal</nav>
    <nav class="left-menu">
      <ul class="menu-list">
        <li class="menu-item"><a href="#main1"><i class="icon">◎</i><div class="label">Link 1</div></a></li>
        <li class="menu-item"><a href="#main2"><i class="icon">◎</i><div class="label">Link 2</div></a></li>
        <li class="menu-item disabled"><a href="#main3"><i class="icon">◎</i><div class="label">Link 3</div></a></li>
        <li class="menu-item"><a href="#main4"><i class="icon">◎</i><div class="label">Link 4</div></a></li>
        <li class="menu-item"><a href="#main5"><i class="icon">◎</i><div class="label">Link 5</div></a></li>
        <li class="menu-item"><a href="#main6"><i class="icon">◎</i><div class="label">Link 6</div></a></li>
      </ul>
    </nav>
    <nav class="stick-yb">
      <li class="menu-item-footer"><a href="#main"><i class="icon">👈🏻</i></a></li>
    </nav>
  </aside>
  <main id="main" class="container">
    <div class="page-title">TITLE OF PAGE</div>
    <Counter ></Counter>
    <Breadcrumb></Breadcrumb>
    <Table></Table>
    <div class="dash-chips">
      <div class="dash-chip"><div class="count">12</div><div class="label">Label</div><div class="icon">🔴</div></div>
      <div class="dash-chip"><div class="count">12</div><div class="label">Label</div><div class="icon">🟢</div></div>
      <div class="dash-chip"><div class="count">12</div><div class="label">Label</div><div class="icon">🔴</div></div>
      <div class="dash-chip"><div class="count">12</div><div class="label">Label</div><div class="icon">🔴🟢</div></div>
    </div>
    <div class="dash-charts">
      <div class="dash-chart"><div class="chart">CHART</div></div>
      <div class="dash-chart"><div class="chart">CHART</div></div>
      <div class="dash-chart"><div class="chart">CHART</div></div>
      <div class="dash-chart"><div class="chart">CHART</div></div>
    </div>
  </main>
  <footer>
    <div   class="stick-yb copyright">&copysr; by bhushan217@gmail.com</div>
  </footer>
</div>

<style>
</style>
