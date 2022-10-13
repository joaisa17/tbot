import { existsSync } from 'node:fs';

import { join } from 'node:path';
import AdmZip from 'adm-zip';

import shortenVersion from '@utils/shortenVersion';

const versionsDir = join(__dirname, 'versions');

export default function extractVersion(version: string): Promise<void> {
    const versionName = shortenVersion(version);
    const versionPath = join(versionsDir, versionName);

    const versionZip = versionPath + '.zip';

    if (existsSync(versionPath)) Promise.resolve();

    return new Promise(resolve => {
        const zip = new AdmZip(
            versionZip
        );

        zip.extractEntryTo(versionName + '/Linux/', versionPath, false, false, true);
        resolve();
    });
}