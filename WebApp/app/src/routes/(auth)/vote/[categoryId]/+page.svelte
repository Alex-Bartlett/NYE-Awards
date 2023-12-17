<script>
  // Add authentication
  export let data;
  const quotes = Object.entries(data.quotes);
</script>

<div>
  <ul>
    {#each quotes as quote}
      <li>{quote[1].content}</li>
    {/each}
  </ul>
</div>
