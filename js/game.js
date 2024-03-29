const app = new PIXI.Application({
    width: 900,
    height: 600,
    backgroundColor: 0xff69b4,
});

document.getElementById("gameport").appendChild(app.view);

const backgroundContainer = new PIXI.Container();
const backgroundTexture = new PIXI.Texture.from("assets/pizza.png");

var toppingTextureValues = [
    "assets/pepperoni.png",
    "assets/pineapple.png",
    "assets/black_olives.png",
    "assets/love.png",
    "assets/fish.png"
];
//creating pizza stage

createBackground();
createToppings();

function createBackground(){
    
    var background = new PIXI.Sprite(backgroundTexture);
    backgroundContainer.addChild(background);
    app.stage.addChild(backgroundContainer);
}

function createToppings(){

    for(i = 0; i < toppingTextureValues.length; i++)
    {
        var toppingTexture = new PIXI.Texture.from(toppingTextureValues[i]);

        for(j = 0; j < 6; j++)
        {
            var topping = new PIXI.Sprite(toppingTexture);
        
            topping.anchor.set(0.5);
            topping.x = 100 + i*175;
            topping.y = 520;
        
            topping.interactive = true;
            topping.buttonMode = true;
        
            
            topping
                .on('pointerdown', onDragStart)
                .on('pointerup', onDragEnd)
                .on('pointerupoutside', onDragEnd)
                .on('pointermove', onDragMove);
        
        
            app.stage.addChild(topping);
            
        }
        
    }
}

function onDragStart(event){
    redrawSprite(this);
    this.data = event.data;
    this.dragging = true;
}

function redrawSprite(sprite)
{
    var parent = sprite.parent;
    parent.removeChild(sprite);
    parent.addChild(sprite);
};

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