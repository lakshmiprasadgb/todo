import React, { useEffect } from "react";
import { connect } from "react-redux";
import { fetchTodoCategory, addTodoCategory } from "./action";
import { get as lodashGet } from "lodash";
import TodoCategoryAdd from "./todo-category-add";
import AddCircleIcon from "@material-ui/icons/AddCircle";

const TodoCategory = ({
  userID,
  todoCategory,
  fetchTodoCategory,
  addTodoCategory,
}) => {
  const [shoAddCategoryModal, setShoAddCategoryModal] = React.useState(false);
  useEffect(() => {
    fetchTodoCategory(userID);
  }, []);

  const handleShowCategoryModal = () => {
    setShoAddCategoryModal(true);
  };

  const handleHideCategoryModal = () => {
    setShoAddCategoryModal(false);
  };
  const addCategory = (data) => {
    addTodoCategory(data, userID);
    setShoAddCategoryModal(false);
  };
  return (
    <div className="todoCategoryWrap">
      <TodoCategoryAdd
        isOpen={shoAddCategoryModal}
        closeModal={handleHideCategoryModal}
        add={addCategory}
      />
      <div className="todoCategoryHeader">
        <h3 className="categoryList__heading">Category</h3>
        <button
          className="gradientButton categoryList__addButton"
          onClick={handleShowCategoryModal}
        >
          Add category
        </button>
      </div>
      <div className="todoCategoryList">
        {todoCategory.length === 0 && <p>No category found</p>}
        {todoCategory.length != 0 &&
          todoCategory.map((category, index) => {
            return (
              <div className="categoryList" key={index}>
                <span
                  style={{ backgroundColor: category.color }}
                  className="categoryList__circle"
                ></span>
                <p className="categoryList__name">{category.name}</p>
              </div>
            );
          })}
      </div>
    </div>
  );
};

const MapStateToProps = (state) => {
  const userID = lodashGet(state, ["loggedUser", "entities", "user_id"], null);
  const todoCategory = lodashGet(
    state,
    ["todo", "entities", "todoCategory"],
    []
  );
  const todoCategoryError = lodashGet(
    state,
    ["todo", "error", "todoCategory"],
    []
  );
  return {
    userID,
    todoCategory,
    todoCategoryError,
  };
};
export default connect(MapStateToProps, { fetchTodoCategory, addTodoCategory })(
  TodoCategory
);
