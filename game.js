window.addEventListener("load",function() {
var Q = window.Q = Quintus({audioSupported: [ 'wav','mp3','ogg' ]})
        .include("Sprites, Scenes, Input, 2D, Anim, Touch, UI, TMX, Audio")
        // Maximize this game to whatever the size of the browser is
        .setup({ maximize: true })
        // And turn on default input controls and touch input (for UI)
        .controls(true).touch()
        // Enable sounds.
        .enableSound();


Q.NONE=0;
Q.SPRITE_BLUE_PIECE = 1;
Q.SPRITE_BLUE_PIECE = 2;
Q.gravityX=0; Q.gravityY=0;
var turnTracking=0;
var player="Blue";
var placementTracking=0;

Q.nextTurn = function(){
	if (player=="Blue"){
		player="Red";
	}
	else if (player=="Red"){
		player="Blue";
		turnTracking++;
	}
}
Q.nextPlacement= function(){
	stage=Q.stage();
	if (placementTracking<=0){
		stage.insert(new Q.BF({ x: 700, y: 0 }));
	}
	else if (placementTracking<=6){
		stage.insert(new Q.BB({ x: 700, y: 0 }));
	}
	else if (placementTracking<=14){
		stage.insert(new Q.B9({ x: 700, y: 0 }));
	}
	else if (placementTracking<=19){
		stage.insert(new Q.B8({ x: 700, y: 0 }));
	}
	else if (placementTracking<=23){
		stage.insert(new Q.B7({ x: 700, y: 0 }));
	}
	else if (placementTracking<=27){
		stage.insert(new Q.B6({ x: 700, y: 0 }));
	}
	else if (placementTracking<=31){
		stage.insert(new Q.B5({ x: 700, y: 0 }));
	}
	else if (placementTracking<=34){
		stage.insert(new Q.B4({ x: 700, y: 0 }));
	}
	else if (placementTracking<=36){
		stage.insert(new Q.B3({ x: 700, y: 0 }));
	}
	else if (placementTracking<=37){
		stage.insert(new Q.B2({ x: 700, y: 0 }));
	}
	else if (placementTracking<=38){
		stage.insert(new Q.B1({ x: 700, y: 0 }));
	}
	else if (placementTracking<=39){
		stage.insert(new Q.BS({ x: 700, y: 0 }));
	}


	else if (placementTracking<=40){
		stage.insert(new Q.RF({ x: 700, y: 0 }));
	}
	else if (placementTracking<=46){
		stage.insert(new Q.RB({ x: 700, y: 0 }));
	}
	else if (placementTracking<=54){
		stage.insert(new Q.R9({ x: 700, y: 0 }));
	}
	else if (placementTracking<=59){
		stage.insert(new Q.R8({ x: 700, y: 0 }));
	}
	else if (placementTracking<=63){
		stage.insert(new Q.R7({ x: 700, y: 0 }));
	}
	else if (placementTracking<=67){
		stage.insert(new Q.R6({ x: 700, y: 0 }));
	}
	else if (placementTracking<=71){
		stage.insert(new Q.R5({ x: 700, y: 0 }));
	}
	else if (placementTracking<=74){
		stage.insert(new Q.R4({ x: 700, y: 0 }));
	}
	else if (placementTracking<=76){
		stage.insert(new Q.R3({ x: 700, y: 0 }));
	}
	else if (placementTracking<=77){
		stage.insert(new Q.R2({ x: 700, y: 0 }));
	}
	else if (placementTracking<=78){
		stage.insert(new Q.R1({ x: 700, y: 0 }));
	}
	else if (placementTracking<=79){
		stage.insert(new Q.RS({ x: 700, y: 0 }));
	}

}
Q.Sprite.extend("Piece", {
  init: function(p,defaults) {

    this._super(p,Q._defaults(defaults||{},{
      collisionMask: Q.NONE,
      originalX: p.x;
      originalY: p.y;
      placing: true;
    }));

    this.add("2d");
    this.on("drag");
    this.on("touchEnd");

    },

    drag: function(touch) {
       this.p.dragging = true;
       this.p.x = touch.origX + touch.dx;
       this.p.y = touch.origY + touch.dy;
     },

     touchEnd: function(touch) {
       this.p.dragging = false;
	if (placing==true) this.validatePlacement (this.p.x, this.p.y);
	else this.validateMove (this.p.x, this.p.y);
     },

     collide: function(x, y){
	this.p.x=1000; this.p.y=1000;
	var destroyThis=false;
	var destroyOther=false;
	var collided=Q.stage().locate(x, y);
	this.p.x=x; this.p.y=y;
	if (collided==null){
	  this.originalX=p.x;
	  this.originalY=p.y;
	  Q.endTurn();
	}
	if (collided.p.type!=this.p.type){
		this.p.x=originalX; this.p.y=originalY;
	}
	else if (this.p.value==8 && collided.p.value=='B' || this.p.value=='S' && collided.p.value=='1'){ destroyThis=false; destroyOther=true;}
	else if (collided.p.value=='F') Q.victory();
	else if (collided.p.value<=this.p.value || collided.p.value=='B'){
			destroyThis=true;
			
	}
	else if (collided.p.value>=this.p.value && collided.p.value!='B') destroyOther=true;

	if (destroyOther) {collided.destroy(); this.p.x=x; this.p.y=y;}
	if (destroyThis) {this.destroy();}
	if (destroyThis||destroyOther) Q.endTurn();
     },
     place: function (x,y){
	while (placing==true) this.p.dragging=true;
     },
     validateMove: function (x, y){
	var validMove=true;
	x=Math.floor(x/(Q.width/10))*(Q.width/10)+(Q.width/20);
	y=Math.floor(y/(Q.height/10))*(Q.height/10)+(Q.height/20);
	if (x!=originalX && y!=originalY) validMove=false;
	if (Math.abs(x-originalX)>=33 || x-originalX==0) validMove=false;
	if (Math.abs(y-originalY)>=33 || x-originalX==0) validMove=false;
	if (validMove) this.collide(x,y);
	else{this.p.x=originalX; this.p.y=originalY;}
     }
   
});

Q.Piece.extend("Blue", {
  init: function(p) {

    this._super(p,{
      asset: "blue-rectangle.png",
      type: Q.BLUE_PIECE,
    }));
	},

     validatePlacement: function(x, y){
	var validPlacement=true;
	x=Math.floor(x/(Q.width/10))*(Q.width/10)+(Q.width/20);
	y=Math.floor(y/(Q.height/10))*(Q.height/10)+(Q.height/20);
	if (y>(Q.height/20)+(Q.height/10)*4 || y<0) validPlacement=false;
	if (Q.stage().locate(x,y)!=null) validPlacement=false;
	if (validPlacement) {this.p.x=x; this.p.y=y; placing=false; 
		if (turnTracking<40)Q.nextPlacement();
		else Q.endTurn();}
     },
     drag: function(touch) {
       if (player=="Blue") this._super(touch);
     }
});

Q.Blue.extend("B9", {
  init: function(p) {
    this._super(p,{
      value:9
    });

    },

    touchEnd: function(touch) {
	this.p.dragging = false;
	this.validateMove(this.p.x, this.p.y);
    }
    validateMove: function(x, y){
	var invalidMove=false;
	x=Math.floor(x/(Q.width/10))*(Q.width/10)+(Q.width/20);
	y=Math.floor(y/(Q.height/10))*(Q.height/10)+(Q.height/20);

	if (y!=this.p.originalY && x!=this.p.originalX){
	  invalidMove=true;
	}

	var xsign, ysign;
	if (x>this.p.originalX) xSign=1; else xSign=-1;
	if (y>this.p.originalY) ySign=1; else ySign=-1;

	if (!invalidMove){for (var i=(Q.width/10); i<xSign*(x-this.p.originalX); i=i+(Q.width/10)*xSign){
	  if (Q.stage().locate(originalX+i, y) != null && this.p.originalX+i!=x){
		invalidMove=true;
		break;
	  }
	}}
	if (!invalidMove){for (var i=(Q.height/10); i<ySign*(y-this.p.originalY); i=i+(Q.height/10)*ySign){
	  if (Q.stage().locate(x, originalY+i) != null && this.p.originalY+i!=y){
		invalidMove=true;
		break;
	  }
	}}

	if (!invalidMove) this.collide(x,y);
	else{this.p.x=originalX; this.p.y=originalY;}
    }
  }

});

Q.Blue.extend("B8", {
  init: function(p) {
    this._super(p,{
      value: 8
    });
  }
});

Q.Blue.extend("B7", {
  init: function(p) {
    this._super(p,{
      value: 7
    });
  }
});

Q.Blue.extend("B6", {
  init: function(p) {
    this._super(p,{
      value: 6
    });
  }
});

Q.Blue.extend("B5", {
  init: function(p) {
    this._super(p,{
      value: 5
    });
  }
});
Q.Blue.extend("B4", {
  init: function(p) {
    this._super(p,{
      value: 4
    });
  }
});
Q.Blue.extend("B3", {
  init: function(p) {
    this._super(p,{
      value: 3
    });
  }
});
Q.Blue.extend("B2", {
  init: function(p) {
    this._super(p,{
      value: 2
    });
  }
});
Q.Blue.extend("B1", {
  init: function(p) {
    this._super(p,{
      value: 1
    });
  }
});
Q.Blue.extend("BS", {
  init: function(p) {
    this._super(p,{
      value: 'S'
    });
  }
});
Q.Blue.extend("BB", {
  init: function(p) {
    this._super(p,{
      value: 'B'
    });
  },
  drag: function(touch) {
       if (placing==true) this._super(touch); 
  }
});
Q.Blue.extend("BF", {
  init: function(p) {
    this._super(p,{
      value: 'F'
    });
  },
  drag: function(touch) {
       if (placing==true) this._super(touch); 
  }
});


////////////////////////////RED/////////////////////////////
Q.Piece.extend("Red", {
  init: function(p) {

    this._super(p,{
      asset: "red rectangle.jpg",
      type: Q.RED_PIECE,
    }));
	},

     validatePlacement: function(x, y){
	var validPlacement=true;
	x=Math.floor(x/(Q.width/10))*(Q.width/10)+(Q.width/20);
	y=Math.floor(y/(Q.height/10))*(Q.height/10)+(Q.height/20);
	if (y<Q.height-((Q.height/20)+(Q.height/10)*4) || y>Q.height) validPlacement=false;
	if (Q.stage().locate(x,y)!=null) validPlacement=false;
	if (validPlacement) {this.p.x=x; this.p.y=y; placing=false; 
		if (turnTracking<40)Q.nextPlacement();
		else Q.endTurn();}
     },
     drag: function(touch) {
       if (player=="Red") this._super(touch);
     }
});

Q.Red.extend("R9", {
  init: function(p) {
    this._super(p,{
      value:9
    });

    },

    touchEnd: function(touch) {
	this.p.dragging = false;
	this.validateMove(this.p.x, this.p.y);
    }
    validateMove: function(x, y){
	var invalidMove=false;
	x=Math.floor(x/(Q.width/10))*(Q.width/10)+(Q.width/20);
	y=Math.floor(y/(Q.height/10))*(Q.height/10)+(Q.height/20);

	if (y!=this.p.originalY && x!=this.p.originalX){
	  invalidMove=true;
	}

	var xsign, ysign;
	if (x>this.p.originalX) xSign=1; else xSign=-1;
	if (y>this.p.originalY) ySign=1; else ySign=-1;

	if (!invalidMove){for (var i=(Q.width/10); i<xSign*(x-this.p.originalX); i=i+(Q.width/10)*xSign){
	  if (Q.stage().locate(originalX+i, y) != null && this.p.originalX+i!=x){
		invalidMove=true;
		break;
	  }
	}}
	if (!invalidMove){for (var i=(Q.height/10); i<ySign*(y-this.p.originalY); i=i+(Q.height/10)*ySign){
	  if (Q.stage().locate(x, originalY+i) != null && this.p.originalY+i!=y){
		invalidMove=true;
		break;
	  }
	}}

	if (!invalidMove) this.collide(x,y);
	else{this.p.x=originalX; this.p.y=originalY;}
    }
  }

});

Q.Red.extend("R8", {
  init: function(p) {
    this._super(p,{
      value: 8
    });
  }
});

Q.Red.extend("R7", {
  init: function(p) {
    this._super(p,{
      value: 7
    });
  }
});

Q.Red.extend("R6", {
  init: function(p) {
    this._super(p,{
      value: 6
    });
  }
});

Q.Red.extend("R5", {
  init: function(p) {
    this._super(p,{
      value: 5
    });
  }
});
Q.Red.extend("R4", {
  init: function(p) {
    this._super(p,{
      value: 4
    });
  }
});
Q.Red.extend("R3", {
  init: function(p) {
    this._super(p,{
      value: 3
    });
  }
});
Q.Red.extend("R2", {
  init: function(p) {
    this._super(p,{
      value: 2
    });
  }
});
Q.Red.extend("R1", {
  init: function(p) {
    this._super(p,{
      value: 1
    });
  }
});
Q.Red.extend("RS", {
  init: function(p) {
    this._super(p,{
      value: 'S'
    });
  }
});
Q.Red.extend("RB", {
  init: function(p) {
    this._super(p,{
      value: 'B'
    });
  },
  drag: function(touch) {
       if (placing==true) this._super(touch); 
  }
});
Q.Red.extend("RF", {
  init: function(p) {
    this._super(p,{
      value: 'F'
    });
  },
  drag: function(touch) {
       if (placing==true) this._super(touch); 
  }
});


Q.scene("level1",function(stage) {
  Q.stageTMX("map.tmx",stage);
});


Q.loadTMX("map.tmx, blue-rectangle.png, red rectangle.jpg", function() {
    Q.stageScene("level1");
  
}, {
  progressCallback: function(loaded,total) {
    var element = document.getElementById("loading_progress");
    element.style.width = Math.floor(loaded/total*100) + "%";
    if (loaded == total) {
      document.getElementById("loading").remove();
    }
  }
});