import { SlashCommandBuilder, SlashCommandStringOption, SlashCommandUserOption } from 'discord.js';

import targetId from '@utils/commandOptions/targetId';

/** Example: `/admin id: testserver action: grant user: @user` */
const adminCommand = new SlashCommandBuilder()
    .setName('admin')
    .setDescription('Contains a subset of permissions you can grant/revoke to other users')
    
    .addStringOption(targetId(true))

    .addStringOption(
        new SlashCommandStringOption()
            .setName('action')
            .setDescription('The type of action to perform')
            .setRequired(true)
            .setChoices(
                { name: 'grant', value: 'grant' },
                { name: 'revoke', value: 'revoke' }
            )
    )

    .addUserOption(
        new SlashCommandUserOption()
            .setName('user')
            .setDescription('Target user to modify permissions for')
            .setRequired(true)
    )


export default adminCommand;