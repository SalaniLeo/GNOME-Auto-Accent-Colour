#!/bin/sh

sh install.sh

dbus-run-session -- gnome-shell --nested --wayland
