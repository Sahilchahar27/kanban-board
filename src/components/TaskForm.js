import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons';

const TaskForm = ({ task = {}, onSave, onClose }) => {
  const [title, setTitle] = useState(task?.title || '');
  const [description, setDescription] = useState(task?.description || '');
  const [status, setStatus] = useState(task?.status || 'todo');
  const [priority, setPriority] = useState(task?.priority || 'medium');
  const [dueDate, setDueDate] = useState(task?.dueDate ? new Date(task.dueDate) : '');

  useEffect(() => {
    setTitle(task?.title || '');
    setDescription(task?.description || '');
    setStatus(task?.status || 'todo');
    setPriority(task?.priority || 'medium');
    setDueDate(task?.dueDate ? new Date(task.dueDate) : '');
  }, [task]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({
      ...task,
      title,
      description,
      status,
      priority,
      dueDate: dueDate ? new Date(dueDate).toISOString() : null,
    });
    onClose();
  };

  const inputClasses = "mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500 sm:text-sm border-[0.5px]";

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
<label className="block text-sm font-medium text-gray-700">Title</label>
<input
type="text"
value={title}
onChange={(e) => setTitle(e.target.value)}
className={inputClasses}
required
/>
</div>
<div>
<label className="block text-sm font-medium text-gray-700">Description</label>
<textarea
value={description}
onChange={(e) => setDescription(e.target.value)}
className={`${inputClasses} h-32 resize-none`}
required
/>
</div>
<div>
<label className="block text-sm font-medium text-gray-700">Status</label>
<select
value={status}
onChange={(e) => setStatus(e.target.value)}
className={inputClasses}
required
>
<option value="todo">TODO</option>
<option value="inProgress">IN PROGRESS</option>
<option value="completed">COMPLETED</option>
</select>
</div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700">Priority</label>
        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          className={inputClasses}
          required
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      </div>

      <div>
<label className="block text-sm font-medium text-gray-700">Due Date</label>
<div className="relative">
<input
type="date"
value={dueDate ? dueDate.toISOString().split('T')[0] : ''}
onChange={(e) => setDueDate(new Date(e.target.value))}
className={`${inputClasses} pl-10`}
/>
<FontAwesomeIcon
icon={faCalendarAlt}
className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 cursor-pointer"
onClick={() => document.querySelector('input[type="date"]').focus()}
/>
</div>
</div>
<div className="flex justify-end space-x-2">
<button type="submit" className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors duration-300">
Save
</button>
<button type="button" onClick={onClose} className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400 transition-colors duration-300">
Cancel
</button>
</div>

      
    </form>
  );
};

export default TaskForm;