function fishedit --wraps='nvim ~/.config/fish/fish.conf' --wraps='nvim ~/.config/fish/config.fish' --description 'alias fishedit=nvim ~/.config/fish/config.fish'
  nvim ~/.config/fish/config.fish $argv
        
end
