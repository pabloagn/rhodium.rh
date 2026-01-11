---
title: "Motivation"
description: "The problems Rhodium solves and why a hypermodular NixOS configuration exists."
type: "docs"
url: "/docs/introduction/motivation/"
weight: 1
---

Rhodium exists because existing Linux configurations typically optimize for one dimension at the expense of others. A configuration can be aesthetic but fragile, functional but ugly, or reliable but inflexible. Rhodium aims to be all three.

## The Problem

Most NixOS configurations fall into predictable categories:

### Dotfile Collections

Traditional dotfile repositories suffer from:

- **Imperative drift** - Manual installation steps that break over time
- **Cross-machine fragility** - Configurations tied to specific hardware
- **Missing dependencies** - Undocumented packages required for functionality
- **No rollback** - Breaking changes require manual intervention

### Monolithic Configurations

Single-file or tightly-coupled NixOS configurations create:

- **All-or-nothing adoption** - Cannot selectively enable features
- **Difficult customization** - Changes require understanding the entire system
- **Host-specific code** - Cannot easily port between machines
- **Merge conflicts** - Multiple users cannot maintain separate preferences

### Aesthetic-First Rice

Visual configurations often sacrifice:

- **Functionality** - Missing essential tools for actual work
- **Stability** - Bleeding-edge packages that break frequently
- **Performance** - Heavy themes and effects on limited hardware
- **Maintainability** - Complex configurations with no documentation

## The Rhodium Approach

Rhodium addresses these problems through architectural decisions:

| Problem | Solution |
|---------|----------|
| Imperative drift | Fully declarative Nix configuration |
| Cross-machine fragility | Host-specific modules with shared base |
| Missing dependencies | All dependencies declared in modules |
| No rollback | NixOS generations with instant rollback |
| All-or-nothing | Composable modules enabled per-host |
| Difficult customization | Data layer separated from logic |
| Merge conflicts | Per-user preference files |

### Data-Logic Separation

Configuration logic lives in `modules/` and `home/`. User preferences live in `data/`. This separation means:

```
data/
├── users/
│   ├── users.nix           # User account definitions
│   ├── preferences/        # Theme, behavior, apps
│   └── extras/             # Bookmarks, profiles
└── hosts/
    └── hosts.nix           # Host metadata, monitors
```

Changing your theme or default applications requires editing data files, not module logic.

### Multi-Host Architecture

Each host imports the modules it needs:

```
hosts/
├── host_001/               # Desktop workstation
│   ├── default.nix         # System config
│   └── hardware-configuration.nix
└── host_002/               # Laptop
    ├── default.nix
    └── hardware-configuration.nix
```

Host-specific hardware (GPU, battery, monitors) is configured separately from shared software.

### Multi-Channel Stability

Rhodium uses three nixpkgs channels:

| Channel | Version | Purpose |
|---------|---------|---------|
| `nixpkgs` | 25.11 stable | System packages, stability |
| `nixpkgs-unstable` | Rolling | Cutting-edge tools (Neovim, Yazi) |
| `nixpkgs-shell` | 25.11 | Development shell packages |

This allows using the latest version of actively-developed tools while maintaining system stability.

## Why NixOS

Rhodium is built on NixOS for specific technical reasons:

### Declarative Configuration

Every installed package, enabled service, and configuration file is declared in Nix. The system state matches the configuration.

### Atomic Upgrades

System updates either succeed completely or fail completely. No partial states, no broken boots.

### Reproducibility

Flake inputs are pinned to specific commits. Building the same configuration produces the same system.

### Rollback

Every rebuild creates a generation. Broken updates are fixed by booting the previous generation.

### Development Environments

`nix develop` creates isolated, reproducible development shells without polluting the system.

## Target Users

Rhodium is designed for:

- **Power users** who want keyboard-driven workflows
- **Developers** who need multiple language toolchains
- **Researchers** who require reproducible environments
- **System administrators** who manage multiple machines

Rhodium is not designed for:

- Users who prefer GUI configuration tools
- Systems requiring vendor-specific software (Adobe, Microsoft Office native)
- Minimal server installations
