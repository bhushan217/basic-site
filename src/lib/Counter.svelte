<script >
  let count = $state(0);

	const increment = () => {
		count += 1;
	}
	const decrement = () => {
		count -= 1;
	}
</script>

<button aria-keyshortcuts="s" onclick={increment}>Increment (+)</button>
Count is {count}
<button disabled aria-keyshortcuts="Alt+ArrowDown" onclick={decrement}>Decrement (-)</button>
<br/>