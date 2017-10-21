/* STEPS as follows :-
1. Creating Canvas & resizing it
2. Drawing Elements in Canvas eg: line,arc,rect etc
3. Animating Elements
4. Interacting with Elements */

//console.log('reddit');//testing

//searching html document and when it finds canvas element, it grabs that and puts it in canvas variable
var canvas = document.querySelector('canvas');
//console.log(canvas); // testing 

//grabbing window's innerWidth and setting it to our canvas width 
canvas.width = innerWidth;
canvas.height = innerHeight;

//c is Context and we are putting all the methods needed to draw in canvas in var c
var c = canvas.getContext('2d');

// mouse object, we want to get x,y coordiantes of our mouse, set x,y to some value, we are setting x,y in our mouseEvent
var mouse = {
    x: innerWidth / 2,
    y: innerHeight / 2
}



// to change color of each circle, colorArray is created
var colorArray = [
    '#00bdff',
    '#4d39ce',
    '#088eff',
];


// EventListener, we want to monitor mouse movement,whenever we move mouse across screen & a function to call whenever this event occurs
// we need to compare mouse postion with each individual x,y position of each circle
// we need to get mouse position by event argument
window.addEventListener('mousemove', 
           function(event) {
    // Testing the function, whenever we move mouse,function is called 
    //console.log('werw'); 
    //console.log(event); // this event gives all the data associated with the event
    
    mouse.x = event.x;
    mouse.y = event.y;
   // console.log(mouse);
    
})


// eventListener for resizing browser
window.addEventListener('resize', function()
 {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    //each time we call init(); we are refreshing our browser
    init();
})


// Utility functions to get random value
function randomIntFromRange(min,max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function randomColor(colorArray) {
    return colorArray[Math.floor(Math.random() * colorArray.length)];
}

//object oriented javascript
// creating objects,Particle object, so that we can have many particles, with each circle having its own x,y,radius,color values 
// we took the circle code arc and pasted it inside here,we geta satic circle
// so to move particle we create update func 
// each time we instatiate new particle,we are going to pass arguments
 function Particle(x, y, radius, color){
     this.x = x;
     this.y = y;
     this.radius = radius;
     this.color = color;
     // get random value from 0 to 360
     this.radians = Math.random() * Math.PI * 2;
     this.velocity = 0.05;
     this.distanceFromCenter = randomIntFromRange(50, 120);
     this.lastMouse = {x: x, y: y};
     
     this.draw = function(lastPoint){
         //console.log('aabbcad');
         c.beginPath();
         // creating smooth trail effect by connecting particle's last location with new location
         c.strokeStyle = this.color;
         c.lineWidth = this.radius;
         // particle's old location 
         c.moveTo(lastPoint.x, lastPoint.y);
         // particle's new locations
         c.lineTo(this.x, this.y);
         c.stroke();
         c.closePath();
     }  
     
     this.update = function(){
         // Particle's old locations, we pass this to draw func
         const lastPoint = {x: this.x, y:this.y};
         
          // Move points over time
          this.radians += this.velocity;
         
         // creating Circular Motion
          /*this.x = x + Math.cos(this.radians) * this.distanceFromCenter;            
         
          this.y = y + Math.sin(this.radians) *  this.distanceFromCenter; */
        
         
         // Drag effect
          this.lastMouse.x += (mouse.x - this.lastMouse.x) * 0.05;
          this.lastMouse.y += (mouse.y - this.lastMouse.y) * 0.05;
         
         
         // Creating Circular Motion, adding interaction with mouse, so that when we move mouse, the centre of circle moves along with mouse
        /* this.x = mouse.x + Math.cos(this.radians) *  this.distanceFromCenter;            
         
          this.y = mouse.y + Math.sin(this.radians) *  this.distanceFromCenter;*/
         
         
         
         // Creating Circular Motion, adding mouse interaction
         this.x = this.lastMouse.x + Math.cos(this.radians) *   this.distanceFromCenter;            
         
          this.y = this.lastMouse.y + Math.sin(this.radians) *  this.distanceFromCenter;
         
         // console.log(Math.cos(this.radians) * 100);
          
          this.draw(lastPoint);
     }
 }


 // storing all particles in array
 var particles = [];


// Implementation
function init(){
    particles = [];
    // pushing each objects in array,instantiating 50 particles
    for(var i =0; i < 50; i++){
     // getting random radius value from 1 to 2
     const radius = (Math.random() * 2) + 1;
    // pushing each objects in array
     particles.push(new Particle(canvas.width / 2, canvas.height / 2, radius, randomColor(colorArray))); 
}
    console.log(particles);

}



// animate function draws things in screen
function animate(){
    requestAnimationFrame(animate);
    
    // Trail effect, creating rectangle to be drawn on top of circles each time we run animate loop
    c.fillStyle = 'rgba(255, 255, 255, 0.05)';
    c.fillRect(0, 0, canvas.width, canvas.height);
    
    //drawing particles in "SCREEN", accessing each cicrle through array
    for(var i = 0; i < particles.length; i++){
        particles[i].update();
    }
      
}

init();
animate();












