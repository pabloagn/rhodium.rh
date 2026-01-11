---
title: "Neovim"
description: "Modal editor with full LSP, DAP, and plugin ecosystem."
type: "docs"
url: "/docs/reference/tools/neovim/"
weight: 7
---

Neovim is the primary editor in Rhodium, configured with 70+ plugins, 200+ keybindings, and LSP support for 50+ languages.

## Overview

### Key Features

| Feature | Count/Implementation |
|---------|---------------------|
| Plugins | 70+ |
| Keybindings | 200+ |
| LSP Servers | 50+ |
| Theme | Kanso |
| Configuration | 3000+ lines |

## Configuration

Location: `home/apps/editors/neovim/`

```
neovim/
├── default.nix          # Main configuration
├── plugins/             # Plugin configurations
│   ├── completion/      # nvim-cmp, copilot
│   ├── editor/          # Core editing plugins
│   ├── git/             # Gitsigns, fugitive
│   ├── lsp/             # LSP configuration
│   ├── navigation/      # Telescope, oil
│   ├── syntax/          # Treesitter
│   └── ui/              # Theme, statusline
├── keymaps/             # Keybinding configurations
└── lsp/                 # Language server configs
```

## Leader Key

Leader: `Space`

All custom keybindings use `Space` as the leader key.

## Core Keybindings

### File Operations

| Keybinding | Action |
|------------|--------|
| `Space ff` | Find files (Telescope) |
| `Space fg` | Live grep |
| `Space fb` | Browse buffers |
| `Space fr` | Recent files |
| `Space fs` | Save file |
| `Space fn` | New file |

### Navigation

| Keybinding | Action |
|------------|--------|
| `Space e` | File explorer (Oil) |
| `gd` | Go to definition |
| `gr` | Go to references |
| `gi` | Go to implementation |
| `K` | Hover documentation |
| `Ctrl+o` | Jump back |
| `Ctrl+i` | Jump forward |

### Window Management

| Keybinding | Action |
|------------|--------|
| `Space sv` | Split vertical |
| `Space sh` | Split horizontal |
| `Space sq` | Close split |
| `Ctrl+h/j/k/l` | Navigate splits |
| `Space +/-` | Resize splits |

### Buffer Management

| Keybinding | Action |
|------------|--------|
| `Tab` | Next buffer |
| `Shift+Tab` | Previous buffer |
| `Space bd` | Delete buffer |
| `Space ba` | Delete all buffers |

### LSP Actions

| Keybinding | Action |
|------------|--------|
| `Space ca` | Code actions |
| `Space cr` | Rename symbol |
| `Space cf` | Format document |
| `Space cd` | Show diagnostics |
| `[d` | Previous diagnostic |
| `]d` | Next diagnostic |

### Git Integration

| Keybinding | Action |
|------------|--------|
| `Space gg` | Lazygit |
| `Space gb` | Git blame |
| `Space gd` | Git diff |
| `Space gs` | Git status |
| `]c` | Next hunk |
| `[c` | Previous hunk |

### Search and Replace

| Keybinding | Action |
|------------|--------|
| `Space sr` | Search and replace |
| `Space sw` | Search word under cursor |
| `*` | Search word forward |
| `#` | Search word backward |

### Comments

| Keybinding | Action |
|------------|--------|
| `gcc` | Toggle comment line |
| `gc` | Toggle comment (visual) |
| `gbc` | Toggle block comment |

### Completion

| Keybinding | Action |
|------------|--------|
| `Ctrl+Space` | Trigger completion |
| `Tab` | Next item |
| `Shift+Tab` | Previous item |
| `Enter` | Confirm |
| `Ctrl+e` | Close menu |

## Plugin Highlights

### Telescope

Fuzzy finder for everything:
- Files, buffers, grep
- LSP symbols, diagnostics
- Git commits, branches

### Oil.nvim

File explorer as a buffer:
- Edit filenames directly
- Create/delete with normal editing
- Navigate with `Space e`

### Treesitter

Syntax highlighting and text objects:
- Language-aware highlighting
- Structural text objects (`vaf` for function)
- Incremental selection

### nvim-cmp

Completion engine with sources:
- LSP completions
- Buffer words
- Snippets
- Path completion

### Gitsigns

Git integration in gutter:
- Changed line indicators
- Inline blame
- Hunk operations

### Which-key

Keybinding hints:
- Press `Space` and wait for menu
- Shows available commands
- Grouped by category

## LSP Support

Language servers installed via mason.nvim:

### Full Support (LSP + Format + Lint)

- Rust (rust-analyzer)
- Python (pyright, ruff)
- TypeScript (tsserver)
- Go (gopls)
- Lua (lua_ls)
- Nix (nil_ls, nixd)

### Basic Support (LSP)

- C/C++ (clangd)
- Java (jdtls)
- Haskell (hls)
- Scala (metals)
- And 40+ more

## DAP (Debug)

Debug adapter support:
- Python (debugpy)
- Rust (codelldb)
- JavaScript (node2)
- Go (delve)

Launch with `Space dd`.

## Theme

Kanso theme with variants:
- `kanso-ink` (dark)
- `kanso-paper` (light)
- `kanso-zen` (low contrast)

Configured via `data/users/preferences/theme.nix`.

## Tips

### Quick File Navigation

1. `Space ff` to find files
2. Type partial path
3. `Ctrl+v` for vertical split
4. `Ctrl+x` for horizontal split

### Project-Wide Search

1. `Space fg` for live grep
2. Type search term
3. Results update live
4. `Enter` to jump to result

### Multi-Cursor Editing

1. Search word with `*`
2. `cgn` to change
3. `.` to repeat on next match
4. `n` to skip, `.` to apply

### Code Actions

Position cursor on error, `Space ca`:
- Import suggestions
- Quick fixes
- Refactoring options

### Terminal Integration

`Space t` opens terminal in split. Exit with `Ctrl+\` `Ctrl+n`.
