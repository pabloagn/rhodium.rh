---
title: "First Steps"
description: "Post-installation configuration and customization."
type: "docs"
url: "/docs/getting-started/first-steps/"
weight: 3
---

After installing Rhodium, configure your user preferences and learn the core workflows.

## User Configuration

### User Data

User accounts are defined in `data/users/users.nix`:

```nix
{
  users = {
    your_user = {
      name = "your_user";
      fullName = "Your Name";
      email = "your@email.com";
      # Other user properties
    };
  };
}
```

### User Preferences

Preferences are stored in `data/users/preferences/`:

| File | Purpose |
|------|---------|
| `apps.nix` | Default applications |
| `behavior.nix` | System behavior settings |
| `metadata.nix` | User metadata |
| `theme.nix` | Theme selection |

Edit `theme.nix` to set your color scheme:

```nix
{
  targetTheme = "kanso-zen";  # or kanso-ink, kanso-paper
}
```

### User Extras

Additional user data in `data/users/extras/`:

| File | Purpose |
|------|---------|
| `apps.nix` | Additional app settings |
| `bookmarks.nix` | Browser and file manager bookmarks |
| `profiles.nix` | Application profiles |

## Learn the Keybindings

Rhodium uses vim-style keybindings throughout. Key patterns:

| Modifier | Purpose |
|----------|---------|
| `Super` | Primary modifier for window management |
| `Super + Shift` | Move operations |
| `Super + Ctrl` | Resize operations |

### Essential Shortcuts

| Keybinding | Action |
|------------|--------|
| `Super + Return` | Open terminal |
| `Super + d` | Application launcher |
| `Super + q` | Close window |
| `Super + hjkl` | Navigate windows |
| `Super + 1-9` | Switch workspace |

See [Global Keybindings](/docs/reference/keybinds/) for the complete reference.

## Core Tools

### Terminal (Kitty)

Kitty runs as a daemon for instant window spawning:

```bash
# Already running as systemd service
# New windows spawn instantly via Super+Return
```

### Shell (Fish)

Fish shell with vi-mode enabled by default:

| Key | Mode |
|-----|------|
| `Esc` | Enter normal mode |
| `i` | Enter insert mode |
| `Ctrl+f` | Accept autosuggestion |

### File Manager (Yazi)

Open with `Super + e` or `yazi` command:

| Key | Action |
|-----|--------|
| `hjkl` | Navigate |
| `Enter` | Open file |
| `Space` | Select |
| `y` | Yank |
| `p` | Paste |
| `ff` | Fuzzy find |

See [Yazi Reference](/docs/reference/tools/yazi/) for full documentation.

### Editor (Neovim)

Open with `Super + n` or `nvim` command:

| Key | Action |
|-----|--------|
| `Space` | Leader key |
| `Space + ff` | Find files |
| `Space + fg` | Live grep |
| `gd` | Go to definition |
| `K` | Hover documentation |

## Customize Your Setup

### Enable/Disable Modules

Modules are imported in your host configuration. To disable a module, remove its import.

Example `hosts/my_host/default.nix`:

```nix
{
  imports = [
    ./hardware-configuration.nix
    # Comment out or remove modules you don't want
    ../../modules/hardware
    ../../modules/desktop/wm/niri/amd.nix
    # ../../modules/virtualization  # Disabled
  ];
}
```

### Add Packages

For system-wide packages, add to your host configuration:

```nix
environment.systemPackages = with pkgs; [
  your-package
];
```

For user packages, add to `home/apps/` or your user configuration.

### Change Theme

Edit `data/users/preferences/theme.nix`:

```nix
{
  targetTheme = "kanso-ink";  # Dark theme
  # targetTheme = "kanso-paper";  # Light theme
  # targetTheme = "kanso-zen";    # Low contrast
}
```

Rebuild to apply: `just switch-fast my_host`

## Maintenance Workflow

### Daily Operations

```bash
# Rebuild after configuration changes
just switch-fast my_host

# Update flake inputs (weekly recommended)
just update
just switch my_host
```

### Periodic Maintenance

```bash
# Clean old generations (keep last 5)
just gc-keep 5

# Check system health
just health
```

### Troubleshooting

```bash
# View recent Home Manager logs
journalctl -u home-manager-$USER.service -n 100

# Check for backup conflicts
just find-backups

# Rollback if needed
just rollback
```

## Next Steps

- [System Guide](/docs/system-guide/) - Deep dive into architecture
- [Reference](/docs/reference/) - Tool and keybinding references
