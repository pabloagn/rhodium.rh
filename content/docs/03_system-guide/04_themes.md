---
title: "Themes"
description: "Theme system and color scheme configuration."
type: "docs"
url: "/docs/system-guide/themes/"
weight: 4
---

Rhodium uses a centralized theme system that propagates colors across all applications.

## Theme Package

Themes are provided by the Chiaroscuro package, a custom flake input:

```nix
inputs.chiaroscuro.url = "github:pabloagn/chiaroscuro.rht";
```

## Available Themes

| Theme | Description |
|-------|-------------|
| `kanso-ink` | Dark theme with warm undertones |
| `kanso-paper` | Light theme with soft contrast |
| `kanso-zen` | Low contrast dark theme |

## Configuration

### Setting the Theme

Edit `data/users/preferences/theme.nix`:

```nix
{
  targetTheme = "kanso-zen";
}
```

Rebuild to apply:

```bash
just switch-fast host_001
```

### Theme Resolution

The theme flows through the system:

```
data/users/preferences/theme.nix
         │
         ▼
    flake.nix (getThemeConfig)
         │
         ▼
    extraSpecialArgs
    ├── theme (resolved colors)
    ├── targetTheme (theme name)
    └── chiaroscuroTheme (full package)
         │
         ▼
    home/ modules
    ├── Neovim
    ├── Kitty
    ├── Yazi
    ├── Waybar
    ├── Mako
    └── ...
```

## Theme Structure

Each theme provides a color palette:

```nix
{
  # Base colors
  background = "#0d0c0c";
  foreground = "#c5c9c5";

  # Normal colors
  black = "#0d0c0c";
  red = "#c4746e";
  green = "#8a9a7b";
  yellow = "#c4b28a";
  blue = "#8ba4b0";
  magenta = "#a292a3";
  cyan = "#8ea4a2";
  white = "#c8c093";

  # Bright colors
  brightBlack = "#a6a69c";
  brightRed = "#e46876";
  brightGreen = "#87a987";
  brightYellow = "#e6c384";
  brightBlue = "#7fb4ca";
  brightMagenta = "#938aa9";
  brightCyan = "#7aa89f";
  brightWhite = "#c5c9c5";

  # UI colors
  selection = "#2d4f67";
  cursor = "#c8c093";
  cursorText = "#0d0c0c";
}
```

## Application Integration

### Neovim

Theme applied via `kanso.nvim`:

```nix
# home/apps/editors/neovim/
{
  colorscheme = targetTheme;
}
```

### Kitty

Colors mapped to Kitty configuration:

```nix
# home/apps/terminals/kitty/
{
  settings = {
    background = theme.background;
    foreground = theme.foreground;
    # ...
  };
}
```

### Yazi

Theme defined in `home/utils/files/yazi/modules/kanso.nix`:

```nix
{
  manager = {
    cwd = { fg = theme.blue; };
    # ...
  };
}
```

### Waybar

CSS generated from theme colors:

```nix
# home/desktop/bars/waybar/style.nix
''
  * {
    background: ${theme.background};
    color: ${theme.foreground};
  }
''
```

### Mako

Notification colors:

```nix
# home/desktop/notifications/mako/
{
  backgroundColor = theme.background;
  textColor = theme.foreground;
  borderColor = theme.selection;
}
```

### Fuzzel

Launcher colors:

```nix
# home/desktop/launchers/fuzzel/
{
  colors = {
    background = theme.background;
    text = theme.foreground;
    selection = theme.selection;
  };
}
```

### Swaylock

Lock screen colors:

```nix
# home/desktop/lock/swaylock/
{
  color = theme.background;
  ring-color = theme.blue;
  key-hl-color = theme.green;
}
```

## Fonts

Fonts are configured alongside themes:

| Purpose | Font |
|---------|------|
| Monospace | Berkeley Mono |
| UI | Inter |
| Icons | Nerd Fonts Symbols |

Font configuration in `data/users/preferences/theme.nix`:

```nix
{
  targetTheme = "kanso-zen";
  fonts = {
    mono = "BerkeleyMono Nerd Font";
    ui = "Inter";
    size = 11;
  };
}
```

## Icons and Cursors

### Icon Theme

Papirus icons with Kanso colors:

```nix
# home/assets/icons/
{
  gtk.iconTheme = {
    name = "Papirus-Dark";
    package = pkgs.papirus-icon-theme;
  };
}
```

### Cursor Theme

Bibata cursor:

```nix
# home/assets/cursors/
{
  home.pointerCursor = {
    name = "Bibata-Modern-Classic";
    package = pkgs.bibata-cursors;
    size = 24;
  };
}
```

## Creating Custom Themes

### Add Theme Variant

1. Add theme to Chiaroscuro package
2. Export in `chiaroscuro/themes/`
3. Reference in `data/users/preferences/theme.nix`

### Override Colors

For per-application overrides, modify the specific module:

```nix
# Override Waybar accent
{
  programs.waybar.style = ''
    .workspaces button.active {
      background: #custom-color;
    }
  '';
}
```

## GTK and Qt

### GTK Theme

```nix
# home/desktop/gtk/
{
  gtk = {
    enable = true;
    theme = {
      name = "Adwaita-dark";
      package = pkgs.gnome-themes-extra;
    };
  };
}
```

### Qt Theme

```nix
# home/desktop/qt/
{
  qt = {
    enable = true;
    platformTheme.name = "gtk";
    style.name = "adwaita-dark";
  };
}
```

## Wallpapers

Wallpapers stored in `home/assets/wallpapers/`:

```nix
{
  home.file.".config/wallpaper.png".source = ./wallpaper.png;
}
```

Set via Niri configuration in `home/desktop/wm/niri/settings.nix`.
