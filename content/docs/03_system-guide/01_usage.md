---
title: "Usage"
description: "Daily workflows and system operations."
type: "docs"
url: "/docs/system-guide/usage/"
weight: 1
---

This page covers common workflows for daily system use and management.

## System Management

### Rebuilding

After configuration changes, rebuild the system:

```bash
# Fast rebuild (recommended for iteration)
just switch-fast host_001

# Full rebuild with verbose output
just switch host_001

# Build without switching (for testing)
just build host_001
```

### Updating

Update flake inputs regularly:

```bash
# Update all inputs
just update
just switch host_001

# Update specific input
just update-input nixpkgs-unstable
just switch host_001
```

### Generations

View and manage system generations:

```bash
# Current generation info
just generation

# Compare generations
just diff-generations 150 151

# Rollback
just rollback
```

### Garbage Collection

Clean up old generations and store:

```bash
# Keep last 5 generations
just gc-keep 5

# Remove generations older than 7 days
just gc-days 7

# Full garbage collection
just gc
```

## Development Workflows

### Per-Project Environments

Use direnv with flake.nix for project-specific dependencies:

```bash
# In project directory with flake.nix
direnv allow

# Environment activates automatically on cd
```

### Language-Specific

Each language has configured tooling:

| Language | Tools Available |
|----------|-----------------|
| Nix | nil (LSP), nixfmt, statix |
| Rust | rust-analyzer, cargo, rustfmt |
| Python | pyright, ruff, poetry |
| JavaScript | typescript-language-server, eslint |
| Go | gopls, golangci-lint |
| Lua | lua-language-server, stylua |

### Git Workflow

Git is configured with delta for diffs and lazygit for TUI:

```bash
# Open lazygit (or Super+g in terminal)
lazygit

# Standard git operations use delta automatically
git diff
git log -p
```

## Window Management

### Niri Basics

Niri uses a scrollable-tiling layout:

| Concept | Description |
|---------|-------------|
| Column | Vertical stack of windows |
| Workspace | Horizontal row of columns |
| Scrolling | Columns scroll horizontally like a timeline |

### Navigation

```
┌──────────────────────────────────────────────────────────┐
│  [Col 1]    [Col 2]    [Col 3]    [Col 4]    [Col 5]    │
│  ┌─────┐    ┌─────┐    ┌─────┐    ┌─────┐    ┌─────┐    │
│  │ Win │    │ Win │    │ Win │    │ Win │    │ Win │    │
│  │  1  │    │  2  │    │  3  │    │  4  │    │  5  │    │
│  └─────┘    └─────┘    └─────┘    └─────┘    └─────┘    │
│                          ▲                               │
│                       focused                            │
└──────────────────────────────────────────────────────────┘
       ◄─── Super+h         Super+l ───►
```

| Keybinding | Action |
|------------|--------|
| `Super + hjkl` | Focus window in direction |
| `Super + Shift + hjkl` | Move window in direction |
| `Super + 1-9` | Switch to workspace |
| `Super + [/]` | Previous/next workspace |

### Window Operations

| Keybinding | Action |
|------------|--------|
| `Super + q` | Close window |
| `Super + f` | Toggle fullscreen |
| `Super + Space` | Toggle floating |
| `Super + w` | Cycle window width (1/3, 1/2, 2/3) |
| `Super + r` | Enter resize mode |

## Terminal Workflow

### Kitty

Kitty runs as a daemon. New windows spawn instantly:

| Keybinding | Action |
|------------|--------|
| `Super + Return` | New terminal window |
| `Ctrl + Shift + t` | New tab |
| `Ctrl + Shift + Enter` | New split |

### Fish Shell

Fish with vi-mode:

| Key | Action |
|-----|--------|
| `Esc` | Normal mode |
| `i`, `a`, `A` | Insert mode |
| `Ctrl + f` | Accept autosuggestion |
| `Ctrl + r` | History search (Atuin) |

### Zoxide

Quick directory navigation:

```bash
# Jump to frequently used directory
z rhodium

# Interactive selection
zi
```

## File Operations

### Yazi

Primary file manager (`Super + e`):

| Key | Action |
|-----|--------|
| `hjkl` | Navigate |
| `Enter` | Open |
| `Space` | Select |
| `y` / `d` / `p` | Yank / Cut / Paste |
| `ff` | Fuzzy find files |
| `fg` | Grep content |
| `gi` | Open Lazygit |

### Command Line

Fast file operations:

```bash
# Find files
fd pattern

# Search content
rg pattern

# Fuzzy find
fd | fzf

# Disk usage
dust
```

## Application Launching

### Fuzzel

Application launcher (`Super + d`):

- Type to filter applications
- Enter to launch
- Supports desktop actions

### Direct Launch

| Keybinding | Application |
|------------|-------------|
| `Super + Return` | Terminal |
| `Super + e` | File manager |
| `Super + b` | Browser |
| `Super + n` | Neovim |
| `Super + g` | Lazygit |

## Clipboard

### Clipboard History

View clipboard history with `Super + v`:

- Select previous entries
- Images supported
- Persists across reboots

### Yazi Cross-Instance

Copy files between Yazi instances:

1. Select files, press `Y` (capital)
2. Open another Yazi instance
3. Press `p` to paste

## Screenshots

| Keybinding | Type |
|------------|------|
| `Super + p` | Region selection |
| `Super + Shift + p` | Window |
| `Super + Ctrl + p` | Full screen |

Screenshots saved to `~/Pictures/Screenshots/`.

## System Monitoring

### btop

Full system monitor:

```bash
btop
```

### Quick Checks

```bash
# Process list
procs

# Disk usage
dust

# Network
bandwhich
```
