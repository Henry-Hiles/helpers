import { Package } from "@quados/models"

export const parseList = (output: string): { pkg: Package } =>
    output
        .split("\n")
        .filter((line) => line.length > 0)
        .reduce((result, line) => {
            const [key, value, commit, origin] = line.split("\t")
            let normalizedKey = normalizeString(key)

            result[normalizedKey] = Package.create({
                id: value,
                commit,
                origin,
                name: normalizedKey,
            })
            return result
        }, {} as { pkg: Package })

const normalizeString = (inputString: string): string => {
    let chars = inputString.split("")

    if (chars[1] == chars[1].toLowerCase()) chars[0] = chars[0].toLowerCase()

    for (let i = 1; i < chars.length; i++) {
        if (chars[i - 1] === " " || chars[i - 1] === "-") {
            chars[i] = chars[i].toUpperCase()
        }
    }

    return chars.join("").replace(/[\s'-]/g, "")
}
