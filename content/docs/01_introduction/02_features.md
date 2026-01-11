---
title: "Features"
description: "Complete feature list organized by category."
type: "docs"
url: "/docs/introduction/features/"
weight: 2
---

Rhodium includes 150+ curated packages organized into functional categories. This page provides a complete feature overview.

## Desktop Environment

### Compositor

| Component | Implementation |
|-----------|---------------|
| Window Manager | Niri (scrollable-tiling Wayland) |
| Status Bar | Waybar (23 custom modules) |
| Launcher | Fuzzel (Wayland-native) |
| Notifications | Mako |
| Lock Screen | Swaylock |
| Idle Daemon | Swayidle |

### Display Management

- Multi-monitor support with per-host configuration
- HiDPI scaling
- Automatic display configuration via kanshi
- Screenshot and screen recording (grim, slurp, wf-recorder)

## Terminal Stack

| Component | Tool |
|-----------|------|
| Emulator | Kitty (GPU-accelerated, daemon mode) |
| Shell | Fish (with vi-mode) |
| Prompt | Starship |
| History | Atuin (SQLite-backed, sync-capable) |
| Directory Jump | Zoxide |
| Multiplexer | Zellij |

### Shell Features

- 170+ aliases for common operations
- 14 custom Fish functions
- Vi-mode keybindings throughout
- Abbreviations for git, nix, docker workflows

## Editors

### Neovim

Primary editor with full IDE capabilities:

| Feature | Count |
|---------|-------|
| Plugins | 70+ |
| Keybindings | 200+ |
| LSP Servers | 50+ |
| Configuration | 3000+ lines |

Key integrations:
- LSP with automatic server installation
- DAP (Debug Adapter Protocol)
- Treesitter for syntax highlighting
- Telescope for fuzzy finding
- Oil.nvim for file management
- Git integration via Gitsigns, Fugitive

### Alternative Editors

| Editor | Type | Configuration |
|--------|------|---------------|
| Helix | Terminal | 30+ LSP servers, Chiaroscuro theme |
| Zed | GUI | GPU-accelerated, collaborative |
| Emacs | Both | Doom Emacs configuration |

## File Management

### Yazi

Terminal file manager with 24 plugins:

| Category | Features |
|----------|----------|
| Navigation | vim-like, jump-to-char, relative-motions |
| Preview | Images, PDFs, archives, CSV/Parquet |
| Git | Status indicators, Lazygit integration |
| Operations | Bulk rename, compress, extract |
| Clipboard | Cross-instance via Wayland |

### CLI Utilities

| Tool | Purpose |
|------|---------|
| fd | Fast file finder |
| ripgrep | Fast content search |
| fzf | Fuzzy finder |
| dust | Disk usage |
| procs | Process viewer |
| btop | System monitor |

## Development

### Version Control

| Tool | Purpose |
|------|---------|
| Git | Version control |
| Lazygit | Terminal UI |
| Delta | Syntax-highlighting diffs |
| gh | GitHub CLI |
| git-crypt | Encrypted files |

### Languages

Configured language toolchains:

| Language | Tools |
|----------|-------|
| Nix | nixfmt, nil LSP, statix |
| Rust | rustup, cargo, rust-analyzer |
| Python | pyenv, poetry, ruff, mypy |
| JavaScript | Node.js, npm, pnpm, eslint |
| Go | gopls, golangci-lint |
| Lua | stylua, lua-language-server |
| Shell | shellcheck, shfmt |

### Infrastructure

| Tool | Purpose |
|------|---------|
| Docker | Container runtime |
| Podman | Rootless containers |
| Direnv | Directory environments |
| Just | Command runner |
| Ansible | Configuration management |
| Terraform | Infrastructure as code |

### Databases

| Database | Purpose |
|----------|---------|
| PostgreSQL | Primary RDBMS |
| SQLite | Embedded database |
| Redis | Key-value store |
| DuckDB | Analytical queries |

## Documents and Media

### Document Viewers

| Format | Viewers |
|--------|---------|
| PDF | Zathura (vim-like), Okular (annotations) |
| Office | LibreOffice |
| Markdown | Glow (terminal) |

### Media

| Type | Tools |
|------|-------|
| Video | mpv |
| Images | imv, Oculante, Swayimg |
| Audio | ncspot (Spotify), mpv |
| Editing | GIMP, Inkscape |

## Productivity

| Tool | Purpose |
|------|---------|
| Obsidian | Knowledge management |
| Thunderbird | Email client |
| qBittorrent | Downloads |
| KeePassXC | Password manager |

## Browsers

| Browser | Configuration |
|---------|---------------|
| Firefox | Custom userChrome, extensions |
| Zen | Minimal Firefox fork |
| Brave | Chromium-based fallback |
| Qutebrowser | Vim-like browser |

## Hardware Support

### Audio

- PipeWire with WirePlumber
- PulseAudio compatibility layer
- Bluetooth audio (A2DP, HFP)

### Input

| Device | Configuration |
|--------|---------------|
| Keyboard | KMonad for advanced remapping |
| Mouse | libinput configuration |
| Touchpad | Gestures, natural scrolling |

### Graphics

| Vendor | Support |
|--------|---------|
| AMD | Full support, AMDGPU |
| Intel | Full support, integrated |
| NVIDIA | Supported, proprietary drivers |

## Security

| Feature | Implementation |
|---------|----------------|
| Secrets | sops-nix (age encryption) |
| SSH | Configured, key management |
| GPG | GnuPG with agent |
| Keyrings | GNOME Keyring, KDE Wallet |
| Sudo | Configured with insults disabled |

## System Services

### Systemd Services

| Service | Purpose |
|---------|---------|
| Kitty daemon | Persistent terminal server |
| Atuin daemon | Shell history sync |
| Mako | Notification daemon |
| Swayidle | Idle management |

### Scheduled Tasks

- Nix garbage collection
- System health checks
- Backup verification

## Build System

### Commands

All operations via `just`:

| Command | Purpose |
|---------|---------|
| `just switch-fast <host>` | Fast rebuild |
| `just build <host>` | Build without activation |
| `just check` | Validate flake |
| `just fmt` | Format Nix files |
| `just update` | Update flake inputs |
| `just gc-keep N` | Keep N generations |

### Flake Inputs

| Input | Purpose |
|-------|---------|
| nixpkgs | System packages |
| home-manager | User configuration |
| sops-nix | Secrets management |
| niri-flake | Compositor |
| chiaroscuro | Theme package |
| rhodium-alloys | Custom plugins |

## Theme System

Centralized theming across all applications:

| Component | Theme |
|-----------|-------|
| Color Scheme | Kanso (via Chiaroscuro) |
| Font (Mono) | Berkeley Mono |
| Font (UI) | Inter |
| Icons | Papirus |
| Cursor | Bibata |

Theme configuration flows from `data/users/preferences/theme.nix` to all applications via Home Manager.
