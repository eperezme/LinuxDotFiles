# systemd-analyze
# Autogenerated from man page /usr/share/man/man1/systemd-analyze.1.gz
complete -c systemd-analyze -l system -d 'Operates on the system systemd instance.  This is the implied default'
complete -c systemd-analyze -l user -d 'Operates on the user systemd instance'
complete -c systemd-analyze -l global -d 'Operates on the system-wide configuration for user systemd instance'
complete -c systemd-analyze -l order -l require -d 'When used in conjunction with the dot command (see above), selects which depe…'
complete -c systemd-analyze -l from-pattern -l to-pattern -d 'When used in conjunction with the dot command (see above), this selects which…'
complete -c systemd-analyze -l fuzz -d 'When used in conjunction with the critical-chain command (see above), also sh…'
complete -c systemd-analyze -l man -d 'Do not invoke man(1) to verify the existence of man pages listed in Documenta…'
complete -c systemd-analyze -l generators -d 'Invoke unit generators, see systemd. generator(7)'
complete -c systemd-analyze -l recursive-errors -d 'Control verification of units and their dependencies and whether systemd-anal…'
complete -c systemd-analyze -l root -d 'With cat-files and verify, operate on files underneath the specified root pat…'
complete -c systemd-analyze -l image -d 'With cat-files and verify, operate on files inside the specified image path P…'
complete -c systemd-analyze -l offline -d 'With security, perform an offline security review of the specified unit file(…'
complete -c systemd-analyze -l profile -d 'With security --offline=, takes into consideration the specified portable pro…'
complete -c systemd-analyze -l threshold -d 'With security, allow the user to set a custom value to compare the overall ex…'
complete -c systemd-analyze -l security-policy -d 'With security, allow the user to define a custom set of requirements formatte…'
complete -c systemd-analyze -l json -d 'With the security command, generate a JSON formatted output of the security a…'
complete -c systemd-analyze -l iterations -d 'When used with the calendar command, show the specified number of iterations …'
complete -c systemd-analyze -l base-time -d 'When used with the calendar command, show next iterations relative to the spe…'
complete -c systemd-analyze -l unit -d 'When used with the condition command, evaluate all the Condition*='
complete -c systemd-analyze -s H -l host -d 'Execute the operation remotely'
complete -c systemd-analyze -s M -l machine -d 'Execute operation on a local container'
complete -c systemd-analyze -l quiet -d 'Suppress hints and other non-essential output'
complete -c systemd-analyze -s h -l help -d 'Print a short help text and exit'
complete -c systemd-analyze -l version -d 'Print a short version string and exit'
complete -c systemd-analyze -l no-pager -d 'Do not pipe output into a pager'
complete -c systemd-analyze -s '>' -d '        Description: /proc/timer_list         '

