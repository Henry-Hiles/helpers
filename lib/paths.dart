import "dart:io";
import "package:path/path.dart";
import "package:xdg_directories/xdg_directories.dart";

final configDir = Directory(join(
  configHome.absolute.path,
  "quados",
));

final schemaFile = File(join(cacheHome.absolute.path, "schema.quad.json"))
  ..createSync(recursive: true);

final configFile = File(join(configDir.path, "config.yaml"))
  ..createSync(recursive: true);
