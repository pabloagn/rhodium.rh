---
title: "Installation"
description: "Detailed installation guide for new systems."
type: "docs"
url: "/docs/getting-started/installation/"
weight: 2
---

This guide covers installing Rhodium on a fresh NixOS system or adapting it for an existing one.

## Fresh Installation

### Step 1: Install NixOS

Boot the NixOS installer and complete a minimal installation:

```bash
# Partition your disk (example for UEFI)
parted /dev/sda -- mklabel gpt
parted /dev/sda -- mkpart ESP fat32 1MB 512MB
parted /dev/sda -- set 1 esp on
parted /dev/sda -- mkpart primary 512MB 100%

# Format partitions
mkfs.fat -F 32 -n boot /dev/sda1
mkfs.ext4 -L nixos /dev/sda2

# Mount
mount /dev/disk/by-label/nixos /mnt
mkdir -p /mnt/boot
mount /dev/disk/by-label/boot /mnt/boot

# Generate base configuration
nixos-generate-config --root /mnt

# Edit configuration to enable flakes
nano /mnt/etc/nixos/configuration.nix
```

Add to configuration.nix:

```nix
nix.settings.experimental-features = [ "nix-command" "flakes" ];
environment.systemPackages = with pkgs; [ git vim ];
```

Complete installation:

```bash
nixos-install
reboot
```

### Step 2: Clone Rhodium

```bash
# As your user
git clone https://github.com/pabloagn/rhodium.git ~/rhodium
cd ~/rhodium
```

### Step 3: Create Your Host

Copy an existing host configuration:

```bash
cp -r hosts/host_001 hosts/my_host
```

Edit `hosts/my_host/default.nix`:

```nix
{ config, pkgs, ... }:

{
  imports = [
    ./hardware-configuration.nix
    # Import modules you need
    ../../modules/hardware
    ../../modules/desktop
    # ...
  ];

  networking.hostName = "my_host";
  # Your configuration
}
```

Generate hardware configuration:

```bash
nixos-generate-config --show-hardware-config > hosts/my_host/hardware-configuration.nix
```

### Step 4: Add Host to Flake

Edit `flake.nix` and add your host under `nixosConfigurations`:

```nix
nixosConfigurations = {
  # Existing hosts...

  my_host = lib.nixosSystem {
    inherit system;
    specialArgs = {
      inherit pkgs-unstable inputs rhodiumLib;
      users = userData;
      host = hostsData.hosts.my_host or {};
    };
    modules = [
      ./hosts/my_host
      home-manager.nixosModules.home-manager
      # ...
    ];
  };
};
```

### Step 5: Add Host Data

Edit `data/hosts/hosts.nix`:

```nix
{
  hosts = {
    # Existing hosts...

    my_host = {
      hostname = "my_host";
      # Monitor configuration, etc.
    };
  };
}
```

### Step 6: Build and Switch

```bash
just switch my_host
```

## Adapting for Existing System

If you have an existing NixOS system:

### Step 1: Backup Current Configuration

```bash
cp -r /etc/nixos ~/nixos-backup
```

### Step 2: Clone Rhodium

```bash
git clone https://github.com/pabloagn/rhodium.git ~/rhodium
cd ~/rhodium
```

### Step 3: Create Host Configuration

Create a new host directory and copy your existing hardware configuration:

```bash
mkdir -p hosts/my_host
cp /etc/nixos/hardware-configuration.nix hosts/my_host/
```

Create `hosts/my_host/default.nix` with your desired module imports.

### Step 4: Migrate Settings

Review your existing `/etc/nixos/configuration.nix` and migrate settings to appropriate Rhodium modules or your host configuration.

### Step 5: Test Before Switching

```bash
# Build without activating
just build my_host

# If successful, switch
just switch my_host
```

## GPU-Specific Configuration

### AMD GPU

Use modules from `modules/desktop/wm/niri/amd.nix`:

```nix
imports = [
  ../../modules/desktop/wm/niri/amd.nix
];
```

### Intel GPU

Use modules from `modules/desktop/wm/niri/intel.nix`:

```nix
imports = [
  ../../modules/desktop/wm/niri/intel.nix
];
```

### NVIDIA GPU

NVIDIA requires additional configuration:

```nix
services.xserver.videoDrivers = [ "nvidia" ];
hardware.nvidia = {
  modesetting.enable = true;
  powerManagement.enable = true;
  open = false;
  nvidiaSettings = true;
};
```

## Troubleshooting

### Build Fails

```bash
# Check flake syntax
just check

# Verbose build for debugging
just build-dev my_host
```

### Home Manager Conflicts

If files conflict with Home Manager:

```bash
# Find backup files
just find-backups

# Clean backups after reviewing
just clean-backups
```

### Rollback

```bash
# Immediate rollback
just rollback

# Or select previous generation at boot
```

## Next Steps

- [First Steps](/docs/getting-started/first-steps/) - Configure your preferences
- [System Guide](/docs/system-guide/) - Understand module structure
