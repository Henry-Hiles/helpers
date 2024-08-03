import 'dart:io';
import 'package:fast_immutable_collections/fast_immutable_collections.dart';

Future<String> exec(String cmd, IList<String> args) async {
  final result = await Process.run(cmd, args.toList());

  if (result.stderr != null) throw result.stderr;
  return result.stdout;
}
