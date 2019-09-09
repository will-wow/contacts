<script>
  import axios from "axios"
  import { fade } from "svelte/transition"

  export let contact
  export let onSave
  export let onDelete

  const inputClass = "form-control"

  let saving

  const updateSaving = isSaving => {
    if (isSaving) {
      saving = true
    } else if (!isSaving) {
      setTimeout(() => (saving = false), 500)
    }
  }

  const handleDelete = () => {
    if (confirm("Are you sure?")) {
      onDelete()
    }
  }

  $: updateSaving(contact.saving)
</script>

<style>
  tr {
    transition: background 0.5s linear;
  }

  .saving {
    background: var(--yellow) !important;
  }
</style>

<tr class:saving>
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
    <button type="button" class="btn btn-primary btn-xs" on:click={onSave}>
      Save
    </button>
  </td>
  <td>
    <button type="button" class="btn btn-danger btn-xs" on:click={handleDelete}>
      Destroy
    </button>
  </td>
</tr>
