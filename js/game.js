const app = new PIXI.Application({
    width: 900,
    height: 700,
    backgroundColor: 0xff69b4,
});

document.getElementById("gameport").appendChild(app.view);

const backgroundContainer = new PIXI.Container();
const backgroundTexture = new PIXI.Texture.from("../assets/pizzabackground_900X600.png");

var toppingTextureValues = [
    "../assets/texture.png",
    "../assets/texture1.png",
    "../assets/texture2.png",
    "../assets/texture3.png",
    "../assets/texture4.png"
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
            topping.y = 620;
        
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
    this.data = event.data;
    this.dragging = true;
    
    //redrawing sprite to be on top
    var parent = this.parent;
    parent.removeChild(this);
    parent.addChild(this);
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