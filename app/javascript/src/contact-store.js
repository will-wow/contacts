import { writable, derived } from "svelte/store"
import Api from "./api"

export const contactStore = writable([])

export const contactCountStore = derived(
  contactStore,
  contacts => contacts.length
)

export const createContact = async contact => {
  const createdContact = await Api.post("/contacts.json", {
    contact
  })
  contactStore.update(contacts => [...contacts, createdContact])
}

export const saveContact = contact =>
  Api.put(`/contacts/${contact.id}.json`, { contact })

export const deleteContact = contact => {
  contactStore.update(contacts =>
    contacts.filter(({ id }) => id !== contact.id)
  )
  return Api.delete(`/contacts/${contact.id}.json`)
}
