---
title: "Customization"
description: "Configuration options and customization reference."
type: "docs"
url: "/docs/system-guide/customization-options/"
weight: 2
---

This page documents the primary customization points in Rhodium.

## Data Layer

User preferences are stored in `data/` and passed to modules via special arguments.

### User Preferences

Location: `data/users/preferences/`

#### apps.nix

Default applications:

```nix
{
  browser = "firefox";
  terminal = "kitty";
  editor = "nvim";
  fileManager = "yazi";
  pdfViewer = "zathura";
}
```

#### behavior.nix

System behavior settings:

```nix
{
  autoStartApps = true;
  enableNotifications = true;
  # Additional behavior flags
}
```

#### theme.nix

Theme selection:

```nix
{
  targetTheme = "kanso-zen";  # Options: kanso-ink, kanso-paper, kanso-zen
}
```

#### metadata.nix

User metadata:

```nix
{
  timezone = "Europe/Amsterdam";
  locale = "en_US.UTF-8";
}
```

### User Extras

Location: `data/users/extras/`

#### bookmarks.nix

File manager and browser bookmarks:

```nix
{
  fileManager = [
    { name = "Projects"; path = "~/dev"; }
    { name = "Documents"; path = "~/Documents"; }
  ];
  browser = [
    { name = "GitHub"; url = "https://github.com"; }
  ];
}
```

### Host Data

Location: `data/hosts/hosts.nix`

```nix
{
  hosts = {
    host_001 = {
      hostname = "justine";
      monitors = {
        primary = {
          name = "DP-1";
          width = 3840;
          height = 2160;
          scale = 1.5;
        };
      };
    };
  };
}
```

## System Modules

System-level configuration in `modules/`.

### Hardware

#### Audio (`modules/hardware/audio.nix`)

PipeWire configuration:

| Option | Default | Description |
|--------|---------|-------------|
| `services.pipewire.enable` | true | Enable PipeWire |
| `services.pipewire.pulse.enable` | true | PulseAudio compatibility |
| `services.pipewire.wireplumber.enable` | true | Session manager |

#### Video (`modules/hardware/video.nix`)

Graphics configuration per vendor:

| Vendor | Module |
|--------|--------|
| AMD | `modules/desktop/wm/niri/amd.nix` |
| Intel | `modules/desktop/wm/niri/intel.nix` |
| NVIDIA | Custom configuration required |

#### Bluetooth (`modules/hardware/bluetooth.nix`)

```nix
hardware.bluetooth = {
  enable = true;
  powerOnBoot = true;
};
```

#### Keyboard (`modules/hardware/keyboard.nix`)

KMonad configuration for advanced key remapping.

### Desktop

#### Window Manager

Niri configuration in `modules/desktop/wm/niri/`:

| File | Purpose |
|------|---------|
| `base.nix` | Core Niri settings |
| `amd.nix` | AMD-specific configuration |
| `intel.nix` | Intel-specific configuration |

#### Fonts (`modules/desktop/fonts/`)

System font configuration:

```nix
fonts.packages = with pkgs; [
  # Monospace
  berkeley-mono
  jetbrains-mono
  # UI
  inter
  # Icons
  nerd-fonts.symbols-only
];
```

### Security

#### SSH (`modules/security/ssh.nix`)

SSH client and server configuration.

#### Secrets (`modules/security/sops.nix`)

sops-nix integration for encrypted secrets:

```nix
sops = {
  defaultSopsFile = ./secrets.yaml;
  age.keyFile = "/home/user/.config/sops/age/keys.txt";
};
```

#### Sudo (`modules/security/sudo.nix`)

Sudo configuration (insults disabled by default).

## Home Modules

User-level configuration in `home/`.

### Shells

#### Fish (`home/shells/fish/`)

| File | Purpose |
|------|---------|
| `default.nix` | Main configuration |
| `aliases.nix` | Shell aliases |
| `functions.nix` | Custom functions |
| `keybinds.nix` | Key bindings |

Customization:

```nix
# Add aliases in aliases.nix
aliases = {
  myalias = "command --flags";
};
```

### Applications

#### Neovim (`home/apps/editors/neovim/`)

Neovim configuration with Kanso theme:

| Component | Location |
|-----------|----------|
| Plugins | `plugins/` |
| LSP | `lsp/` |
| Keymaps | `keymaps/` |

#### Yazi (`home/utils/files/yazi/`)

| File | Purpose |
|------|---------|
| `modules/base.nix` | Core settings, openers |
| `modules/keymap.nix` | Keybindings |
| `modules/kanso.nix` | Theme |
| `plugins/` | Lua plugins |

### Desktop

#### Niri (`home/desktop/wm/niri/`)

User-level Niri configuration:

| File | Purpose |
|------|---------|
| `settings.nix` | General settings |
| `keybinds.nix` | Keybindings |
| `rules.nix` | Window rules |

#### Waybar (`home/desktop/bars/waybar/`)

Status bar configuration:

| File | Purpose |
|------|---------|
| `config.nix` | Module configuration |
| `style.nix` | CSS styling |

### Services

#### User Services (`home/services/`)

User-level systemd services:

| Service | Purpose |
|---------|---------|
| `kitty-daemon` | Terminal daemon |
| `mako` | Notifications |
| `swayidle` | Idle management |

## Adding Custom Configuration

### New System Module

Create `modules/mymodule/default.nix`:

```nix
{ config, pkgs, ... }:

{
  # Configuration options
}
```

Import in host configuration:

```nix
imports = [
  ../../modules/mymodule
];
```

### New Home Module

Create `home/mymodule/default.nix`:

```nix
{ config, pkgs, ... }:

{
  # Home Manager options
}
```

Import in user configuration or add to relevant category's `default.nix`.

### New Package

For system packages, add to host configuration:

```nix
environment.systemPackages = with pkgs; [
  mypackage
];
```

For user packages, add to Home Manager:

```nix
home.packages = with pkgs; [
  mypackage
];
```

### New Keybinding

#### Niri (System)

Edit `home/desktop/wm/niri/keybinds.nix`:

```nix
{
  "Mod+Key".action.spawn = [ "command" ];
}
```

#### Yazi

Edit `home/utils/files/yazi/modules/keymap.nix`.

#### Neovim

Edit appropriate file in `home/apps/editors/neovim/keymaps/`.

## Environment Variables

### System-Wide

In NixOS configuration:

```nix
environment.variables = {
  MY_VAR = "value";
};
```

### User-Level

In Home Manager (`home/environment/`):

```nix
home.sessionVariables = {
  MY_VAR = "value";
};
```

## XDG Configuration

XDG directories configured in `home/system/xdg/`:

| Variable | Default |
|----------|---------|
| `XDG_CONFIG_HOME` | `~/.config` |
| `XDG_DATA_HOME` | `~/.local/share` |
| `XDG_CACHE_HOME` | `~/.cache` |
| `XDG_STATE_HOME` | `~/.local/state` |
