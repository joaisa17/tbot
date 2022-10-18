import 'dotenv/config';
import '@/env';

import { platform } from 'os';
import { connect } from '@mongoose';

import chalk from 'chalk';

if (platform() !== 'linux') console.warn(chalk.rgb(255, 255, 0)(
    'This application is not running in a linux environment. Servers will not be able to launch!'
));

connect().then(() => {
    import('@/client');
});