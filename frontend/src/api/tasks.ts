import customAxios from "./customAxios";

export const getAllTasks = async () => {
  return customAxios.get('/tasks');
};
