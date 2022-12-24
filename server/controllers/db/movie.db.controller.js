require("dotenv").config();
const { DATABASE_CONFIG } = process.env;
const Sequelize = require("sequelize");

const sequelize = new Sequelize(DATABASE_CONFIG, {
  dialect: "postgres",
  dialectOptions: {
    ssl: {
      rejectUnauthorized: false,
    },
  },
});


module.exports = {
    addMovie:(req,res) => {
        
        const {original_title,poster_path,release_date,overview,vote_average} = req.body
        // console.log(req.body)
        let overviewString = overview.replace(/'/g, "&apos;")
        const {id} = req.params
        sequelize.query(`
          insert into user_movies(watch_user_id,title,poster_path,release_date,overview,vote_average) values(${id},'${original_title}',${poster_path}','${release_date}','${overviewString}',${vote_average});
        `).then(dbRes => res.status(200).send('added to list'))
        .catch(err => res.status(400).send(err))
        
      },
      getAllmovies:(req,res) => {
        const {id} = req.params
        sequelize.query(`
          select * from user_movies where watch_user_id = ${id}
        `).then(dbRes => res.status(200).send(dbRes[0]))
        .catch(err => res.status(400).send(err))
      }
    }