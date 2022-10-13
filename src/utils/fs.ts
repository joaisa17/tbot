import { stat, mkdir } from 'node:fs/promises';

export async function fileExists(path: string) {
    try {
        const fileStat = await stat(path);
        return fileStat.isFile();
    } catch {
        return false;
    }
}

export async function dirExists(path: string) {
    try {
        const dirStat = await stat(path);
        return dirStat.isDirectory();
    } catch {
        return false;
    }
}

export async function createDirIfMissing(path: string) {
    const exists = await dirExists(path);
    if (!exists) await mkdir(path);
}