const db = require("../model");
const Catering = db.catering;
const Op = db.Sequelize.Op;

// Create and Save a new Catering
exports.create = (req, res) => {
  // Validate request
  if (!req.body.chef) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }

  // Create a Catering
  const catering = {
    chef: req.body.chef,
    price: req.body.price,
    time: req.body.time ,
    persons: req.body.persons,
  };

  // Save Catering in the database
  Catering.create(catering)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Catering.",
      });
    });
};

// Retrieve all Catering from the database.
exports.findAll = (req, res) => {
  const page = req.query.page ? parseInt(req.query.page) : 1; // default page is 1
  const limit = req.query.limit ? parseInt(req.query.limit) : 10; // default limit is 10
  const offset = (page - 1) * limit; // calculate offset based on page and limit

  const chef = req.query.chef;
  var condition = chef ? { chef: { [Op.like]: `%${chef}%` } } : null;

  Catering.findAndCountAll({ 
    limit: limit,
    offset: offset,
    where: condition })
    .then((data) => {
      const totalPages = Math.ceil(data.count / limit); // calculate the total number of pages
      res.send({data: data.rows, currentPage: page, totalPages: totalPages});
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Catering.",
      });
    });
};

// Find a single Catering with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Catering.findByPk(id)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Catering with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving Catering with id=" + id,
      });
    });
};

// Update a Catering by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Catering.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Catering was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update Catering with id=${id}. Maybe Catering was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Catering with id=" + id,
      });
    });
};

// Delete a Catering with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Catering.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Catering was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete Catering with id=${id}. Maybe Catering was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Catering with id=" + id,
      });
    });
};

// Delete all Tutorials from the database.
exports.deleteAll = (req, res) => {
  Catering.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({ message: `${nums} Catering were deleted successfully!` });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Caterings.",
      });
    });
};


