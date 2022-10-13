import { join } from 'node:path';
import { chmod } from 'node:fs/promises';

import AdmZip from 'adm-zip';

import { versionsDir, serversDir } from '@terraria';

export default async function extractVersion(v: string): Promise<void> {
    const versionPath = join(versionsDir, v);
    const fileName = versionPath + '.zip';

    const zip = new AdmZip(fileName);
    
    return new Promise((res, rej) => {
        zip.extractAllToAsync(versionPath, false, true, async err => {
            if (err) rej(err);
            else {
                await chmod(join(serversDir, v, 'TerrariaServer.bin.86_64'), 0o755);
                res();
            }
        });
    })
    //zip.extractEntryTo(v + '/Linux/', versionPath, false, false, true);
}