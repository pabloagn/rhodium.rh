---
title: "Architecture"
description: "System design, module structure, and data flow."
type: "docs"
url: "/docs/introduction/architecture/"
weight: 3
---

Rhodium uses a layered architecture that separates concerns between hosts, users, system modules, home modules, and data.

## Directory Structure

```
rhodium/
├── flake.nix              # Entry point, inputs, outputs
├── flake.lock             # Pinned dependencies
│
├── hosts/                 # Per-host NixOS configurations
│   ├── host_001/          # Desktop workstation
│   └── host_002/          # Laptop
│
├── users/                 # Per-user Home Manager configurations
│   └── user_001/
│
├── modules/               # System-level NixOS modules
│   ├── apps/              # System applications
│   ├── boot/              # Bootloader configuration
│   ├── desktop/           # Window managers, bars, fonts
│   ├── hardware/          # Audio, video, input devices
│   ├── integration/       # Flatpak, AppImage, binaries
│   ├── maintenance/       # System maintenance
│   ├── manager/           # Display managers
│   ├── network/           # Networking
│   ├── rules/             # Udev rules
│   ├── security/          # SSH, sudo, secrets
│   ├── services/          # Systemd services
│   ├── shell/             # System shell configuration
│   ├── users/             # User accounts
│   ├── utils/             # System utilities
│   └── virtualization/    # Docker, VMs
│
├── home/                  # User-level Home Manager modules
│   ├── apps/              # User applications
│   ├── assets/            # Themes, icons, fonts
│   ├── desktop/           # User desktop configuration
│   ├── development/       # Languages, tools, IDEs
│   ├── environment/       # Environment variables
│   ├── modules/           # Shared module helpers
│   ├── overlays/          # User package overlays
│   ├── scripts/           # User scripts
│   ├── security/          # GPG, SSH keys
│   ├── services/          # User systemd services
│   ├── shells/            # Shell configurations
│   ├── system/            # XDG, fonts
│   ├── utils/             # User utilities
│   └── virtualization/    # Container configuration
│
├── data/                  # Configuration data (separated from logic)
│   ├── hosts/             # Host metadata
│   └── users/             # User data, preferences, extras
│
├── lib/                   # Custom Nix library functions
│   ├── formatters/        # Output formatters
│   ├── generators/        # Module generators
│   └── parsers/           # Configuration parsers
│
├── overlays/              # Package overlays
└── build/                 # Build scripts and recipes
    └── recipes/           # Shell scripts (rh-* prefix)
```

## Data Flow

Configuration flows from data through modules to the final system:

```
┌─────────────────────────────────────────────────────────────┐
│                        flake.nix                            │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────┐ │
│  │   inputs    │  │   outputs   │  │   specialArgs       │ │
│  │  (nixpkgs,  │──▶│ (nixOS     │──▶│  (pkgs-unstable,   │ │
│  │   hm, etc.) │  │  configs)   │  │   rhodiumLib, etc.) │ │
│  └─────────────┘  └─────────────┘  └─────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                       data/                                  │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────┐ │
│  │   hosts/    │  │   users/    │  │   preferences/      │ │
│  │  hosts.nix  │  │  users.nix  │  │  theme, apps, etc.  │ │
│  └─────────────┘  └─────────────┘  └─────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
                              │
              ┌───────────────┴───────────────┐
              ▼                               ▼
┌──────────────────────────┐    ┌──────────────────────────┐
│       modules/           │    │        home/             │
│  (System-level NixOS)    │    │  (User-level Home Mgr)   │
│                          │    │                          │
│  - hardware/             │    │  - apps/                 │
│  - desktop/              │    │  - shells/               │
│  - security/             │    │  - development/          │
│  - services/             │    │  - desktop/              │
└──────────────────────────┘    └──────────────────────────┘
              │                               │
              └───────────────┬───────────────┘
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                      hosts/host_XXX/                        │
│  Combines system modules + user home configuration          │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                    Final NixOS System                       │
└─────────────────────────────────────────────────────────────┘
```

## Special Arguments

Modules receive configuration via special arguments injected by the flake:

### System Modules (`specialArgs`)

| Argument | Type | Description |
|----------|------|-------------|
| `pkgs-unstable` | Package set | Unstable nixpkgs channel |
| `inputs` | Attrset | All flake inputs |
| `rhodiumLib` | Attrset | Custom library functions |
| `users` | Attrset | User account data |
| `host` | Attrset | Current host metadata |

### Home Modules (`extraSpecialArgs`)

| Argument | Type | Description |
|----------|------|-------------|
| `pkgs-unstable` | Package set | Unstable nixpkgs channel |
| `inputs` | Attrset | All flake inputs |
| `rhodiumLib` | Attrset | Custom library functions |
| `userData` | Attrset | All user data |
| `user` | String | Current username |
| `host` | Attrset | Current host metadata |
| `theme` | Attrset | Resolved theme configuration |
| `targetTheme` | String | Theme name |
| `chiaroscuroTheme` | Attrset | Full Chiaroscuro theme |
| `userPreferences` | Attrset | User preferences (apps, behavior) |
| `userExtras` | Attrset | User extras (bookmarks, profiles) |
| `fishPlugins` | Attrset | Fish plugins from alloys |
| `yaziPlugins` | Attrset | Yazi plugins from alloys |
| `mkModule` | Function | Module generator |
| `mkPkgModule` | Function | Package module generator |

## Module Categories

### System Modules (`modules/`)

Modules that configure the NixOS system itself:

| Category | Modules | Purpose |
|----------|---------|---------|
| `boot/` | boot.nix | Bootloader, initrd |
| `hardware/` | audio, video, bluetooth, etc. | Hardware configuration |
| `desktop/` | wm/, bar/, fonts/ | Desktop environment |
| `manager/` | sddm, gdm, greetd, getty | Display managers |
| `security/` | ssh, sudo, sops, keyrings | Security configuration |
| `services/` | Various | System services |
| `virtualization/` | docker, podman | Container runtimes |

### Home Modules (`home/`)

Modules that configure the user environment via Home Manager:

| Category | Count | Purpose |
|----------|-------|---------|
| `apps/` | 50+ | User applications |
| `shells/` | 5 | Shell configurations (Fish, Bash, etc.) |
| `development/` | 30+ | Languages, tools, LSPs |
| `desktop/` | 15+ | User desktop configuration |
| `services/` | 10+ | User systemd services |
| `utils/` | 20+ | Utilities (Yazi, fzf, etc.) |

## Custom Library (`rhodiumLib`)

The `lib/` directory provides helper functions:

### Generators

| Function | Purpose |
|----------|---------|
| `mkModule` | Create standard Home Manager module |
| `mkPkgModule` | Create package-based module |
| `desktopGenerators` | Generate .desktop entries |

### Formatters

| Function | Purpose |
|----------|---------|
| `iconFormatter` | Format icon paths |

### Parsers

| Function | Purpose |
|----------|---------|
| `luaParsers` | Parse Lua configuration |

## Multi-Channel Strategy

Rhodium uses multiple nixpkgs channels for stability:

```nix
inputs = {
  nixpkgs.url = "github:NixOS/nixpkgs/nixos-25.11";
  nixpkgs-unstable.url = "github:NixOS/nixpkgs/nixos-unstable";
  nixpkgs-shell.url = "github:NixOS/nixpkgs/nixos-25.11";
};
```

| Channel | Usage |
|---------|-------|
| `nixpkgs` | System packages, stability-critical |
| `nixpkgs-unstable` | Fast-moving tools (Neovim, Yazi, etc.) |
| `nixpkgs-shell` | Development shell packages |

Packages from unstable are accessed via `pkgs-unstable` in modules.

## External Inputs

### Theme Package (`chiaroscuro`)

Provides the Kanso color scheme with variants:

- `kanso-ink` (dark)
- `kanso-paper` (light)
- `kanso-zen` (low contrast)

### Plugin Package (`rhodium-alloys`)

Provides custom plugins for:

- Fish shell functions
- Yazi file manager plugins

### Private Configuration (`iridium-rh`)

Contains sensitive configuration (SSH keys, etc.) via git+ssh.

### Compositor (`niri-flake`)

Provides the Niri Wayland compositor with Home Manager integration.
