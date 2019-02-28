document.addEventListener("DOMContentLoaded", () => {
  //VARIABLES===================================================================
  const burgerURL = "http://localhost:3000/burgers"
  const burgerMenu = document.querySelector("#burger-menu")
  const yourOrder = document.querySelector("#order-list")
  const customBurgerForm = document.querySelector("#custom-burger")
  const customBurgerName = document.querySelector("#burger-name")
  const customBurgerDesc = document.querySelector("#burger-description")
  const customBurgerImg = document.querySelector("#burger-image")
  var allBurgers = []
  var orderList = []
  // const addToOrderBtn = document.querySelector("#button")

  //EVENT LISTENERS=============================================================
  burgerMenu.addEventListener("click",(e)=>{
    if(e.target.tagName === "BUTTON"){
      let burgerIWantToOrder = allBurgers.find(burger=> burger.id == e.target.dataset.id)
      addBurgerToOrder(burgerIWantToOrder)
    }
  })

  customBurgerForm.addEventListener("submit",(e)=>{
    e.preventDefault()
    fetch(burgerURL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        name: document.querySelector("#burger-name").value,
        description: document.querySelector("#burger-description").value,
        image: document.querySelector("#burger-image").value
      })
    })
    .then(response=> response.json())
    .then(parsedJSON => {
      // console.log(parsedJSON)
      burger = parsedJSON
      allBurgers.push(burger)
      orderList.push
      addBurgerToOrder(burger)
      renderAllBurgersOnMenu(allBurgers)

      //
    })
  })

  //FETCH=======================================================================
  fetch(burgerURL)
    .then(response => response.json())
    .then(parsedJSON => {
      allBurgers = parsedJSON
      renderAllBurgersOnMenu(parsedJSON)
  })

  //FUNCTIONS===================================================================
  function renderBurgerOnMenu(burger){
    burgerMenu.innerHTML += `
      <div data-id=${burger.id} class="burger">
        <h3 class="burger_title">${burger.name}</h3>
          <img src=${burger.image}>
        <p class="burger_description">
          ${burger.description}
        </p>
        <button data-id= ${burger.id} class="button">Add to Order</button>
      </div>
    `
    // allBurgers.push(burger)
  }

  function renderAllBurgersOnMenu(burgers){
    burgerMenu.innerHTML = ''
    burgers.forEach(renderBurgerOnMenu)
  }

  function addBurgerToOrder(burger){
    orderList.push(burger)
    renderBurgerToList(burger)
  }

  function renderBurgerToList(burger){
    yourOrder.innerHTML += `
    <li data-id=${burger.id}>${burger.name}</li>
    `
  }

})
