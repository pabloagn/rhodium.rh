---
title: "Release Cycle"
description: "Rhodium versioning and release management."
type: "docs"
url: "/docs/releases/release-cycle/"
weight: 1
---

## Versioning

Rhodium uses a date-based versioning scheme aligned with NixOS releases.

### Version Format

```
YYYY.MM.PATCH
```

Example: `2025.11.1`

- `YYYY.MM` - NixOS release version
- `PATCH` - Incremental fixes within that release

## Update Channels

### Stable Channel (`nixpkgs`)

- Follows NixOS stable releases (currently 25.11)
- Updated with each NixOS point release
- Used for system-critical packages

### Unstable Channel (`nixpkgs-unstable`)

- Rolling updates
- Used for actively-developed tools:
  - Neovim and plugins
  - Yazi and plugins
  - Helix
  - Language servers

### Shell Channel (`nixpkgs-shell`)

- Matches stable version
- Used for development shell packages
- Separate to allow independent updates

## Update Frequency

| Component | Frequency |
|-----------|-----------|
| Flake inputs | Weekly recommended |
| NixOS version | Every 6 months |
| Documentation | As needed |

## Update Process

### Weekly Updates

```bash
# Update all inputs
just update
just switch host_001

# Or update specific input
just update-input nixpkgs-unstable
just switch host_001
```

### NixOS Version Upgrade

When new NixOS release is available:

1. Update flake inputs in `flake.nix`
2. Review breaking changes in release notes
3. Update module configurations if needed
4. Test with `just build-dry`
5. Apply with `just switch`

### Rollback

If update breaks system:

```bash
# Immediate rollback
just rollback

# Or select previous generation at boot
```

## Release Notes

Major changes are documented in git commits and the changelog directory.

### Commit Convention

- `feat:` New features
- `fix:` Bug fixes
- `docs:` Documentation
- `refactor:` Code changes without feature changes
- `chore:` Maintenance

## Compatibility

### Hardware Support

Tested on:
- AMD GPU (primary)
- Intel integrated graphics
- NVIDIA (supported, less tested)

### Display Servers

- Wayland (Niri) - Primary, fully supported
- X11 - Via xwayland-satellite for legacy apps

### Host Configurations

| Host | Type | GPU | Status |
|------|------|-----|--------|
| host_001 | Desktop | AMD | Active |
| host_002 | Laptop | Intel | Active |
