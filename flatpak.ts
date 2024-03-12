import { join } from "path"
import { execAsync } from "./cli"
import { homedir } from "os"

export const flatpakExecNoninteractive = (cmd: string) =>
    flatpakExec(`${cmd} --noninteractive`)

export const flatpakExec = (cmd: string) => execAsync(`flatpak ${cmd} --system`)

export const flatpakAddPermission = (
    id: string,
    file: string,
    readonly: boolean
) =>
    execAsync(
        `pkexec flatpak override --filesystem=${join(
            homedir(),
            ".var",
            "app",
            id,
            "config",
            file
        )}${readonly ? ":ro" : ""} ${id} --system`
    )
