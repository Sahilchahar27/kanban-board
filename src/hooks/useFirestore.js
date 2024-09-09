import { useEffect, useState } from 'react';
import { db } from '../firebase';
import { collection, addDoc, onSnapshot, updateDoc, deleteDoc, doc } from 'firebase/firestore';

export const useFirestore = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'tasks'), (snapshot) => {
      const tasksData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setTasks(tasksData);
    });

    return () => unsubscribe();
  }, []);

  const addTask = async (task) => {
    await addDoc(collection(db, 'tasks'), task);
  };

  const updateTask = async (task) => {
    const taskRef = doc(db, 'tasks', task.id);
    await updateDoc(taskRef, task);
  };

  const deleteTask = async (id) => {
    const taskRef = doc(db, 'tasks', id);
    await deleteDoc(taskRef);
  };

  return { tasks, addTask, updateTask, deleteTask };
};
