### ALIASES ###

# Changing "ls" to "exa"
alias ls='ls --color=auto'
alias l='exa -al --color=always --group-directories-first' # my preferred listing
alias la='exa -a --color=always --group-directories-first'  # all files and dirs
alias ll='exa -l --color=always --group-directories-first'  # long format
alias lt='exa -aT --color=always --group-directories-first' # tree listing
alias l.='exa -a | egrep "^\."'


## Homebrew
alias update='brew update'
alias upgrade='brew upgrade'
alias install='brew install'
alias uninstall='brew uninstall'
alias doctor='brew doctor'
