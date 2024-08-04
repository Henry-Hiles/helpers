import 'package:fast_immutable_collections/fast_immutable_collections.dart';
import "cli.dart" as cli;

abstract class Flatpak {
  static Future<String> execNonInteractive(IList<String> args) =>
      exec(args.add("--noninteractive"));

  static Future<String> exec(IList<String> args) async =>
      cli.exec("flatpak", args.add("--system"));
}
