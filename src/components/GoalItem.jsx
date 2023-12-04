import { useDispatch } from "react-redux";
import { deleteGoal, updateGoal } from "../features/goals/goalSlice";

function GoalItem({ task, setIsEdit, setEditFormData }) {
  const dispatch = useDispatch();
  return (
    <div className="goal">
      <div className="task_action_button">
        <button
          onClick={() =>
            dispatch(
              updateGoal({
                id: task.task_id,
                goalData: {
                  task_status:
                    task.task_status === "COMPLETED"
                      ? "IN_PROGRESS"
                      : "COMPLETED",
                },
              })
            )
          }
          className={`status_btn ${
            task.task_status === "COMPLETED" ? "completed" : ""
          }`}
        >
          {` ${task.task_status === "COMPLETED" ? "Completed" : "Pending"}`}
        </button>

        <div>
          <button
            onClick={() => dispatch(deleteGoal(task.task_id))}
            className="task-item-button"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              // stroke="#000"
              className="delete"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
              />
            </svg>
          </button>
          <button
            className="task-item-button"
            onClick={() => {
              // console.log(task.name);
              setEditFormData({
                id: task.task_id,
                title: task.name,
                text: task.description,
                priority: `${task.task_priority_level.toLowerCase()}`,
                dueDate: task.due_date,
                status: task.task_status,
              });
              setIsEdit(true);
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              // stroke="currentColor"
              className="edit"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
              />
            </svg>
          </button>
        </div>
      </div>
      {/* <div>{new Date(goal.createdAt).toLocaleString("en-US")}</div> */}

      {task.task_status === "COMPLETED" ? (
        <s>
          <h3 className="title">{task?.name}</h3>
          <p className="text">{task.description}</p>
        </s>
      ) : (
        <>
          {" "}
          <h3 className="title">{task?.name}</h3>
          <p className="text">{task.description}</p>
        </>
      )}

      {/* <div className="task-footer-info"> */}
      <p className="duedate">{new Date(task.due_date).toDateString()}</p>
      <p
        onClick={() => {}}
        className={`priority ${task.task_priority_level.toLowerCase()}`}
      >
        {task.task_priority_level}
      </p>
      {/* </div> */}
    </div>
  );
}

export default GoalItem;
