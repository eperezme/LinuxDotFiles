# kexec
# Autogenerated from man page /run/current-system/sw/share/man/man8/kexec.8.gz
complete -c kexec -l mem-min -d 'Specify the lowest memory address  addr to load code into'
complete -c kexec -l mem-max -d 'Specify the highest memory address  addr to load code into'
complete -c kexec -l entry -d 'Specify the jump back address'
complete -c kexec -l load-preserve-context -d 'Load the new kernel and preserve context of current kernel during kexec'
complete -c kexec -l load-jump-back-helper -d 'Load a helper image to jump back to original kernel'
complete -c kexec -l reuseinitrd -d 'Reuse initrd from first boot'
complete -c kexec -s l
complete -c kexec -l append
complete -c kexec -l initrd -d 'where kernel-image is the kernel file that you intend to reboot to'
complete -c kexec -s e -d 'just before actually rebooting the machine'
complete -c kexec -s d -l debug -d 'Enable debugging messages'
complete -c kexec -s S -l status -d 'Return 1 if the type (by default crash) is loaded, 0 if not'
complete -c kexec -l exec -d 'Run the currently loaded kernel'
complete -c kexec -s f -l force -d 'Force an immediate kexec call, do not call shutdown (8) (contrary to the defa…'
complete -c kexec -s h -l help -d 'Open a help file for kexec '
complete -c kexec -s i -l no-checks -d 'Fast reboot, no memory integrity checks'
complete -c kexec -l load -d 'Load the specified kernel into the current kernel'
complete -c kexec -s p -l load-panic -d 'Load the new kernel for use on panic'
complete -c kexec -s t -l type -d 'Specify that the new kernel is of this type'
complete -c kexec -s s -l kexec-file-syscall -d 'Specify that the new KEXEC_FILE_LOAD syscall should be used exclusively'
complete -c kexec -s c -l kexec-syscall -d 'Specify that the old KEXEC_LOAD syscall should be used exclusively (the defau…'
complete -c kexec -s a -l kexec-syscall-auto -d 'Try the new KEXEC_FILE_LOAD syscall first and when it is not supported or the…'
complete -c kexec -s u -l unload -d 'Unload the current kexec target kernel'
complete -c kexec -s v -l version -d 'Return the version number of the installed utility'
complete -c kexec -s x -l no-ifdown -d 'Shut down the running kernel, but restore the interface on reload'
complete -c kexec -s y -l no-sync -d 'Shut down the running kernel, but skip syncing the filesystems'
complete -c kexec -l print-ckr-size -d 'Print crash kernel region size, if available'
complete -c kexec -l args-elf -d 'Pass ELF boot notes'
complete -c kexec -l args-linux -d 'Pass Linux kernel style options'
complete -c kexec -l real-mode -d 'Use the kernel\'s real mode entry point.  elf-x86'
complete -c kexec -l command-line -d 'Set the kernel command line to string '
complete -c kexec -l reuse-cmdline -d 'Use the command line from the running system'
complete -c kexec -l ramdisk -d 'Use file as the kernel\'s initial ramdisk.  bzImage-x86'
complete -c kexec -l module -d 'Load module mod with command-line arguments arg1 arg2 '
complete -c kexec -l console-serial -d 'Enable the serial console'
complete -c kexec -l console-vga -d 'Enable the VGA console'
complete -c kexec -l elf32-core-headers -d 'Prepare core headers in ELF32 format'
complete -c kexec -l elf64-core-headers -d 'Prepare core headers in ELF64 format'
complete -c kexec -l reset-vga -d 'Attempt to reset a standard VGA device'
complete -c kexec -l serial -d 'Specify the serial port for debug output'
complete -c kexec -l serial-baud -d 'Specify the baud rate of the serial port'
