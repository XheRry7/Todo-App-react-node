var express = require('express');
var router = express.Router();
// dummy database  
let names = [];

//route for giving names to Frontend

router.get('/getnames', (_, res) => {
  try {
    res.json({ success: true, names })
  } catch (error) {
    res.json({
      success: false,
      message: error.message
    })
  }
});

// route for getting names from Frontend 
router.post('/names', (req, res) => {
  const { name } = req.body
  try {
    names.push(name);
    res.json({ success: true, names })

  }
  catch (error) {
    res.json({
      success: false,
      message: error.message
    })
  }
  // route for clearing all the names 
  router.post('/clearnames', (req, res) => {
    const { name } = req.body
    try {
      names = [];
      res.json({ success: true, names })

    }
    catch (error) {
      res.json({
        success: false,
        message: error.message
      })
    }
  })
  // route for deleting a particular name
  router.delete('/deletenames/:idx', (req, res) => {
    try {
      const index = req.params.idx;
      names.splice(index, 1);
      res.json({ success: true, names })
    }
    catch (error) {
      res.json({
        success: false,
        message: error.message
      })
    }

  })
  // route for updating a particular name
  router.post('/updatename/:idx', (req, res) => {
    try {
      const { name } = req.body
      names.splice(req.params.idx, 1, name);
      res.json({ success: true, names })
    }
    catch (error) {
      res.json({
        success: false,
        message: error.message
      })
    }
  });
});

module.exports = router;