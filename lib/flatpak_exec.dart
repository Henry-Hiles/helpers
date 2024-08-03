import 'dart:io';
import 'package:fast_immutable_collections/fast_immutable_collections.dart';

abstract class Flatpak {
  static Future<String> execNonInteractive(String cmd, IList<String> args) =>
      exec(cmd, args.add("--noninteractive"));

  static Future<String> exec(String cmd, IList<String> args) async =>
      _exec("flatpak $cmd", args.add("--system"));
}

Future<String> _exec(String cmd, IList<String> args) async {
  final result = await Process.run(cmd, args.toList());

  if (result.stderr != null) throw result.stderr;
  return result.stdout;
}
