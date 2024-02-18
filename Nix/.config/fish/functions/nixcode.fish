function nixcode --wraps=sudo\ code\ /etc/nixos\ --user-data-dir=\'.\'\ --no-sandbox --description alias\ nixcode=sudo\ code\ /etc/nixos\ --user-data-dir=\'.\'\ --no-sandbox
  sudo code /etc/nixos --user-data-dir='.' --no-sandbox $argv
        
end
