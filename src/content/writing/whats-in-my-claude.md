---
title: What's in my .claude
description: The README of my Claude Code configuration lists what's in it. This is why each piece is there.
date: 2026-10-27
draft: true
---

<!--
Publish only after ~/.claude master is pushed. This post describes the fixed emoji hook, the
run-goals skill and the .cmd hook wrapper, which are in local commits not yet on GitHub.
Then set the date to the publish day and draft to false.
-->

My [.claude repository](https://github.com/ZacheryGlass/.claude) is the configuration I run Claude Code with: settings, hooks, sub-agents, skills, slash commands and a status line. Its README lists what is in it. This post is about why each piece is there, so you can decide which ones to take.

## Hooks enforce what prompts can only ask for

An instruction in CLAUDE.md is a request. Claude follows it nearly every time, which is not every time. A hook is a script that Claude Code runs on an event, so it does not depend on the model remembering anything.

The one registered in the repo is `emoji_remover.py`. I don't want emojis in code or docs, so after every edit it scans the file and, if it finds one, exits with code 2 and prints what to fix. Exit code 2 is how a hook talks back: Claude Code passes the message to the model, which corrects the file on its next step.

```json
{
  "hooks": {
    "PostToolUse": [{
      "matcher": "Edit|MultiEdit|Write|NotebookEdit",
      "hooks": [{
        "type": "command",
        "command": "~/.claude/hooks/emoji_remover.cmd"
      }]
    }]
  }
}
```

The `.cmd` file is a small wrapper that runs as a batch file on Windows and as a shell script on macOS and Linux, so the same setting works on all three.

Two more scripts sit in the same folder. `protect_claude_md.py` refuses any edit to a file named CLAUDE.md, so the instructions I wrote can't be rewritten by the model that reads them. `github_issue_guard.py` refuses `gh issue` commands and GitHub issue tools whose text mentions Claude or Anthropic, so an issue never carries a note about how it was written. Both stop an action instead of reacting to one, so register them under `PreToolUse`. The repo's settings file doesn't wire them up.

## Reviewers with their own context

A model that reviews its own work in the context that produced it tends to agree with itself. The sub-agents in `agents/` start fresh, each with one narrow job. `bug-finder` hunts for logic errors, race conditions and unhandled edge cases. `architecture-reviewer` looks at structure and long-term maintainability. `structural-completeness-reviewer` checks that a change is fully wired in and that the old code is gone. There are twelve agents in all. The rest cover C safety, compatibility with a change's consumers, performance, documentation, UI, test runs, issue creation and cherry-picking across submodules.

Slash commands in `commands/` wrap them. `/bugs`, `/arch-review`, `/perf-check`, `/ui-review` and `/arewedone` each run one. `/review-gauntlet` launches five reviewers at once on the current diff, merges their findings into one report ranked as must-fix, should-fix and advisory, and then fixes the first two groups. One of the five, `silent-failure-hunter`, is not in the repo's agents folder, so install an agent by that name or delete the line.

## Skills for procedures that recur

A skill is a folder Claude loads when a task matches its description. These are in the repo:

- **`root-cause-tracing`** walks a bug backward from where it shows up to the original trigger, instead of patching the symptom.
- **`git-worktree-prune`** removes worktrees and local branches left behind by old sessions. It dry-runs by default, deletes a branch only if every commit on it is reachable from another ref, and removes a worktree only if it is clean.
- **`gemini-agent`** hands a token-heavy task, such as a long review, to Gemini CLI in headless mode. It saves context and gives a second opinion from a different model.
- **`generate-goal`** and **`run-goals`** work as a pair. The first turns a conversation into a self-contained `/goal` prompt. The second runs several of those prompts at once, each as its own non-interactive Claude Code session in its own git worktree, and reports the results.
- **`skill-creator`** scaffolds new skills.

## A status line that costs 16 ms

Claude Code re-runs the status line command every second, which is the `refreshInterval` in the settings file. Running git that often would be wasteful, so `statusline.go` is a small Go binary that caches what it reads on disk and touches git only when something has changed. The README's benchmark is 20 runs of each case on Windows 11, using `tests/bench.ps1`.

| Case | Median |
| --- | --- |
| Fully warm, every cache hit | 16 ms |
| Git cache miss | 62 ms |
| No git repository | 13 ms |
| Bare process startup | 11 ms |

It shows the project, the model with its effort level, prompt cache reads and writes, a timer, the git branch with dirty and ahead or behind markers, and the context window remaining, colored green above 50%, yellow from 20 to 50% and red below that. The timer is the unusual one. It counts down 60 minutes from the last API call, so you can see when the prompt cache will expire.

`statusline.cmd` runs the right prebuilt binary on Windows and on Apple silicon or Intel Macs. On Linux, `build_statusline.sh` builds a native one.

## Worktrees are where this meets Sidereal

`run-goals` puts each session in its own git worktree, on its own branch, so parallel edits never collide. That solves isolation and creates a visibility problem. Three goals means three worktrees, and `git worktree list` shows paths and hashes, not history.

That is the part [Sidereal for Git](https://marketplace.visualstudio.com/items?itemName=zglass.sidereal) helps with. I built it, so weigh this paragraph accordingly. It is a Git graph for VS Code, in the style of TortoiseGit's log view. It shows which branches other worktrees have checked out, creates a worktree from any branch or commit, and opens it in a new window or its own tab. Submodules appear nested under their parent. It is free, needs no account, and makes no network calls apart from git's own fetch, pull and push. The code is on [GitHub](https://github.com/ZacheryGlass/sidereal).

## Using it

Clone the repo and copy what you want into `~/.claude`. Trim `settings.json` first: its 65 permission entries suit my machine, not yours. Then restart Claude Code.
