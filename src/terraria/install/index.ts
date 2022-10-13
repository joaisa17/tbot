import { fileExists, dirExists, createDirIfMissing } from '@utils/fs';

import { join } from 'node:path';

import downloadVersion from './download';
import extractVersion from './extract';

import { versionsDir } from '@terraria';
import shortenVersion from '@utils/shortenVersion';

const defaultVersion: string = process.env.DEFAULT_VERSION;

export async function versionIsInstalled(v: string = defaultVersion) {
    return await dirExists(join(versionsDir, shortenVersion(v)));
}


export default async function installVersion(v: string = defaultVersion) {
    await createDirIfMissing(versionsDir);
    
    if (await versionIsInstalled(v)) return;

    const versionName = shortenVersion(v);
    const versionFile = join(versionsDir, versionName + '.zip');

    const versionExists = await fileExists(versionFile);
    if (!versionExists) await downloadVersion(versionName);

    await extractVersion(versionName);
}