import WebpackerSvelte from "webpacker-svelte"

import ContactList from "../src/components/ContactList.svelte"
import NewContactButton from "../src/components/NewContactButton.svelte"
import ContactCount from "../src/components/ContactCount.svelte"

WebpackerSvelte.setup({
  ContactList,
  NewContactButton,
  ContactCount
})
