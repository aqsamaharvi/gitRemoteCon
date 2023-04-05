const db = require("../model");
const Dress = db.dress;
const Op = db.Sequelize.Op;

// Create and Save a new Dress
exports.create = (req, res) => {
  // Validate request
  if (!req.body.brand) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }

  // Create a Dress
  const dress = {
    brand: req.body.brand,
    price: req.body.price,
    date: req.body.date ,
  };

  // Save Dress in the database
  Dress.create(dress)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Dress.",
      });
    });
};

// Retrieve all Dress from the database.
exports.findAll = (req, res) => {
  const limit = req.query.limit ? parseInt(req.query.limit) : 10; // default limit is 10
  const page = req.query.page ? parseInt(req.query.page) : 1; // default page is 1

  const offset = (page - 1) * limit; // calculate offset based on page and limit

  const brand = req.query.brand;
  var condition = brand ? { brand: { [Op.like]: `%${brand}%` } } : null;

  Dress.findAndCountAll({ 
    limit: limit,
    offset: offset,
    where: condition })
    .then((data) => {
      const pages = Math.ceil(data.count / limit); // calculate the total number of pages
      res.send({data: data.rows, pages: pages, currentPage: page});
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Dress.",
      });
    });
};

// Find a single Dress with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Dress.findByPk(id)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Dress with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving Dress with id=" + id,
      });
    });
};

// Update a Dress by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Dress.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Dress was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update Dress with id=${id}. Maybe Dress was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Dress with id=" + id,
      });
    });
};

// Delete a Dress with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Dress.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Dress was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete Dress with id=${id}. Maybe Dress was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Dress with id=" + id,
      });
    });
};

// Delete all Dresses from the database.
exports.deleteAll = (req, res) => {
  Dress.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({ message: `${nums} Dress were deleted successfully!` });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Dresses.",
      });
    });
};


