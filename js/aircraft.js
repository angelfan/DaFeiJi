var mainDiv=document.getElementById("maindiv");

// 创建飞行器类
var Aircraft = function(args){
	this.name = args.name;										// 飞行器的名字
	this.HP = args.HP;											// 飞行器血量
	this.X = args.X;
	this.Y = args.Y;
	this.sizeX = args.sizeX;
	this.sizeY = args.sizeY;
	this.speed = args.speed;
	this.flyImage = args.flyImage;								// 飞行时图片
	this.boomImage = args.boomImage;							// 爆炸时图片
	this.isDead = false;
	this.deadTimes = 0;
	this.deadTime = args.deadTime;
	this.imageNode = null;
};

// 飞行器行为
Aircraft.prototype.move = function(args){
	if(args.scores <= 50000){
		this.imageNode.style.top = this.imageNode.offsetTop + this.speed + "px";
	}
	else if(args.scores > 50000 && args.scores <= 100000){
		this.imageNode.style.top = this.imageNode.offsetTop + this.speed + 1 + "px";
	}
	else if(args.scores > 100000 && args.scores <= 150000){
		this.imageNode.style.top = this.imageNode.offsetTop + this.speed + 2 + "px";
	}
	else if(args.scores > 150000 && args.scores <= 200000){
		this.imageNode.style.top = this.imageNode.offsetTop + this.speed + 3 + "px";
	}
	else if(args.scores > 200000 && args.scores <= 300000){
		this.imageNode.style.top = this.imageNode.offsetTop + this.speed + 4 + "px";
	}
	else{
		this.imageNode.style.top = this.imageNode.offsetTop + this.speed + 1 + "px";
	}
};

// 初始化飞行器
Aircraft.prototype.init = function(){
	this.imageNode = document.createElement("img");
	this.imageNode.style.left = this.X + "px";
	this.imageNode.style.top = this.Y + "px";
	this.imageNode.src =this.flyImage;
	mainDiv.appendChild(this.imageNode);
};
