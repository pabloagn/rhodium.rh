---
title: "Pipeline"
description: "Development workflow and project roadmap."
type: "docs"
url: "/docs/releases/pipeline/"
weight: 2
---

## Development Workflow

### Local Development

1. Make changes to configuration
2. Run `just check` to validate
3. Run `just build-dry host_001` to preview
4. Run `just switch host_001` to apply
5. Commit changes

### CI/CD

Currently manual. Planned automation:
- Flake check on PR
- Build verification
- Documentation deployment

## Roadmap

### Planned Features

| Feature | Priority | Status |
|---------|----------|--------|
| Additional host templates | Medium | Planned |
| NVIDIA GPU module improvements | Medium | Planned |
| Server/headless configuration | Low | Planned |
| Automated testing | Low | Planned |

### Documentation

| Section | Status |
|---------|--------|
| Introduction | Complete |
| Getting Started | Complete |
| System Guide | Complete |
| Reference/Tools | In progress |
| Reference/Keybinds | Complete |
| Contributing | Complete |
| Releases | Complete |

### Tool Documentation

| Tool | Status |
|------|--------|
| Yazi | Complete |
| Niri | Complete |
| Neovim | Complete |
| Fish | Complete |
| Kitty | Complete |
| Waybar | Complete |
| Helix | Complete |
| Zathura | Planned |
| Lazygit | Planned |
| Fuzzel | Planned |

## Known Issues

### Current Limitations

| Issue | Workaround |
|-------|------------|
| NVIDIA under Wayland | Use x11 fallback for problematic apps |
| Some Electron apps | Run via xwayland-satellite |

### Open TODOs

From codebase analysis:

1. KMonad configuration refinements
2. Waybar module improvements
3. Additional Yazi plugins evaluation
4. Theme variant expansion

## Contributing to Roadmap

To suggest roadmap items:

1. Open an issue with `enhancement` label
2. Describe the feature or improvement
3. Explain the use case
4. Discuss implementation approach

## Version History

### Recent Changes

See git log for detailed history:

```bash
git log --oneline -20
```

### Notable Milestones

- Initial public release
- Niri compositor integration
- Home Manager integration
- Multi-host support
- Theme system (Chiaroscuro)
- Documentation site
