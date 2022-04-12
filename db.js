const dotenv = require('dotenv');
dotenv.config();

const { Sequelize, DataTypes, Model, DATE } = require('sequelize');
//const { Sequelize } = require('sequelize');
//'postgres://user:pass@example.com:5432/dbname' #conn string
const sequelize = new Sequelize(`postgres://salmanshahid:${process.env.DB_PASSWORD}@localhost:5432/movies`);


const Horror = sequelize.define('horrors', {
    // Model attributes are defined here
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING
      // allowNull defaults to true
    },
    rating: {
        type: DataTypes.FLOAT
    },
  }, {

    // Other model options go here
});

async function testConnection() {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
};

const getMovies = async function () {
    try {
        const movies = await Horror.findAll({
            attributes: ['id', 'name', 'rating']
        });
        return movies;
    }
    catch(error) {
        console.error(error);
    }
};

module.exports = {
    testConnection,
    getMovies
};