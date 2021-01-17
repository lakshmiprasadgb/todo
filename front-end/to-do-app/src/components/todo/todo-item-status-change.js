import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import CheckBoxOutlineBlankOutlinedIcon from "@material-ui/icons/CheckBoxOutlineBlankOutlined";
import CheckBoxOutlinedIcon from "@material-ui/icons/CheckBoxOutlined";
import { withStyles } from "@material-ui/core/styles";

const CheckBoxOutlinedIconCustomColor = withStyles({
  root: {
    color: "#000",
    "&$checked": {
      color: "#000",
    },
  },
})((props) => <CheckBoxOutlinedIcon color="default" {...props} />);

const TodoItemStatusChange = ({ todoId, done, updateStatus }) => {
  return (
    <>
      <FormControlLabel
        classes={{ root: "todoStatusChangeWrap" }}
        control={
          <Checkbox
            icon={<CheckBoxOutlineBlankOutlinedIcon />}
            checkedIcon={<CheckBoxOutlinedIconCustomColor />}
            name="todoStatus"
            checked={done}
            onChange={() => {
              updateStatus(todoId);
            }}
          />
        }
        label="Done"
      />
    </>
  );
};

export default TodoItemStatusChange;
