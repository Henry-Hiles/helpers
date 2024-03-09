import { ExecOptions, SpawnOptions, exec, spawn } from "child_process"
import { promisify } from "util"

export const spawnAsync = (
    cmd: string,
    options: SpawnOptions = {
        stdio: "inherit",
    }
): Promise<void> =>
    new Promise((resolve, reject) => {
        const cmdParts = cmd.split(" ")
        const cp = spawn(cmdParts[0], cmdParts.slice(1), options)

        cp.on("error", reject)
        cp.on("close", resolve)
    })

export const execAsync = async (
    cmd: string,
    options?: ExecOptions
): Promise<string> => {
    const { stdout, stderr } = await promisify(exec)(cmd, options)
    if (stderr) throw stderr
    return stdout as string
}
