{ pkgs }: pkgs.mkShell {
  buildInputs = [
    pkgs.nodejs-18_x
    pkgs.nodePackages.npm
    # pkgs.yarn            # uncomment if you’d rather use Yarn
  ];
}