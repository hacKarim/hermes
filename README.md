# hermes

[![CI](https://github.com/hacKarim/hermes/actions/workflows/ci.yml/badge.svg)](https://github.com/hacKarim/hermes/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/license-MIT-green.svg)](./LICENSE)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white)
![OpenAI](https://img.shields.io/badge/OpenAI-412991?logo=openai&logoColor=white)

A small command-line assistant that uses the OpenAI API to help with everyday
code chores: reviewing a diff, generating unit tests, scaffolding boilerplate,
and translating i18n strings. It reads your staged changes (or a directory),
sends them through a configurable prompt, and writes the result back.

## What it does

| Command     | Description                                            |
| ----------- | ------------------------------------------------------ |
| `review`    | AI code review of your staged changes                  |
| `test`      | Generate unit tests for changed files                  |
| `create`    | Scaffold components, models, pages, and services       |
| `modify`    | Apply an AI-assisted change and write back a safe diff |
| `translate` | Fill in missing i18n translations                      |

## Install

```bash
git clone https://github.com/hacKarim/hermes.git
cd hermes
npm install
npm run build
```

## Configure

hermes is driven entirely by environment variables. Copy `.env.example` to
`.env` and set your OpenAI key:

```bash
OPENAI_API_KEY=sk-...
OPENAI_MODEL=gpt-4
OPENAI_MAX_TOKENS=2048

# read staged git changes (default) or a directory
READ_TYPE=git
READ_GIT_STATUS=A,R,M
READ_FILE_EXTENSIONS=.ts,.tsx,.js,.jsx
```

### Configuration reference

Every setting is an environment variable. These are all of them, as shipped in
`.env.example`:

| Variable | Default | What it does |
| --- | --- | --- |
| `OPENAI_API_KEY` | — | Required. Your key from the OpenAI dashboard. |
| `OPENAI_MODEL` | unset | Model to call. Leave unset to use the client default. |
| `OPENAI_MAX_TOKENS` | `2048` | Ceiling on the response length. |
| `OPENAI_SESSION_TOKEN` | unset | Session token, as an alternative to an API key. |
| `OPENAI_PROXY_URL` | unset | Route API calls through a proxy. |
| `READ_TYPE` | `git` | `git` reads staged changes, `dir` reads a directory. |
| `READ_GIT_STATUS` | `A,R,M` | Which staged statuses to pick up: added, renamed, modified. |
| `READ_FILES_ROOT_NAME` | `example` | Directory to read when `READ_TYPE=dir`. |
| `READ_FILE_EXTENSIONS` | `.ts,.tsx,.js,.jsx` | Extensions considered source files. |
| `TEST_FILE_TYPE` | `test` | Infix for generated test files, as in `name.test.ts`. |
| `TEST_FILE_DIR_NAME` | `__test__` | Directory generated tests are written to. |
| `TRANSLATE` | `fr,es` | Target locales for `hermes translate`. |
| `REVIEW_REPORT_WEBHOOK` | unset | If set, `hermes review` POSTs its report here. |

### Custom prompts

Drop a `prompt/` directory in your project with files like `review.txt` or
`tests.txt` to override the built-in prompts. See the `prompt/` folder in this
repo for the defaults.

### Pre-commit hook

Pair it with [husky](https://github.com/typicode/husky) and
[lint-staged](https://github.com/okonet/lint-staged) to run `hermes review` on
every commit.

## How it's built

- **TypeScript**, bundled with [tsup](https://tsup.egoist.dev/)
- Command modules under `src/hermes/` (`review`, `test`, `create`, `modify`, `translate`)
- Reusable utilities under `src/utilities/`: OpenAI client, source reader,
  prompt loader, code extractor, and an optional review-report webhook
- Tests with [jest](https://jestjs.io/)

## License

[MIT](./LICENSE). Built on the [`chatgpt`](https://www.npmjs.com/package/chatgpt) npm package.
