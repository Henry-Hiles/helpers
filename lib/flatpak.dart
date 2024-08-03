import 'package:fast_immutable_collections/fast_immutable_collections.dart';
import "cli.dart" as cli;

abstract class Flatpak {
  static Future<String> execNonInteractive(String cmd, IList<String> args) =>
      exec(cmd, args.add("--noninteractive"));

  static Future<String> exec(String cmd, IList<String> args) async =>
      cli.exec("flatpak $cmd", args.add("--system"));
}
