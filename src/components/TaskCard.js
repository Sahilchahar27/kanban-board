import React from 'react';
import { useDrag } from 'react-dnd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faTrash, faCalendarAlt, faChevronDown } from '@fortawesome/free-solid-svg-icons';

const TaskCard = ({ task, onEdit, onDelete, onStatusChange }) => {
  const [{ isDragging }, drag] = useDrag({
    type: 'TASK',
    item: { id: task.id, status: task.status },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  const handleStatusChange = (e) => {
    onStatusChange({ ...task, status: e.target.value });
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return 'Invalid Date';
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString(undefined, options);
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800 border-red-300';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'low':
        return 'bg-green-100 text-green-800 border-green-300';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  return (
    <div
      ref={drag}
      className={`bg-white p-4 rounded-lg mb-4 ${isDragging ? 'opacity-50' : ''} shadow-[0_0_10px_rgba(0,0,0,0.1)] hover:shadow-[0_0_15px_rgba(0,0,0,0.2)] transition-shadow duration-300 relative`}
    >
      <div className="flex justify-between items-start mb-2">
        <div className={`px-2 py-1 rounded-full border ${getPriorityColor(task.priority)} font-medium uppercase text-xs mr-2`}>
          {task.priority}
        </div>
        <div className="relative">
          <select
            value={task.status}
            onChange={handleStatusChange}
            className="border border-gray-300 rounded-md p-1 text-sm w-28 appearance-none"
            style={{ paddingRight: '2rem' }}
          >
            <option value="" disabled hidden>Change Status</option>
            <option value="todo">TODO</option>
            <option value="inProgress">IN PROGRESS</option>
            <option value="completed">COMPLETED</option>
          </select>
          <FontAwesomeIcon
            icon={faChevronDown}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 pointer-events-none text-gray-500"
          />
        </div>
      </div>
      <h3 className="font-semibold mt-2">{task.title}</h3>
      <p className="text-sm text-gray-600 mb-4 mt-1">{task.description}</p>
      <hr className="my-2 border-gray-300" /> {/* Partition line */}
      <div className="flex justify-between items-center mt-2">
        {task.dueDate && (
          <div className="flex items-center text-gray-500 text-xs mr-4">
            <FontAwesomeIcon icon={faCalendarAlt} className="mr-1" />
            <span>{formatDate(task.dueDate)}</span>
          </div>
        )}
        <div className="flex justify-end space-x-2">
          <button
            onClick={() => onEdit(task)}
            className="text-purple-500 hover:text-purple-600 transition-colors duration-300"
            aria-label="Edit task"
          >
            <FontAwesomeIcon icon={faPen} />
          </button>
          <button
            onClick={() => onDelete(task.id)}
            className="text-red-500 hover:text-red-600 transition-colors duration-300"
            aria-label="Delete task"
          >
            <FontAwesomeIcon icon={faTrash} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
