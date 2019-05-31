// Click and drag the pizza
// Created with ZDog https://zzz.dog/

const canvas = document.getElementById('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const strokeWidth = canvas.height < 700 ? 7 : 14;
const pizzaColor = 'cyan';
const TAU = Zdog.TAU;

let viewRotation = new Zdog.Vector();
let dragStartRX, dragStartRY;
let scale = 1;

window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

let illo = new Zdog.Illustration({
  element: '.zdog-canvas',
  zoom: 1,
  scale: canvas.height < 700 ? 0.5 : 1,
  onPrerender: function (ctx) {
    this.scale = canvas.height < 700 ? 0.5 : 1;
    ctx.fillStyle = 'black';
    ctx.globalCompositeOperation = 'screen';
    ctx.fillRect(-(canvas.width / 2), -(canvas.height / 2), canvas.width, canvas.height);
  },
  resize: true
});

const pizzaGroup = new Zdog.Group({
  addTo: illo
});

// PEPPERONIS
// The left one
const pep = new Zdog.Ellipse({
  addTo: pizzaGroup,
  diameter: 70,
  stroke: strokeWidth,
  color: pizzaColor,
  translate: { x: -85, y: 90 }
});

// The right one
pep.copy({
  translate: {
    x: 85, y: 70  
  }
});

// The edge one
new Zdog.Shape({
  addTo: pizzaGroup,
  path: [
    // The straight part
    { x: 30, y: -185 },
    { x: 70, y: -110 },
    // Bottom of curve
    {
      arc: [
        { x: 30, y: -90 }, // corner
        { x: 8, y: -125 }, // end point
      ]
    },
    {
      arc: [
        { x: -10, y: -160 }, // corner
        { x: 30, y: -185 }, // end point
      ]
    },
  ],
  diameter: 70,
  stroke: strokeWidth,
  color: pizzaColor,
});

// THE SLICE + CRUST
new Zdog.Shape({
  addTo: pizzaGroup,
  path: [
    { x: -180, y: 120 },
    { x: -20, y: -210 },   // start
    {
      arc: [
        { x: 0, y: -250 }, // corner
        { x: 20, y: -210 }, // end point
      ]
    },
    { x: 20, y: -210 },
    { move: { x: 85, y:-85 } },
    { x: 85, y: -85 },
    { x: 180, y: 90 },
    {
      arc: [
        { x: 220, y: 155 }, // corner
        { x: 160, y: 150 }, // end point
      ]
    },
    { x: 10, y: 150 },
    {
      bezier: [
        { x: 0, y: 150 }, // start control point
        { x: 0, y: 160 }, // end control point
        { x: 0, y: 160 }, // end point
      ]
    },
    { x: 0, y: 180 },
    {
      bezier: [
        { x: 0, y: 200 }, // start control point
        { x: -30, y: 200 }, // end control point
        { x: -30, y: 180 }, // end point
      ]
    },
    { x: -30, y: 170 },
    {
      bezier: [
        { x: -30, y: 145 }, // start control point
        { x: -55, y: 145 }, // end control point
        { x: -55, y: 170 }, // end point
      ]
    }, 
    { x: -55, y: 230 },
    {
      bezier: [
        { x: -55, y: 250 }, // start control point
        { x: -85, y: 250 }, // end control point
        { x: -85, y: 230 }, // end point
      ]
    },
    { x: -85, y: 170 },
    {
      arc: [
        { x: -90, y: 148 }, // corner
        { x: -105, y: 150 }, // end point
      ]
    },
    { x: -165, y: 150 },
    {
      bezier: [
        { x: -210, y: 150 }, // start control point
        { x: -210, y: 215 }, // end control point
        { x: -165, y: 215 }, // end point
      ]
    },
    { x: -108 ,y: 215 },
    { move: { x: -35, y: 215 } },
    { x: 190, y: 215 },
    {
      arc: [ // start next arc from last end point
        { x: 235, y: 210 }, // corner
        { x: 210, y: 165 }, // end point
      ]
    },
  ],
  closed: false,
  stroke: strokeWidth,
  color: pizzaColor
});

const pizzaGroup1 = pizzaGroup.copyGraph({
  translate: { y: 0, x: -10, z: 15 }
});

pizzaGroup1.children.forEach(item => {
  return item.color = 'magenta';
});

const pizzaGroup2 = pizzaGroup.copyGraph({
  translate: { y: -10, x: -10, z: -15 }
});

pizzaGroup2.children.forEach(item => {
  return item.color = 'yellow';
});


// EYE SEE YOU
const eyeGroup = new Zdog.Group({
  addTo: illo,
  translate: { y: -15 }
});

const eyeris = new Zdog.Ellipse({
  addTo: eyeGroup,
  width: 55,
  height: 55,
  stroke: strokeWidth,
  color: pizzaColor
});

const eyeOutline = new Zdog.Shape({
  addTo: eyeGroup,
  stroke: strokeWidth,
  color: pizzaColor,
  closed: false,
  path: [
    { x: -45, y: 22 },
    {
      arc: [ // start next arc from last end point
        { x: -65, y: 15 }, // corner
        { x: -70, y: 0 }, // end point
      ]
    },
    { x: -70, y: 0 },
    {
      arc: [ // start next arc from last end point
        { x: -35, y: -28 }, // corner
        { x: 0, y: -28 }, // end point
      ]
    },
    {
      arc: [ // start next arc from last end point
        { x: 35, y: -28 }, // corner
        { x: 70, y: 0 }, // end point
      ]
    },
    // { x: 0 , y: -28 },
    { x: 70, y: 0 },
  ]
});

const eyeCopy1 = eyeGroup.copyGraph({
  translate: { y: -15, x: -10, z: -15 },  // color: rgba()
});

eyeCopy1.children.forEach(item => {
  return item.color = 'magenta';
});

const eyeCopy2 = eyeGroup.copyGraph({
  translate: { y: -10, x: 5, z: 15 },  // color: rgba()
});

eyeCopy2.children.forEach(item => {
  return item.color = 'yellow';
});

// Handle movements
new Zdog.Dragger({
  startElement: '.zdog-canvas',
  onDragStart: () => {
    dragStartRX = viewRotation.x;
    dragStartRY = viewRotation.y;
    animate();
  },
  onDragMove: function (pointer, moveX, moveY) {
    let moveRX = moveY / illo.width * TAU;
    let moveRY = moveX / illo.width * TAU;
    viewRotation.x = dragStartRX - moveRX;
    viewRotation.y = dragStartRY - moveRY;
  },
})

// update & render
function animate() {
  illo.rotate.y += 0.005;
  [ pizzaGroup, pizzaGroup1, pizzaGroup2 ].forEach( group => {
    group.rotate.set(viewRotation);
  })
  illo.updateRenderGraph();
  requestAnimationFrame(animate);
}
// start animation
animate();