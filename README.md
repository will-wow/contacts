# Contacts

This is a sample app for showing a Rails app that embeds Svelte components with
[webpacker-svelte](https://github.com/will-wow/webpacker-svelte).
For more information, see the related [blog post](docs/blog.md).

## Development

### Set up

```bash
gem install bundler
bundle install
yarn install
```

### Run

```bash
bundle exec rails s
```

### Switch to pre-Svelte branch

```bash
git checkout rails
```

## Blog

### Convert from WordPress:

replace `\[code language="(.+)"\]` with ` ```$1 `

replace `[/code]` with ` ``` `

### Convert to WordPress:

replace ` ```(.+)$ ` with `[code language="$1"]`

replace ` ``` ` with `[/code]`
