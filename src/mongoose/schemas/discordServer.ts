import { model, Schema } from 'mongoose';
import { IDiscordServer } from '@customTypes';

const discordServerSchema = new Schema<IDiscordServer>({
    guildId: { type: 'string', required: true, unique: true },

    servers: [{
        type: {
            id: { type: 'string', required: true },
            version: { type: 'string', default: process.env.DEFAULT_VERSION },

            ownerId: { type: 'string', required: true },
            admins: ['string'],

            port: { type: 'number', required: true, unique: true },
            password: 'string',
            
            worldname: 'string',
            seed: 'string',
            difficulty: 'string'
        },
        
        required: true,
        _id: false
    }]
}, { timestamps: true });

const discordServer = model<IDiscordServer>('discordServer', discordServerSchema);
export default discordServer;