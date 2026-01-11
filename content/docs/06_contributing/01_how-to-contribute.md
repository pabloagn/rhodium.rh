---
title: "How to Contribute"
description: "Guidelines for contributing to Rhodium."
type: "docs"
url: "/docs/contributing/how-to-contribute/"
weight: 1
---

## Reporting Bugs

### Before Submitting

1. Check existing issues for duplicates
2. Verify the bug reproduces on latest commit
3. Test with minimal configuration if possible

### Bug Report Contents

Include:

| Field | Description |
|-------|-------------|
| Host | Your host configuration name |
| NixOS Version | `nixos-version` output |
| Commit | Current Rhodium commit hash |
| Description | What happened vs. what you expected |
| Steps | Minimal steps to reproduce |
| Logs | Relevant journal or build logs |

### Where to Report

Open an issue at: `github.com/pabloagn/rhodium/issues`

## Suggesting Features

### Feature Request Contents

1. **Problem** - What problem does this solve?
2. **Solution** - What is the proposed solution?
3. **Alternatives** - What alternatives exist?
4. **Scope** - Is this a new module, modification, or configuration option?

## Code Contributions

### Process

1. Fork the repository
2. Create a feature branch
3. Make changes
4. Test on your system
5. Submit pull request

### Code Standards

| Requirement | Details |
|-------------|---------|
| Formatting | Run `just fmt` before committing |
| Testing | Build succeeds with `just build <host>` |
| Commits | Clear, descriptive commit messages |
| Scope | One feature or fix per PR |

### Commit Messages

Format:

```
<type>(<scope>): <description>

[optional body]

[optional footer]
```

Types:
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation
- `refactor`: Code refactoring
- `chore`: Maintenance

Example:

```
feat(yazi): add DuckDB plugin for structured data preview

Adds duckdb.lua plugin configuration with summary mode enabled.
Configured keybindings for column scrolling (H/L).
```

### Pull Request Process

1. Ensure all checks pass
2. Update documentation if needed
3. Describe changes in PR description
4. Link related issues

## Module Contributions

### Adding a New Module

1. Create module in appropriate directory
2. Follow existing module patterns
3. Add to relevant `default.nix` imports
4. Document in PR description

### Module Structure

```nix
{ config, pkgs, lib, ... }:

{
  # Configuration
}
```

### Testing Modules

1. Add module to your host configuration
2. Run `just check`
3. Run `just build-dry <host>`
4. Run `just switch <host>`

## Documentation Contributions

Documentation lives in `/home/pabloagn/dev/rhodium.rh/` (Hugo site).

### Style Guide

- No emojis
- No flowery language
- Tables for structured data
- Code blocks for configuration
- Accurate keybindings from actual config

### Building Documentation

```bash
cd /home/pabloagn/dev/rhodium.rh
hugo server -D
```

## Getting Help

For questions about contributing:

1. Check existing documentation
2. Search closed issues
3. Open a discussion if needed
