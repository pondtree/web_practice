//todo score

var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

canvas.width = window.innerWidth - 100;
canvas.height = window.innerHeight - 100;

var img2 = new Image()
img2.src = 'dino.png'

var dino = {
    x:10,
    y:200,
    width:50,
    height:50,
    draw(){
        ctx.fillStyle = "green";
        //ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.drawImage(img2, this.x, this.y, this.width, this.height)
    }
}
//dino.draw()

var img1 = new Image()
img1.src = 'cactus.png'

class Cactus{
    constructor(){
        this.x = 500;
        this.y = 200;
        this.width = 50;
        this.height = 50;
    }
    draw(){
        ctx.fillStyle = "red";
        //ctx.fillRect(this.x,this.y,this.width,this.height);
        ctx.drawImage(img1,this.x,this.y, this.width, this.height)
    }
}

var cactus = new Cactus()
//cactus.draw()

var timer = 0;
var cactuss = [];
var jump_timer = 0;
var animation;

function doByFrame(){
    animation = requestAnimationFrame(doByFrame);
    timer++;

    ctx.clearRect(0,0,canvas.width, canvas.height);

    if (timer % 120 == 0){
        var cactus = new Cactus();
        cactuss.push(cactus);
    }

    cactuss.forEach((a, i, o)=>{
        //remove
        if (a.x < 0){
            o.splice(i,1)
        }
        a.x-=2;
        collision_check(dino,a);
        a.draw();
    })
    if (jump == true){
        dino.y-=2;
        jump_timer++;
    }
    if (jump == false){
        if (dino.y < 200){
            dino.y+=2;
        }
        
    }
    if (jump_timer > 50){
        jump = false;
        jump_timer = 0;
    }
    
    dino.draw()
}

doByFrame();

//collistion check
function collision_check(dino, cactus){
    var x_check = cactus.x - (dino.x + dino.width);
    var y_check = cactus.y - (dino.y + dino.height);
    if (x_check < 0 && y_check < 0){
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        cancelAnimationFrame(animation)
    }
}


//jump
var jump = false;
document.addEventListener('keydown', function(e){
    if (e.code === 'Space'){
        jump = true;
    }
})