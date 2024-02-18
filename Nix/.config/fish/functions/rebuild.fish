function rebuild --wraps='sudo nixos-rebuild switch' --description 'alias rebuild=sudo nixos-rebuild switch'
  sudo nixos-rebuild switch $argv
        
end
