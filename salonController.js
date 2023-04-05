const db = require("../model");
const Salon = db.salon;
const Op = db.Sequelize.Op;

// Create and Save a new Salon
exports.create = (req, res) => {
  // Validate request
  if (!req.body.salon) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }

  // Create a Salon
  const salons = {
    salon: req.body.salon,
    price: req.body.price,
    time: req.body.time ,
    persons: req.body.persons ,
  };

  // Save Salon in the database
  Salon.create(salons)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Salon.",
      });
    });
};

// Retrieve all Salon from the database.
exports.findAll = (req, res) => {
  const limit = req.query.limit ? parseInt(req.query.limit) : 10; // default limit is 10
  const page = req.query.page ? parseInt(req.query.page) : 1; // default page is 1

  const offset = (page - 1) * limit; // calculate offset based on page and limit

  const salon = req.query.salon;
  var condition = salon ? { salon: { [Op.like]: `%${salon}%` } } : null;

  Salon.findAndCountAll({ 
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
          err.message || "Some error occurred while retrieving Salon.",
      });
    });
};

// Find a single Salon with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Salon.findByPk(id)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Salon with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving Salon with id=" + id,
      });
    });
};

// Update a Salon by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Salon.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Salon was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update Salon with id=${id}. Maybe Salon was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Salon with id=" + id,
      });
    });
};

// Delete a Salon with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Salon.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Salon was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete Salon with id=${id}. Maybe HSalon was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Salon with id=" + id,
      });
    });
};

// Delete all Salons from the database.
exports.deleteAll = (req, res) => {
  Salon.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({ message: `${nums} Salon were deleted successfully!` });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Salons.",
      });
    });
};


