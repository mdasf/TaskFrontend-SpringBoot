import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { createGoal, updateGoal } from "../features/goals/goalSlice";

function GoalForm({ isEdit, setIsEdit, editFormData, setEditFormData }) {
  const [text, setText] = useState("");
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState("high");
  const [dueDate, setDueDate] = useState("");

  const [error, setError] = useState("");

  // console.log(editFormData);

  useEffect(() => {
    // if (isEdit) {
    setText(editFormData?.text || "");
    setTitle(editFormData?.title || "");
    setPriority(editFormData?.priority || "");
    setDueDate(editFormData?.dueDate || "");
    // }
  }, [isEdit, editFormData]);

  const dispatch = useDispatch();

  const onSubmit = (e) => {
    e.preventDefault();
    let requiredFields = [];
    if (title === "") requiredFields.push("Title");
    if (text === "") requiredFields.push("Description");
    if (priority === "") requiredFields.push("Priority");
    if (dueDate === "") requiredFields.push("Due Date");

    if (requiredFields.length > 0) {
      const errorMsg = `Please fill ${requiredFields.join(", ")} fields.`;
      setError(errorMsg);
      return;
    }

    if (isEdit) {
      dispatch(
        updateGoal({
          id: editFormData.id,
          goalData: {
            name: title,
            description: text,
            task_priority_level: priority.toUpperCase(),
            due_date: dueDate,
          },
        })
      );
      setIsEdit(false);
      setEditFormData({});
    } else
      dispatch(
        createGoal({ text, title, priority, dueDate, taskStatus: "pending" })
      );
    setText("");
    setTitle("");
    setPriority("");
    setDueDate("");
    console.log("running before updatation");
  };

  console.log(priority);

  return (
    <section className="form">
      {error && <p className="error">{error}</p>}
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            name="title"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="text">Description</label>
          <input
            type="text"
            name="text"
            id="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="dueDate">Due Date</label>
          <input
            type="date"
            name="dueDate"
            id="dueDate"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="text">Priority</label>
          <select
            // type="text"
            name="priority"
            id="priority"
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
          >
            <option value="">--Select Priority--</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>

        <div className="form-group">
          <button className="btn btn-block" type="submit">
            {isEdit ? "Update" : "Add"} Task
          </button>
          {isEdit && (
            <button
              className="btn btn-block"
              type="submit"
              onClick={() => {
                setIsEdit(false);
                setEditFormData({});
              }}
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </section>
  );
}

export default GoalForm;
