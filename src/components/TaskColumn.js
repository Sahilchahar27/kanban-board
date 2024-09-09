import React from 'react';
import TaskCard from './TaskCard';
import { useDrop } from 'react-dnd';

const TaskColumn = ({ status, title, tasks, onEdit, onDelete, onStatusChange, className, titleClassName }) => {
  const [{ isOver }, drop] = useDrop({
    accept: 'TASK',
    drop: (item) => onStatusChange({ ...item, status }),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  });

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'todo':
        return 'bg-purple-200 text-purple-700';
      case 'inprogress':
        return 'bg-yellow-200 text-yellow-700';
      case 'completed':
        return 'bg-green-200 text-green-700';
      default:
        return 'bg-gray-200 text-gray-700';
    }
  };

  const getTitleBgColor = (status) => {
    switch (status.toLowerCase()) {
      case 'todo':
        return 'bg-purple-200';
      case 'inprogress':
        return 'bg-yellow-200';
      case 'completed':
        return 'bg-green-200';
      default:
        return 'bg-gray-200';
    }
  };

  return (
    <div
      ref={drop}
      className={`p-4 rounded ${className} ${isOver ? 'bg-gray-100' : ''}`}
    >
      <div className={`flex justify-between items-center mb-4 ${titleClassName} ${getTitleBgColor(status)} p-2 rounded`}>
        <h2 className="text-lg font-semibold text-gray-800">{title}</h2>
        <div className="relative">
          <span className={`inline-block rounded-full px-2 py-1 text-xs font-medium ${getStatusColor(status)}`}>
            {status.toUpperCase()}
          </span>
        </div>
      </div>
      {tasks.length === 0 ? (
        <div className="text-gray-400 text-center">No tasks yet</div>
      ) : (
        tasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            onEdit={onEdit}
            onDelete={onDelete}
            onStatusChange={onStatusChange}
          />
        ))
      )}
    </div>
  );
};

export default TaskColumn;
