import { PermissionFlagsBits, SlashCommandBuilder, SlashCommandStringOption } from 'discord.js';

import { targetIdOption, targetUserOption } from '@utils/commandOptions';

/** Example: `/admin id: testserver action: grant user: @user` */
const adminCommand = new SlashCommandBuilder()
    .setName('admin')
    .setDescription('Contains a subset of permissions you can grant/revoke to other users')
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
    
    .addStringOption(targetIdOption(true))
    .addUserOption(targetUserOption(true))

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

export default adminCommand;