import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { GithubPicker } from "react-color";
import { GoButton, CancelButton } from "./../util/buttons";

export default function TodoCategoryAdd({ isOpen, closeModal, add }) {
  const [name, setName] = useState("");
  const [color, setColor] = useState("#fef3bd");
  const [formError, setFormError] = useState({});
  const handleChange = ({ target }) => {
    setName(target.value);
  };
  const handleColorChange = (color) => {
    setColor(color.hex);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const error = validateSubmit();
    if (error !== null) {
      setFormError(error);
      return;
    }
    add({ name, color });
    clearForm();
  };
  const clearForm = () => {
    setName("");
    setColor("#fef3bd");
  };
  const handleDialogClose = () => {
    closeModal();
    clearForm();
  };

  const validateSubmit = () => {
    const error = {};
    if (name.trim() === "") error["name"] = "Name is mandatory";
    if (color.trim() === "") error["color"] = "Color is mandatory";
    return Object.keys(error).length === 0 ? null : error;
  };

  const validateProperty = ({ name, value }) => {
    if (value.trim() === "")
      return `${name.charAt(0).toUpperCase() + name.slice(1)} is mandatory`;
  };

  return (
    <div>
      <Dialog
        open={isOpen}
        onClose={handleDialogClose}
        aria-labelledby="form-dialog-title"
        className="todoCategoryModal"
        fullWidth={true}
        maxWidth={"xs"}
        PaperProps={{
          style: {
            backgroundColor: color,
            transition: "background-color .2s ease-in",
          },
        }}
      >
        <DialogTitle id="form-dialog-title">Add category</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Category name"
            type="text"
            value={name}
            onChange={handleChange}
            fullWidth
            variant="outlined"
          />
          <p>Pick category color</p>
          <GithubPicker color={color} onChangeComplete={handleColorChange} />
        </DialogContent>
        <DialogActions>
          <CancelButton
            variant="contained"
            onClick={closeModal}
            color="primary"
          >
            Cancel
          </CancelButton>
          <GoButton variant="contained" onClick={handleSubmit} color="primary">
            Add
          </GoButton>
        </DialogActions>
      </Dialog>
    </div>
  );
}
