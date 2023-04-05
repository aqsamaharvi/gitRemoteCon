const db = require("../model");
const Vehicle = db.vehicle;
const Op = db.Sequelize.Op;

// Create and Save a new Car
exports.create = (req, res) => {
  // Validate request
  if (!req.body.car) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }

  // Create a Car
  const vehicles = {
    car: req.body.car,
    price: req.body.price,
    time: req.body.time ,
    driver: req.body.driver ,
  };

  // Save Car in the database
  Vehicle.create(vehicles)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Car.",
      });
    });
};

// Retrieve all Car from the database.
exports.findAll = (req, res) => {
  const limit = req.query.limit ? parseInt(req.query.limit) : 10; // default limit is 10
  const page = req.query.page ? parseInt(req.query.page) : 1; // default page is 1

  const offset = (page - 1) * limit; // calculate offset based on page and limit

  const car = req.query.car;
  var condition = car ? { car: { [Op.like]: `%${car}%` } } : null;

  Vehicle.findAndCountAll({
    limit : limit,
    offset : offset,
    where: condition })
    .then((data) => {
      const pages = Math.ceil(data.count / limit); // calculate the total number of pages
      res.send({data: data.rows, pages: pages, currentPage: page});
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Car.",
      });
    });
};

// Find a single Car with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Vehicle.findByPk(id)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Car with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving Car with id=" + id,
      });
    });
};

// Update a Car by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Vehicle.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Car was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update Car with id=${id}. Maybe Car was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Car with id=" + id,
      });
    });
};

// Delete a Car with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Vehicle.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Car was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete Car with id=${id}. Maybe Car was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Car with id=" + id,
      });
    });
};

// Delete all Cars from the database.
exports.deleteAll = (req, res) => {
  Vehicle.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({ message: `${nums} Car were deleted successfully!` });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Cars.",
      });
    });
};


