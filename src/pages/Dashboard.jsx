import React, { useEffect, useMemo, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import GoalForm from "../components/GoalForm";
import List from "../components/List";
import Spinner from "../components/Spinner";
import { getGoals, reset } from "../features/goals/goalSlice";

function Dashboard() {
  const dispatch = useDispatch();

  const { goals, currentPage, totalPages, isLoading, isError, message } =
    useSelector((state) => state.goals);

  const [isEdit, setIsEdit] = useState(false);
  const [editFormData, setEditFormData] = useState({
    id: "",
    title: "",
    text: "",
    priority: "",
    dueDate: "",
    status: "",
  });

  const [sortingOrder, setSortingOrder] = useState("");
  const [sortBy, setSortBy] = useState("");

  const filter = useMemo(
    () => ({
      sorting_order: sortingOrder,
      sort_by: sortBy,
    }),
    [sortBy, sortingOrder]
  );

  useEffect(() => {
    console.log(filter);
    dispatch(getGoals({ filters: filter }));
    return () => {
      dispatch(reset());
    };
  }, [dispatch, filter]);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className="dashboard">
      <div className="form">
        {/* {isError && <p>{''}</p>} */}
        <section className="heading">
          <p>{isEdit ? "Update" : "Add"} Task</p>
        </section>

        <GoalForm
          isEdit={isEdit}
          setIsEdit={setIsEdit}
          editFormData={editFormData}
          setEditFormData={setEditFormData}
        />
      </div>

      <List
        goals={goals}
        currentPage={currentPage}
        totalPages={totalPages}
        dispatch={dispatch}
        setEditFormData={setEditFormData}
        setIsEdit={setIsEdit}
        sortBy={sortBy}
        sortingOrder={sortingOrder}
        setSortBy={setSortBy}
        setSortingOrder={setSortingOrder}
      />

      {/* <section className="content">
        <div>
          <button
            className="btn"
            onClick={() => dispatch(getGoals(currentPage + 1))}
            disabled={currentPage === totalPage}
          >
            Next
          </button>
        </div>
        {goals && goals.length > 0 ? (
          <div className="goals">
            {goals.map((task) => {
              console.log(task);
              return <GoalItem key={task.task_id} task={task} />;
            })}
          </div>
        ) : (
          <h3>There are no tasks left to complete.</h3>
        )}
      </section> */}
    </div>
  );
}

export default Dashboard;
