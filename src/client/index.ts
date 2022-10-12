import { Client, GatewayIntentBits } from 'discord.js';
import chalk from 'chalk';

import configureCommandStructure from './commands/structure';
import configureCommands from './commands';

const client = new Client({
    intents: GatewayIntentBits.Guilds
});

client.on('ready', async cli => {
    await configureCommandStructure(cli);
    configureCommands(cli);

    console.log(
        chalk.green(`${cli.user.tag} is now online`)
    );
})

client.login(process.env.TOKEN);

export default client;