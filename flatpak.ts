import chalk from "chalk"
import { execAsync } from "./cli"
import { homedir } from "os"
import { writeFile } from "fs/promises"
import { unlink, join } from "fs/promises"
import parseList from "./parseList"

const getInstalled = async () =>
    (await flatpakExec("list --app --columns application"))
        .split("\n")
        .filter((line) => line.length) ?? []

export const install = async (config: Config) => {
    const installedFlatpaks = await getInstalled()
    const pkgsToInstall = config.pkgs.filter(
        (pkg) => !installedFlatpaks.includes(pkg.id)
    )

    if (pkgsToInstall.length) {
        await flatpakExecNoninteractive(
            `install ${pkgsToInstall.map((pkg) => pkg.id).join(" ")}`
        )

        for (const pkg of pkgsToInstall) {
            const toWrite = `#!/usr/bin/env bash\nexec flatpak run ${pkg.id} "$@"`
            await writeFile(join(homedir(), ".local", "bin", pkg.name), toWrite, { mode: 0o755 })
        }
    }
}

export const uninstall = async (config: Config) => {
    const installedFlatpaks = await getInstalled()
    const idsToUninstall = installedFlatpaks.filter(
        (id) =>
            id != "com.henryhiles.quados.Quad" &&
            !config.pkgs.find((pkg) => pkg.id == id)
    )

    const packagesToUninstall = parseList(
        await execAsync(
            `flatpak remote-ls --system --columns=name,application,commit,origin | grep -E "${idsToUninstall.join(
                "|"
            )}"`
        )
    )

    if (Object.keys(packagesToUninstall).length) {
        await flatpakExecNoninteractive(
            `uninstall ${Object.values(packagesToUninstall)
                .map((pkg) => pkg.id)
                .join(" ")}`
        )

        for (const pkg in packagesToUninstall) {
            await unlink(join(homedir(), ".local", "bin", packagesToUninstall[pkg].name))
        }
    }
}

export const upgrade = async (config: Config) => {
    if (config.pkgs.length) {
        try {
            const commands = await Promise.all(
                config.pkgs.map(async (pkg) => {
                    const commit = (
                        await execAsync(
                            `flatpak remote-info --log ${pkg.origin} ${pkg.id} --system | grep 'Commit: ${pkg.commit}' | sed 's/^.*: //'`
                        )
                    ).replace("\n", "")

                    if (!commit)
                        throw chalk.red.bold("Invalid commit provided!")

                    return `flatpak update --system --noninteractive ${pkg.id} --commit ${commit}`
                })
            )

            const mask = `flatpak mask "*"`

            await execAsync(
                `pkexec /usr/bin/env bash -c "${mask} --remove; ${commands.join(
                    " && "
                )}; ${mask}"`
            )
        } catch (error) {
            if (!error.includes("No current masked pattern matching *"))
                throw error
        }
    }
}

export const flatpakExecNoninteractive = (cmd: string) =>
    flatpakExec(`${cmd} --noninteractive`)

export const flatpakExec = (cmd: string) => execAsync(`flatpak ${cmd} --system`)
