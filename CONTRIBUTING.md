# Contributing

## Getting set up

```bash
npm install
npm run build
npm test
```

`npm test` builds first, so a type error shows up as a failing test run rather
than a confusing stack trace.

You need an OpenAI key for anything that actually calls the API. Copy
`.env.example` to `.env` and fill it in. Nothing in the test suite calls the
API, and nothing in it should start to.

## Before you open a pull request

CI runs one thing: `npx prettier@2.8.8 --check .`. Run `npm run format` first,
or it will fail on whitespace and waste a round trip.

## Prompts

The prompt templates in `prompt/` are the product. A change there is a
behaviour change, so say in the pull request what you ran it against and what
came back differently. "It reads better" is not enough on its own, because the
model's output is the only thing that matters.

`prompt/` is excluded from prettier on purpose. Reformatting a prompt changes
its tokens.

## Scope

This is a personal tool that grew useful. It stays a CLI, it stays single
purpose per command, and it does not grow a config server, a plugin system or
a web interface. Pull requests that add a dependency need to say what it
replaces.
