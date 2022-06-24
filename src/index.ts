import fs from "fs";
import path from "path";

type PathParamType = string | Buffer | URL;

const pathIsChild = (rootPath: PathParamType, childPath: PathParamType): boolean => {
    return false;
};

/**
 * Creates a new root FS scoped to the provided directory.
 */
export default function fsRoot<T extends typeof fs = typeof fs>(rootDir: string, fsBase: T = fs as T): T {
    // Absolute path to the new root directory
    const absRootDir = path.resolve(rootDir);

    // List of fs or fs-extra API keys that take a path (string, Buffer, URL) etc... as their first parameter.
    const fsApiKeys1 = [
        "access",
        "accessSync",
        "appendFile",
        "appendFileSync",
        "chmod",
        "chmodSync",
        "chown",
        "chownSync",
        "createReadStream",
        "createWriteStream",
        "exists",
        "existsSync",
        "lchmod",
        "lchmodSync",
        "lchown",
        "lchownSync",
        "lutimes",
        "lutimesSync",
        "lstat",
        "lstatSync",
        "mkdir",
        "mkdirSync",
        "mkdtemp",
        "mkdtempSync",
        "open",
        "openSync",
        "opendir",
        "opendirSync",
        "readdir",
        "readdirSync",
        "readFile",
        "readFileSync",
        "readlink",
        "readlinkSync",
        "realpath",
        "realpathSync",
        "rmdir",
        "rmdirSync",
        "rm",
        "rmSync",
        "stat",
        "statSync",
        "truncate",
        "truncateSync",
        "unlink",
        "unlinkSync",
        "unwatchFile",
        "utimes",
        "utimesSync",
        "watch",
        "watchFile",
        "writeFile",
        "writeFileSync",
    ];

    // List of fs or fs-extra API keys that take two paths (string, Buffer, URL) etc... as their first
    // two parameters
    const fsApiKeys2 = [
        "copyFile",
        "copyFileSync",
        "cp",
        "cpSync",
        "link",
        "linkSync",
        "rename",
        "renameSync",
        "symlink",
        "symlinkSync",
    ];

    // New fs namespace
    return Object.create({
        // Create new stubs for each API group
        // Single parameter
        ...fsApiKeys1.reduce(
            (prev, cur) => ({
                ...prev,
                ...(Object.prototype.hasOwnProperty.call(fsBase, cur)
                    ? {
                          [cur]: (p: PathParamType, ...args: any) => {
                              return (fsBase[cur as keyof T] as any).call(fsBase, p, ...args);
                          },
                      }
                    : undefined),
            }),
            {}
        ),
        // Two parameter
    }) as T;
}
