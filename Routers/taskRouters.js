const express = require("express");
const router = express.Router();

const taskController = require("../controller/taskController");

router
  .route('/view-task/:taskId')
  .get(taskController.viewOneTask);

router
  .route('/viewAlltask')
  .get(taskController.viewAllTask)

router
  .route('/create-task')
  .post(taskController.CreateTask);

router
  .route('/update-task')
  .post(taskController.UpdateTask);

router
  .route('/delete-task/:id')
  .post(taskController.DeleteTask);


  module.exports = router;
