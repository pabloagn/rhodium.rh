---
title: "Getting Started"
description: "Installation and initial configuration of Rhodium."
type: "docs"
url: "/docs/getting-started/"
weight: 2
---

This section covers installing Rhodium on a new or existing NixOS system.

## Prerequisites

Before installing Rhodium, ensure you have:

| Requirement | Details |
|-------------|---------|
| NixOS | Version 24.05 or later |
| Nix Flakes | Enabled in configuration |
| Git | For cloning the repository |
| Just | Command runner (optional but recommended) |

### Enable Flakes

If flakes are not enabled, add to your NixOS configuration:

```nix
nix.settings.experimental-features = [ "nix-command" "flakes" ];
```

Then rebuild: `sudo nixos-rebuild switch`

## In This Section

- [Quick Start](/docs/getting-started/quick-start/) - Fast path to a running system
- [Installation](/docs/getting-started/installation/) - Detailed installation steps
- [First Steps](/docs/getting-started/first-steps/) - Post-installation configuration
