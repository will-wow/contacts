
## Testing Svelte

That's better! The other nice thing about this refactor is it makes the component easier to test.

To do that, we'll use [svelte-testing-library](https://testing-library.com/docs/svelte-testing-library/intro), which is based on the popular [react-testing-library](https://testing-library.com/docs/react-testing-library/intro). We'll also need to teach Jest how to compile our Svelte components with [jest-transform-svelte](https://github.com/rspieker/jest-transform-svelte). I recently got a PR accepted to add support for complicated Webpack setups, and for Svelte preprocessors for things like [TypesScript and PostCSS](https://github.com/kaisermann/svelte-preprocess). So make sure to install the `2.1.0` or later.

To set that all up, add these dependencies to your package.json.


```javascript
{
  "devDependencies": {
    "@testing-library/jest-dom": "^4.1.0",
    "@testing-library/svelte": "^1.8.0",
    "jest": "^24.9.0",
    "jest-transform-svelte": "2.1.0"
  }
}
```

Then add a `jest.config.js` to register the transform and set up the testing library:

```javascript
module.exports = {
  transform: {
    // Keep processing normal JS files through babel.
    "^.+\\.js$": ["babel-jest"],
    // Compile svelte components to CommonJS modules
    "^.+\\.svelte$": "jest-transform-svelte"
  },
  setupFilesAfterEnv: [
    // Add the testing library dom expectations
    "@testing-library/jest-dom/extend-expect",
    // Un-mount svelte components after tests
    "@testing-library/svelte/cleanup-after-each"
  ],
  moduleFileExtensions: ["js", "svelte"],
  // Allow absolute imports of local modules
  modulePaths: ["<rootDir>/app/javascript/src"],
  // Look for tests with the other rails tests
  testMatch: ["<rootDir>/test/javascript/**/*.test.js"]
}
```

With that set up, you can start writing tests right along side your Rails specs! We'll add a test in `test/javascript/components/ContactCount.js`.

The first test is easy - if a count is passed in as a prop, the component should render it:

```javascript
import { render } from "@testing-library/svelte"
import ContactCount from "components/ContactCount.svelte"

describe("ContactCount", () => {
  it("it gets a count from props", () => {
    const component = render(ContactCount, { props: { count: 3 } })
    expect(component.container).toHaveTextContent("Total: 3")
  })

  it("it gets a count from the store", () => {})
})
```

The second test is a slightly trickier. The most straightforward option is to stick a contact into the `contactStore`, and watch it update the component, like so:

```javascript
import { render, waitForElement } from "@testing-library/svelte"
import { contactStore } from "contact-store"
import ContactCount from "components/ContactCount.svelte"

describe("ContactCount", () => {
  it("it gets a count from the store", () => {
    const component = render(ContactCount, {})
    expect(component.container).toHaveTextContent("Total: 0")

    contactStore.set([{ id: 1 }])
    await waitForElement(() => component.getByText("Total: 1"))
  })
})
```

But that's not a very isolated unit test. Instead, we can use Jest to provide a mock `contactCountStore`. Instead of being `derived` from the real store, our mock store will be a `readable` store that always returns `2`:


```javascript
import { render, waitForElement } from "@testing-library/svelte"
import ContactCount from "components/ContactCount.svelte"

// Helper for mocking stores.
function mockStore(value) {
  return readable(value, () => {})
}

// Set up the mock store by mocking the output of `import from 'src/contact-store'`
jest.mock("contact-store", () => {
  return {
    contactCountStore: mockStore(2)
  }
})

describe("ContactCount", () => {
  it("it gets a count from the store", () => {
    const component = render(ContactCount)
    expect(component.container).toHaveTextContent("Total: 2")
  })
})
```

And that's really all there is to it on testing. `svelte-testing-library` supports lots of nice helpers, like finding elements by text and inputs by label. You can see the full list of helper functions [in the DOM Testing Library docs](https://testing-library.com/docs/dom-testing-library/api-queries).