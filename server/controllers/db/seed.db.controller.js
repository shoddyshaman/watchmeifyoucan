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

            create table watch_users(
                watch_user_id serial primary key,
                email varchar not null,
                passhash varchar(500) not null 
            );

            create table user_movies(
                user_movie_id serial primary key,
                watch_user_id integer references watch_users(watch_user_id),
                title varchar not null,
                poster_path varchar not null,
                release_date varchar not null,
                overview varchar not null,
                vote_average integer not null
            )
        `).then(dbRes => res.sendStatus(200))
        .catch(err => res.status(400).send(err))
    }
}