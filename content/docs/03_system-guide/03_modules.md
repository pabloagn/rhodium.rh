---
title: "Modules"
description: "Module structure and organization."
type: "docs"
url: "/docs/system-guide/modules/"
weight: 3
---

Rhodium organizes configuration into composable modules at two levels: system (NixOS) and user (Home Manager).

## System Modules

Location: `modules/`

System modules configure NixOS itself and run with root privileges.

### Structure

```
modules/
├── apps/
│   ├── browsers/         # System-level browser config
│   ├── editors/          # Emacs daemon, etc.
│   └── terminals/        # Terminal emulators
├── boot/
│   └── boot.nix          # Bootloader, initrd
├── desktop/
│   ├── bar/              # Waybar system config
│   ├── files/            # Thunar
│   ├── fonts/            # System fonts
│   └── wm/
│       ├── niri/         # Niri compositor
│       └── hyprland/     # Hyprland (alternative)
├── hardware/
│   ├── audio.nix         # PipeWire
│   ├── battery.nix       # Power management
│   ├── bluetooth.nix     # Bluetooth
│   ├── keyboard.nix      # KMonad
│   ├── mouse.nix         # Input devices
│   ├── network.nix       # NetworkManager
│   ├── printers.nix      # CUPS
│   ├── storage.nix       # Disk management
│   └── video.nix         # Graphics
├── integration/
│   ├── appimage.nix      # AppImage support
│   ├── binaries.nix      # FHS binaries
│   └── flatpak.nix       # Flatpak
├── maintenance/          # System maintenance tasks
├── manager/
│   ├── gdm.nix           # GNOME Display Manager
│   ├── greetd.nix        # Greetd
│   ├── sddm.nix          # SDDM
│   └── getty.nix         # TTY login
├── network/              # Advanced networking
├── rules/                # Udev rules
├── security/
│   ├── auth.nix          # Authentication
│   ├── keyrings.nix      # Secret storage
│   ├── limits.nix        # Resource limits
│   ├── sops.nix          # Secrets management
│   ├── ssh.nix           # SSH configuration
│   └── sudo.nix          # Sudo configuration
├── services/             # System services
├── shell/                # System shell config
├── users/                # User account management
├── utils/                # System utilities
└── virtualization/
    ├── docker-amd.nix    # Docker with AMD GPU
    ├── docker-nvidia.nix # Docker with NVIDIA GPU
    └── vm-variants.nix   # Virtual machine configs
```

### Module Pattern

Each module follows a standard pattern:

```nix
{ config, pkgs, lib, ... }:

{
  # Options (optional)
  options.rhodium.mymodule = {
    enable = lib.mkEnableOption "My module";
  };

  # Configuration
  config = lib.mkIf config.rhodium.mymodule.enable {
    # NixOS options
  };
}
```

Or without options:

```nix
{ config, pkgs, ... }:

{
  # Direct configuration
  services.myservice.enable = true;
}
```

## Home Modules

Location: `home/`

Home modules configure user-level settings via Home Manager.

### Structure

```
home/
├── apps/
│   ├── browsers/         # Firefox, Zen, Brave
│   ├── docs/             # Zathura, Okular
│   ├── editors/          # Neovim, Helix
│   ├── files/            # Thunar user config
│   ├── ides/             # VS Code, Zed
│   ├── mail/             # Thunderbird
│   ├── media/            # mpv, imv, GIMP
│   ├── office/           # LibreOffice
│   ├── productivity/     # Obsidian
│   ├── social/           # Discord, Slack
│   ├── terminals/        # Kitty
│   └── utils/            # Various utilities
├── assets/
│   ├── icons/            # Icon themes
│   ├── themes/           # Color schemes
│   └── wallpapers/       # Wallpapers
├── desktop/
│   ├── bars/             # Waybar
│   ├── launchers/        # Fuzzel
│   ├── lock/             # Swaylock
│   ├── notifications/    # Mako
│   └── wm/               # Niri user config
├── development/
│   ├── async/            # Task runners
│   ├── cloud/            # AWS, GCP tools
│   ├── databases/        # Database clients
│   ├── infra/            # Terraform, Ansible
│   ├── languages/        # Language toolchains
│   ├── misc/             # Various dev tools
│   ├── ml/               # ML frameworks
│   ├── opsec/            # Security tools
│   └── versioning/       # Git, Lazygit
├── environment/          # Environment variables
├── modules/              # Shared module helpers
├── overlays/             # User package overlays
├── scripts/              # User scripts
├── security/             # GPG, SSH keys
├── services/             # User systemd services
├── shells/
│   ├── bash/             # Bash configuration
│   ├── fish/             # Fish configuration
│   ├── nushell/          # Nushell configuration
│   └── zsh/              # Zsh configuration
├── system/
│   ├── fonts/            # User font config
│   └── xdg/              # XDG directories
├── utils/
│   ├── clipboard/        # Clipboard managers
│   ├── files/            # Yazi, fzf
│   ├── misc/             # Various utilities
│   ├── monitors/         # System monitors
│   └── search/           # Search tools
└── virtualization/       # Container config
```

### Module Helpers

Rhodium provides helper functions via `rhodiumLib`:

#### mkModule

Creates a standard module with package and configuration:

```nix
{ mkModule, pkgs, ... }:

mkModule {
  name = "mytool";
  package = pkgs.mytool;
  configFiles = {
    "mytool/config" = ./config;
  };
}
```

#### mkPkgModule

Creates a simple package-only module:

```nix
{ mkPkgModule, pkgs, ... }:

mkPkgModule {
  name = "mytool";
  package = pkgs.mytool;
}
```

## Module Dependencies

### Special Arguments

System modules receive:

| Argument | Description |
|----------|-------------|
| `pkgs` | Stable nixpkgs |
| `pkgs-unstable` | Unstable nixpkgs |
| `inputs` | All flake inputs |
| `rhodiumLib` | Custom library |
| `users` | User data |
| `host` | Host metadata |

Home modules receive all of the above plus:

| Argument | Description |
|----------|-------------|
| `userData` | Full user data |
| `user` | Current username |
| `theme` | Resolved theme |
| `chiaroscuroTheme` | Theme package |
| `userPreferences` | User preferences |
| `userExtras` | User extras |
| `fishPlugins` | Fish plugin set |
| `yaziPlugins` | Yazi plugin set |
| `mkModule` | Module helper |
| `mkPkgModule` | Package module helper |

### Import Patterns

Modules are imported in host or user configurations:

```nix
# Host configuration
{
  imports = [
    ./hardware-configuration.nix
    ../../modules/hardware
    ../../modules/desktop/wm/niri/amd.nix
    ../../modules/security
  ];
}
```

```nix
# User configuration
{
  imports = [
    ../../home/shells/fish
    ../../home/apps/editors/neovim
    ../../home/desktop/wm/niri
  ];
}
```

## Creating Modules

### New System Module

1. Create directory: `modules/mycategory/mymodule/`

2. Create `default.nix`:

```nix
{ config, pkgs, lib, ... }:

{
  # Configuration here
}
```

3. Import in host configuration or category's `default.nix`

### New Home Module

1. Create directory: `home/mycategory/mymodule/`

2. Create `default.nix`:

```nix
{ config, pkgs, lib, ... }:

{
  # Home Manager options
  programs.myprogram = {
    enable = true;
    # Configuration
  };
}
```

3. Import in user configuration or category's `default.nix`

### Module with Options

For configurable modules:

```nix
{ config, pkgs, lib, ... }:

let
  cfg = config.rhodium.mymodule;
in
{
  options.rhodium.mymodule = {
    enable = lib.mkEnableOption "My module";

    setting = lib.mkOption {
      type = lib.types.str;
      default = "value";
      description = "A setting";
    };
  };

  config = lib.mkIf cfg.enable {
    # Use cfg.setting
  };
}
```

## Module Best Practices

1. **Single Responsibility** - Each module does one thing
2. **Explicit Imports** - No implicit dependencies
3. **Default Disabled** - Modules with options default to disabled
4. **Documentation** - Add comments for non-obvious configuration
5. **Version Pinning** - Use `pkgs-unstable` for fast-moving packages
