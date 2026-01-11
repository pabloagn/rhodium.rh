---
title: "Yazi"
description: "Terminal file manager with async I/O, plugin system, and extensive customization."
type: "docs"
url: "/docs/reference/tools/yazi/"
weight: 1
---

Yazi is a blazing-fast terminal file manager written in Rust, featuring async I/O, a powerful plugin system, and deep integration with the Rhodium ecosystem. It serves as the primary file management interface, replacing traditional GUI file managers for most operations.

## Overview

### Why Yazi?

Yazi was chosen for Rhodium because it embodies the core principles of the system:

- **Performance** — Async I/O means no blocking on large directories or slow storage
- **Extensibility** — Lua plugin system allows deep customization
- **Keyboard-Driven** — Modal interface with vim-like navigation
- **Modern** — Native Wayland support, image previews, and GPU rendering
- **Integration** — Works seamlessly with other Rhodium tools (Neovim, Lazygit, etc.)

### Key Features

| Feature | Description |
|---------|-------------|
| Async I/O | Non-blocking file operations |
| Image Preview | Native image rendering in terminal |
| Plugin System | Lua-based extensibility |
| Bulk Operations | Rename, move, copy with visual selection |
| Git Integration | File status indicators and Lazygit launcher |
| Archive Support | Preview and extract archives in-place |
| Structured Data | CSV/Parquet preview with DuckDB |

## Configuration

Yazi configuration in Rhodium is managed through Home Manager and located in:

```
home/utils/files/yazi/
├── modules/
│   ├── default.nix    # Plugin imports and main config
│   ├── base.nix       # Core settings, openers, MIME rules
│   ├── keymap.nix     # All keybindings
│   ├── kanso.nix      # Theme (Kanso color scheme)
│   └── files.nix      # Additional config files
└── plugins/
    ├── default.nix    # Lua aggregator
    ├── duckdb.lua     # Structured data preview config
    ├── git.lua        # Git integration and status bar
    ├── full-border.lua
    └── plugins-init.lua  # Plugin initialization
```

### Layout

The default layout uses a 1:4:3 ratio for parent:current:preview panes:

```
┌─────┬────────────────┬────────────┐
│     │                │            │
│  P  │    Current     │  Preview   │
│  a  │   Directory    │   Pane     │
│  r  │                │            │
│  e  │                │            │
│  n  │                │            │
│  t  │                │            │
│     │                │            │
├─────┴────────────────┴────────────┤
│ Mode │ Git Branch │ CWD          │
└───────────────────────────────────┘
```

## Keybindings

All keybindings use a mnemonic system designed for efficiency and discoverability.

### Navigation

| Key | Action | Description |
|-----|--------|-------------|
| `h` | Parent directory | Move to parent |
| `j` | Down | Move cursor down |
| `k` | Up | Move cursor up |
| `l` | Enter/Open | Enter directory or open file |
| `gg` | Top | Jump to first item |
| `G` | Bottom | Jump to last item |
| `1-9` | Relative motion | Jump N lines (vim-like) |
| `;` | Jump to char | Vim-like `f<char>` navigation |

### Quick Navigation

| Key | Action | Description |
|-----|--------|-------------|
| `gr` | Go to Rhodium | Jump to `$RHODIUM` directory |
| `gh` | Go to Home | Jump to `$HOME` |
| `gH` | Go to Cache | Jump to `$XDG_CACHE_HOME` |
| `gb` | Go to Bin | Jump to `~/.local/bin` |
| `ge` | Go to Doom | Jump to Doom Emacs config |
| `gu` | Go to Utils | Jump to `$DEV_UTILS` |
| `gp` | Go to Project | Jump to Git repository root |
| `gA` | Go to Apps | Jump to `~/.local/share/applications` |
| `ga` | Go to Academic | Jump to academic directory |
| `gd` | Go to Downloads | Jump to downloads |
| `gs` | Go to Work | Jump to SolenoidLabs directory |

### Search & Filter

| Key | Action | Description |
|-----|--------|-------------|
| `ff` | Fuzzy find | Search files by name (fzf) |
| `fg` | Grep content | Search file contents (rg + fzf) |
| `fG` | Grep all | Search with ripgrep-all (PDFs, etc.) |
| `F` | Smart filter | Interactive directory filter |
| `/` | Search | Built-in search |

### File Operations

| Key | Action | Description |
|-----|--------|-------------|
| `y` | Yank | Copy file(s) to Yazi clipboard |
| `Y` | System yank | Copy to Wayland clipboard (cross-instance) |
| `d` | Cut | Cut file(s) |
| `p` | Paste | Paste file(s) |
| `D` | Delete | Delete file(s) |
| `a` | Create | Create new file |
| `A` | Create dir | Create new directory |

### Rename Operations

| Key | Action | Description |
|-----|--------|-------------|
| `rr` | Rename | Rename with cursor before extension |
| `ra` | Rename all | Clear filename, cursor at start |
| `rc` | Rename stem | Clear stem only, keep extension |

### Selection

| Key | Action | Description |
|-----|--------|-------------|
| `Space` | Toggle select | Select/deselect current item |
| `v` | Visual mode | Enter visual selection mode |
| `V` | Visual all | Select all items |
| `Esc` | Clear | Clear selection |

### Git Integration

| Key | Action | Description |
|-----|--------|-------------|
| `gi` | Lazygit | Open Lazygit in current repo |
| `gD` | Diff | Diff selected files |

### Drag & Drop

| Key | Action | Description |
|-----|--------|-------------|
| `Ctrl+g` | Drag | Drag current/selected files to other apps |
| `Alt+g` | Drag all | Drag all selected files |

### Archive Operations

| Key | Action | Description |
|-----|--------|-------------|
| `ca` | Compress | Create archive from selection |
| `cx` | Extract | Extract archive to current directory |

### Pane Management

| Key | Action | Description |
|-----|--------|-------------|
| `T` | Max preview | Maximize preview pane |
| `Ctrl+t` | Min preview | Minimize preview pane |
| `w` | Tasks | Show running tasks |

### DuckDB (Structured Data)

When previewing CSV, TSV, or Parquet files:

| Key | Action | Description |
|-----|--------|-------------|
| `H` | Scroll left | Scroll columns left |
| `L` | Scroll right | Scroll columns right |
| `Ctrl+d` | Toggle mode | Switch summary/standard view |

### System Operations

| Key | Action | Description |
|-----|--------|-------------|
| `cm` | Chmod | Change file permissions |
| `cs` | Sudo | Execute operation with sudo |
| `mm` | Mount | Mount/unmount disks |
| `M` | Media info | Show detailed media information |

### Projects

| Key | Action | Description |
|-----|--------|-------------|
| `ps` | Save project | Save current location as project |
| `pl` | Load project | Load saved project |
| `pd` | Delete project | Delete a saved project |
| `pD` | Delete all | Delete all projects |
| `pm` | Merge | Merge with other projects |

### Recovery

| Key | Action | Description |
|-----|--------|-------------|
| `ur` | Restore | Restore deleted files from trash |

### Opening Files

| Key | Action | Description |
|-----|--------|-------------|
| `Enter` | Open | Open with default application |
| `O` | Open with | Show all available openers |
| `o` | Open default | Open with system default |

## Plugins

Rhodium includes a curated set of 24 plugins for an expert-level experience:

### Core Functionality

| Plugin | Description |
|--------|-------------|
| `chmod` | Interactive permission management |
| `diff` | Visual file comparison |
| `sudo` | Elevated privilege operations |
| `restore` | Trash recovery |

### Navigation & Productivity

| Plugin | Description |
|--------|-------------|
| `smart-enter` | Context-aware enter (file vs directory) |
| `smart-filter` | Interactive filtering with auto-enter |
| `smart-paste` | Paste into hovered directory |
| `jump-to-char` | Vim-like character jumping |
| `relative-motions` | Number-based line jumping |
| `projects` | Save/load directory bookmarks |

### UI & Visual

| Plugin | Description |
|--------|-------------|
| `full-border` | Decorative pane borders |
| `toggle-pane` | Dynamic pane management |

### Git Integration

| Plugin | Description |
|--------|-------------|
| `git` | File status indicators in listing |
| `lazygit` | Full Lazygit integration |

### File Preview

| Plugin | Description |
|--------|-------------|
| `duckdb` | CSV/TSV/Parquet with statistics |
| `miller` | Alternative tabular data preview |
| `glow` | Markdown rendering |
| `piper` | General-purpose preview commands |
| `mediainfo` | Detailed media metadata |
| `rich-preview` | Enhanced preview for multiple formats |

### Archive & Compression

| Plugin | Description |
|--------|-------------|
| `ouch` | Archive preview and extraction |
| `compress` | Create archives (zip, tar.gz, 7z, etc.) |

### System & Utilities

| Plugin | Description |
|--------|-------------|
| `mount` | Disk mounting interface |
| `mime-ext` | Fast MIME detection via extension |
| `wl-clipboard` | Wayland clipboard integration |

## File Openers

When pressing `O` (Shift+o) on a file, these options appear based on file type:

### PDF Files

| Opener | Description |
|--------|-------------|
| Okular | Full-featured viewer with annotations |
| Zathura | Fast, vim-like viewer |
| LibreOffice Draw | Edit PDFs |
| System default | xdg-open |

### Images

| Opener | Description |
|--------|-------------|
| System default | xdg-open |
| Oculante | Fast image viewer |
| Swayimg | Wayland-native viewer |
| imv | Minimal image viewer |
| ImageMagick | Display command |
| GIMP | Full image editor |

### Tabular Data (CSV, TSV)

| Opener | Description |
|--------|-------------|
| LibreOffice Calc | Spreadsheet application |
| $EDITOR | Text editor |
| Helix, Zed, etc. | Alternative editors |

### Code Files

| Opener | Description |
|--------|-------------|
| $EDITOR | Primary text editor |
| Helix | Alternative modal editor |
| Zed | GUI editor |
| Nano, Emacs | Fallback editors |

### Media Files

| Opener | Description |
|--------|-------------|
| mpv | Video/audio player |
| VLC | Alternative media player |

## Cross-Instance Operations

### Clipboard Sharing

Rhodium configures Yazi to work across terminal instances:

1. **Yank to system clipboard**: Press `Y` (capital) to copy files to Wayland clipboard
2. **Paste anywhere**: The standard `p` will paste from either Yazi's internal clipboard OR the system clipboard
3. **Works across terminals**: Open Yazi in multiple Kitty windows and share files seamlessly

### Drag & Drop

Use `Ctrl+g` to spawn a drag window:

1. Select files in Yazi
2. Press `Ctrl+g`
3. A small window appears with your files
4. Drag from that window to any application (browser, file manager, etc.)

## Theme

Yazi uses the Kanso color scheme, matching the rest of the Rhodium system:

- **Background**: Dark with subtle depth
- **Foreground**: Warm off-white
- **Accents**: Earth tones (green, brown, blue)
- **Git indicators**: Color-coded status
- **Selection**: Visible highlight without distraction

## Tips & Patterns

### Bulk Rename

1. Select files with `Space` or `V`
2. Press `rr` to rename
3. Use `Tab` to cycle through selected files

### Quick Archive Extraction

1. Navigate to archive
2. Press `cx` to extract in place
3. Preview contents first with the preview pane

### Project Workflow

1. Navigate to project root
2. Press `ps` to save as project
3. From anywhere, press `pl` to return instantly

### Preview Large CSVs

1. DuckDB plugin shows column statistics by default
2. Use `H`/`L` to scroll through columns
3. Press `Ctrl+d` to see actual data rows

## Related

- [Keybindings Reference](/docs/reference/keybinds/) — System-wide shortcuts
- [Neovim](/docs/reference/tools/neovim/) — Text editor integration
- [Theme System](/docs/reference/config/themes/) — Color scheme details
