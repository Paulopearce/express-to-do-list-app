//Click event listener for add item button
document.getElementById('addItem').addEventListener('click', event => {
  event.preventDefault()
  //Collect data by making data item object
  const item = {
    text: document.getElementById('text').value,
    isDone: false
  }
  //Send item to back end
  axios.post('api/items', item )
    //Make item element and post on page
    .then(() => {
      const itemElem = document.createElement('div')
      //Delete button is given data-id attribute of the text to determine which one to delete
      itemElem.innerHTML = `
        <p>${item.text}</p>
        <button class="delete" data-text="${item.text}">X</button>
        <button class="isDone" data-text="${item.text}">${item.isDone ? 'Done' : 'Not Done'}</button>
        <hr>
      `
      document.getElementById('items').append(itemElem)
      
      document.getElementById('text').value = ''
    })
    .catch(err => console.error(err))
})

//Add event listener to entire page
document.addEventListener('click', event => {
  //When clicking on delete button
  if (event.target.className === 'delete'){
    const text = event.target.dataset.text
    axios.delete(`api/items/${text}`)
      .then(() => event.target.parentNode.remove())
      .catch(err => console.error(err))
  }
})

//Add another event listener to toggle isdone to done and vise versa
document.addEventListener('click', event => {
  if (event.target.className === 'isDone') {
    const text = event.target.dataset.text
    
    axios.put(`api/items/${text}`)
      .then(() => {
        if (event.target.textContent === 'Done') {
          event.target.textContent = 'Not Done'   
        } else { 
          event.target.textContent = 'Done'
        } 
      })
  }    
})

//get data using axios from users page and display to page
axios.get('api/items')
  .then(({ data:items }) => {
    items.forEach(item => {
      const itemElem = document.createElement('div')
      itemElem.innerHTML = `
        <p>${item.text}</p>
        <button class="delete" data-text="${item.text}">X</button>
        <button class="isDone" data-text="${item.text}">${item.isDone ? 'Done' : 'Not Done'}</button>
        <hr>
      `
      document.getElementById('items').append(itemElem)
    })
  })
  .catch(err => console.error(err))

//loop over items array of object make a div, set and append to div
  




