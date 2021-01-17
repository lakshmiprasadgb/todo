const queryFactory = {
  createUser:
    "INSERT INTO users(firstname,lastname,email,password) values ($1,$2,$3,$4);",
  checkUser: "SELECT password,id, firstname FROM users where email = $1",
  getUserDetails:
    "SELECT id,firstname,lastname,email FROM users where email = $1",
  getCategory: "SELECT * FROM category WHERE user_id = $1",
  getCategoryDetails: "SELECT * FROM category WHERE id = $1",
  addCategory:
    "INSERT INTO category(user_id , name,color) values ($1,$2,$3) RETURNING *",
  removeCategory:
    "DELETE FROM category WHERE id = $1 AND user_id = $2 RETURNING name",
  getTodo: `SELECT t.id,title,description,category_id,iscompleted,c.name AS "categoryname" ,color,created_at
    FROM todo_list AS t JOIN category AS c ON t.category_id = c.id
    WHERE t.user_id = $1 ORDER BY created_at desc`,
  addTodo:
    "INSERT INTO todo_list(title,description,user_id,category_id) SELECT $1,$2,$3,$4 WHERE EXISTS (SELECT 1 FROM category WHERE id = $4) RETURNING *",
  updateTodo:
    "UPDATE todo_list SET title = $1,description = $2,user_id = $3,category_id = $4, modified_at = CURRENT_TIMESTAMP WHERE id = $5 RETURNING *",
  updateStatusOfTodo:
    "UPDATE todo_list SET isCompleted = NOT isCompleted WHERE id = $1 AND user_id = $2 RETURNING isCompleted",
  removeTodo:
    "DELETE FROM todo_list WHERE id = $1 AND user_id = $2 RETURNING id",
};

module.exports = queryFactory;
