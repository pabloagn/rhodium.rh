---
title: "System Guide"
description: "Architecture, modules, and customization."
type: "docs"
url: "/docs/system-guide/"
weight: 3
---

This section covers the internal structure of Rhodium and how to customize it for your needs.

## Module System

Rhodium uses a two-layer module system:

| Layer | Location | Manager | Purpose |
|-------|----------|---------|---------|
| System | `modules/` | NixOS | Hardware, services, system config |
| User | `home/` | Home Manager | Applications, dotfiles, user services |

Both layers receive configuration data from the `data/` directory, enabling separation of logic from preferences.

## In This Section

- [Usage](/docs/system-guide/usage/) - Daily workflows and operations
- [Customization](/docs/system-guide/customization-options/) - Configuration options reference
- [Modules](/docs/system-guide/modules/) - Module structure and development
- [Themes](/docs/system-guide/themes/) - Theme system and customization
