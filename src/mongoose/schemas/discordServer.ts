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
            
            config: {
                type: {
                    port: { type: 'number', required: true, unique: true },
                    autocreate: { type: 'number', default: 2 },
                    difficulty: { type: 'number', default: 0 },

                    seed: 'string',
                    worldname: 'string',
                    maxplayers: 'number',
                    password: 'string',
                    motd: 'string',
                    secure: 'number',
                    language: 'string',
                    upnp: 'number',
                    npcstream: 'number',
                    priority: 'number',

                    journeypermission_time_setfrozen: 'number',
                    journeypermission_time_setdawn: 'number',
                    journeypermission_time_setnoon: 'number',
                    journeypermission_time_setdusk: 'number',
                    journeypermission_time_setmidnight: 'number',
                    journeypermission_godmode: 'number',
                    journeypermission_wind_setstrength: 'number',
                    journeypermission_rain_setstrength: 'number',
                    journeypermission_time_setspeed: 'number',
                    journeypermission_rain_setfrozen: 'number',
                    journeypermission_wind_setfrozen: 'number',
                    journeypermission_increaseplacementrange: 'number',
                    journeypermission_setdifficulty: 'number',
                    journeypermission_biomespread_setfrozen: 'number',
                    journeypermission_setspawnrate: 'number'
                },

                required: true
            }
        },
        
        required: true,
        _id: false
    }]
}, { timestamps: true, strict: true });

const discordServer = model<IDiscordServer>('discordServer', discordServerSchema);
export default discordServer;