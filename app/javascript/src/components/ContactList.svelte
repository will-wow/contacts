<script>
  import axios from "axios"
  import { onMount } from "svelte"
  import { contactStore, saveContact, deleteContact } from "../contact-store"
  import ContactRow from "./ContactRow.svelte"

  export let contacts
  onMount(() => {
    contactStore.set(contacts)
  })
</script>

{#each $contactStore as contact}
  <ContactRow
    bind:contact
    onSave={() => saveContact(contact)}
    onDelete={() => deleteContact(contact)} />
{/each}
