import "dart:io";
import "package:path/path.dart";

getConfigDir() => join(
      Platform.environment["XDG_CONFIG_HOME"] ??
          (Platform.environment["HOME"] ?? join("~", ".config")),
      "quados",
    );
getPackages() => join(getConfigDir(), "packages.ts");
getConfig() => join(getConfigDir(), "config.js");
