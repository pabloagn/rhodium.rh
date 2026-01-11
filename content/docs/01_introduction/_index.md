---
title: "Introduction"
description: "High-level overview of the Rhodium project, its purpose, and core features."
type: "docs"
url: "/docs/introduction/"
weight: 1
---

Rhodium is a hypermodular, declarative NixOS system configuration designed for power users, developers, and researchers. It provides a complete desktop environment with 150+ curated tools, organized into composable modules that can be adapted to different hosts and use cases.

## What is Rhodium?

A NixOS flake that combines:

- **System configuration** via NixOS modules
- **User configuration** via Home Manager
- **External tooling** via custom flake inputs
- **Data separation** via declarative config files

The architecture separates hosts, users, modules, and data into distinct layers, making it possible to share configurations across machines while maintaining host-specific customizations.

## Core Principles

| Principle | Implementation |
|-----------|----------------|
| Declarative | All configuration in Nix, version-controlled |
| Reproducible | Flake inputs pinned, builds deterministic |
| Modular | Components can be enabled/disabled independently |
| Keyboard-first | Vim-style navigation across all tools |
| Minimal dependencies | Each module declares only what it needs |

## In This Section

- [Motivation](/docs/introduction/motivation/) - Why Rhodium exists and the problems it solves
- [Features](/docs/introduction/features/) - Complete feature overview
- [Architecture](/docs/introduction/architecture/) - System design and module structure
