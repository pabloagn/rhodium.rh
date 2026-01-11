---
title: "Helix"
description: "Post-modern modal editor with built-in LSP."
type: "docs"
url: "/docs/reference/tools/helix/"
weight: 6
---

Helix is the secondary editor in Rhodium, offering a modern take on modal editing with built-in LSP support and no plugin system needed.

## Overview

### Key Features

| Feature | Implementation |
|---------|----------------|
| Mode | Modal (evil mode enabled) |
| LSP | Built-in, 30+ servers configured |
| Theme | Chiaroscuro |
| Clipboard | Wayland native |

## Configuration

Location: `home/apps/editors/helix/`

```
helix/
├── default.nix     # Main configuration
├── settings.nix    # Editor settings
├── languages.nix   # LSP configuration
└── themes.nix      # Theme setup
```

## Settings

### Editor

| Setting | Value |
|---------|-------|
| `theme` | chiaroscuro |
| `auto-completion` | true |
| `auto-format` | true |
| `bufferline` | always |
| `cursorline` | true |
| `scrolloff` | 8 |
| `idle-timeout` | 250ms |
| `evil` | true |

### Cursor

| Mode | Shape |
|------|-------|
| Normal | Block |
| Insert | Bar |
| Select | Underline |

### LSP

| Setting | Value |
|---------|-------|
| `enable` | true |
| `auto-signature-help` | true |
| `display-inlay-hints` | true |

### Clipboard

Default yank register set to `+` (system clipboard) with Wayland provider.

### Statusline

```
┌─────────────────────────────────────────────────────────────────┐
│ NORMAL │ file.rs │           main │ E:0 W:0 │ 1 │ 10:5 25% │ rs │
└─────────────────────────────────────────────────────────────────┘
   mode    file        git branch    diag    sel  pos        type
```

### Gutters

| Column | Content |
|--------|---------|
| 1 | Diagnostics |
| 2 | Line numbers |
| 3 | Git diff |

## Language Servers

Rhodium configures 30+ language servers:

### Systems Languages

| Language | Server |
|----------|--------|
| Rust | rust-analyzer |
| C/C++ | clangd |
| Go | gopls |
| Zig | zls |

### Functional Languages

| Language | Server |
|----------|--------|
| Haskell | haskell-language-server |
| OCaml | ocamllsp |
| Elixir | elixir-ls |
| Clojure | clojure-lsp |
| Elm | elm-language-server |
| Scala | metals |

### Web Languages

| Language | Server |
|----------|--------|
| TypeScript/JavaScript | typescript-language-server |
| HTML | vscode-html-language-server |
| CSS | vscode-css-language-server |
| Tailwind | tailwindcss-language-server |

### Scripting Languages

| Language | Server |
|----------|--------|
| Python | pyright |
| Lua | lua-language-server |
| Bash | bash-language-server |
| Perl | perlnavigator |
| PHP | intelephense |

### Data Languages

| Language | Server |
|----------|--------|
| YAML | yaml-language-server |
| TOML | taplo |
| SQL | sqls |
| JSON | (built-in) |

### Other Languages

| Language | Server |
|----------|--------|
| Nix | nil, nixd |
| LaTeX | texlab |
| Markdown | marksman |
| Java | jdt-language-server |
| Kotlin | kotlin-language-server |
| C# | omnisharp |
| Swift | sourcekit-lsp |

## Keybindings

Helix uses a selection-first model. Select, then act.

### Normal Mode

#### Movement

| Key | Action |
|-----|--------|
| `h/j/k/l` | Move left/down/up/right |
| `w/b` | Word forward/backward |
| `e` | Word end |
| `0/$` | Line start/end |
| `gg/G` | File start/end |
| `f/F<char>` | Find character |
| `t/T<char>` | Till character |

#### Selection

| Key | Action |
|-----|--------|
| `v` | Enter select mode |
| `x` | Select line |
| `%` | Select entire file |
| `s` | Select within selection (regex) |
| `S` | Split selection |

#### Editing

| Key | Action |
|-----|--------|
| `d` | Delete selection |
| `c` | Change selection |
| `y` | Yank selection |
| `p/P` | Paste after/before |
| `r<char>` | Replace with character |
| `~` | Toggle case |
| `u/U` | Undo/redo |

#### Custom Keybindings

| Key | Action |
|-----|--------|
| `D` | Delete to line end |
| `Space Space` | Yank all to clipboard |

### Space Menu

Press `Space` for command menu:

| Key | Action |
|-----|--------|
| `f` | File picker |
| `b` | Buffer picker |
| `s` | Symbol picker |
| `S` | Workspace symbols |
| `g` | Debug menu |
| `w` | Window menu |
| `y` | Yank to clipboard |
| `p` | Paste from clipboard |

### Goto Mode (`g`)

| Key | Action |
|-----|--------|
| `g` | Go to file start |
| `e` | Go to file end |
| `h` | Go to line start |
| `l` | Go to line end |
| `d` | Go to definition |
| `r` | Go to references |
| `i` | Go to implementation |
| `t` | Go to type definition |

### Match Mode (`m`)

| Key | Action |
|-----|--------|
| `m` | Match brackets |
| `s` | Surround add |
| `r` | Surround replace |
| `d` | Surround delete |

### View Mode (`z/Z`)

| Key | Action |
|-----|--------|
| `z` | Center cursor |
| `t` | Align cursor top |
| `b` | Align cursor bottom |
| `j/k` | Scroll down/up |

### Window Mode (`Ctrl+w`)

| Key | Action |
|-----|--------|
| `s` | Horizontal split |
| `v` | Vertical split |
| `h/j/k/l` | Focus window |
| `q` | Close window |

## LSP Actions

| Key | Action |
|-----|--------|
| `K` | Hover documentation |
| `Space a` | Code actions |
| `Space r` | Rename symbol |
| `Space k` | Show signature |
| `]d/[d` | Next/prev diagnostic |

## Tips

### Selection-First Model

Unlike Vim, Helix selects first:
1. `w` selects word
2. `d` deletes selection

### Multiple Cursors

1. Select text with `s` (regex)
2. Each match becomes a cursor
3. Edit all simultaneously

### File Picker

`Space f` opens fuzzy file finder:
- Type to filter
- `Ctrl+v` to open in vertical split
- `Ctrl+s` to open in horizontal split

### Quick Yank All

`Space Space` yanks entire file to clipboard (custom binding).

### Buffer Navigation

- `Space b` for buffer picker
- `gn/gp` for next/prev buffer
- `:bc` to close buffer
