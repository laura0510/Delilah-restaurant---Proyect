//libraries
const express = require("express");
const app = express();

//middlewares
app.use(express.json());

//settings
app.set("port", 3000);
app.set("json spaces", 2);

//routes 
app.use("/api/usuarios", require("./routes/usuarios"));


//server
app.listen(app.get("port"), () => {
	console.log("servidor escuchando en puerto: " + app.get("port"));
});

