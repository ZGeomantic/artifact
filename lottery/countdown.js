var WINDOW_WIDTH = 1024;
var WINDOW_HEIGHT = 400;
var RADIUS = 8;
var MARGIN_TOP = 60;
var MARGIN_LEFT = 30;
var candidates = new Array(150)
for (var i = 0; i < candidates.length; i++) {
    candidates[i] = i + 1
}
var luckNum = 0
var count = 0

var balls = [];
const colors = ["#33B5E5", "#0099CC", "#AA66CC", "#9933CC", "#99CC00", "#669900", "#FFBB33", "#FF8800", "#FF4444", "#CC0000"]

window.onload = function () {
    var canvas = document.getElementById('canvas');
    var context = canvas.getContext("2d");
    canvas.width = WINDOW_WIDTH;
    canvas.height = WINDOW_HEIGHT;

//    luckNum = Math.floor(Math.random() * 10);
    setInterval(
        function () {
            render(context);
            updateBalls();
        }
        ,
        50
    );

}

function updateBalls() {

    for (var i = 0; i < balls.length; i++) {

        balls[i].x += balls[i].vx;
        balls[i].y += balls[i].vy;
        balls[i].vy += balls[i].g;

        if (balls[i].y >= WINDOW_HEIGHT - RADIUS) {
            balls[i].y = WINDOW_HEIGHT - RADIUS;
            balls[i].vy = -balls[i].vy * 0.55;
        }
    }
}


function addBalls(x, y, num) {

    for (var i = 0; i < digit[num].length; i++)
        for (var j = 0; j < digit[num][i].length; j++)
            if (digit[num][i][j] == 1) {
                var aBall = {
                    x: x + j * 2 * (RADIUS + 1) + (RADIUS + 1),
                    y: y + i * 2 * (RADIUS + 1) + (RADIUS + 1),
                    g: 1.5 + Math.random(),
                    vx: Math.pow(-1, Math.ceil(Math.random() * 1000)) * 4,
                    vy: -5,
                    color: colors[ Math.floor(Math.random() * colors.length) ]
                }

                balls.push(aBall)
            }
}


function nextNum() {
//    luckNum = Math.floor(Math.random() * 150 + 1);
    var index = Math.floor(Math.random() * candidates.length);

    luckNum = candidates[index]



    addBalls(MARGIN_LEFT + 25 * (RADIUS + 1), MARGIN_TOP, parseInt(luckNum / 100));
    addBalls(MARGIN_LEFT + 50 * (RADIUS + 1), MARGIN_TOP, parseInt(luckNum % 100 / 10));
    addBalls(MARGIN_LEFT + 75 * (RADIUS + 1), MARGIN_TOP, parseInt(luckNum % 10));
    count++
//    document.getElementById("rest").innerHTML = candidates

    document.getElementById("count").innerHTML = count
    for (var i = 0; i < candidates.length; i++) {
        if (candidates[i] == luckNum) {
            candidates.splice(i, 1)
        }
    }


}

function render(cxt) {

    cxt.clearRect(0, 0, WINDOW_WIDTH, WINDOW_HEIGHT);

//    var hours = parseInt( curShowTimeSeconds / 3600);
//    var minutes = parseInt( (curShowTimeSeconds - hours * 3600)/60 )
//    var seconds = curShowTimeSeconds % 60

    renderDigit(MARGIN_LEFT + 25 * (RADIUS + 1), MARGIN_TOP, parseInt(luckNum / 100), cxt)
    renderDigit(MARGIN_LEFT + 50 * (RADIUS + 1), MARGIN_TOP, parseInt(luckNum % 100 / 10), cxt)
    renderDigit(MARGIN_LEFT + 75 * (RADIUS + 1), MARGIN_TOP, parseInt(luckNum % 10), cxt)

    for (var i = 0; i < balls.length; i++) {

        cxt.fillStyle = balls[i].color;

        cxt.beginPath();
        cxt.arc(balls[i].x, balls[i].y, RADIUS, 0, 2 * Math.PI, true);
        cxt.closePath();

        cxt.fill();
        if (balls[i].x > 1024 || balls[i].x < 0) {
            balls.splice(i, 1)
        }
//        console.log(balls.length)
    }
}

function renderDigit(x, y, num, cxt) {

    cxt.fillStyle = "rgb(0,102,153)";

    for (var i = 0; i < digit[num].length; i++)
        for (var j = 0; j < digit[num][i].length; j++)
            if (digit[num][i][j] == 1) {
                cxt.beginPath();
                cxt.arc(x + j * 2 * (RADIUS + 1) + (RADIUS + 1), y + i * 2 * (RADIUS + 1) + (RADIUS + 1), RADIUS, 0, 2 * Math.PI)
                cxt.closePath()

                cxt.fill()
            }
}

