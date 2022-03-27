const Item = require('../models/item');
const ServerError = require('../errors/server-err');
const ValdiationError = require('../errors/validation-err');
const CastError = require('../errors/cast-err');
const NotFoundError = require('../errors/not-found-err');

module.exports.getItems = (req, res, next) => {
  Item.find({})
    .then((item) => res.status(200).send(item))
    .catch((err) => {
      throw new ServerError('Server Error');
    });
};

module.exports.createItem = (req, res, next) => {
  const { name } = req.body;
  Item.create({ name })
    .then((log) => {
      res.send(log);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        throw new ValdiationError('Valdiation Error');
      } else {
        throw new ServerError('Server Error');
      }
    })
    .catch(next);
};

module.exports.deleteItemById = (req, res, next) => {
  Item.findByIdAndDelete({ _id: req.params.id })
    .then(() => {
      res.status(200).send({ message: 'Item has been deleted' });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        throw new CastError('Invalid id');
      } else if (err.name === 'DocumentNotFoundError') {
        throw new NotFoundError('No Card found with that id');
      } else {
        throw new ServerError('Server Error');
      }
    })
    .catch(next);
};
