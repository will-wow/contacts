import { render, waitForElement } from "@testing-library/svelte"
import { readable } from "svelte/store"
import { contactStore } from "contact-store"

import ContactCount from "components/ContactCount.svelte"

function mockStore(value) {
  return readable(value, () => {})
}

jest.mock("contact-store", () => {
  return {
    contactCountStore: mockStore(2)
  }
})

describe("ContactCount", () => {
  it("it gets a count from props", () => {
    const component = render(ContactCount, { props: { count: 3 } })
    expect(component.container).toHaveTextContent("Total: 3")
  })

  it("it gets a count from the store", () => {
    const component = render(ContactCount)
    expect(component.container).toHaveTextContent("Total: 2")
  })

  it.skip("gets the count of contacts", async () => {
    const component = render(ContactCount)
    expect(component.container).toHaveTextContent("Total: 0")

    contactStore.set([{ id: 1 }])

    await waitForElement(() => component.getByText("Total: 1"))
  })
})
