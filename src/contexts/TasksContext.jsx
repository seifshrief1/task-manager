import { deleteDoc, doc, setDoc, updateDoc } from "firebase/firestore";
import { createContext, useContext, useState } from "react";
import { db } from "../../firebase";
import { v4 as uuidv4 } from "uuid";
import moment from "moment";

const tasksContext = createContext();

export const TasksProvider = ({ children }) => {
  const [inCompleteTasks, setInCompleteTasks] = useState([]);
  const [completeTasks, setCompleteTasks] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));
  const handleAddNewTask = async (
    taskName,
    taskType,
    taskStartDate,
    taskEndDate,
    stepsOfTask
  ) => {
    try {
      if (!taskName || !taskType || !taskStartDate || !taskEndDate) {
        alert("رجاء ادخال جميع بيانات المهمة");
      } else {
        const task = {
          taskName: taskName,
          taskType: taskType,
          taskStartDate: taskStartDate,
          taskEndDate: taskEndDate,
          steps: stepsOfTask,
          owner: user.uid,
          id: uuidv4(),
          since: moment().format("MMMM Do YYYY, h:mm:ss a"),
        };
        await setDoc(doc(db, "inCompleteTasks", task.id), task);
        alert("تم اضافة المهمة بنجاح");
      }
    } catch (error) {
      alert(error.message);
    }
  };

  const handleRemoveTask = async (id) => {
    try {
      await deleteDoc(doc(db, "inCompleteTasks", id));
      alert("تم حذف المهمة بنجاح");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <tasksContext.Provider
      value={{
        handleAddNewTask,
        handleRemoveTask,
        inCompleteTasks,
        setInCompleteTasks,
        completeTasks,
        setCompleteTasks,
      }}
    >
      {children}
    </tasksContext.Provider>
  );
};

export const useTasks = () => {
  return useContext(tasksContext);
};
