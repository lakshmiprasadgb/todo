import { get as lodashGet } from "lodash";
import { connect } from "react-redux";
import TodoList from "./todo-list";
import TodoCategory from "./todo-category";
import LinearLoader from "./../util/linear-loader";

const Todo = ({ todoLoader }) => {
  return (
    <>
      <LinearLoader isLoading={todoLoader} />
      <div className={"todo"}>
        <TodoCategory />
        <TodoList />
      </div>
    </>
  );
};

const MapStateToProps = (state) => {
  const todoLoader = lodashGet(state, ["todo", "loaders", "todo"], false);
  return {
    todoLoader,
  };
};
export default connect(MapStateToProps, null)(Todo);
