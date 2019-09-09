<script>
  import { contactCountStore } from "../contact-store"

  export let count = null

  $: contactCount = count === null ? $contactCountStore : count
</script>

<span class="badge badge-pill badge-info">Total: {contactCount}</span>
