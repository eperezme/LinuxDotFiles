function nixedit --wraps='sudo nvim /etc/nixos/configuration.nix' --description 'alias nixedit=sudo nvim /etc/nixos/configuration.nix'
  sudo nvim /etc/nixos/configuration.nix $argv
        
end
