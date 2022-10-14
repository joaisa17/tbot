import { SlashCommandStringOption } from 'discord.js';

const versionOption = () => new SlashCommandStringOption()
    .setName('version')
    .setDescription(`Sets the server's version. Defaults to ${process.env.DEFAULT_VERSION}`)

export default versionOption;