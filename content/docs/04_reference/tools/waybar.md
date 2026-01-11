---
title: "Waybar"
description: "Customizable status bar for Wayland."
type: "docs"
url: "/docs/reference/tools/waybar/"
weight: 5
---

Waybar is the status bar in Rhodium, configured with 25+ modules for system monitoring and quick access.

## Overview

### Configuration

| Setting | Value |
|---------|-------|
| Position | Top |
| Height | 35px |
| Margin | 12px left/right, 10px top |
| Layer | Top (exclusive) |

### Layout

```
┌──────────────────────────────────────────────────────────────────┐
│ [Workspaces]      [Clock]      [WiFi][VPN][Thermals][Audio][Tray]│
└──────────────────────────────────────────────────────────────────┘
   Left              Center                              Right
```

## Configuration

Location: `home/desktop/bars/waybar/`

```
waybar/
├── default.nix         # Main configuration
├── style.nix           # CSS styling
└── modules/
    ├── default.nix     # Module aggregator
    ├── battery.nix
    ├── bluetooth.nix
    ├── clock.nix
    ├── cpu.nix
    ├── disk.nix
    ├── memory.nix
    ├── niri-workspaces.nix
    ├── niri-language.nix
    ├── wireplumber-sink.nix
    ├── wireplumber-source.nix
    ├── custom-clock.nix
    ├── custom-vpn.nix
    ├── group-thermals.nix
    ├── group-wifi-speed.nix
    └── ... (25+ modules)
```

## Modules

### Left Section

#### Workspaces (`niri/workspaces`)

Displays Niri workspaces:

- Click to switch workspace
- Active workspace highlighted
- Shows occupied workspaces only

### Center Section

#### Clock (`custom/clock`)

Displays date and time with timezone support:

- Format: `YYYY-MM-DD HH:MM:SS`
- Click cycles through 40+ world timezones
- Tooltip shows selected timezone

### Right Section

#### WiFi Speed (`group/wifi-speed`)

Network activity indicators:

| Module | Display |
|--------|---------|
| `network-wifi-dl` | Download speed |
| `network-wifi-ul` | Upload speed |

#### VPN (`custom/vpn`)

VPN connection status indicator.

#### Thermals (`group/thermals`)

System temperature monitoring:

| Module | Monitors |
|--------|----------|
| `custom-thm-cpu` | CPU temperature |
| `custom-thm-amd` | AMD GPU temperature |
| `custom-thm-nvme` | NVMe drive temperature |
| `custom-thm-fan` | Fan speed |
| `custom-thm-amb` | Ambient temperature |
| `custom-thm-bati` | Battery current |
| `custom-thm-batv` | Battery voltage |
| `custom-thm-pwr` | Power consumption |

#### Battery (`battery`)

Battery status:

- Percentage display
- Charging indicator
- Time remaining tooltip

#### CPU (`cpu`)

CPU usage percentage.

#### Memory (`memory`)

RAM usage percentage.

#### Disk (`disk`)

Root partition usage.

#### Backlight (`backlight`)

Screen brightness:

- Click to adjust
- Scroll to change level

#### Audio (`wireplumber#sink`)

Volume control:

- Click to mute
- Scroll to adjust
- Shows current level

#### Language (`niri/language`)

Keyboard layout indicator:

- Displays current layout (US, GB, ES)
- Click to cycle layouts

#### Tray (`tray`)

System tray for background applications.

## Custom Scripts

Waybar uses custom scripts in `~/.local/bin/waybar/`:

| Script | Purpose |
|--------|---------|
| `waybar-clock.sh` | Timezone-aware clock |
| `waybar-vpn.sh` | VPN status |
| `waybar-thm-*.sh` | Thermal sensors |

## Styling

Waybar uses CSS with Kanso theme colors:

```css
* {
    font-family: "Inter", "Symbols Nerd Font Mono";
    font-size: 13px;
}

window#waybar {
    background: rgba(13, 12, 12, 0.85);
    color: #c5c9c5;
    border-radius: 10px;
}

#workspaces button.active {
    background: #2d4f67;
    color: #c5c9c5;
}
```

## Interaction

### Click Actions

| Module | Left Click | Right Click |
|--------|------------|-------------|
| Workspaces | Switch to workspace | - |
| Clock | Cycle timezone | Reset to local |
| Volume | Toggle mute | Open pavucontrol |
| Battery | - | Show details |
| Tray items | Activate | Context menu |

### Scroll Actions

| Module | Scroll Up | Scroll Down |
|--------|-----------|-------------|
| Backlight | Brightness up | Brightness down |
| Volume | Volume up | Volume down |

## Thermald Integration

Thermal modules read from:

- `/sys/class/thermal/`
- `/sys/class/hwmon/`
- `sensors` command output

Data refreshes every 5 seconds.

## Tips

### Clock Timezone Cycling

Click the clock to cycle through timezones:
- Amsterdam, London, New York, Tokyo, Sydney
- 40+ locations configured

### Workspace Indicators

Empty workspaces are hidden. Only workspaces with windows appear.

### Thermal Group

The thermal group collapses to save space. Hover to expand and see all readings.

### VPN Status

The VPN indicator shows:
- Green: Connected
- Gray: Disconnected
- Red: Error state

## Customization

### Add Module

1. Create module file in `modules/`
2. Import in `modules/default.nix`
3. Add to `usedModules` list
4. Place in `modules-left`, `modules-center`, or `modules-right`

### Change Position

Edit `modules/default.nix`:

```nix
modules-left = [ "niri/workspaces" ];
modules-center = [ "custom/clock" ];
modules-right = [ "battery" "cpu" "tray" ];
```

### Modify Style

Edit `style.nix` for CSS changes. Theme colors from Chiaroscuro are available via Nix interpolation.
