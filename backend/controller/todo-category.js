const path = require("path");
const query = require(path.join(__dirname, "../dao/query-factory"));
const db = require(path.join(__dirname, "../dao/db"));

const getCategory = async (req, res) => {
  console.log(__dirname);

  const data = [req.params.user_id];
  try {
    const result = await db(query.getCategory, data);
    res.status(200).send(result.rows);
  } catch (ex) {
    res.status(400).send("Error getting category");
  }
};

const addCategory = async (req, res) => {
  const userID = req.body.user_id;
  const name = req.body.name;
  const color = req.body.color;
  const data = [userID, name, color];
  try {
    const result = await db(query.addCategory, data);
    if (result.rows.length > 0) return res.status(200).send(result.rows[0]);
    res.status(404).send("Error creating category");
  } catch (ex) {
    res.status(400).send("Error creating category");
  }
};

const removeCategory = async (req, res) => {
  const categoryID = req.body.category_id;
  const userID = req.body.user_id;
  const data = [categoryID, userID];
  try {
    const result = await db(query.removeCategory, data);
    if (result.rows.length > 0) return res.status(200).send(result.rows[0]);
    res.status(404).send("No matching record found");
  } catch (ex) {
    res.status(400).send("Error deleting category");
  }
};

module.exports = { getCategory, addCategory, removeCategory };
