const mongodb = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
dotenv.config({ path: path.join(process.cwd(), './Configuration/.env') });

//mongodb Connection.
mongodb.connect(process.env.MONGO_DB).then(() => console.log("Database Connected")).catch((error) => console.log(error))


module.export = { mongodb };