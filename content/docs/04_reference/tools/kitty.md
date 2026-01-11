---
title: "Kitty"
description: "GPU-accelerated terminal emulator with daemon mode."
type: "docs"
url: "/docs/reference/tools/kitty/"
weight: 4
---

Kitty is the primary terminal emulator in Rhodium, configured as a systemd service for instant window spawning.

## Overview

### Key Features

| Feature | Implementation |
|---------|----------------|
| Rendering | GPU-accelerated |
| Mode | Daemon service |
| Font | Berkeley Mono |
| Tabs | Bottom powerline style |
| Remote Control | Enabled |

## Configuration

Location: `home/apps/terminals/emulators/kitty/`

```
kitty/
├── default.nix    # Main configuration
├── settings.nix   # Terminal settings
└── themes/
    ├── kanso.nix        # Kanso color scheme
    └── chiaroscuro.nix  # Chiaroscuro integration
```

## Settings

### Font

```nix
font = {
  name = "BerkeleyMonoRh Nerd Font";
  size = 12;
};
```

Nerd Font symbols mapped to `Symbols Nerd Font Mono` for consistent icon width.

### Terminal

| Setting | Value | Description |
|---------|-------|-------------|
| `scrollback_lines` | 10000 | History buffer |
| `enable_audio_bell` | false | Silent bell |
| `cursor_blink_interval` | 0 | No cursor blink |
| `allow_remote_control` | true | Enable kitten commands |
| `clipboard_control` | write-clipboard write-primary | Clipboard access |
| `allow_hyperlinks` | true | Clickable URLs |

### Tabs

| Setting | Value |
|---------|-------|
| `tab_bar_min_tabs` | 2 |
| `tab_bar_edge` | bottom |
| `tab_bar_style` | powerline |
| `tab_powerline_style` | angled |

### Window

| Setting | Value |
|---------|-------|
| `window_border_width` | 3pt |
| `window_margin_width` | 0 |
| `window_padding_width` | 10 15 15 15 |

### URLs

URLs open in Firefox Personal profile:

```nix
open_url_with = "firefox -p Personal";
```

## Keybindings

### Tabs

| Keybinding | Action |
|------------|--------|
| `Ctrl + Shift + t` | New tab |
| `Ctrl + Shift + q` | Close tab |
| `Ctrl + Shift + Right` | Next tab |
| `Ctrl + Shift + Left` | Previous tab |
| `Ctrl + Shift + .` | Move tab right |
| `Ctrl + Shift + ,` | Move tab left |

### Windows (Splits)

| Keybinding | Action |
|------------|--------|
| `Ctrl + Shift + Enter` | New window (split) |
| `Ctrl + Shift + w` | Close window |
| `Ctrl + Shift + ]` | Next window |
| `Ctrl + Shift + [` | Previous window |
| `Ctrl + Shift + f` | Move window forward |
| `Ctrl + Shift + b` | Move window backward |

### Navigation

| Keybinding | Action |
|------------|--------|
| `Ctrl + Shift + Up` | Scroll up |
| `Ctrl + Shift + Down` | Scroll down |
| `Ctrl + Shift + Page_Up` | Scroll page up |
| `Ctrl + Shift + Page_Down` | Scroll page down |
| `Ctrl + Shift + Home` | Scroll to top |
| `Ctrl + Shift + End` | Scroll to bottom |
| `Ctrl + Shift + h` | Browse scrollback in pager |

### Font Size

| Keybinding | Action |
|------------|--------|
| `Ctrl + Shift + Equal` | Increase font size |
| `Ctrl + Shift + Minus` | Decrease font size |
| `Ctrl + Shift + Backspace` | Reset font size |

### Clipboard

| Keybinding | Action |
|------------|--------|
| `Ctrl + Shift + c` | Copy |
| `Ctrl + Shift + v` | Paste |

### Other

| Keybinding | Action |
|------------|--------|
| `Ctrl + Shift + F5` | Reload config |
| `Ctrl + Shift + F2` | Edit config |
| `Ctrl + Shift + Escape` | Kitty shell |
| `Ctrl + Shift + u` | Unicode input |
| `Ctrl + Shift + e` | Open URL hints |

## Daemon Mode

Kitty runs as a systemd user service:

```bash
# Service status
systemctl --user status kitty

# Restart service
systemctl --user restart kitty
```

New windows spawn instantly by connecting to the running daemon.

## Kitten Commands

Kitty includes "kittens" for extended functionality:

### SSH

```bash
# SSH with terminal features
kitten ssh user@host
```

### Clipboard

```bash
# Copy to clipboard
echo "text" | kitten clipboard
```

### Image Display

```bash
# Display image in terminal
kitten icat image.png
```

### Diff

```bash
# Side-by-side diff
kitten diff file1 file2
```

### Hints

```bash
# Copy URLs from scrollback
kitten hints --type url
```

## Theme

Kitty uses the Kanso theme from Chiaroscuro:

```nix
# Colors from theme
foreground = "#c5c9c5";
background = "#0d0c0c";
selection_foreground = "#c5c9c5";
selection_background = "#2d4f67";
```

## Integration

### Yazi

Kitty's image protocol is used by Yazi for previews:

```bash
# Launch Yazi in Kitty
kitty -e yazi
```

### Neovim

Neovim detects Kitty for image rendering:

```lua
-- In Neovim, images work automatically
```

## Tips

### Quick Launch

From Niri: `Mod + W` opens a new Kitty window instantly.

### Tab Title

Tab titles show the running process and window count:
- `nvim :2:` means nvim running with 2 windows

### Scrollback Pager

Press `Ctrl + Shift + h` to browse scrollback in your `$PAGER` (less/bat).

### Remote Control

Send commands to running Kitty:

```bash
# Set tab title
kitty @ set-tab-title "My Tab"

# Focus specific window
kitty @ focus-window --match title:nvim
```
