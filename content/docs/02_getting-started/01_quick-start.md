---
title: "Quick Start"
description: "Fastest path to a running Rhodium system."
type: "docs"
url: "/docs/getting-started/quick-start/"
weight: 1
---

This guide assumes you have a working NixOS installation with flakes enabled.

## Clone the Repository

```bash
git clone https://github.com/pabloagn/rhodium.git
cd rhodium
```

## Choose Your Host

Rhodium supports multiple host configurations. Existing hosts:

| Host | Type | Description |
|------|------|-------------|
| `host_001` | Desktop | Primary workstation (AMD GPU) |
| `host_002` | Laptop | Portable system (Intel GPU) |

## Build and Switch

### Using Just (Recommended)

```bash
# Fast rebuild with minimal output
just switch-fast host_001

# Standard rebuild with full output
just switch host_001
```

### Using Nix Directly

```bash
# Build and switch
sudo nixos-rebuild switch --flake .#host_001

# Build without switching (test first)
sudo nixos-rebuild build --flake .#host_001
```

## Verify Installation

After switching:

```bash
# Check generation
just generation

# Verify system health
just health
```

## Common Commands

### Build Commands

| Command | Description |
|---------|-------------|
| `just switch-fast <host>` | Fast rebuild, minimal output |
| `just switch <host>` | Standard rebuild |
| `just build <host>` | Build only, no activation |
| `just boot <host>` | Build and prepare for next boot |
| `just build-dry <host>` | Show what would be built |
| `just build-dev <host>` | Verbose development build |

### Update Commands

| Command | Description |
|---------|-------------|
| `just update` | Update all flake inputs |
| `just update-input <name>` | Update specific input |
| `just update-stable` | Update stable nixpkgs only |
| `just update-unstable` | Update unstable nixpkgs only |

### Maintenance Commands

| Command | Description |
|---------|-------------|
| `just gc` | Full garbage collection |
| `just gc-keep N` | Keep last N generations |
| `just gc-days N` | Remove generations older than N days |
| `just rollback` | Roll back to previous generation |
| `just health` | Check system health |
| `just repair-store` | Repair Nix store |

### Development Commands

| Command | Description |
|---------|-------------|
| `just check` | Validate flake syntax |
| `just fmt` | Format all Nix files |
| `just show-deps` | Show flake dependency tree |
| `just flake-info` | Show flake metadata |

### Diagnostics Commands

| Command | Description |
|---------|-------------|
| `just find-backups` | Find Home Manager backup files |
| `just find-orphans` | Find orphaned config directories |
| `just find-untracked` | Find untracked files |
| `just clean-backups` | Remove backup files |
| `just clean-orphans` | Remove orphaned directories |

## Rollback

If something breaks:

```bash
# Immediate rollback
just rollback

# Or boot into previous generation from bootloader
```

## Next Steps

- [Installation](/docs/getting-started/installation/) - Detailed installation for new systems
- [First Steps](/docs/getting-started/first-steps/) - Configure your user preferences
- [System Guide](/docs/system-guide/) - Understand the module system
