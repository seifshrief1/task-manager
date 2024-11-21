import React, { useState } from "react";
import { useTasks } from "../../contexts/TasksContext";

const AddTask = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [taskName, setTaskName] = useState("");
  const [taskType, setTaskType] = useState("");
  const [taskStartDate, setTaskStartDate] = useState("");
  const [taskEndDate, setTaskEndDate] = useState("");
  const [stepsOfTask, setStepsOfTask] = useState([]);
  const [stepsNumber, setStepsNumber] = useState("");
  const [loading, setLoading] = useState(false);

  const { handleAddNewTask } = useTasks();

  const handleAddTask = async () => {
    setLoading(true);
    await handleAddNewTask(
      taskName,
      taskType,
      taskStartDate,
      taskEndDate,
      stepsOfTask
    );

    setLoading(false);
  };

  return (
    <div>
      <button
        onClick={() => setIsOpen(true)}
        title="Add New Task"
        className="group cursor-pointer outline-none hover:rotate-90 duration-300 flex justify-center m-auto mt-10"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="50px"
          height="50px"
          viewBox="0 0 24 24"
          className="stroke-orange-400 fill-none group-hover:fill-orange-700 group-active:stroke-orange-200 group-active:fill-orange-600 group-active:duration-0 duration-300"
        >
          <path
            d="M12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22Z"
            strokeWidth="1.5"
          ></path>
          <path d="M8 12H16" strokeWidth="1.5"></path>
          <path d="M12 16V8" strokeWidth="1.5"></path>
        </svg>
      </button>

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50 overflow-auto">
          <div className="bg-white p-6 rounded-lg w-[500px]">
            <h2 className="md:text-lg font-semibold text-center mb-4">
              إضافة مهمة جديدة
            </h2>

            <div className="mb-4">
              <label
                htmlFor="taskName"
                className="block text-sm font-medium mb-2"
              >
                اسم المهمة
              </label>
              <input
                type="text"
                id="taskName"
                value={taskName}
                onChange={(e) => setTaskName(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md"
                placeholder="أدخل اسم المهمة"
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="taskType"
                className="block text-sm font-medium mb-2"
              >
                نوع المهمة
              </label>
              <div className="flex space-x-2 border-[3px] border-purple-400 rounded-xl select-none">
                <label className="radio flex flex-grow items-center justify-center rounded-lg p-1 cursor-pointer">
                  <input
                    type="radio"
                    name="radio"
                    value="عمل"
                    className="peer hidden"
                    checked={taskType === "عمل"}
                    onChange={() => setTaskType("عمل")}
                  />
                  <span className="tracking-widest peer-checked:bg-gradient-to-r peer-checked:from-[blueviolet] peer-checked:to-[violet] peer-checked:text-white text-gray-700 p-2 rounded-lg transition duration-150 ease-in-out">
                    عمل
                  </span>
                </label>

                <label className="radio flex flex-grow items-center justify-center rounded-lg p-1 cursor-pointer">
                  <input
                    type="radio"
                    name="radio"
                    value="شخصي"
                    className="peer hidden"
                    checked={taskType === "شخصي"}
                    onChange={() => setTaskType("شخصي")}
                  />
                  <span className="tracking-widest peer-checked:bg-gradient-to-r peer-checked:from-[blueviolet] peer-checked:to-[violet] peer-checked:text-white text-gray-700 p-2 rounded-lg transition duration-150 ease-in-out">
                    شخصي
                  </span>
                </label>

                <label className="radio flex flex-grow items-center justify-center rounded-lg p-1 cursor-pointer">
                  <input
                    type="radio"
                    name="radio"
                    value="اولوية"
                    className="peer hidden"
                    checked={taskType === "اولوية"}
                    onChange={() => setTaskType("اولوية")}
                  />
                  <span className="tracking-widest peer-checked:bg-gradient-to-r peer-checked:from-[blueviolet] peer-checked:to-[violet] peer-checked:text-white text-gray-700 p-2 rounded-lg transition duration-150 ease-in-out">
                    اولوية
                  </span>
                </label>
              </div>
            </div>

            <div className="mb-4">
              <label
                htmlFor="stepsNumber"
                className="block text-sm font-medium mb-2"
              >
                عدد خطوات المهمة (اختياري)
              </label>
              <input
                type="number"
                id="stepsNumber"
                value={stepsNumber}
                onChange={(e) => {
                  const numSteps = parseInt(e.target.value, 10);
                  setStepsNumber(numSteps);
                  setStepsOfTask(Array(numSteps).fill(""));
                }}
                className="w-full p-2 border border-gray-300 rounded-md mb-4"
                placeholder="أدخل عدد خطوات المهمة"
              />
              {stepsOfTask.map((step, index) => (
                <input
                  key={index}
                  type="text"
                  value={step}
                  onChange={(e) => {
                    const updatedSteps = [...stepsOfTask];
                    updatedSteps[index] = e.target.value;
                    setStepsOfTask(updatedSteps);
                  }}
                  className="w-full p-2 border border-gray-300 rounded-md mb-2"
                  placeholder={`خطوة ${index + 1}`}
                />
              ))}
            </div>

            <div className="mb-4">
              <label
                htmlFor="startDate"
                className="block text-sm font-medium mb-2"
              >
                تاريخ البداية
              </label>
              <input
                type="date"
                id="startDate"
                className="w-full p-2 border border-gray-300 rounded-md"
                onChange={(e) => setTaskStartDate(e.target.value)}
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="endDate"
                className="block text-sm font-medium mb-2"
              >
                تاريخ النهاية
              </label>
              <input
                type="date"
                id="endDate"
                className="w-full p-2 border border-gray-300 rounded-md"
                onChange={(e) => setTaskEndDate(e.target.value)}
              />
            </div>

            <div className="flex justify-between">
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-500 hover:text-gray-800"
              >
                إلغاء
              </button>
              <button
                onClick={handleAddTask}
                className="flex items-center bg-orange-500 text-white gap-1 px-4 py-2 cursor-pointer font-semibold tracking-widest rounded-md hover:bg-orange-400 duration-300 hover:gap-2 hover:translate-x-3"
              >
                {loading ? (
                  <div class="w-5 h-5 border-4 border-t-blue-500 border-gray-300 rounded-full animate-spin flex justify-center m-auto"></div>
                ) : (
                  <>
                    اضافة
                    <svg
                      className="w-5 h-5"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5"
                        strokeLinejoin="round"
                        strokeLinecap="round"
                      ></path>
                    </svg>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddTask;
