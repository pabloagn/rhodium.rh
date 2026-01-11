---
title: "Global Keybindings"
description: "System-wide keyboard shortcuts for window management, application launching, and system control."
type: "docs"
url: "/docs/reference/keybinds/"
weight: 2
---

This page documents global keybindings that work system-wide under Niri (the Wayland compositor). For tool-specific keybindings, see individual tool pages.

## Modifier Keys

| Modifier | Key | Usage |
|----------|-----|-------|
| `Mod` | Super/Windows | Primary modifier for all system actions |
| `Shift` | Shift | Secondary actions, move operations |
| `Ctrl` | Control | Tertiary actions, move column |
| `Alt` | Alt | Workspace movement |

## Window Focus

| Keybinding | Action |
|------------|--------|
| `Mod + H` | Focus column left |
| `Mod + J` | Focus window down |
| `Mod + K` | Focus window up |
| `Mod + L` | Focus column right |
| `Mod + Left/Right/Up/Down` | Arrow key alternatives |
| `Mod + Tab` | Focus previous workspace |
| `Alt + Tab` | Focus previous window |

## Move Column

| Keybinding | Action |
|------------|--------|
| `Mod + Ctrl + H` | Move column left |
| `Mod + Ctrl + L` | Move column right |
| `Mod + Ctrl + K` | Move column to workspace up |
| `Mod + Ctrl + J` | Move column to workspace down |

## Move Window

| Keybinding | Action |
|------------|--------|
| `Mod + Ctrl + S` | Move window up |
| `Mod + Ctrl + A` | Move window down |
| `Mod + Comma` | Consume/expel window left |
| `Mod + Period` | Consume/expel window right |

## Window Actions

| Keybinding | Action |
|------------|--------|
| `Mod + C` | Close window |
| `Mod + Ctrl + C` | Force kill window |
| `Mod + V` | Toggle floating |
| `Mod + Shift + V` | Switch floating/tiling focus |
| `Mod + F` | Maximize column |
| `Mod + Shift + F` | Fullscreen window |
| `Mod + Z` | Toggle tabbed display |
| `Mod + Shift + C` | Center column |

## Resize

| Keybinding | Action |
|------------|--------|
| `Mod + R` | Cycle preset width (1/3, 1/2, 2/3, full) |
| `Mod + Shift + R` | Cycle preset height |
| `Mod + Ctrl + R` | Reset window height |
| `Mod + Minus` | Width -10% |
| `Mod + Equal` | Width +10% |
| `Mod + Shift + Minus` | Height -10% |
| `Mod + Shift + Equal` | Height +10% |

## Workspace Navigation

| Keybinding | Action |
|------------|--------|
| `Mod + 1-9` | Focus workspace 1-9 |
| `Mod + 0` | Focus workspace 10 |
| `Mod + Shift + Up` | Focus workspace up |
| `Mod + Shift + Down` | Focus workspace down |
| `Mod + Alt + Up` | Move workspace up |
| `Mod + Alt + Down` | Move workspace down |

## Move to Workspace

| Keybinding | Action |
|------------|--------|
| `Mod + Shift + 1-9` | Move column to workspace 1-9 |
| `Mod + Shift + 0` | Move column to workspace 10 |

## Application Launchers

### Primary

| Keybinding | Application |
|------------|-------------|
| `Mod + W` | Terminal (Kitty) |
| `Mod + B` | Browser (Firefox) |
| `Mod + D` | File manager (Yazi) |
| `Mod + E` | Editor (Neovim) |
| `Mod + Q` | Calculator (qalc) |

### Secondary (Shift)

| Keybinding | Application |
|------------|-------------|
| `Mod + Shift + W` | Ghostty |
| `Mod + Shift + B` | Brave |
| `Mod + Shift + D` | Thunar |
| `Mod + Shift + E` | Emacs |
| `Mod + Shift + Q` | Qalculate (GUI) |

### Tertiary (Ctrl)

| Keybinding | Application |
|------------|-------------|
| `Mod + Ctrl + E` | Zed |
| `Mod + Ctrl + Q` | Calcure |

## Screenshots

| Keybinding | Action |
|------------|--------|
| `Mod + S` | Screenshot full screen |
| `Print` | Screenshot full screen |
| `Mod + Shift + S` | Screenshot region |
| `Shift + Print` | Screenshot region |
| `Mod + Alt + S` | Screenshot window |
| `Ctrl + Print` | Screenshot window |
| `Mod + A` | Annotate screenshot |
| `Mod + Shift + A` | OCR screenshot |

## Media Keys

| Key | Action |
|-----|--------|
| `XF86AudioRaiseVolume` | Volume up 5% |
| `XF86AudioLowerVolume` | Volume down 5% |
| `XF86AudioMute` | Toggle mute |
| `XF86AudioMicMute` | Toggle mic mute |
| `XF86MonBrightnessUp` | Brightness up 5% |
| `XF86MonBrightnessDown` | Brightness down 5% |
| `XF86AudioPlay` | Play/pause |
| `XF86AudioNext` | Next track |
| `XF86AudioPrev` | Previous track |

## Mouse/Touchpad

| Keybinding | Action |
|------------|--------|
| `Mod + WheelScrollUp` | Focus workspace up |
| `Mod + WheelScrollDown` | Focus workspace down |
| `Mod + WheelScrollLeft` | Focus column left |
| `Mod + WheelScrollRight` | Focus column right |
| `Mod + TouchpadScrollUp` | Volume up |
| `Mod + TouchpadScrollDown` | Volume down |

## System

| Keybinding | Action |
|------------|--------|
| `Mod + Escape` | Lock screen |
| `Mod + X` | Toggle overview |
| `Mod + Ctrl + O` | Window opacity |

## Design Principles

1. **Vim-inspired** - `HJKL` for directional navigation
2. **Modifier hierarchy** - `Mod` for focus, `+Ctrl` for move column, `+Shift` for alternatives
3. **Mnemonic** - `W` for window/terminal, `B` for browser, `E` for editor
4. **Consistent** - Same patterns across primary/secondary/tertiary launchers

## Tool-Specific Bindings

| Tool | Documentation |
|------|---------------|
| [Yazi](/docs/reference/tools/yazi/) | File manager keybindings |
| [Niri](/docs/reference/tools/niri/) | Window manager details |
| [Neovim](/docs/reference/tools/neovim/) | Editor keybindings |
| [Fish](/docs/reference/tools/fish/) | Shell keybindings |
