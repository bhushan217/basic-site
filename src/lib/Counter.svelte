<script >
  let count = $state(0);

	const increment = () => {
		count += 1;
	}
	const decrement = () => {
		count -= 1;
	}
</script>

<button accesskey="a" onclick={increment}>Increment (+)</button>
Count is {count}
<button disabled accesskey="-" onclick={decrement}>Decrement (-)</button>
<br/>