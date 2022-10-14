import { Client, GatewayIntentBits } from 'discord.js';
import chalk from 'chalk';

import configureStructure from './structure';
import configureCommands from './commands';

const client = new Client({
    intents: GatewayIntentBits.Guilds
});

client.on('ready', async cli => {
    await configureStructure();
    configureCommands(cli);

    console.log(
        chalk.bgGreen(`${cli.user.tag} is now online!`)
    );
})

client.login(process.env.TOKEN);

export default client;