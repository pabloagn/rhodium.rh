---
title: "Niri"
description: "Scrollable-tiling Wayland compositor."
type: "docs"
url: "/docs/reference/tools/niri/"
weight: 2
---

Niri is a scrollable-tiling Wayland compositor that forms the foundation of the Rhodium desktop environment. Unlike traditional tiling window managers, Niri organizes windows in infinite horizontal strips that scroll like a timeline.

## Overview

### Key Concepts

| Concept | Description |
|---------|-------------|
| Column | A vertical stack of windows |
| Workspace | A horizontal row of columns |
| Scrolling | Columns scroll horizontally as you navigate |
| Overview | Birds-eye view of all workspaces |

### Visual Layout

```
Workspace View:
┌──────────────────────────────────────────────────────────┐
│                                                          │
│  ◄──  [Col 1]  [Col 2]  [Col 3]  [Col 4]  [Col 5]  ──►  │
│       ┌─────┐  ┌─────┐  ┌─────┐  ┌─────┐  ┌─────┐       │
│       │     │  │     │  │     │  │     │  │     │       │
│       │ Win │  │ Win │  │ Win │  │ Win │  │ Win │       │
│       │     │  │     │  │     │  │     │  │     │       │
│       └─────┘  └─────┘  └─────┘  └─────┘  └─────┘       │
│                          ▲                               │
│                       focused                            │
│                                                          │
└──────────────────────────────────────────────────────────┘
         ◄─── Mod+H                    Mod+L ───►
```

## Configuration

Configuration location: `home/desktop/wm/niri/default.nix`

### Input

```nix
input = {
  keyboard = {
    xkb.layout = "us,gb,es";
    xkb.options = "grp:win_space_toggle";
    repeat-delay = 300;
    repeat-rate = 90;
  };
  touchpad = {
    tap = true;
    natural-scroll = false;
    accel-speed = -0.3;
  };
  focus-follows-mouse.enable = true;
};
```

### Layout

```nix
layout = {
  gaps = 12;
  center-focused-column = "never";
  preset-column-widths = [
    { proportion = 0.33333; }
    { proportion = 0.5; }
    { proportion = 0.66667; }
    { proportion = 1.0; }
  ];
  default-column-width = { proportion = 0.5; };
};
```

## Keybindings

All keybindings use `Mod` (Super/Windows key) as the primary modifier.

### Focus Navigation

| Keybinding | Action |
|------------|--------|
| `Mod + H` | Focus column left |
| `Mod + L` | Focus column right |
| `Mod + K` | Focus window up |
| `Mod + J` | Focus window down |
| `Mod + Left` | Focus column left |
| `Mod + Right` | Focus column right |
| `Mod + Up` | Focus window up |
| `Mod + Down` | Focus window down |
| `Mod + Tab` | Focus previous workspace |
| `Alt + Tab` | Focus previous window |

### Move Column

| Keybinding | Action |
|------------|--------|
| `Mod + Ctrl + H` | Move column left |
| `Mod + Ctrl + L` | Move column right |
| `Mod + Ctrl + K` | Move column to workspace up |
| `Mod + Ctrl + J` | Move column to workspace down |
| `Mod + Ctrl + Left` | Move column left |
| `Mod + Ctrl + Right` | Move column right |

### Move Window

| Keybinding | Action |
|------------|--------|
| `Mod + Ctrl + S` | Move window up (or to workspace up) |
| `Mod + Ctrl + A` | Move window down (or to workspace down) |
| `Mod + Comma` | Consume or expel window left |
| `Mod + Period` | Consume or expel window right |

### Window Actions

| Keybinding | Action |
|------------|--------|
| `Mod + C` | Close window |
| `Mod + Ctrl + C` | Force kill window |
| `Mod + V` | Toggle floating |
| `Mod + Shift + V` | Switch focus between floating and tiling |
| `Mod + F` | Maximize column |
| `Mod + Shift + F` | Fullscreen window |
| `Mod + Z` | Toggle column tabbed display |
| `Mod + Shift + C` | Center column |

### Resize

| Keybinding | Action |
|------------|--------|
| `Mod + R` | Cycle preset column width (1/3, 1/2, 2/3, full) |
| `Mod + Shift + R` | Cycle preset window height |
| `Mod + Ctrl + R` | Reset window height |
| `Mod + Minus` | Decrease column width by 10% |
| `Mod + Equal` | Increase column width by 10% |
| `Mod + Shift + Minus` | Decrease window height by 10% |
| `Mod + Shift + Equal` | Increase window height by 10% |

### Workspace Navigation

| Keybinding | Action |
|------------|--------|
| `Mod + 1-9` | Focus workspace 1-9 |
| `Mod + 0` | Focus workspace 10 |
| `Mod + Shift + Up` | Focus workspace up |
| `Mod + Shift + Down` | Focus workspace down |
| `Mod + Alt + Up` | Move workspace up |
| `Mod + Alt + Down` | Move workspace down |

### Move to Workspace

| Keybinding | Action |
|------------|--------|
| `Mod + Shift + 1-9` | Move column to workspace 1-9 |
| `Mod + Shift + 0` | Move column to workspace 10 |

### Application Launchers (Primary)

| Keybinding | Application |
|------------|-------------|
| `Mod + W` | Terminal (Kitty) |
| `Mod + B` | Browser (Firefox) |
| `Mod + D` | File manager (Yazi) |
| `Mod + E` | Editor (Neovim) |
| `Mod + Q` | Calculator (qalc) |

### Application Launchers (Secondary)

| Keybinding | Application |
|------------|-------------|
| `Mod + Shift + W` | Ghostty |
| `Mod + Shift + B` | Brave |
| `Mod + Shift + D` | Thunar |
| `Mod + Shift + E` | Emacs |
| `Mod + Shift + Q` | Qalculate (GUI) |

### Application Launchers (Tertiary)

| Keybinding | Application |
|------------|-------------|
| `Mod + Ctrl + E` | Zed editor |
| `Mod + Ctrl + Q` | Calcure (calendar) |

### Screenshots

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

### Media Controls

| Keybinding | Action |
|------------|--------|
| `XF86AudioRaiseVolume` | Volume up 5% |
| `XF86AudioLowerVolume` | Volume down 5% |
| `XF86AudioMute` | Toggle mute |
| `XF86AudioMicMute` | Toggle mic mute |
| `XF86MonBrightnessUp` | Brightness up 5% |
| `XF86MonBrightnessDown` | Brightness down 5% |
| `XF86AudioPlay` | Play/pause |
| `XF86AudioNext` | Next track |
| `XF86AudioPrev` | Previous track |

### Mouse/Touchpad

| Keybinding | Action |
|------------|--------|
| `Mod + WheelScrollUp` | Focus workspace up |
| `Mod + WheelScrollDown` | Focus workspace down |
| `Mod + WheelScrollLeft` | Focus column left |
| `Mod + WheelScrollRight` | Focus column right |
| `Mod + TouchpadScrollUp` | Volume up |
| `Mod + TouchpadScrollDown` | Volume down |

### System

| Keybinding | Action |
|------------|--------|
| `Mod + Escape` | Lock screen |
| `Mod + X` | Toggle overview |
| `Mod + Ctrl + O` | Adjust window opacity |

## Window Rules

Rhodium configures specific behavior for certain applications:

| Application | Behavior |
|-------------|----------|
| Firefox PiP | Opens floating |
| Qalculate | Opens maximized |
| Calcure | Opens maximized |
| Television | Opens floating at 80% width |

## Animations

Rhodium uses tuned animations for responsiveness:

| Animation | Type | Settings |
|-----------|------|----------|
| Window open | Easing | 150ms, ease-out-expo |
| Window close | Easing | 150ms, ease-out-quad |
| Window movement | Spring | damping 1.0, stiffness 800 |
| Overview | Spring | damping 1.0, stiffness 800 |

Global slowdown: 0.8x (slightly faster than default)

## Display Configuration

Per-host monitor configuration in `data/hosts/hosts.nix`:

```nix
mainMonitor = {
  monitorID = "eDP-1";
  monitorResolution = "1920x1080";
  monitorRefreshRate = "60";
  monitorScalingFactor = "1.0";
};
```

External monitors auto-configured for HDMI-A-1 at 4K.

## Tips

### Column Width Cycling

Press `Mod + R` repeatedly to cycle through preset widths:
1. 33% (narrow)
2. 50% (half)
3. 67% (wide)
4. 100% (full)

### Tabbed Columns

Use `Mod + Z` to stack multiple windows in a single column with tabs:
- Tab indicator shows on the left side
- Switch tabs with `Mod + J/K`

### Overview Mode

Press `Mod + X` to see all workspaces:
- Click to focus a workspace
- Drag windows between workspaces
- Press `Mod + X` again to exit

### Focus Follows Mouse

Mouse focus is enabled but scroll-bounded to prevent accidental focus changes.
