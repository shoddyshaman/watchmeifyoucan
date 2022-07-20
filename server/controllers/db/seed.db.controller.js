require('dotenv').config()
const {DATABASE_CONFIG} = process.env
const Sequelize = require('sequelize')

const sequelize = new Sequelize(DATABASE_CONFIG, {
    dialect: 'postgres',
    dialectOptions: {
        ssl: {
            rejectUnauthorized: false
        }
    }
})

module.exports = {
    seed:(req,res) => {
        sequelize.query(`
            drop table if exists watch_users;
            drop table if exists user_movies;

            create table watch_users
        `)
    }
}