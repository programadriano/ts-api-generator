import * as mongoose from "mongoose";

class Database {
    private DB_URI = 'mongodb://127.0.0.1:27017/tsapi';
    private DB_CONNECTION;

    constructor() { }

    createConnection() {
        mongoose.connect(this.DB_URI);
        this.logger(this.DB_URI);
    }

    logger(uri) {
        this.DB_CONNECTION = mongoose.connection;
        this.DB_CONNECTION.on('connected', () => console.log(`Moogose is connected in ${uri}`));
        this.DB_CONNECTION.on('error', error => console.error.bind(console, `Connection Error: ${error}`));
        this.DB_CONNECTION.on('disconnected', () => console.log(`Moogose is disconnected in ${uri}`));
    }

    closeConnection(message, callback) {
        this.DB_CONNECTION.close(() => {
            console.log(`Mongoose was desconeted by: ${message}`)
            callback();
        });
    }

}

export default Database;
