var selfAircraftImageconfig = {
	selfFly : "../image/selfFly.gif",
	selfBoom : "../image/selfBoom.gif"
};

// 创建我方飞行器类
var selfAircraft = function(args){
	Aircraft.call(this,args);
	this.faction = "this is myself"
	this.init =  Aircraft.prototype.init;
	this.init()
};

// 普通的我方飞行器
var commonSelfAircraft = function(){
	var options = {
		name : "common",
		HP : 20,
		X : 120,
		Y : 485,
		sizeX : 66,
		sizeY : 80,
		flyImage : selfAircraftImageconfig.selfFly,
		boomImage : selfAircraftImageconfig.selfBoom
	};
	return new selfAircraft(options)
};



