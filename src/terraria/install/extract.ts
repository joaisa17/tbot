import { join } from 'node:path';
import { chmod } from 'node:fs/promises';

import AdmZip from 'adm-zip';

import { versionsDir } from '@terraria';

export default async function extractVersion(v: string): Promise<void> {
    const versionPath = join(versionsDir, v);
    const fileName = versionPath + '.zip';

    const zip = new AdmZip(fileName);
    
    zip.extractEntryTo(v + '/Linux/', versionPath, false, false, true);
    await chmod(join(versionsDir, v, 'TerrariaServer.bin.x86_64'), 0o755);

    /*return new Promise((res, rej) => {
        zip.extractAllToAsync(versionsDir, false, true, async err => {
            if (err) rej(err);
            else {
                await chmod(join(serversDir, v, 'Linux', 'TerrariaServer.bin.x86_64'), 0o755);
                res();
            }
        });
    })*/
}