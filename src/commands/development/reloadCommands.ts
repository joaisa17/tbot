import CommandHandler from '@customTypes/commands';
import configureStructure from '@/structure';

const reloadCommands: CommandHandler = async i => {
    await configureStructure(true);

    i.reply({
        content: 'Successfully reuploaded all slash commands! It may take a moment to appear in the server commands.',
        ephemeral: true
    });
};

export default reloadCommands;