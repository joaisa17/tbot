import chalk from 'chalk';

const required: string[] = [
    'CLIENT_ID',
    'TOKEN',

    'MONGO_USERNAME',
    'MONGO_PASSWORD',
    
    'MONGO_HOST',
    'MONGO_PORT',

    'MONGO_DBNAME',
    'MONGO_AUTHSOURCE',

    'DEFAULT_VERSION',
    'URL_TEMPLATE',
    
    'ERROR_EMBED_TITLE_TEMPLATE'
];

const missingKeys: string[] = [];
required.forEach(k => process.env[k] === undefined && missingKeys.push(k));

if (missingKeys.length) throw new Error(chalk.red(`.env config is missing the values: ${
    missingKeys.map(k => `'${k}'`).join(' ')
}. Check README.md for more information on how to add these`), { cause: '.env config error' });

if (process.env.ERROR_EMBED_TITLE_TEMPLATE.split('|').length !== 2) throw new Error(
    '.env config parameter ERROR_EMBED_TITLE_TEMPLATE is incorrectly formatted. Check README.md for more information'
)