import chalk from 'chalk';
import { default as _mongoose } from 'mongoose';

let mongoose: _mongoose.Mongoose;

const {
    MONGO_HOST,
    MONGO_PORT,
    MONGO_DBNAME,
    
    MONGO_USERNAME,
    MONGO_PASSWORD,
    MONGO_AUTHSOURCE
} = process.env;

const connectionURI = `mongodb://${MONGO_HOST}:${MONGO_PORT}/${MONGO_DBNAME}`;

export async function connect() {
    const client = await _mongoose.connect(connectionURI, {
        authSource: MONGO_AUTHSOURCE,

        auth: {
            username: MONGO_USERNAME,
            password: MONGO_PASSWORD
        }
    });

    console.log(chalk.green(`Connected to MongoDB at ${connectionURI}`));

    return client;
}

export default async function run(fn: (client: _mongoose.Mongoose) => void) {
    mongoose ??= await connect();
    fn(mongoose);
}