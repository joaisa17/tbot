import { join } from 'node:path';
import AdmZip from 'adm-zip';

import { versionsDir } from '@terraria';

export default function extractVersion(v: string): Promise<void> {
    const versionPath = join(versionsDir, v);
    const fileName = versionPath + '.zip';

    return new Promise(resolve => {
        const zip = new AdmZip(fileName);

        zip.extractEntryTo(v + '/Linux/', versionPath, false, false, true);
        resolve();
    });
}