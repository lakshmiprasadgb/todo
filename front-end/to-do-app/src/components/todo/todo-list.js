import React, { useEffect } from "react";
import { connect } from "react-redux";
import { get as lodashGet } from "lodash";
import { fetchUserData } from "../redux-store/userActions";
import { fetchTodo, removeTodo, updateTodoStatus } from "./action";
import "./todo.css";
import TodoItemAdd from "./todo-item-add";
import TodoListMenu from "./todo-list-menu";
import TodoItemStatusChange from "./todo-item-status-change";
import dayjs from "dayjs";

const TodoList = ({
  fetchTodo,
  userID,
  todoList,
  removeTodo,
  updateTodoStatus,
  todoLoader,
}) => {
  useEffect(() => {
    fetchTodo(userID);
  }, []);
  const [showAddItemModal, setShoAddItemModal] = React.useState(false);
  const [currentEditTodo, setCurrentEditTodo] = React.useState(null);
  const handleShowItemModal = () => {
    setShoAddItemModal(true);
  };

  const handleHideItemModal = () => {
    setShoAddItemModal(false);
    setCurrentEditTodo(null);
  };
  const addItem = (data) => {
    setShoAddItemModal(false);
  };
  const updateItem = (todo) => {
    setCurrentEditTodo(todo);
    setShoAddItemModal(true);
  };
  const updateItemStatus = (todoId) => {
    updateTodoStatus(todoId, userID);
  };
  const handleTodoRemove = (todo) => {
    removeTodo(todo.id, userID);
  };
  if (!userID) return null;
  return (
    <div className="todoWrap">
      <div className="todo__header">
        <button onClick={handleShowItemModal} className="gradientButton">
          Add Todo
        </button>
      </div>
      <div className="todoItemsWrapper">
        <TodoItemAdd
          isOpen={showAddItemModal}
          closeModal={handleHideItemModal}
          add={addItem}
          currentSelectedTodo={currentEditTodo}
        />
        {todoList.map((todo, index) => {
          return (
            <div
              className="todoItem"
              key={index}
              style={{ backgroundColor: todo.color }}
            >
              <div className="todoItem__header alignedItemParallel">
                <h4
                  className={
                    todo.iscompleted
                      ? "todoItem__header--heading strikeThrough"
                      : "todoItem__header--heading"
                  }
                >
                  {todo.title}
                </h4>
                <TodoListMenu
                  handleDelete={handleTodoRemove}
                  handleUpdate={updateItem}
                  todoItem={todo}
                />
              </div>
              <p className={todo.iscompleted ? "strikeThrough" : ""}>
                {todo.description}
              </p>
              <div className="todoItem__footer alignedItemParallel">
                <p className="todoItem__footer--date">
                  {dayjs(todo.created_at).format("DD-MMM-YY")}
                </p>
                <TodoItemStatusChange
                  todoId={todo.id}
                  done={todo.iscompleted}
                  updateStatus={updateItemStatus}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const MapStateToProps = (state) => {
  const email = lodashGet(state, ["loggedUser", "entities", "email"], null);
  const userID = lodashGet(state, ["loggedUser", "entities", "user_id"], null);
  const todoList = lodashGet(state, ["todo", "entities", "todo"], []);
  const todoLoader = lodashGet(state, ["todo", "loaders", "todo"], false);
  return {
    email,
    userID,
    todoList,
    todoLoader,
  };
};
export default connect(MapStateToProps, {
  fetchUserData,
  fetchTodo,
  removeTodo,
  updateTodoStatus,
})(TodoList);
