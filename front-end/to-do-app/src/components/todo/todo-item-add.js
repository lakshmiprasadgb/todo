import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { makeStyles } from "@material-ui/core/styles";
import { get as lodashGet } from "lodash";
import { FormHelperText, InputLabel } from "@material-ui/core";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import CircularProgress from "@material-ui/core/CircularProgress";
import FormControl from "@material-ui/core/FormControl";
import { connect } from "react-redux";
import { GoButton, CancelButton } from "./../util/buttons";
import { addTodo, updateTodo } from "./action";

const defaultTodoForm = { title: "", description: "" };

function TodoItemAdd({
  isOpen,
  closeModal,
  addTodo,
  loading,
  todoCategory,
  userID,
  currentSelectedTodo,
  updateTodo,
}) {
  const [form, setForm] = useState(defaultTodoForm);
  const [formError, setFormError] = useState({});

  useEffect(() => {
    if (currentSelectedTodo) setForm(currentSelectedTodo);
  }, [currentSelectedTodo]);

  const handleInputChange = ({ target }) => {
    const { name, value } = target;
    const errors = { ...formError };
    const errorMessage = validateProperty(target);
    if (errorMessage) errors[name] = errorMessage;
    else delete errors[name];
    setFormError(errors);
    const loginForm = { ...form };
    loginForm[name] = value;
    setForm({ ...loginForm });
  };
  const handleCategorySelect = ({ target }) => {
    const { value } = target;
    const loginForm = { ...form };
    loginForm["category_id"] = value;
    setForm({ ...loginForm });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const error = validateSubmit(form);
    if (error !== null) {
      setFormError(error);
      return;
    }
    if (currentSelectedTodo) {
      updateTodo(form, userID);
    } else {
      addTodo(form, userID);
    }
    closeModal();
    clearForm();
  };
  const handleCloseDialog = () => {
    closeModal();
    clearForm();
  };
  const clearForm = () => {
    setForm(defaultTodoForm);
    setFormError({});
  };
  const validateSubmit = (form) => {
    const error = {};
    if (form["title"].trim() === "") error["title"] = "Title is mandatory";
    if (form["description"].trim() === "")
      error["description"] = "Description is mandatory";
    return Object.keys(error).length === 0 ? null : error;
  };

  const validateProperty = ({ name, value }) => {
    if (value.trim() === "")
      return `${name.charAt(0).toUpperCase() + name.slice(1)} is mandatory`;
  };

  const useStyles = makeStyles((theme) => ({
    formControl: {
      marginTop: "15px",
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  }));
  const classes = useStyles();
  return (
    <Dialog
      open={isOpen}
      onClose={handleCloseDialog}
      aria-labelledby="form-dialog-title"
      className="todoCategoryModal"
      fullWidth={true}
      maxWidth={"sm"}
    >
      <DialogTitle id="form-dialog-title">
        {currentSelectedTodo ? "UPDATE TODO" : "ADD TODO"}
      </DialogTitle>
      <DialogContent>
        <TextField
          id="outlined-full-width"
          label="Title"
          name="title"
          fullWidth
          margin="normal"
          value={form["title"]}
          onChange={handleInputChange}
          helperText={`${form["title"].length}/50`}
          InputLabelProps={{
            shrink: true,
          }}
          variant="outlined"
        />
        {formError["title"] && (
          <FormHelperText error>{formError["title"]}</FormHelperText>
        )}
        <TextField
          id="outlined-full-width"
          label="Description"
          fullWidth
          margin="normal"
          name="description"
          value={form["description"]}
          onChange={handleInputChange}
          helperText={`${form["description"].length}/200`}
          InputLabelProps={{
            shrink: true,
          }}
          variant="outlined"
        />
        {formError["description"] && (
          <FormHelperText error>{formError["description"]}</FormHelperText>
        )}
        <FormControl variant="outlined" className={classes.formControl}>
          <InputLabel id="demo-simple-select-helper-label">Age</InputLabel>
          <Select
            labelId="demo-simple-select-helper-label"
            id="demo-simple-select-helper"
            onChange={handleCategorySelect}
            name="category_id"
            value={form["category_id"]}
          >
            {todoCategory.map((option, index) => (
              <MenuItem key={index} value={option.id}>
                {option.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <CancelButton variant="contained" onClick={closeModal} color="primary">
          Cancel
        </CancelButton>
        <GoButton
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          startIcon={
            loading && <CircularProgress color="secondary" size={20} />
          }
        >
          {currentSelectedTodo ? "Update" : "Add"}
        </GoButton>
      </DialogActions>
    </Dialog>
  );
}

const MapStateToProps = (state) => {
  const loading = lodashGet(state, ["todo", "loaders", "todoItem"], false);
  const userID = lodashGet(state, ["loggedUser", "entities", "user_id"], null);
  const todoCategory = lodashGet(
    state,
    ["todo", "entities", "todoCategory"],
    []
  );
  return {
    loading,
    todoCategory,
    userID,
  };
};

export default connect(MapStateToProps, { addTodo, updateTodo })(TodoItemAdd);
