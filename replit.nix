{ pkgs }: {
	deps = [
		pkgs.sudo
  pkgs.iproute2
  pkgs.nodejs-16_x
        pkgs.nodePackages.typescript-language-server
        pkgs.yarn
        pkgs.replitPackages.jest
	];
}