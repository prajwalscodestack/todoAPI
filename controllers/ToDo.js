const ToDo=require("../modals/ToDo");
const { validationResult } = require("express-validator");

//get ToDo by Id
exports.getTodoById = (req, res, next, id) => {
  ToDo.findById(id)
    .exec((err, todo) => {
      if (err) {
        return res.status(400).json({
          error: "Product not found"
        });
      }
      req.todo = todo;
      next();
    });
};

//create todo
exports.createTodo = (req, res) => {
    const errors = validationResult(req);
  
    if (!errors.isEmpty()) {
      return res.status(422).json({
        error: errors.array()[0].msg
      });
    }
  
    const todo = new ToDo(req.body);
    todo.save((err, todo) => {
      if (err) {
        return res.status(400).json({
          err: "NOT able to save Your todo DB"
        });
      }
      res.json(todo);
    });
  };

//get all todos of user  
exports.getAllTask=(req,res)=>{
  ToDo.find({user:req.profile._id})
  .exec((err, todos) => {
    if (err) {
      return res.status(400).json({
        error: "No todo found in DB"
      });
    }
    res.json(todos);
  });
}

//update todo
exports.updateTodo=(req,res)=>{
  ToDo.findByIdAndUpdate(
    { _id: req.todo._id },
    { $set: req.body },
    { new: true, useFindAndModify: false },
    (err, todo) => {
      if (err) {
        return res.status(400).json({
          error: "You are not authorized to update this todo"
        });
      }
     
      res.json(todo);
    }
  );
}
//update todo status
exports.updateStatus=(req,res)=>{
    ToDo.updateOne(
      {_id:req.todo._id},
      {$set:{status:req.body.status}},
      (err,todo)=>{
        if(err){
          return res.status(400).json({
            error:"Cannot update todo status"
          })
        }
        res.json(todo);
      }
    )
  }

  //deleting todo
  exports.deleteTodo=(req,res)=>{
    let todo=req.todo;
    todo.remove((err, deletedTodo) => {
      if (err) {
        return res.status(400).json({
          error: "Failed to delete the product"
        });
      }
      res.json({
        message: "Deletion was a success",
        deletedTodo
      });
    });
    
  }
