import { get } from 'node:https';
import { createWriteStream } from 'node:fs';
import { join } from 'node:path';

import { versionsDir } from '@terraria';

export default function downloadVersion(v: string): Promise<void> {

    const fileName = v + '.zip';
    const filePath = join(versionsDir, fileName);

    return new Promise((resolve, reject) => {
        get(process.env.URL_TEMPLATE.replace(/\{version\}/, v),

        res => {
            if (res.statusCode !== 200) return reject('request returned a non 200 code status');

            const stream = createWriteStream(filePath);
            res.pipe(stream);

            stream.on('finish', () => {
                stream.close();
                resolve();
            });
            
            stream.on('error', reject);
        });
    });
}