import axios from "axios";
import { BASE_URL } from "../../../config";
let API_URL = `${BASE_URL}/task`;

// "http://localhost:8080/task"

console.log(API_URL);

// Create new goal
const createGoal = async (goalData) => {
  const response = await axios.post(API_URL, goalData);
  return response.data;
};

// Get user goals
const getGoals = async (currentPage, filters) => {
  // if (currentPage > 1) API_URL = BASE_URL + `?page=${currentPage}`
  // else API_URL
  if (filters.sorting_order === "") delete filters.sorting_order;
  if (filters.sort_by === "") delete filters.sort_by;
  console.log(filters, currentPage);
  let config = {
    params: {
      page: currentPage,
      ...filters,
    },
  };
  const response = await axios.get(API_URL, config);
  // console.log(response.data);
  return response.data;
};

// Delete goal
const deleteGoal = async (goalId) => {
  console.log(API_URL + `/${goalId}`);
  const response = await axios.delete(API_URL + `/${goalId}`);
  // console.log(response.data, "deletegoals");
  return response.data;
};

const updateGoal = async (goalId, goalData) => {
  // console.log(goalId, goalData);
  const response = await axios.put(API_URL + "/" + goalId, goalData);
  // console.log(response.data, "updategoals");
  return response.data;
};

const goalService = {
  createGoal,
  getGoals,
  deleteGoal,
  updateGoal,
};

export default goalService;
