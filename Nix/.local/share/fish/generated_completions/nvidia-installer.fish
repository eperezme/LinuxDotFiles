# nvidia-installer
# Autogenerated from man page /run/current-system/sw/share/man/man1/nvidia-installer.1.gz
complete -c nvidia-installer -s v -l version -d 'Print the nvidia-installer version and exit'
complete -c nvidia-installer -s h -l help -d 'Print usage information for the common commandline options and exit'
complete -c nvidia-installer -l expert -d 'commandline option), this command list will be presented so that you can revi…'
complete -c nvidia-installer -l ui -d 'Additional user interfaces, utilizing GTK+ or QT, for example, could be provi…'
complete -c nvidia-installer -s A -l advanced-options -d 'Print usage information for the common commandline options as well as the adv…'
complete -c nvidia-installer -s a -l accept-license -d 'This option is obsolete and ignored by nvidia-installer'
complete -c nvidia-installer -s i -l driver-info -d 'Print information about the currently installed NVIDIA driver version'
complete -c nvidia-installer -l uninstall -d 'Uninstall the currently installed NVIDIA driver'
complete -c nvidia-installer -l skip-module-unload -d 'When uninstalling the driver, skip unloading of the NVIDIA kernel module'
complete -c nvidia-installer -l sanity -d 'Perform basic sanity tests on an existing NVIDIA driver installation'
complete -c nvidia-installer -s e -d 'Enable \'expert\' installation mode; more detailed questions will be asked, and…'
complete -c nvidia-installer -s q -l no-questions -d 'Do not ask any questions; the default (normally \'yes\') is assumed for all yes…'
complete -c nvidia-installer -s s -l silent -d 'Run silently; no questions are asked and no output is printed, except for err…'
complete -c nvidia-installer -l x-prefix -d 'The prefix under which the X components of the NVIDIA driver will be installe…'
complete -c nvidia-installer -l xfree86-prefix -d 'This is a deprecated synonym for --x-prefix'
complete -c nvidia-installer -l x-module-path -d 'The path under which the NVIDIA X server modules will be installed'
complete -c nvidia-installer -l x-library-path -d 'The path under which the NVIDIA X libraries will be installed'
complete -c nvidia-installer -l x-sysconfig-path -d 'The path under which X system configuration files will be installed'
complete -c nvidia-installer -l opengl-prefix -d 'The prefix under which the OpenGL components of the NVIDIA driver will be ins…'
complete -c nvidia-installer -l opengl-libdir -d 'The path relative to the OpenGL library installation prefix under which the N…'
complete -c nvidia-installer -l wine-prefix -d 'The prefix under which Wine components of the NVIDIA driver will be installed'
complete -c nvidia-installer -l wine-libdir -d 'The path relative to the Wine installation prefix under which Wine components…'
complete -c nvidia-installer -l installer-prefix -d 'The prefix under which the installer binary will be installed; the default is…'
complete -c nvidia-installer -l utility-prefix -d 'The prefix under which the NVIDIA utilities (nvidia-installer, nvidia-setting…'
complete -c nvidia-installer -l utility-libdir -d 'The path relative to the utility installation prefix under which the NVIDIA u…'
complete -c nvidia-installer -l xdg-data-dir -d 'The prefix under which XDG data files (such as application '
complete -c nvidia-installer -l gbm-backend-dir -d 'The path relative to the OpenGL library installation prefix under which the N…'
complete -c nvidia-installer -l documentation-prefix -d 'The prefix under which the documentation files for the NVIDIA driver will be …'
complete -c nvidia-installer -l application-profile-path -d 'The directory under which default application profiles for the NVIDIA driver …'
complete -c nvidia-installer -l kernel-include-path -d 'The directory containing the kernel include files that should be used when co…'
complete -c nvidia-installer -l kernel-source-path -d 'The directory containing the kernel source files that should be used when com…'
complete -c nvidia-installer -l kernel-output-path -d 'The directory containing any KBUILD output files if either one of the \'KBUILD…'
complete -c nvidia-installer -l kernel-install-path -d 'The directory in which the NVIDIA kernel module should be installed'
complete -c nvidia-installer -l proc-mount-point -d 'The mount point for the proc file system; if not specified, then this value d…'
complete -c nvidia-installer -l log-file-name -d 'File name of the installation log file (the default is: \'/var/log/nvidia-inst…'
complete -c nvidia-installer -l tmpdir -d 'Use the specified directory as a temporary directory when generating transien…'
complete -c nvidia-installer -s c -l no-ncurses-color -d 'Disable use of color in the ncurses user interface'
complete -c nvidia-installer -l no-nvidia-modprobe -d 'Skip installation of \'nvidia-modprobe\', a setuid root utility which nvidia-in…'
complete -c nvidia-installer -s k -l kernel-name -d 'Build and install the NVIDIA kernel module for the non-running kernel specifi…'
complete -c nvidia-installer -s n -l no-precompiled-interface -d 'Disable use of precompiled kernel interfaces'
complete -c nvidia-installer -l no-abi-note -d 'The NVIDIA OpenGL libraries contain an OS ABI note tag, which identifies the …'
complete -c nvidia-installer -l no-rpms -d 'Normally, the installer will check for several rpms that conflict with the dr…'
complete -c nvidia-installer -s b -l no-backup -d 'During driver installation, conflicting files are backed up, so that they can…'
complete -c nvidia-installer -s r -l no-recursion -d 'Normally, nvidia-installer will recursively search for potentially conflictin…'
complete -c nvidia-installer -s K -l kernel-modules-only -d 'Install the kernel modules only, and do not uninstall the existing driver'
complete -c nvidia-installer -l no-kernel-modules -d 'Install everything but the kernel modules, and do not remove any existing, po…'
complete -c nvidia-installer -l no-x-check -d 'Do not abort the installation if nvidia-installer detects that an X server is…'
complete -c nvidia-installer -l precompiled-kernel-interfaces-path -d 'Before searching for a precompiled kernel interface in the '
complete -c nvidia-installer -s z -l no-nouveau-check -d 'Normally, nvidia-installer aborts installation if the nouveau kernel driver i…'
complete -c nvidia-installer -s Z -l disable-nouveau -l no-disable-nouveau -d 'nvidia-installer will attempt to disable the nouveau kernel driver by default…'
complete -c nvidia-installer -s X -l run-nvidia-xconfig -d 'nvidia-installer can optionally invoke the nvidia-xconfig utility'
complete -c nvidia-installer -l force-selinux -d 'Linux installations using SELinux (Security-Enhanced Linux) require that the …'
complete -c nvidia-installer -l selinux-chcon-type -d 'When SELinux support is enabled, nvidia-installer will try to determine which…'
complete -c nvidia-installer -l no-sigwinch-workaround -d 'Normally, nvidia-installer ignores the SIGWINCH signal before it forks to exe…'
complete -c nvidia-installer -l no-distro-scripts -d 'Normally, nvidia-installer will run scripts from /usr/lib/nvidia before and a…'
complete -c nvidia-installer -l no-opengl-files -d 'Do not install any of the OpenGL-related driver files'
complete -c nvidia-installer -l no-wine-files -d 'Do not install any of the Wine driver files'
complete -c nvidia-installer -l kernel-module-source-prefix -d 'Specify a path where the source directory for the kernel module will be insta…'
complete -c nvidia-installer -l kernel-module-source-dir -d 'Specify the name of the directory where the kernel module sources will be ins…'
complete -c nvidia-installer -l no-kernel-module-source -d 'Skip installation of the kernel module source'
complete -c nvidia-installer -l dkms -l no-dkms -d 'nvidia-installer can optionally register the NVIDIA kernel module sources, if…'
complete -c nvidia-installer -l module-signing-secret-key -d 'Specify a path to a private key to use for signing the NVIDIA kernel module'
complete -c nvidia-installer -l module-signing-public-key -d 'Specify a path to a public key to use for verifying the signature of the NVID…'
complete -c nvidia-installer -l module-signing-script -d 'Specify a path to a program to use for signing the NVIDIA kernel module'
complete -c nvidia-installer -l module-signing-key-path -d 'Specify a path where signing keys generated by nvidia-installer will be insta…'
complete -c nvidia-installer -l module-signing-hash -d 'Specify a cryptographic hash algorithm to use for signing kernel modules'
complete -c nvidia-installer -l module-signing-x509-hash -d 'Specify a cryptographic hash algorithm to use for signing X'
complete -c nvidia-installer -l no-check-for-alternate-installs -d 'Maintainers of alternate driver installation methods can report the presence …'
complete -c nvidia-installer -l no-unified-memory -d 'Do not install the NVIDIA Unified Memory kernel module'
complete -c nvidia-installer -l no-drm -d 'Do not install the nvidia-drm kernel module'
complete -c nvidia-installer -l no-peermem -d 'Do not install the nvidia-peermem kernel module'
complete -c nvidia-installer -s j -l concurrency-level -d 'Set the concurrency level for operations such as building the kernel module w…'
complete -c nvidia-installer -l force-libglx-indirect -d 'Always install a libGLX_indirect. so. 0 symlink, overwriting one if it exists'
complete -c nvidia-installer -l no-libglx-indirect -d 'Do not install a libGLX_indirect. so. 0 symlink'
complete -c nvidia-installer -l install-libglvnd -l no-install-libglvnd -d 'The installer will try to determine whether the libglvnd libraries are alread…'
complete -c nvidia-installer -l glvnd-egl-config-path -d 'Install the EGL vendor library config file to this directory'
complete -c nvidia-installer -l egl-external-platform-config-path -d 'If the package includes an EGL external platform library, then install the EG…'
complete -c nvidia-installer -l override-file-type-destination -d 'Override the default destination for a file type'
complete -c nvidia-installer -l skip-depmod -d 'Don\'t run the depmod(1) utility after modifying kernel modules'
complete -c nvidia-installer -l systemd -l no-systemd -d 'By default, the installer will install systemd unit files if systemctl is det…'
complete -c nvidia-installer -l systemd-unit-prefix -d 'The path to which systemd unit files should be installed'
complete -c nvidia-installer -l systemd-sleep-prefix -d 'The path to which systemd-sleep script files should be installed'
complete -c nvidia-installer -l systemd-sysconf-prefix -d 'The path to which systemd unit enable symlinks should be installed'
complete -c nvidia-installer -s m -l kernel-module-build-directory -d 'The path within the driver package that contains the kernel module build file…'
complete -c nvidia-installer -l allow-installation-with-running-driver -l no-allow-installation-with-running-driver -d 'Proceed with installation even if an NVIDIA driver is already installed and r…'
complete -c nvidia-installer -l rebuild-initramfs -l no-rebuild-initramfs -d 'Rebuild the initramfs after installation is complete, regardless of the defau…'
