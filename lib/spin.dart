import 'dart:io';

import 'package:cli_spin/cli_spin.dart';
import 'package:io/ansi.dart';

Future<T> spin<T>(String message, Future<T> future) async {
  final spinner = CliSpin(text: message).start();
  try {
    final result = await future;
    spinner.success(green.wrap(message));
    return result;
  } catch (error, stack) {
    spinner.fail(red.wrap("An error occurred: $error\n\nStacktrace: $stack"));
    exit(0);
  }
}
