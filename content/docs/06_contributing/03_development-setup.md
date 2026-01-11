---
title: "Development Setup"
description: "Setting up a local development environment for Rhodium."
type: "docs"
url: "/docs/contributing/development-setup/"
weight: 3
---

## Prerequisites

| Requirement | Version |
|-------------|---------|
| NixOS | 24.05 or later |
| Nix Flakes | Enabled |
| Git | Any recent version |
| Just | Recommended |

## Forking the Repository

1. Fork on GitHub: `github.com/pabloagn/rhodium`
2. Clone your fork:

```bash
git clone git@github.com:YOUR_USERNAME/rhodium.git
cd rhodium
```

3. Add upstream remote:

```bash
git remote add upstream git@github.com:pabloagn/rhodium.git
```

## Development Workflow

### Creating a Feature Branch

```bash
git checkout -b feat/my-feature
```

### Making Changes

1. Edit configuration files
2. Test changes locally

### Testing Changes

```bash
# Validate flake syntax
just check

# Preview build (no activation)
just build-dry host_001

# Full build (no activation)
just build host_001

# Build and switch (activates changes)
just switch host_001
```

### Formatting

Format all Nix files before committing:

```bash
just fmt
```

Uses `nixfmt-rfc-style`.

### Keeping in Sync

```bash
git fetch upstream
git rebase upstream/main
```

## Testing on Different Hosts

If you have multiple machines:

1. Create test host configuration
2. Test on different hardware (AMD/Intel/NVIDIA)
3. Test on laptop (battery, touchpad)
4. Test on desktop (external monitors)

## Common Development Tasks

### Adding a Package

User-level (Home Manager):

```nix
# home/apps/category/mypackage.nix
{ pkgs, ... }:
{
  home.packages = with pkgs; [ mypackage ];
}
```

System-level (NixOS):

```nix
# modules/category/mymodule.nix
{ pkgs, ... }:
{
  environment.systemPackages = with pkgs; [ mypackage ];
}
```

### Adding a Module

1. Create file in appropriate directory
2. Follow existing patterns
3. Import in category's `default.nix`

### Modifying Keybindings

Niri: `home/desktop/wm/niri/default.nix`
Yazi: `home/utils/files/yazi/modules/keymap.nix`
Neovim: `home/apps/editors/neovim/keymaps/`

## Debugging

### Build Failures

```bash
# Verbose build output
just build-dev host_001

# Check specific module
nix eval .#nixosConfigurations.host_001.config.services.myservice
```

### Home Manager Issues

```bash
# View logs
journalctl -u home-manager-$USER.service -n 200

# Find backup conflicts
just find-backups
```

### Flake Issues

```bash
# Update lock file
nix flake update

# Check flake metadata
just flake-info
```

## Editor Setup

### Neovim

LSP support via `nil` and `nixd` is pre-configured. Open any `.nix` file for:

- Syntax highlighting
- Go to definition
- Format on save

### VS Code / Zed

Install Nix language support extension.

## Submitting Changes

1. Commit with descriptive message
2. Push to your fork
3. Open pull request against `main`
4. Describe changes and testing performed
