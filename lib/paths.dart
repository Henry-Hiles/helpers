import "dart:io";
import "package:path/path.dart";

Directory getConfigDir() => Directory(join(
      Platform.environment["XDG_CONFIG_HOME"] ??
          join(Platform.environment["HOME"] ?? "~", ".config"),
      "quados",
    ));
File getPackagesFile() => File(join(getConfigDir().path, "packages.lock"));
File getConfigFile() => File(join(getConfigDir().path, "config.dart"));
