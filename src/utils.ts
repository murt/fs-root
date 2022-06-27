import path from "path";

import { PathParamType } from "./types";

/**
* Gets the absolute path of the re-rooted child path. This path is then used for all future
* comparisons as it outputs a string.
*/
export const absPath = (rootPath: string, childPath: PathParamType): string => {
    return path.join(rootPath, childPath.toString());
};

/**
* Confirm that the provided path is a child of the root path.
*/
export const isChildPath = (rootPath: string, absChildPath: string): boolean => {
    if (absChildPath === rootPath) {
        return true;
    } else if (!path.relative(rootPath, absChildPath).startsWith("..")) {
        return true;
    } else {
        return false;
    }
};

export const confirmPath = (rootPath: string, childPath: PathParamType): string => {
    const absChildPath = absPath(rootPath, childPath);
    if (isChildPath(rootPath, absChildPath)) {
        return absChildPath;
    } else {
        const err = new Error(`no such file or directory, open '${childPath}'`);
        (err as any).code = "ENOENT";
        (err as any).errno = -2;
        (err as any).syscall = "open";
        throw err;
    }
}