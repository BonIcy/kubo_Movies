const express = require('express');
const router = express.Router();
const db = require('../db/config');
/* const { = require('../middlewares/); */
const { getData } = require('../controllers/get');
const { deleteData } = require('../controllers/del');
const { postData } = require('../controllers/add');
const { updateData } = require('../controllers/upd.js');


router.get('/test', (req, res)=>{
    console.log('working');
})


//cruds

router.get('/:table',  (req, res) => {
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
  


module.exports = router;