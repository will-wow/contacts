<script>
  export let contact
  export let onSave
  export let onDelete

  let error = false
  const handleSave = () => {
    error = false
    onSave().catch(() => (error = true))
  }

  const handleDelete = () => {
    if (confirm("Are you sure?")) {
      onDelete()
    }
  }
</script>

<style>
  tr {
    transition: background 1s ease;
  }

  .error {
    background: LightCoral;
  }
</style>

<tr class:error>
  <td>
    <input
      class="form-control"
      type="text"
      name="name"
      bind:value={contact.name} />
  </td>
  <td>
    <input class="form-control" name="email" bind:value={contact.email} />
  </td>
  <td>
    <input class="form-control" name="twitter" bind:value={contact.twitter} />
  </td>
  <td>
    <input class="form-control" name="phone" bind:value={contact.phone} />
  </td>
  <td>
    <a class="btn btn-info btn-xs" href="/contacts/{contact.id}">Show</a>
  </td>
  <td>
    <button class="btn btn-primary btn-xs" on:click={handleSave}>Save</button>
  </td>
  <td>
    <button class="btn btn-danger btn-xs" on:click={handleDelete}>
      Destroy
    </button>
  </td>
</tr>
