import { get } from 'node:https';
import { existsSync, createWriteStream } from 'node:fs';
import { join } from 'node:path';

import shortenVersion from '@utils/shortenVersion';

export default function downloadVersion(v: string = process.env.DEFAULT_VERSION): Promise<void> {
    const versionName = shortenVersion(v);

    const fileName = versionName + '.zip';
    const filePath = join(__dirname, 'versions', fileName);

    if (existsSync(filePath)) return Promise.resolve();

    return new Promise((resolve, reject) => {
        get(process.env.URL_TEMPLATE.replace(/\{version\}/, versionName),

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