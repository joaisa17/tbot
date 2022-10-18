# discord-terraria-bot
A Discord bot to manage your Terraria server, designed to run in a linux environment.

## Requirements
- A Linux system or [docker](https://docker.com)
- [Node.js](https://nodejs.org)
- A [MongoDB](https://mongodb.com) service
- A registered [Discord Bot Application](https://discord.com/developers/applications)

---

## .env config
The application is bootstrapped with a list of environment variables to speed up configuration. Some have suggested values, but they all must be specified in a file named `.env` in the application's root folder. Use the [.env template](.env.template) as an example.

### Discord API
- `CLIENT_ID` - Your Discord Application's ID
- `TOKEN` - Your Discord Bot Token

### MongoDB
- `MONGO_USERNAME` - Username to your MongoDB Service
- `MONGO_PASSWORD` - Password to your MongoDB Service

- `MONGO_HOST` - The address of your MongoDB Service host
- `MONGO_PORT` - The port associated with your MongoDB Service host (`27017`)

- `MONGO_DBNAME` - The database name for the application to use (`tbot`)
- `MONGO_AUTHSOURCE` - The database name to log in with (`admin`)

### Terraria Config
- `DEFAULT_VERSION` - The default Terraria version to use (`1.4.4.5`)
- `URL_TEMPLATE` - The URL template to download Terraria Dedicated Server versions from (`https://terraria.org/api/download/pc-dedicated-server/terraria-server-{version}.zip`)
- `PORT_MIN` - The first port to host servers on
- `PORT_MAX` - The last port to host servers on

### Other
- `ERROR_EMBED_TITLE_TEMPLATE` - String template for when errors occur (`Error - {title}|Error`)

## Docker
If you're using Docker, it utilizes `PORT_MIN` and `PORT_MAX` from [.env](.env) when exposing ports.

Run `docker-compose` to build the application in Docker.