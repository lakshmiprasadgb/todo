const bcrypt = require("bcrypt");
const path = require("path");
const query = require(path.join(__dirname, "../dao/query-factory"));
const db = require(path.join(__dirname, "../dao/db"));

const userAuthenticate = async (req, res) => {
  const { email, password } = req.body;
  const data = [email];
  try {
    const result = await db(query.checkUser, data);
    if (result.rows.length === 0) {
      return res.status(404).send("User does not exist");
    }
    const { password: hashPassword, id, firstname } = result.rows[0];
    const isAuthenticated = await bcrypt.compare(password, hashPassword);
    if (isAuthenticated)
      return res
        .status(200)
        .send({ message: "Login success", email, id, firstname });
    return res.status(401).send("Invalid Email/Password");
  } catch (e) {
    res.status(400).send("Cannot authenticate user");
  }
};

const userCreate = async (req, res) => {
  const { firstname, lastname, email, password } = req.body;
  const hashPassword = await bcrypt.hash(password, 10);
  const data = [firstname, lastname, email, hashPassword];
  bcrypt.hash(password, 10, function (err, hash) {
    if (err) {
      throw err;
    }

    bcrypt.compare(password, hash, function (err, result) {
      if (err) {
        throw err;
      }
    });
  });
  try {
    await db(query.createUser, data);
    res.status(200).send("User created successfully");
  } catch (ex) {
    res.status(400).send("Error creating user");
  }
};

const userDetails = async (req, res) => {
  const { email } = req.params;
  try {
    const result = await db(query.getUserDetails, [email]);
    if (result.rows.length > 0) return res.status(200).send(result.rows[0]);
    res.status(404).send("User not found");
  } catch (e) {
    res.status(400).send("Error fetching user");
  }
};

module.exports = { userAuthenticate, userCreate, userDetails };
