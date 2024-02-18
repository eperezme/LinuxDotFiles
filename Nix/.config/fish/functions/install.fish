function install --wraps='nix-env -i' --description 'alias install=nix-env -i'
  nix-env -i $argv
        
end
