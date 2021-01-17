const path = require("path");
const query = require(path.join(__dirname, "../dao/query-factory"));
const db = require(path.join(__dirname, "../dao/db"));

const getTodo = async (req, res) => {
  const data = [req.params.user_id];
  try {
    const result = await db(query.getTodo, data);
    if (result.rows.length > 0) return res.status(200).send(result.rows);
    res.status(404).send("No record found");
  } catch (ex) {
    res.status(400).send("Error getting todo list");
  }
};

const addTodo = async (req, res) => {
  const { title, description, user_id, category_id } = req.body;
  const data = [title, description, user_id, category_id];
  try {
    const result = await db(query.addTodo, data);
    const categoryDetails = await db(query.getCategoryDetails, [category_id]);
    const { color, name: categoryname } = categoryDetails.rows[0];
    if (result.rows.length > 0) {
      const addedTodo = result.rows[0];
      addedTodo["color"] = color;
      addedTodo["categoryname"] = categoryname;
      return res.status(200).send([addedTodo]);
    }
    res.status(404).send("Error creating todo list");
  } catch (ex) {
    res.status(400).send("Error creating todo list");
  }
};

const updateTodo = async (req, res) => {
  const { title, description, user_id, category_id, todo_id } = req.body;
  const data = [title, description, user_id, category_id, todo_id];
  try {
    const result = await db(query.updateTodo, data);
    const categoryDetails = await db(query.getCategoryDetails, [category_id]);
    const { color, name: categoryname } = categoryDetails.rows[0];
    if (result.rows.length > 0) {
      const updateTodo = result.rows[0];
      updateTodo["color"] = color;
      updateTodo["categoryname"] = categoryname;
      return res.status(200).send([updateTodo]);
    }
    res.status(404).send("Error updating todo status");
  } catch (ex) {
    res.status(400).send("Error updating todo status");
  }
};

const updateTodoStatus = async (req, res) => {
  const { todo_id, user_id } = req.params;
  const data = [todo_id, user_id];
  try {
    const result = await db(query.updateStatusOfTodo, data);
    if (result.rows.length > 0)
      return res
        .status(200)
        .send({ id: todo_id, iscompleted: result.rows[0].iscompleted });
    res.status(404).send("Error updating todo status");
  } catch (ex) {
    res.status(400).send("Error updating todo status");
  }
};

const removeTodo = async (req, res) => {
  const { todo_id, user_id } = req.params;
  const data = [todo_id, user_id];
  try {
    const result = await db(query.removeTodo, data);
    if (result.rowCount > 0)
      return res.status(200).send("Todo removed successfully");
    res.status(404).send("No matching record found!");
  } catch (ex) {
    res.status(400).send("Error removing todo");
  }
};

module.exports = { getTodo, addTodo, updateTodo, updateTodoStatus, removeTodo };
