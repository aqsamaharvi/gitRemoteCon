module.exports = (sequelize, Sequelize) => {
    const Videos = sequelize.define("videos", {
      title: {
        type: Sequelize.STRING,
      },
      description: {
        type: Sequelize.STRING,
      },
    });
  
    return Videos;
  };
  