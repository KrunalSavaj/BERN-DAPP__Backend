const express = require("express");
const cors = require("cors");

const taskRouter = require("./Routers/taskRouters");

const app = express();

app.use(cors());

app.use(express.json());


app.use("/api/ethereum", taskRouter);

app.listen(3000, () => {
    console.log("jay swaminarayan");
});
