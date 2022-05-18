# sg_sync
# Autogenerated from man page /usr/share/man/man8/sg_sync.8.gz
complete -c sg_sync -s S -l 16 -d 'performs a SYNCHRONIZE CACHE(16) command'
complete -c sg_sync -s c -l count -d 'where COUNT is the number of blocks to synchronize from and including LBA'
complete -c sg_sync -s g -l group -d 'where GN is the group number which can be between 0 and 63 inclusive'
complete -c sg_sync -s h -l help -d 'output the usage message then exit'
complete -c sg_sync -s i -l immed -d 'sets the IMMED bit in the SYNCHRONIZE CACHE command'
complete -c sg_sync -s l -l lba -d 'where LBA is the lowest logical block address in the cache to synchronize to …'
complete -c sg_sync -s s -l sync-nv -d 'synchronize the (volatile) cache with the non-volatile cache'
complete -c sg_sync -s t -l timeout -d 'where SECS is the number of seconds the OS allows the SYNCHRONIZE CACHE(16) t…'
complete -c sg_sync -s v -l verbose -d 'increase the level of verbosity, (i. e.  debug output)'
complete -c sg_sync -s V -l version -d 'print the version string and then exit'

