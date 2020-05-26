const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const {createTodo,getAllTask,updateTodo,getTodoById,updateStatus,deleteTodo} =require("../controllers/ToDo");
const {isSignedIn,isAuthenticated}=require("../controllers/Auth");
const {getUserById}=require("../controllers/User");

//params
router.param("userId", getUserById);
router.param("todoId",getTodoById);
//create toto route
router.post(
    "/createTodo",
    [
      check("title", "title should be at least 3 char").isLength({ min: 3 }),
      check("description", "description is required").isLength({min:3}),
    ],
    isSignedIn,
    createTodo
  );
//update todo route
router.put(
  "/todo/updateTodo/:todoId/:userId",
  [
    check("title", "title should be at least 3 char").isLength({ min: 3 }),
    check("description", "description is required").isLength({min:3}),
  ],
  isSignedIn,
  updateTodo
)  

//update status  
router.put(
  "/todo/updateStatus/:todoId/:userId",
  isSignedIn,
  updateStatus
)  


//get all task route
router.get(
  "/todo/getAllTask/:userId",
  isSignedIn,
  getAllTask
)

router.delete(
  "/todo/deleteTodo/:todoId/:userId",
  isSignedIn,
  deleteTodo
)
module.exports = router;
