# Security policy

## The thing worth knowing

This tool sends code to the OpenAI API. `review` and `test` read your staged
changes, `modify` reads the files you point it at. If a secret is in the diff,
it goes to the API with everything else. There is no scrubbing step, and
adding one is on the list.

Keep your key in `.env`, which is gitignored. Do not pass it on the command
line, where it lands in your shell history.

## Reporting a vulnerability

Open a private security advisory through the Security tab rather than a public
issue. Things worth reporting:

- A path where the tool writes outside the directory it was pointed at.
- Anything that causes the key to be logged, printed or committed.
- A prompt template that can be steered by file contents into running a shell
  command.

Please do not report "the AI produced bad code" as a vulnerability. The output
is a suggestion and the diff is there to be read before it is applied.

I will acknowledge within a week. This is a personal project.

## Supported versions

The tip of `main`.
