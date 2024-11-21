import React, { useEffect } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import {
  FaTasks,
  FaRegClock,
  FaCheckCircle,
  FaTrashAlt,
  FaEdit,
} from "react-icons/fa";
import AddTask from "../../components/AddTaskModal/AddTask";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { db } from "../../../firebase";
import { useTasks } from "../../contexts/TasksContext";

const Tasks = () => {
  const {
    handleRemoveTask,
    inCompleteTasks,
    setInCompleteTasks,
    completeTasks,
    setCompleteTasks,
  } = useTasks();

  const user = JSON.parse(localStorage.getItem("user"));
  useEffect(() => {
    const getIncompleteTasks = async () => {
      const tasksCollection = collection(db, "inCompleteTasks");
      const tasksQuery = query(tasksCollection, where("owner", "==", user.uid));
      const getTasks = await getDocs(tasksQuery);
      const tasks = getTasks.docs.map((doc) => doc.data());
      setInCompleteTasks(tasks);
    };

    getIncompleteTasks();

    // get completed tasks
    const getCompletedTasks = async () => {
      const tasksCollection = collection(db, "completeTasks");
      const tasksQuery = query(tasksCollection, where("owner", "==", user.uid));
      const getTasks = await getDocs(tasksQuery);
      const tasks = getTasks.docs.map((doc) => doc.data());
      setCompleteTasks(tasks);
    };
    getCompletedTasks();
  }, [inCompleteTasks, completeTasks]);

  const onDragEnd = async (result) => {
    const { source, destination } = result;

    if (!destination) return;

    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    )
      return;

    const sourceArray =
      source.droppableId === "Incomplete"
        ? [...inCompleteTasks]
        : [...completeTasks];
    const destinationArray =
      destination.droppableId === "Incomplete"
        ? [...inCompleteTasks]
        : [...completeTasks];

    const [movedTask] = sourceArray.splice(source.index, 1);

    destinationArray.splice(destination.index, 0, movedTask);

    try {
      if (
        source.droppableId === "Incomplete" &&
        destination.droppableId === "Complete"
      ) {
        await setDoc(doc(db, "completeTasks", movedTask.id), movedTask);
        await deleteDoc(doc(db, "inCompleteTasks", movedTask.id));
        setInCompleteTasks(sourceArray);
        setCompleteTasks(destinationArray);
      } else if (
        source.droppableId === "Complete" &&
        destination.droppableId === "Incomplete"
      ) {
        // Move from Complete to Incomplete
        await setDoc(doc(db, "inCompleteTasks", movedTask.id), movedTask);
        await deleteDoc(doc(db, "completeTasks", movedTask.id));
        setCompleteTasks(sourceArray);
        setInCompleteTasks(destinationArray);
      } else {
        // Reordering within the same list
        if (source.droppableId === "Incomplete") {
          setInCompleteTasks(destinationArray);
        } else {
          setCompleteTasks(destinationArray);
        }
      }
    } catch (error) {
      console.error("Error updating Firestore:", error);
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen p-4 sm:p-8">
      <div className="flex flex-wrap justify-center gap-4 mb-8">
        <span className="flex items-center gap-2 bg-blue-100 text-blue-600 px-4 py-2 rounded-lg text-lg shadow-lg">
          <FaTasks /> عمل
        </span>
        <span className="flex items-center gap-2 bg-green-100 text-green-600 px-4 py-2 rounded-lg text-lg shadow-lg">
          <FaCheckCircle /> شخصي
        </span>
        <span className="flex items-center gap-2 bg-red-100 text-red-600 px-4 py-2 rounded-lg text-lg shadow-lg">
          <FaRegClock /> أولوية
        </span>
      </div>

      <AddTask />

      <div className="flex md:flex-row flex-col justify-between gap-6">
        <DragDropContext onDragEnd={onDragEnd}>
          <div className="w-full lg:w-1/2">
            <h2 className="text-2xl font-semibold mb-6 text-center text-gray-700">
              مهام غير مكتملة
            </h2>
            <Droppable droppableId="Incomplete">
              {(provided) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  className="bg-white p-4 rounded-lg shadow-lg"
                >
                  {inCompleteTasks.length === 0 ? (
                    <p className="text-center font-bold">ليس لديك مهام</p>
                  ) : (
                    inCompleteTasks &&
                    inCompleteTasks.map &&
                    inCompleteTasks.map((task, index) => (
                      <Draggable
                        key={task.id}
                        draggableId={task.id}
                        index={index}
                      >
                        {(provided) => (
                          <>
                            <div
                              {...provided.dragHandleProps}
                              {...provided.draggableProps}
                              ref={provided.innerRef}
                              className="flex flex-col items-start mb-4 bg-gray-100 p-4 rounded-lg shadow-md transition-transform transform hover:scale-105 duration-300"
                            >
                              <h3 className="text-lg font-bold">
                                {task.taskName}
                              </h3>
                              <div>
                                <div className="mt-2">
                                  <p className="text-sm text-gray-500">
                                    تبدا من: {task.taskStartDate}
                                  </p>
                                  <p className="text-sm text-gray-500">
                                    تنتهي عند: {task.taskEndDate}
                                  </p>
                                  <p className="text-sm text-gray-500">
                                    عدد خطوات المهمة: {task.steps.length}
                                  </p>
                                  <p className="text-sm text-gray-500">
                                    تم الانشاء منذ :{task.since}
                                  </p>
                                </div>
                                <div className="flex justify-between items-center">
                                  <p
                                    className={
                                      task.taskType === "شخصي"
                                        ? "bg-green-100 text-green-600 p-2 w-fit rounded-lg text-sm shadow-lg"
                                        : task.taskType === "اولوية"
                                        ? "bg-red-100 text-red-600 p-2 w-fit rounded-lg text-lg shadow-lg"
                                        : "bg-blue-100 text-blue-600 p-2 w-fit rounded-lg text-lg shadow-lg"
                                    }
                                  >
                                    {task.taskType}
                                  </p>

                                  <span
                                    onClick={() => handleRemoveTask(task.id)}
                                    className="text-red-500 cursor-pointer"
                                  >
                                    <FaTrashAlt />
                                  </span>
                                </div>
                              </div>
                            </div>
                          </>
                        )}
                      </Draggable>
                    ))
                  )}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </div>

          <div className="w-full lg:w-1/2">
            <h2 className="text-2xl font-semibold mb-6 text-center text-gray-700">
              مهام مكتملة
            </h2>
            <Droppable droppableId="Complete">
              {(provided) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  className="bg-white p-4 rounded-lg shadow-lg z-0"
                >
                  {completeTasks.length === 0 ? (
                    <p className="text-center font-bold">لا يوجد مهام مكتملة</p>
                  ) : (
                    completeTasks &&
                    completeTasks.map &&
                    completeTasks.map((task, index) => (
                      <Draggable
                        key={task.id}
                        draggableId={task.id}
                        index={index}
                      >
                        {(provided) => (
                          <div
                            {...provided.dragHandleProps}
                            {...provided.draggableProps}
                            ref={provided.innerRef}
                            className="flex items-center mb-4 bg-gray-100 p-4 rounded-lg shadow-md transition-transform transform hover:scale-105 duration-300 z-0"
                          >
                            <h3 className="text-lg font-semibold">
                              {task.taskName}
                            </h3>
                          </div>
                        )}
                      </Draggable>
                    ))
                  )}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </div>
        </DragDropContext>
      </div>
    </div>
  );
};

export default Tasks;
