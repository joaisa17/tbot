import { default as _mongoose } from 'mongoose';

let mongoose: _mongoose.Mongoose;

export async function connect() {
    const client = await _mongoose.connect(`mongodb://${process.env.MONGO_HOST}:${process.env.MONGO_PORT}/${process.env.MONGO_DBNAME}`, {
        authSource: process.env.MONGO_AUTHSOURCE,

        auth: {
            username: process.env.MONGO_USERNAME,
            password: process.env.MONGO_PASSWORD
        }
    });

    return client;
}

export default async function run(fn: (client: _mongoose.Mongoose) => void) {
    mongoose ??= await connect();
    fn(mongoose);
}