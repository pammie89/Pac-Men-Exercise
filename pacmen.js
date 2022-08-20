//Pacman image array
const pacArray = [
    ['images/Pacman1.png', 'images/Pacman2.png'],
    ['images/Pacman3.png', 'images/Pacman4.png'],
  ];
  let direction = 0;
  let imgCounter = 0;
  // This array holds all the pacmen
  const pacMen = []; 
  
  // This function returns an object with random values
  function setToRandom(scale) {
    return {
      x: Math.random() * scale,
      y: Math.random() * scale,
    };
  }
  
  // Factory to make a PacMan at a random position with random velocity
  function makePac() {
    // returns an object with random values scaled {x: 33, y: 21}
    const velocity = setToRandom(10); // {x:?, y:?}
    const position = setToRandom(200);
    // Add image to div id = game
    let game = document.getElementById('game');
    let newimg = document.createElement('img');
    newimg.style.position = 'absolute';
    newimg.src = './images/pac-mania.gif';
    newimg.id = imgCounter;
    newimg.width = Math.random() * 200;
  
  
    // Sets position here
    newimg.style.left = position.x;
    newimg.style.top = position.y + 40; 
    let pos = 0;
    let focus = 0;
    let reverse = true;
    // Add new Child image to game
    game.appendChild(newimg);
  
    // Return details in an object
    return {
      position,
      velocity,
      newimg,
      pos,
      reverse,
      focus,
    };
  }
  function update() {
    // Loop over pacmen array and move each one and move image in DOM
    pacMen.forEach((item) => {
      checkCollisions(item);
      switchImg(item);
      item.position.x += item.velocity.x;
      item.position.y += item.velocity.y;
  
      item.newimg.style.left = item.position.x;
      item.newimg.style.top = item.position.y;
    });
    // setTimeout(update, 60);
    let timer = setTimeout(update, 60);
    //Resets the timer after the rest function is called.
    if(imgCounter == 0){
      clearTimeout(timer);
    };
  }
  //Changes images according to the direction of the Pacman.
  function switchImg(item){
    item.focus = (item.focus + 1) % 2;
    if(item.position.x - item.velocity.x + item.newimg.width > window.innerWidth && item.pos ==0 ||
      item.position.x - item.velocity.x < 0 && item.pos ==1){
        item.reverse = !item.reverse;
      }
      if(item.reverse){
        item.pos = 0;
      }else{
        item.pos = 1;
      }
      return item.newimg.src = pacArray[item.pos][item.focus];
  } 
  
  function checkCollisions(item) {
    //Detects collision with all walls and make pacman bounce
    if(item.position.x + item.velocity.x + item.newimg.width > window.innerWidth ||
      item.position.x + item.velocity.x < 0) item.velocity.x =- item.velocity.x;
    if(item.position.y + item.velocity.y + item.newimg.height > window.innerHeight ||
      item.position.y + item.velocity.y < 0) item.velocity.y =- item.velocity.y;
  }
  
  function makeOne() {
    pacMen.push(makePac()); // add a new PacMan
    imgCounter = imgCounter + 1;
  }
  //Resets the imgCounter and deletes all Pacman from the DOM.
  function reset() {
    for(let i= 0; i < imgCounter; i++){
      let elem = document.getElementById(i);
      elem.remove()
    }
    imgCounter = 0;
   
  };
  