const {
  createTodo,
  readTodo,
  changeStatusTodo,
  deleteTodo,
  modifyTodo
} = require('../controller/todoInfoController');

const Router = require('express');
const router = Router();

router.get('/:username', readTodo);
router.post('/creation/:username', createTodo);
router.put('/status/:username', changeStatusTodo);
router.patch('/:username', modifyTodo)
router.delete('/:username', deleteTodo);

module.exports = router;