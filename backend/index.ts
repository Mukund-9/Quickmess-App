import { connnectDB } from "./src/config/databases";
import app from "./src/app";

const PORT=process.env.PORT||3000;
connnectDB().then(()=>{
    app.listen(PORT , ()=>{
        console.log("Server is running");
    });
});