import { model, Schema } from 'mongoose';

export interface IDiscordServer {
    guildId: string;

    servers: {
        id: string;
        version: string;

        ownerId: string;
        admins: string[];
        
        // Config parameters
        port: number;
        password?: string;
        
        worldname?: string;
        seed?: string;
        difficulty?: number; // 0-3, where 0 is normal, and 3 is journey
    }[];
}

const discordServerSchema = new Schema<IDiscordServer>({
    guildId: { type: 'string', required: true, unique: true },

    servers: [{
        id: { type: 'string', required: true },
        version: { type: 'string' },

        ownerId: 'string',
        admins: ['string'],

        port: { type: 'number', required: true, unique: true },
        password: 'string',
        
        worldname: 'string',
        seed: 'string',
        difficulty: 'number'
    }]
});

const discordServer = model<IDiscordServer>('discordServer', discordServerSchema);
export default discordServer;