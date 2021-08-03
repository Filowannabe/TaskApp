import React, { useState, useEffect } from 'react';
import './App.css';
import { TaskRow } from './components/TaskRow'
import { TaskBanner } from './components/TaskBanner'
import { TaskCreator } from './components/TaskCreator'
import { VisibilityControl } from './components/VisibilityControl'

function App() {
  const [username, setUsername] = useState('Felipe')
  const [taskItems, setTaskItems] = useState([
    { name: 'task one', done: false },
    { name: 'task two', done: false },
    { name: 'task three', done: false },
    { name: 'task four', done: true }
  ])
  const [showCompleted, setShowCompleted] = useState(true)

  useEffect(() => {

    const data = localStorage.getItem('tasks')
    if (data != null) setTaskItems(JSON.parse(data))
    else {
      setUsername('Felipe example')
      setTaskItems([
        { name: 'task one example', done: false },
        { name: 'task two example', done: false },
        { name: 'task three example', done: false },
        { name: 'task four example', done: true }
      ])
      setShowCompleted(true)
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(taskItems))
  }, [taskItems])

  const toggleTask = task =>
    setTaskItems(taskItems.map(it => (it.name === task.name ? { ...it, done: !it.done } : it)))

  const taskTableRows = (doneValue) =>
    taskItems
      .filter(it => it.done === doneValue)
      .map(task => <TaskRow task={task} key={task.name} toggleTask={toggleTask} />)

  const addNewTask = (taskName) => {
    if (!taskItems.find(it => it.name === taskName)) setTaskItems([...taskItems, { name: taskName, done: false }])
  }

  return (
    <div>
      <TaskBanner username={username} taskItems={taskItems} />
      <div className="container-fluid">
        <TaskCreator callback={addNewTask} />
        <table className="table table-striped table-bordered">
          <thead>
            <tr>
              <th>Description</th>
              <th>Done</th>
            </tr>
          </thead>
          <tbody>
            {taskTableRows(false)}
          </tbody>
        </table>
        <div className="bg-secondary text-white p-2">
          <VisibilityControl description='Completed Task' isChecked={showCompleted} callback={checked => setShowCompleted(checked)} />
        </div>
        {
          showCompleted && (
            <table className="table table-striped table-bordered">
              <thead>
                <tr>
                  <th>Description</th>
                  <th>Done</th>
                </tr>
              </thead>
              <tbody>
                {taskTableRows(true)}
              </tbody>
            </table>
          )
        }
      </div>
    </div>
  );
}

export default App;
