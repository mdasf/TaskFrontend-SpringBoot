import { useEffect, useState } from "react";
import { getGoals, reset } from "../features/goals/goalSlice";
import GoalItem from "./GoalItem";
import Pagination from "./Pagination";

function List({
  goals,
  currentPage,
  totalPages,
  dispatch,
  setIsEdit,
  setEditFormData,
  sortBy,
  sortingOrder,
  setSortBy,
  setSortingOrder,
}) {
  //   const getSortingOrder = ()=>{
  //     sortingOrder==='ASCENDING' ?
  //   }

  //   useEffect(() => {
  //     dispatch(
  //       getGoals({
  //         filters: {
  //           SORTING_ORDER: sortingOrder,
  //           SORT_BY: sortBy,
  //           source: "list",
  //         },
  //       })
  //     );

  //     return () => {
  //       dispatch(reset());
  //     };
  //   }, [sortingOrder, sortBy]);
  //   if (!sortingOrder) return false;

  return (
    <section className="content scroll">
      <div className="pageinationSection">
        <Pagination currentPage={currentPage} totalPages={totalPages} />
        <div className="pagination-buttons">
          <button
            className="btn"
            onClick={() =>
              dispatch(
                getGoals({
                  page: currentPage - 1,
                  filters: { SORTING_ORDER: sortingOrder, SORT_BY: sortBy },
                })
              )
            }
            disabled={currentPage <= 0 ? "true" : ""}
          >
            Prev
          </button>
          <button
            className="btn"
            onClick={() =>
              dispatch(
                getGoals({
                  page: currentPage + 1,
                  filters: { SORTING_ORDER: sortingOrder, SORT_BY: sortBy },
                })
              )
            }
            disabled={currentPage === totalPages - 1 ? "true" : ""}
          >
            Next
          </button>
        </div>
      </div>
      <div className="filterSection">
        <div className="filter-buttons">
          <div className="filter-form-group">
            <label htmlFor="sortby">Sort By:</label>
            <select
              // type="text"
              name="sortby"
              id="sortby"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="">--Select--</option>
              <option value="TASK_PRIORITY">Priority</option>
              <option value="TASK_STATUS">Status</option>
            </select>
          </div>
          <div className="filter-form-group">
            <label htmlFor="sortingorder">Sorting order:</label>
            <select
              // type="text"
              name="sortingorder"
              id="sortingorder"
              value={sortingOrder}
              onChange={(e) => setSortingOrder(e.target.value)}
            >
              <option value="">--Select--</option>

              <option value="DESCENDING">DESC</option>
              <option value="ASCENDING">ASC</option>
            </select>
          </div>
        </div>
      </div>
      {goals && goals.length > 0 ? (
        <div className="goals">
          {goals.map((task) => {
            return (
              <GoalItem
                key={task.task_id}
                task={task}
                setIsEdit={setIsEdit}
                setEditFormData={setEditFormData}
              />
            );
          })}
        </div>
      ) : (
        <h3>There are no tasks left to complete.</h3>
      )}
    </section>
  );
}

export default List;
