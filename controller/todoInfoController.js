const { v4 : uuidv4 } = require('uuid');
const toDoInfo = require('../data/todoinfo');

const todoInfoController = {
  createTodo: (req, res) => {
    const { username } = req.params;
    const userIdx = toDoInfo.findIndex(el => el.username === username);
    const newTodo = { id: uuidv4(), ...req.body.data };
    if (userIdx === -1) {
      toDoInfo.push({
        username,
        todolist: [newTodo]
      })
    } else {
      toDoInfo[userIdx].todolist.push(newTodo)
    }
  
  res.status(201).json(newTodo);
  },

  readTodo: (req, res) => {
    const { username } = req.params;
    const userIdx = toDoInfo.findIndex(el => el.username === username);
    res.status(200).json(toDoInfo[userIdx]);
    // if (userIdx === -1) {
    //   res.status(404).json({message: 'todolist is empty'})
    // } else {
    //   res.status(200).json(toDoInfo[userIdx]);
    // }
  },

  
  changeStatusTodo: (req, res) => {
    const { username } = req.params;
    const { id, to, from } = req.body.query;

    const userIdx = toDoInfo.findIndex(el => el.username === username);
    const todoIdx = toDoInfo[userIdx][from].findIndex(el => el.id === id);
    
    toDoInfo[userIdx][to].push(toDoInfo[userIdx][from][todoIdx]);
    toDoInfo[userIdx][from] = toDoInfo[userIdx][from].filter(el => el.id !== id);

    res.status(200).json(toDoInfo[userIdx]);
  }, 

  modifyTodo: (req, res) => {
    const { username } = req.params;
    const { id, status } = req.body.params;

    const userIdx = toDoInfo.findIndex(el => el.username === username);
    const todoIdx = toDoInfo[userIdx][status].findIndex(el => el.id === id);
    const modifiedTodo = { ...toDoInfo[userIdx][status][todoIdx], ...req.body.data }

    toDoInfo[userIdx][status].splice(todoIdx, 1, modifiedTodo);

    res.status(200).json(modifiedTodo);
  },

  deleteTodo : (req, res) => {
    const { username } = req.params;
    const { id, status } = req.query;

    const userIdx = toDoInfo.findIndex(el => el.username === username);

    toDoInfo[userIdx][status] = toDoInfo[userIdx][status].filter(el => el.id !== id);

    res.status(204).send('Completely delete!');
  }
}

module.exports = todoInfoController