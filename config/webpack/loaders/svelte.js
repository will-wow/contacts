module.exports = {
  test: /\.svelte$/,
  use: [
    {
      loader: "svelte-loader",
      options: {
        // HMR isn't supported for Svelte3 yet
        // https://github.com/sveltejs/svelte-loader/issues/74
        hotReload: false,
        emitCss: true
      }
    }
  ]
}
