# xsel
# Autogenerated from man page /usr/share/man/man1/xsel.1x.gz
complete -c xsel -s a -l append -d 'append standard input to the selection.  Implies -i'
complete -c xsel -s f -l follow -d 'append to selection as standard input grows.  Implies -i'
complete -c xsel -s i -l input -d 'read standard input into the selection. PP Output options'
complete -c xsel -s o -l output -d 'write the selection to standard output. PP Action options'
complete -c xsel -s c -l clear -d 'clear the selection.  Overrides all input options'
complete -c xsel -s d -l delete -d 'Request that the current selection be deleted'
complete -c xsel -s p -l primary -d 'operate on the PRIMARY selection (default)'
complete -c xsel -s s -l secondary -d 'operate on the SECONDARY selection'
complete -c xsel -s b -l clipboard -d 'operate on the CLIPBOARD selection'
complete -c xsel -s k -l keep -d 'Do not modify the selections, but make the PRIMARY and SECONDARY selections p…'
complete -c xsel -s x -l exchange -d 'exchange the PRIMARY and SECONDARY selections'
complete -c xsel -l display -d 'specify the server to use; see X(1)'
complete -c xsel -s t -l selectionTimeout -d 'Specify the timeout in milliseconds within which the selection must be retrie…'
complete -c xsel -s l -l logfile -d 'Specify the file to log errors to when detached.  (Default $HOME/. xsel. log)'
complete -c xsel -s n -l nodetach -d 'Do not detach from the controlling terminal'
complete -c xsel -s h -l help -d 'display usage information and exit'
complete -c xsel -s v -l verbose -d 'Print informative messages'
complete -c xsel -l version -d 'output version information and exit'

