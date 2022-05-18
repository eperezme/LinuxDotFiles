# git-fetch
# Autogenerated from man page /usr/share/man/man1/git-fetch.1.gz
complete -c git-fetch -l all -d 'Fetch all remotes'
complete -c git-fetch -s a -l append -d 'Append ref names and object names of fetched refs to the existing contents of '
complete -c git-fetch -l atomic -d 'Use an atomic transaction to update local refs'
complete -c git-fetch -l depth -d 'Limit fetching to the specified number of commits from the tip of each remote…'
complete -c git-fetch -l deepen -d 'Similar to --depth, except it specifies the number of commits from the curren…'
complete -c git-fetch -l shallow-since -d 'Deepen or shorten the history of a shallow repository to include all reachabl…'
complete -c git-fetch -l shallow-exclude -d 'Deepen or shorten the history of a shallow repository to exclude commits reac…'
complete -c git-fetch -l unshallow -d 'If the source repository is complete, convert a shallow repository to a compl…'
complete -c git-fetch -l update-shallow -d 'By default when fetching from a shallow repository, git fetch refuses refs th…'
complete -c git-fetch -l negotiation-tip -d 'By default, Git will report, to the server, commits reachable from all local …'
complete -c git-fetch -l negotiate-only -d 'Do not fetch anything from the server, and instead print the ancestors of the…'
complete -c git-fetch -l dry-run -d 'Show what would be done, without making any changes'
complete -c git-fetch -l write-fetch-head -d 'Write the list of remote refs fetched in the FETCH_HEAD file directly under $…'
complete -c git-fetch -s f -l force -d 'When git fetch is used with <src>:<dst> refspec it may refuse to update the l…'
complete -c git-fetch -s k -l keep -d 'Keep downloaded pack'
complete -c git-fetch -l multiple -d 'Allow several <repository> and <group> arguments to be specified'
complete -c git-fetch -l auto-maintenance -l auto-gc -d 'Run git maintenance run --auto at the end to perform automatic repository mai…'
complete -c git-fetch -l write-commit-graph -d 'Write a commit-graph after fetching.  This overrides the config setting fetch'
complete -c git-fetch -l prefetch -d 'Modify the configured refspec to place all refs into the refs/prefetch/ names…'
complete -c git-fetch -s p -l prune -d 'Before fetching, remove any remote-tracking references that no longer exist o…'
complete -c git-fetch -s P -l prune-tags -d 'Before fetching, remove any local tags that no longer exist on the remote if …'
complete -c git-fetch -s n -l no-tags -d 'By default, tags that point at objects that are downloaded from the remote re…'
complete -c git-fetch -l refetch -d 'Instead of negotiating with the server to avoid transferring commits and asso…'
complete -c git-fetch -l refmap -d 'When fetching refs listed on the command line, use the specified refspec (can…'
complete -c git-fetch -s t -l tags -d 'Fetch all tags from the remote (i. e'
complete -c git-fetch -l recurse-submodules -d 'This option controls if and under what conditions new commits of submodules s…'
complete -c git-fetch -s j -l jobs -d 'Number of parallel children to be used for all forms of fetching'
complete -c git-fetch -l no-recurse-submodules -d 'Disable recursive fetching of submodules (this has the same effect as using t…'
complete -c git-fetch -l set-upstream -d 'If the remote is fetched successfully, add upstream (tracking) reference, use…'
complete -c git-fetch -l submodule-prefix -d 'Prepend <path> to paths printed in informative messages such as "Fetching sub…'
complete -c git-fetch -l recurse-submodules-default -d 'This option is used internally to temporarily provide a non-negative default …'
complete -c git-fetch -s u -l update-head-ok -d 'By default git fetch refuses to update the head which corresponds to the curr…'
complete -c git-fetch -l upload-pack -d 'When given, and the repository to fetch from is handled by git fetch-pack, --…'
complete -c git-fetch -s q -l quiet -d 'Pass --quiet to git-fetch-pack and silence any other internally used git comm…'
complete -c git-fetch -s v -l verbose -d 'Be verbose'
complete -c git-fetch -l progress -d 'Progress status is reported on the standard error stream by default when it i…'
complete -c git-fetch -s o -l server-option -d 'Transmit the given string to the server when communicating using protocol ver…'
complete -c git-fetch -l show-forced-updates -d 'By default, git checks if a branch is force-updated during fetch'
complete -c git-fetch -l no-show-forced-updates -d 'By default, git checks if a branch is force-updated during fetch'
complete -c git-fetch -s 4 -l ipv4 -d 'Use IPv4 addresses only, ignoring IPv6 addresses'
complete -c git-fetch -s 6 -l ipv6 -d 'Use IPv6 addresses only, ignoring IPv4 addresses'
complete -c git-fetch -l stdin -d 'Read refspecs, one per line, from stdin in addition to those provided as argu…'
complete -c git-fetch -l no-write-fetch-head -d 'from the command line tells Git not to write the file.  Under'
complete -c git-fetch -l filter -d 'when the filter definition has changed'
complete -c git-fetch -l exec -d 'is passed to the command to specify non-default path for the command run on t…'

