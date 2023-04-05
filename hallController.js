const db = require("../model");
const Hall = db.hall;
const Op = db.Sequelize.Op;

// Create and Save a new Hall
exports.create = (req, res) => {
  // Validate request
  if (!req.body.hall) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }

  // Create a Hall
  const halls = {
    hall: req.body.hall,
    price: req.body.price,
    time: req.body.time ,
    persons: req.body.persons ,
  };

  // Save Hall in the database
  Hall.create(halls)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Hall.",
      });
    });
};

// Retrieve all Hall from the database.
exports.findAll = (req, res) => {
  const limit = req.query.limit ? parseInt(req.query.limit) : 10; // default limit is 10
  const page = req.query.page ? parseInt(req.query.page) : 1; // default page is 1

  const offset = (page - 1) * limit; // calculate offset based on page and limit

  const hall = req.query.hall;
  var condition = hall ? { hall: { [Op.like]: `%${hall}%` } } : null;

  Hall.findAndCountAll(
    {
    limit: limit,
    offset: offset,
     where: condition
     }
     )
    .then((data) => {
      const pages = Math.ceil(data.count / limit); // calculate the total number of pages
      res.send({data: data.rows, pages: pages, currentPage: page});
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Hall.",
      });
    });
};

// Find a single Hall with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Hall.findByPk(id)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Hall with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving Hall with id=" + id,
      });
    });
};

// Update a Hall by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Hall.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Hall was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update Hall with id=${id}. Maybe Hall was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Hall with id=" + id,
      });
    });
};

// Delete a Hall with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Hall.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Hall was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete Hall with id=${id}. Maybe Hall was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Hall with id=" + id,
      });
    });
};

// Delete all Halls from the database.
exports.deleteAll = (req, res) => {
  Hall.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({ message: `${nums} Hall were deleted successfully!` });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Halls.",
      });
    });
};


