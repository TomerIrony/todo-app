const router = require('express').Router();

const {
  getItems,
  createItem,
  deleteItemById,
} = require('../controllers/items');

router.get('/items', getItems);
router.post('/items', createItem);
router.delete('/items/:id', deleteItemById);

module.exports = router;
