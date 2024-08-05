import "dart:io";
import "package:path/path.dart";
import "package:xdg_directories/xdg_directories.dart";

Directory getConfigDir() => Directory(join(
      configHome.absolute.path,
      "quados",
    ));

File getSchemaFile() => File(join(cacheHome.absolute.path, "packages.lock"))
  ..createSync(recursive: true);

File getConfigFile() =>
    File(join(getConfigDir().path, "config.dart"))..createSync(recursive: true);
