# nvme-format
# Autogenerated from man page /usr/share/man/man1/nvme-format.1.gz
complete -c nvme-format -s n -l namespace-id -d 'Send the format command for the specified nsid'
complete -c nvme-format -s l -l lbaf -d 'LBA Format: This field specifies the LBA format to apply to the NVM media'
complete -c nvme-format -s b -l block-size -d 'Block Size: This field is used to specify the target block size to format to'
complete -c nvme-format -s s -l ses -d 'Secure Erase Settings: This field specifies whether a secure erase should be …'
complete -c nvme-format -s p -l pil -d 'Protection Information Location: If set to \\(oq1\' and protection information …'
complete -c nvme-format -s i -l pi -d 'Protection Information: This field specifies whether end-to-end data protecti…'
complete -c nvme-format -s m -l ms -d 'Metadata Settings: This field is set to \\(oq1\' if the metadata is transferred…'
complete -c nvme-format -s r -l reset -d 'Issue a reset after successful format'
complete -c nvme-format -l force -d 'Just send the command immediately without warning of the implications'
complete -c nvme-format -s t -l timeout -d 'Override default timeout value.  In milliseconds'
