const canvas = document.getElementById('canvas');
const ctx = canvas.getContext("2d");

// Genarel Properties
const canvasWidth = canvas.clientWidth;
const canvasHeight = canvas.clientHeight;
const rect = canvas.getBoundingClientRect();

// Ball Properties
const ball = {
    ballSize: 10,
    color: 'black',
    x: 30,
    y: 60,
    dx: 2,
    dy: -2
}

// Current Player Properties
const cp = {
    ballSize: 15,
    color: 'red',
    x: 0,
    y: 0,

}

// Remote Player Properties
const rp = {
    ballSize: 15,
    color: 'green',
    x: 0,
    y: 0
}



canvas.addEventListener('mousemove', (event) => {
    cp.x = event.x - rect.x - .5;
    // if (event.y - rect.y > canvasHeight / 2) {
        cp.y = event.y - rect.y;
    // }
});



function drawCP() {
    ctx.beginPath();
    ctx.arc(cp.x, cp.y, cp.ballSize, 0, 2 * Math.PI);
    ctx.fillStyle = cp.color;
    ctx.fill();
    ctx.closePath();
}

function drawRP() {
    ctx.beginPath();
    ctx.arc(rp.x, rp.y, rp.ballSize, 0, 2 * Math.PI);
    ctx.fillStyle = rp.color;
    ctx.fill();
    ctx.closePath();
}

function drawBall() {

    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.ballSize, 0, 2 * Math.PI);
    ctx.fillStyle = ball.color;
    ctx.fill();
    ctx.closePath();
}

function handleBall() {
    if (ball.x + ball.ballSize > canvasWidth || ball.x - ball.ballSize < 0) {
        ball.dx = - ball.dx;
    }
    if (ball.y + ball.ballSize > canvasHeight || ball.y - ball.ballSize < 0) {
        ball.dy = - ball.dy;
    }
    drawBall();

    ball.x += ball.dx;
    ball.y += ball.dy;
}

function checkCollition() {
    let dBx = cp.x - ball.x;
    let dBy = cp.y - ball.y;
    let distance = Math.sqrt(dBx * dBx + dBy * dBy)
    if (distance < cp.ballSize + ball.ballSize) {
        if (!ball.colliding) {
           let x = Math.abs(cp.x - ball.x);
           let y = Math.abs(cp.y - ball.y); 

           if (x > y) {
               ball.dx = x/y;
               ball.dy = -1;
           }else{
            ball.dy = 1;
            ball.dx = - (y/x);
           }
        }
        ball.colliding = true
    } else {
        ball.colliding = false
    }
    // console.log('cpx:',cp.x,'ballx:',ball.x);

}


function draw() {
    ctx.clearRect(0, 0, 400, 500);
    checkCollition();
    handleBall();
    // drawRP();
    drawCP();
    // console.log(ball.dx,ball.dy);
    
}

setInterval(draw, 10);