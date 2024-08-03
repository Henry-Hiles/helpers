import 'package:cli_spin/cli_spin.dart';

Future<T> spin<T>(String message, Future<T> future) async {
  final spinner = CliSpin(text: message).start();
  try {
    final result = await future;
    spinner.success();
    return result;
  } catch (error, stack) {
    spinner.fail("$error\n\n$stack");
    rethrow;
  }
}
