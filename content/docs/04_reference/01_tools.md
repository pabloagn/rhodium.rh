---
title: "Tools Overview"
description: "A high-level overview of the 150+ curated tools included in Rhodium."
type: "docs"
url: "/docs/reference/tools-overview/"
weight: 1
---

Rhodium includes over 150 carefully selected tools organized into functional categories. This page provides a high-level overview; see individual tool pages under [Tools Reference](/docs/reference/tools/) for detailed documentation.

## Core Stack

These are the primary tools that define the Rhodium experience:

| Category | Tool | Description |
|----------|------|-------------|
| Compositor | **Niri** | Scrollable-tiling Wayland compositor |
| Terminal | **Kitty** | GPU-accelerated terminal with ligatures |
| Shell | **Fish** | User-friendly shell with autosuggestions |
| Editor | **Neovim** | Modal editor with LSP support |
| File Manager | **Yazi** | Async terminal file manager |
| Launcher | **Fuzzel** | Wayland-native application launcher |
| Bar | **Waybar** | Customizable status bar |
| Notifications | **Mako** | Lightweight notification daemon |

## Editors

| Tool | Type | Description |
|------|------|-------------|
| Neovim | Terminal | Primary editor with full LSP, DAP, and plugin ecosystem |
| Helix | Terminal | Post-modern modal editor with built-in LSP |
| Zed | GUI | GPU-accelerated collaborative editor |
| Emacs | Both | Extensible editor (Doom Emacs configuration) |

## File Management

| Tool | Type | Description |
|------|------|-------------|
| [Yazi](/docs/reference/tools/yazi/) | Terminal | Primary file manager with plugins |
| Thunar | GUI | GTK file manager for drag-drop operations |
| `fd` | CLI | Fast file finder |
| `ripgrep` | CLI | Fast content search |
| `fzf` | CLI | Fuzzy finder |

## Development

### Version Control

| Tool | Description |
|------|-------------|
| Git | Version control system |
| Lazygit | Terminal UI for Git |
| Delta | Syntax-highlighting diff pager |
| gh | GitHub CLI |

### Languages & Runtimes

| Tool | Description |
|------|-------------|
| Nix | Package manager and build system |
| Rust | Systems programming (rustup, cargo) |
| Python | Data science and scripting |
| Node.js | JavaScript runtime |
| Go | Systems and web development |

### Build & Automation

| Tool | Description |
|------|-------------|
| Just | Command runner (make alternative) |
| Direnv | Directory-based environments |
| Docker | Container runtime |
| Podman | Rootless container runtime |

## Document & Productivity

| Tool | Type | Description |
|------|------|-------------|
| Zathura | PDF | Vim-like PDF viewer |
| Okular | PDF | Full-featured document viewer |
| Obsidian | Notes | Knowledge management |
| LibreOffice | Office | Document suite |

## Media

| Tool | Type | Description |
|------|------|-------------|
| mpv | Video | Minimal video player |
| imv | Image | Image viewer |
| Oculante | Image | Fast image viewer |
| ncspot | Audio | Terminal Spotify client |
| GIMP | Image | Image editor |
| Inkscape | Vector | Vector graphics editor |

## System Utilities

| Tool | Description |
|------|-------------|
| btop | System monitor |
| dust | Disk usage analyzer |
| bandwhich | Network monitor |
| procs | Process viewer |
| hyperfine | Benchmarking tool |

## Selection Philosophy

Tools are chosen based on:

1. **Performance** — Fast startup, low resource usage
2. **Keyboard-driven** — Minimal mouse dependency
3. **Composability** — Works well with other tools
4. **Maintainability** — Active development, NixOS support
5. **Consistency** — Similar keybindings where possible

## Detailed Documentation

For comprehensive documentation including configuration and keybindings, see the individual tool pages:

- [Yazi](/docs/reference/tools/yazi/) — File manager with full keybinding reference
- More tool pages coming soon

## Package Channels

Rhodium uses multiple nixpkgs channels:

| Channel | Version | Usage |
|---------|---------|-------|
| `nixpkgs` | 25.11 | Primary system packages |
| `nixpkgs-unstable` | Rolling | Cutting-edge tools (Yazi, Neovim plugins) |
| `nixpkgs-shell` | 25.11 | Development shell packages |
