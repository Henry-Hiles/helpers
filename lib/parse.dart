import 'package:models/package.dart';

Map<String, Package> parseList(String output) =>
    Map.fromEntries(output.split("\n").where((line) => line.isNotEmpty).map(
      (line) {
        final [key, value, commit, origin] = line.split("\t");
        final normalizedKey = normalizeString(key);

        return MapEntry(
          normalizedKey,
          Package(
            id: value,
            name: normalizedKey,
            commit: commit,
            origin: origin,
          ),
        );
      },
    ));

String normalizeString(String input) {
  if (input.isEmpty) return "";
  final chars = input.split("");

  if (chars[1] == chars[1].toLowerCase()) chars[0] = chars[0].toLowerCase();

  for (var i = 1; i < chars.length; i++) {
    if (chars[i - 1] == " " || chars[i - 1] == "-") {
      chars[i] = chars[i].toUpperCase();
    }
  }

  return chars.join("").replaceAll(RegExp(r"\W"), "");
}
