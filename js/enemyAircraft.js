var enemyAircraftImageconfig = {
	smallFly : "../image/smallFly.png",
	smallBoom : "../image/smallBoom.gif",
	mediumFly : "../image/mediumFly.png",
	mediumBoom : "../image/mediumBoom.gif",
	bigFly : "../image/BigFly.png",
	bigBoom : "../image/BigBoom.gif"
};
var random = function (min,max){
	return Math.floor(min+Math.random()*(max-min));
};
// 创建敌机类
var enemyAircraft = function(args){
	Aircraft.call(this,args);
	this.faction = "this is ememy";
	this.score = args.score;
	this.init =  Aircraft.prototype.init;
	this.init()
};

// 继承飞行器类的原型链
enemyAircraft.prototype.move = Aircraft.prototype.move;

// 小型飞机
var smallEnemyAircraft = function(){
	var options = {
		name : "small",
		HP : 10,
		X : random(19,286),
		Y : -200,
		sizeX : 32,
		sizeY : 24,
		speed : random(1,4),
		deadTime : 260,
		flyImage : enemyAircraftImageconfig.smallFly,
		boomImage : enemyAircraftImageconfig.smallBoom,
		score : 5
	};
	return new enemyAircraft(options)
};

// 中型飞机
var mediumEnemyAircraft = function(){
	var options = {
		name : "medium",
		HP : 15,
		X :  random(25,274),
		Y : -200,
		sizeX : 46,
		sizeY : 50,
		speed : random(1,3),
		deadTime : 300,
		flyImage : enemyAircraftImageconfig.mediumFly,
		boomImage : enemyAircraftImageconfig.mediumBoom,
		score : 8
	};
	return new enemyAircraft(options)
};

// 大型飞机
var bigEnemyAircraft = function(){
	var options = {
		name : "big",
		HP : 20,
		X : random(57,210),
		Y : -200,
		sizeX : 110,
		sizeY : 164,
		speed : 1,
		deadTime : 360,
		flyImage : enemyAircraftImageconfig.bigFly,
		boomImage : enemyAircraftImageconfig.bigBoom,
		score : 10
	};
	return new enemyAircraft(options)
};

// 工厂模式，可以再这里加入一些飞机的独有特性
var productEnemyAircraft = {};

productEnemyAircraft.small = function () {
	return smallEnemyAircraft();
};

productEnemyAircraft.medium = function () {
    return mediumEnemyAircraft();
};

productEnemyAircraft.big = function () {
    return bigEnemyAircraft();
};
        
productEnemyAircraft.factory = function (typeType) {
    return new productEnemyAircraft[typeType];
} ;

