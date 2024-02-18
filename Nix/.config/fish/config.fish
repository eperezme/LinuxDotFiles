if status is-interactive
	# Set Greeting
	set -g fish_greeting 'Hello Edu <3'

	# ALIAS
		# Changing "ls" to "exa"
	alias ls='ls --color=auto'
	alias l='exa -al --color=always --group-directories-first' # my preferred listing
	alias la='exa -a --color=always --group-directories-first'  # all files and dirs
	alias ll='exa -l --color=always --group-directories-first'  # long format
	alias lt='exa -aT --color=always --group-directories-first' # tree listing
	alias l.='exa -a | egrep "^\."'
	
	# NIXOS



	# STARSHIP
	starship init fish | source
	# Neofetch
	neofetch

	# Commands to run in interactive sessions can go here
end
