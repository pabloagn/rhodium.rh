---
title: "Fish"
description: "User-friendly shell with vi-mode and extensive aliases."
type: "docs"
url: "/docs/reference/tools/fish/"
weight: 3
---

Fish (Friendly Interactive Shell) is the default shell in Rhodium, configured with vi-mode, 170+ aliases, and deep integration with Atuin, Zoxide, and Starship.

## Overview

### Key Features

| Feature | Implementation |
|---------|----------------|
| Mode | Vi-mode enabled |
| History | Atuin (SQLite-backed) |
| Prompt | Starship |
| Directory Jump | Zoxide |
| Autosuggestions | Built-in |

## Configuration

Location: `home/shells/fish/`

```
fish/
├── default.nix     # Main configuration
├── aliases.nix     # Imports common aliases
├── functions.nix   # Custom functions
└── keybinds.nix    # Key bindings
```

Shared aliases: `home/shells/common/aliases.nix`

## Vi-Mode

Fish is configured with vi-mode for modal editing:

| Key | Mode | Action |
|-----|------|--------|
| `Esc` | Any | Enter normal mode |
| `i` | Normal | Enter insert mode |
| `a` | Normal | Enter insert mode after cursor |
| `A` | Normal | Enter insert mode at end of line |
| `I` | Normal | Enter insert mode at beginning |

### Normal Mode Navigation

| Key | Action |
|-----|--------|
| `h` | Move left |
| `l` | Move right |
| `w` | Move word forward |
| `b` | Move word backward |
| `0` | Move to line start |
| `$` | Move to line end |
| `f<char>` | Find character forward |
| `F<char>` | Find character backward |

### Normal Mode Editing

| Key | Action |
|-----|--------|
| `x` | Delete character |
| `dw` | Delete word |
| `dd` | Delete line |
| `cw` | Change word |
| `cc` | Change line |
| `yy` | Yank line |
| `p` | Paste |
| `u` | Undo |

## Shell Keybindings

### History

| Key | Action |
|-----|--------|
| `Ctrl + r` | Search history (Atuin) |
| `Up` | Previous command |
| `Down` | Next command |

### Autosuggestion

| Key | Action |
|-----|--------|
| `Ctrl + f` | Accept autosuggestion |
| `Alt + f` | Accept word |
| `Tab` | Complete |

### Editing

| Key | Action |
|-----|--------|
| `Ctrl + a` | Beginning of line |
| `Ctrl + e` | End of line |
| `Ctrl + w` | Delete word backward |
| `Ctrl + u` | Delete to beginning |
| `Ctrl + k` | Delete to end |
| `Ctrl + l` | Clear screen |

## Aliases

Rhodium includes 170+ aliases organized by category.

### Navigation

| Alias | Command | Description |
|-------|---------|-------------|
| `cd` | `z` | Zoxide smart cd |
| `..` | `z ..` | Parent directory |
| `...` | `z ../..` | Two levels up |
| `....` | `z ../../..` | Three levels up |

### Directory Jumps

| Alias | Target |
|-------|--------|
| `gh` | `$HOME` |
| `gr` | `$RHODIUM` |
| `gc` | `$XDG_CONFIG_HOME` |
| `gC` | `$XDG_CACHE_HOME` |
| `gb` | `$XDG_BIN_HOME` |
| `gd` | `$HOME_DOWNLOADS` |
| `gp` | `$HOME_PROJECTS` |
| `gv` | `$HOME_VAULTS` |
| `ga` | `$HOME_ACADEMIC` |
| `gD` | `$DOOMDIR` |
| `gi` | `zi` (interactive) |

### Listing

| Alias | Command | Description |
|-------|---------|-------------|
| `ls` | `eza -l` | Long listing |
| `la` | `eza -la` | All files, long |
| `l2` | `eza --icons -l -T -L=2` | Tree depth 2 |
| `l3` | `eza --icons -l -T -L=3` | Tree depth 3 |
| `llt` | `eza -T` | Tree view |
| `lat` | `eza -Ta` | Tree all |

### File Operations

| Alias | Command | Description |
|-------|---------|-------------|
| `cp` | `cp -iv` | Interactive, verbose |
| `mv` | `mv -iv` | Interactive, verbose |
| `rm` | `trash-put` | Move to trash |
| `mkdir` | `mkdir -pv` | Create parents |

### Editors

| Alias | Command |
|-------|---------|
| `v` | `nvim` |
| `vi` | `nvim` |
| `vim` | `nvim` |

### Git

| Alias | Command | Description |
|-------|---------|-------------|
| `gad` | `git add .` | Stage all |
| `gst` | `git status` | Status |
| `gpu` | `git push -u origin main` | Push to main |
| `grm` | `git rm -rf --cached .` | Remove cache |
| `gcm` | `cz commit` | Commitizen commit |
| `gbp` | `cz bump` | Version bump |

### Docker

| Alias | Command | Description |
|-------|---------|-------------|
| `d` | `docker` | Docker |
| `dc` | `docker compose` | Compose |
| `dps` | `docker ps --format ...` | Formatted ps |

### Modern Replacements

| Alias | Command | Replaces |
|-------|---------|----------|
| `cat` | `bat` | cat |
| `du` | `dust` | du |
| `df` | `duf` | df |
| `ps` | `procs` | ps |
| `htop` | `btm` | htop |
| `ping` | `gping` | ping |
| `dig` | `dog` | dig |

### System

| Alias | Command | Description |
|-------|---------|-------------|
| `y` | `wl-copy` | Copy to clipboard |
| `cl` | `clear` | Clear screen |
| `nf` | `fastfetch` | System info |
| `myip` | `curl -s ifconfig.me` | Public IP |
| `now` | `date +'%Y-%m-%d %H:%M:%S'` | Current time |

### Archives

| Alias | Command |
|-------|---------|
| `untar` | `tar -xvf` |
| `untargz` | `tar -xzvf` |
| `untarxz` | `tar -xJvf` |

### Search

| Alias | Command | Description |
|-------|---------|-------------|
| `fda` | `fd -Lu` | Find all (hidden) |
| `sa` | `alias \| fzf` | Search aliases |
| `sv` | `env \| sort \| fzf` | Search env vars |
| `h` | `fzf-history-widget` | History search |
| `hs` | `history \| rg` | Grep history |

### Safety

| Alias | Command |
|-------|---------|
| `chown` | `chown --preserve-root` |
| `chmod` | `chmod --preserve-root` |
| `chgrp` | `chgrp --preserve-root` |

## Integrations

### Atuin

Shell history with SQLite backend:

```bash
# Search history
Ctrl + r

# Sync history (if configured)
atuin sync
```

### Zoxide

Smart directory jumping:

```bash
# Jump to frequently used directory
z rhodium

# Interactive selection
zi

# Add directory
zoxide add /path/to/dir
```

### Starship

Prompt configured with:
- Git status
- Language versions
- Command duration
- Exit code indicator

### Direnv

Automatic environment loading:

```bash
# Allow directory
direnv allow

# Deny directory
direnv deny
```

## Custom Functions

Rhodium includes custom Fish functions:

| Function | Description |
|----------|-------------|
| `yy` | Open Yazi, cd to exit directory |
| `mkcd` | Make directory and cd into it |
| `extract` | Universal archive extractor |

## Tips

### History Search

1. Press `Ctrl + r` to open Atuin
2. Type to filter
3. `Enter` to execute, `Tab` to edit

### Quick Directory Navigation

Combine zoxide with jumper aliases:

```bash
# Go to projects, then specific project
gp
z myproject
```

Or in one step after first visit:

```bash
z myproject  # Remembers full path
```

### Clipboard Integration

```bash
# Copy command output
ls | y

# Copy file contents
cat file.txt | y
```

### Viewing Files

```bash
# Syntax-highlighted cat
cat file.py

# With line numbers (bat default)
bat -n file.py
```
