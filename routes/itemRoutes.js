//In place of the app. before the route
const router = require('express').Router()
//Import the whole database folder
let { items } = require('../db')
//The above is the same as below
// const items = require ('..db/items.js')

//Rote to hit to get return data using restful(representational state transfer) routing syntax (name implies the plural of what the route data returns) 
router.get('/items', (req, res) => {
  //return javascript data
  res.json(items)
})

//post route should look like the plural of the data. Adds data
router.post('/items', (req,res) => {
  //Push in the request body from the front end which is the axios.post() of the item
  items.push(req.body)
  //Must send response to complete request
  res.sendStatus(200)
})

//remove from page using restful syntax followed by the variable parameter you're sending
router.delete('/items/:text', (req, res) =>{
  const text = req.params.text
  //Filter out all items that don't have that text
  items = items.filter(item => item.text !== text)
  //Send required response of success status 
  res.sendStatus(200)
})

//edit page using restful syntax followed by the variable parameter you're modifying
router.put('/items/:text', (req, res) => {
  const text = req.params.text
  //loop over items
  items.forEach(item => {
    //If item has text that matches provided parameter
    if ( item.text === text ) {
      //Toggle item's true or false value
      item.isDone = !item.isDone
    }
  })
  res.sendStatus(200)
})

module.exports = router
