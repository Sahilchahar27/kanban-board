import React, { useState } from 'react';
import Modal from './Modal';
import TaskForm from './TaskForm';
import TaskColumn from './TaskColumn';
import { useFirestore } from '../hooks/useFirestore';
import logo from '../logo.png'; 

const TaskBoard = () => {
  const { tasks, addTask, updateTask, deleteTask } = useFirestore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentTask, setCurrentTask] = useState(null);

  const openModal = (task = null) => {
    setCurrentTask(task);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setCurrentTask(null);
    setIsModalOpen(false);
  };

  return (
    <div className="container mx-auto p-4">
     
      <div className="absolute top-0 left-0 p-4">
        <img src={logo} alt="Logo" className="h-12 w-auto" /> 
      </div>
      
      
      <div className="flex flex-col items-start mt-16 ml-16"> 
        <div className="flex justify-between w-full mb-4"> 
          <h1 className="text-4xl font-bold font-mono text-gray-900 tracking-tight leading-none">
            Desktop & Mobile Application
          </h1>
          <button 
            className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600"
            onClick={() => openModal()}
          >
            Create Task
          </button>
        </div>
      </div>
      
   
      <div className="flex space-x-4 mt-6"> 
        <TaskColumn 
          status="todo"
          title="TODO"
          tasks={tasks.filter((task) => task.status === 'todo')}
          onEdit={openModal}
          onDelete={deleteTask}
          onStatusChange={updateTask}
          className="flex-1 shadow-lg bg-white rounded-lg"
          titleClassName="bg-purple-200 p-2 rounded-t-lg"
        />
        <TaskColumn 
          status="inProgress"
          title="IN PROGRESS"
          tasks={tasks.filter((task) => task.status === 'inProgress')}
          onEdit={openModal}
          onDelete={deleteTask}
          onStatusChange={updateTask}
          className="flex-1 shadow-lg bg-white rounded-lg"
          titleClassName="bg-yellow-200 p-2 rounded-t-lg"
        />
        <TaskColumn 
          status="completed"
          title="COMPLETED"
          tasks={tasks.filter((task) => task.status === 'completed')}
          onEdit={openModal}
          onDelete={deleteTask}
          onStatusChange={updateTask}
          className="flex-1 shadow-lg bg-white rounded-lg"
          titleClassName="bg-green-200 p-2 rounded-t-lg"
        />
      </div>
      
      {isModalOpen && (
        <Modal onClose={closeModal}>
          <TaskForm
            task={currentTask}
            onSave={currentTask ? updateTask : addTask}
            onClose={closeModal}
          />
        </Modal>
      )}
    </div>
  );
};

export default TaskBoard;
