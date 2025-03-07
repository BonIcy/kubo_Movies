const express = require('express');
const router = express.Router();
const db = require('../db/config');

const { getData } = require('../controllers/get');
const { deleteData } = require('../controllers/del');
const { postData } = require('../controllers/add');
const { updateData } = require('../controllers/upd.js');
const {  filterMovies } = require('../controllers/moviesController');
const { register } = require('../controllers/register');
const { login } = require('../controllers/login');
const validateJwt = require('../middlewares/validateJWT.js');
const { getNewMovies } = require('../controllers/newMovies');
const { markAsWatched } = require('../controllers/watchedMovies');
const { getWatchedList } = require('../controllers/watchedList');


// login and register
router.post('/register', register);
router.post('/login', login);

router.get('/test', (req, res)=>{
    console.log('working');
})


//cruds

  router.get('/:table', validateJwt, (req, res) => {
    const { table } = req.params;
    getData(req, res, table);
  });
  router.post('/:table',  (req, res) => {
      const { table,  } = req.params;
      const data = req.body;
  postData(req, res, table, data)
  });
  
  router.put('/:table/:id',  (req, res) =>{
      const {table, id} = req.params
      const data = req.body;
      updateData(req,res, table, id, data)
  });
  
  router.delete('/:table/:id',  (req, res) => {
    const { table, id } = req.params;
    deleteData(req, res, table, id);
  });
  

// filter movie (require params, example: http://localhost:XXXX/movies/movies?page=1&limit=5&title=Inception&category_id=2&order=desc )
router.get('/movies', validateJwt, filterMovies);

router.get('/movies/new', validateJwt, getNewMovies);


router.post('/movies/watched', validateJwt, markAsWatched);

router.get('/watched/list', validateJwt, getWatchedList);

module.exports = router;