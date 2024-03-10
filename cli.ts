import { ExecOptions, SpawnOptions, exec, spawn } from "child_process"
import { promisify } from "util"

export const spawnAsync = (
    cmd: string,
    options: SpawnOptions = {
        stdio: "inherit",
    }
): Promise<void> =>
    new Promise(async (resolve, reject) => {
        const cmdParts = cmd.split(" ")
        const splitCmd = [
            ...(await getCommand(cmdParts[0])).split(" "),
            ...cmdParts.slice(1),
        ]
        const cp = spawn(splitCmd[0], splitCmd.slice(1), options)

        cp.on("error", reject)
        cp.on("close", resolve)
    })

export const execAsync = async (
    cmd: string,
    options?: ExecOptions,
    skipCheck = false
): Promise<string> => {
    const splitCmd = cmd.split(" ")
    const { stdout, stderr } = await promisify(exec)(
        [
            skipCheck ? splitCmd[0] : await getCommand(splitCmd[0]),
            ...splitCmd.slice(1),
        ].join(" "),
        options
    )
    if (stderr) throw stderr
    return stdout as string
}

export const getCommand = async (native: string): Promise<string> => {
    try {
        await execAsync(`command -v ${native}`, undefined, true)
        return native
    } catch {
        return `flatpak-spawn --host ${native}`
    }
}
