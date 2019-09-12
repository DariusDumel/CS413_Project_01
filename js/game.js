const app = new PIXI.Application({
    width: 900,
    height: 700,
    backgroundColor: 0xff69b4,
});

document.getElementById("gameport").appendChild(app.view);

const peperoniTexture = new PIXI.Texture.from("../assets/texture.png")
//creating pizza stage

createBackground();
createToppings();

function createBackground(){
    
    const backgroundContainer = new PIXI.Container();
    const backgroundTexture = new PIXI.Texture.from("../assets/pizzabackground_900X600.png");
    var background = new PIXI.Sprite(backgroundTexture);
    backgroundContainer.addChild(background);
    app.stage.addChild(backgroundContainer);
}

//creating toppings bar
function createToppings(){
    var pepperoni = new PIXI.Sprite(peperoniTexture);

    pepperoni.anchor.set(0.5);
    pepperoni.x = 300;
    pepperoni.y = 300;

    pepperoni.interactive = true;
    pepperoni.buttonMode = true;

    
    pepperoni
        .on('pointerdown', onDragStart)
        .on('pointerup', onDragEnd)
        .on('pointerupoutside', onDragEnd)
        .on('pointermove', onDragMove);


    app.stage.addChild(pepperoni);
}

function onDragStart(event){
    this.data = event.data;
    this.dragging = true;
}

function onDragEnd(){
    this.dragging = false;
    this.data = null;
}

function onDragMove(){
    if(this.dragging){
        const newPosition = this.data.getLocalPosition(this.parent);
        this.x = newPosition.x;
        this.y = newPosition.y;
    }
}

