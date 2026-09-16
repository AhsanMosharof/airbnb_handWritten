const mongoose = require("mongoose");
const DB_PATH = "mongodb://ahsanhabiblimonahsan179_db_user:BfvnxLzN7onMfoo0@ac-hofzifj-shard-00-00.2yj768z.mongodb.net:27017,ac-hofzifj-shard-00-01.2yj768z.mongodb.net:27017,ac-hofzifj-shard-00-02.2yj768z.mongodb.net:27017/?ssl=true&replicaSet=atlas-hofzifj-shard-0&authSource=admin&retryWrites=true&w=majority&appName=airbnb";

mongoose.connect(DB_PATH).then(() => {
    console.log("SUCCESS!");
    process.exit(0);
}).catch(err => {
    console.error("FAIL:", err.message);
    process.exit(1);
});
