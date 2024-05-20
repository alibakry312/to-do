import React, { useState,useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faTrash } from '@fortawesome/free-solid-svg-icons'

/* 
############# [ New Features ] #############
  [1] Add Tasks by Enter key
  [2] Animation While tasks removes
############################################
*/
export default function Input() {
  const [tasks, setTasks] = useState([]);
// Add the Task From Input
  const handlerInputBtn = () => {
    const removeSpace = taskValue.current.value;
    const removed = removeSpace.trim();
    if (removed.length > 1) {
      const text = taskValue.current.value;
      const newItem = {completed: false, text}
      setTasks([...tasks, newItem]);
      taskValue.current.value = '';
    } else {
      taskValue.current.value = '';
    }
  }
// When completed the task
  const handlerTaskDone = (index) => {
    const newTask = [...tasks];
    newTask[index].completed = !newTask[index].completed;
    setTasks(newTask);
    console.log(newTask[index].completed)
  }
// Delete the Task
  const handleDeleteTask = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks.splice(index, 1);
    setTasks(updatedTasks);
  }
  const taskValue = useRef();
  return (
<>
<div className="container">
    <div className="form">
        <input ref={taskValue} type="text" id="input-task" placeholder="Input Your Task"/>
        <button onClick={handlerInputBtn}>Add Task</button>
    </div>
</div>
<div className="tasks">
    <h2>Your Tasks</h2>
    <div id="lists-div">
        <ul id="lists-container">
          {tasks.map(({text, completed}, index)=>{
            return(
            <div key={index} className='fade-in item-box'>
              <li className={completed ? 'done' : ''} onClick={() => handlerTaskDone(index)} >{text}</li>
              <span className='delete-icon' onClick={() => handleDeleteTask(index)}>
                <FontAwesomeIcon className='trash' icon={faTrash} /></span>
            </div>
            )
          })}
        </ul>
    </div>
</div>
</>

  )
}
