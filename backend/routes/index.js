const routes = require("express").Router();
const path = require("path");
const userController = require(path.join(
  __dirname,
  "../controller/user-controller"
));
const todoCategoryController = require(path.join(
  __dirname,
  "../controller/todo-category"
));
const todoItemController = require(path.join(
  __dirname,
  "../controller/todo-item-controller"
));
const userDTO = require(path.join(__dirname, "../middleware/validate-user"));
const categoryDTO = require(path.join(
  __dirname,
  "../middleware/validate-todo-category"
));
const todoItemDTO = require(path.join(
  __dirname,
  "../middleware/validate-todo-item"
));

routes.post(
  "/user/authenticate",
  userDTO.validateUserAuthDTO,
  userController.userAuthenticate
);

routes.post("/user/create", userController.userCreate);

routes.get(
  "/user/get/:email",
  userDTO.validateUserGetDTO,
  userController.userDetails
);

routes.get(
  "/category/get/:user_id",
  categoryDTO.validateTodoCatoryGetDTO,
  todoCategoryController.getCategory
);

routes.post(
  "/category/add",
  categoryDTO.validateTodoCatoryAddDTO,
  todoCategoryController.addCategory
);

routes.post(
  "/category/remove",
  categoryDTO.validateTodoCatoryRemoveDTO,
  todoCategoryController.removeCategory
);

routes.get("/todo/get/:user_id", todoItemController.getTodo);

routes.post(
  "/todo/add",
  todoItemDTO.validateTodoAddDTO,
  todoItemController.addTodo
);

routes.post(
  "/todo/update",
  todoItemDTO.validateTodoUpdateDTO,
  todoItemController.updateTodo
);

routes.post(
  "/todo/update-status/:todo_id/:user_id",
  todoItemDTO.validateTodoUpdateStatusDTO,
  todoItemController.updateTodoStatus
);

routes.delete(
  "/todo/remove/:todo_id/:user_id",
  todoItemDTO.validateTodoRemoveDTO,
  todoItemController.removeTodo
);

module.exports = routes;
