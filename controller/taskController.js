const ABI = require("./../ABI.json");
const { Web3 } = require("web3");

const web3 = new Web3(
    "https://fragrant-soft-patina.ethereum-sepolia.discover.quiknode.pro/35baacd6043cfdf4249c81cdd9e2cb9c7aceac2a/"
);
const contractAddress = "0x0E23FFDb4B7C4Af3dA5B824ED5423f310e3D3491";
const contract = new web3.eth.Contract(ABI, contractAddress);

exports.viewOneTask = async (req, res) => {
    try {
        const { taskId } = req.params;

        const task = await contract.methods.viewTask(taskId).call();

        console.log(task);
        const { id, name, date } = task;
        const numId = Number(id);
        const taskObj = {
            numId,
            name,
            date,
        };
        console.log();

        res.status(200).json({
            status: 200,
            taskObj,
            message: "Id exist",
        });
    } catch (err) {
        res.status(404).json({
            status: 404,
            message: "Task Id does not exist ",
        });
        console.log("-----------00", err);
    }
};

exports.viewAllTask = async (req, res) => {
    try {
        let data = [];
        const tasks = await contract.methods.allTask().call();

        for (let i = 0; i < tasks.length; i++) {
            let { id, name, date } = tasks[i];
            let numId = Number(id);
            let taskObj = {
                numId,
                name,
                date,
            };
            data.push(taskObj);
        }

        if (data.length == 0) {
            res.status(404).json({
                status: 200,
                message: "data does not exist",
            });
        }

        res.status(200).json({
            status: 200,
            TotalLength: data.length,
            tasksList: data,
            message: "Task exist",
        });
    } catch (err) {
        res.status(500).json({
            status: 500,
            message: "Task Id does not exist ",
        });
        console.log("-----------00", err);
    }
};

const dateclashCheck = async (taskDate) => {
    const tasks = await contract.methods.allTask().call();

    const foundTask = tasks.find((task) => task.date === taskDate);

    if (foundTask) {
        return foundTask.name;
    }
    return "No Task Found";
};

exports.CreateTask = async (req, res) => {
    const { taskDate } = req.body;
    const task = await dateclashCheck(taskDate);

    try {
        if (task === "No Task Found") {
            res.status(200).json({
                status: 200,
                message: "Task can be added",
            });
        } else {
            res.status(409).json({
                status: 409,
                message: "Date clash:Task cannot be added",
            });
        }
    } catch (err) {
        console.log(err);
    }
};

exports.UpdateTask = async (req, res) => {
    const { taskDate } = req.body;
    const task = await dateclashCheck(taskDate);

    try {
        if (task === "No Task Found") {
            res.status(200).json({
                status: 200,
                message: "Task can be updated",
            });
        } else {
            res.status(409).json({
                status: 409,
                message: "Date clash:Task cannot be updated",
            });
        }
    } catch (err) {
        console.log(err);
    }
};

exports.DeleteTask = async (req, res) => {
    const { id } = req.params;

    try {
        const checkId = await contract.methods.allTask().call();

        if (checkId.length >= id) {
            res.status(200).json({
                status: 200,
                message: "ready to delete",
            });
        } else {
            res.status(403).json({
                status: 403,
                message: "this id does't exiest",
            });
        }
    } catch (err) {
        console.log(err);
    }
};
