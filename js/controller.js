// 获得主界面
var mainDiv = document.getElementById("maindiv");

// 获得开始界面
var startdiv = document.getElementById("startdiv");

// 获得游戏中分数显示界面
var scorediv = document.getElementById("scorediv");

// 获得分数界面
var scorelabel = document.getElementById("label");

// 获得暂停界面
var suspenddiv = document.getElementById("suspenddiv");

// 获得游戏结束界面
var enddiv = document.getElementById("enddiv");

// 获得游戏结束后分数统计界面
var planscore = document.getElementById("planscore");

// 获得游戏结束后摧毁敌机数统计界面
var hitcountlabel = document.getElementById("hitcount");

// 初始化分数
var total = totalScore.getInstance();
var scores = total.score;

// 创建敌机
var enemys = [];
var mark = 0,
	mark1 = 0;
var createEnemys = function () {
	mark++;
	if(mark == 20){
		mark1++;
		// 中飞机
		if(mark1 % 5 == 0){
			enemys.push(productEnemyAircraft.factory("medium"));
		}
		// 大飞机
		if(mark1 == 20){
			enemys.push(productEnemyAircraft.factory("big"));
			mark1 = 0;
		}
		// 小飞机
		else{
			enemys.push(productEnemyAircraft.factory("small"));
		}
		mark = 0;
	}
};

// 判断敌机是否越过边界
var enemyMoving = function(){

	var enemysLen = enemys.length;
	for (var i = 0; i < enemysLen; i++) {

		// 判断敌机是否被标记为死亡，
		if(enemys[i].isDead != true){
			enemys[i].move({score : scores});
		}
		
		// 判断敌机是否越过边界
		if(enemys[i].imageNode.offsetTop>550){
			mainDiv.removeChild(enemys[i].imageNode);
			enemys.splice(i,1);
			enemysLen--;
		}

		// 当敌机死亡，判断事件是否到达死亡等待时间
		if(enemys[i].isDead == true){
			enemys[i].deadTimes += 20;
			if(enemys[i].deadTimes >= enemys[i].deadTime){
				mainDiv.removeChild(enemys[i].imageNode);
				enemys.splice(i,1);
				enemysLen--;
			}
		}
	}

};

// 创建我方飞机
var selfPlan = commonSelfAircraft();
selfPlan.imageNode.setAttribute('id','selfPlan');

//移动事件
var selfMove = function(){
	var selfPlanElement = document.getElementById('selfPlan');
	var oevent = window.event || arguments[0];
	var selfPlanX = oevent.clientX;
	var selfPlanY = oevent.clientY;
	console.log(selfPlan.sizeX);
	selfPlanElement.style.left = selfPlanX - 500 - selfPlan.sizeX/2 + "px";
	selfPlanElement.style.top = selfPlanY - selfPlan.sizeY/2 + "px";
};

//判断本方飞机是否移出边界,如果移出边界,则取消mousemove事件,反之加上mousemove事件
var selfCrossBorder = function(){
	var oevent = window.event || arguments[0];
	var bodyObjX = oevent.clientX;
	var bodyObjY = oevent.clientY;
	var leftSide = document.getElementById("contentdiv").offsetLeft;
	var rightSide = document.getElementById("contentdiv").offsetLeft + document.getElementById("maindiv").offsetWidth;
	var topSide = document.getElementById("contentdiv").offsetTop;
	var bottomSide = document.getElementById("maindiv").offsetHeight;
	if(bodyObjX < leftSide || bodyObjX > rightSide || bodyObjY < topSide || bodyObjY > bottomSide){
		if(document.removeEventListener){
			mainDiv.removeEventListener("mousemove",selfMove,true);
		}
		else if(document.detachEvent){
			mainDiv.detachEvent("onmousemove",selfMove);
		}
	}
	else{
		if(document.addEventListener){
			mainDiv.addEventListener("mousemove",selfMove,true);
		}
		else if(document.attachEvent){
			mainDiv.attachEvent("nomousemove",selfMove);
		}
	}
};

var bodyobj = document.getElementsByTagName("body")[0];
if(document.addEventListener){
	//为本方飞机添加移动和暂停
	mainDiv.addEventListener("mousemove",selfMove,true);
	bodyobj.addEventListener("mousemove",selfCrossBorder,true);
}
else if(document.attachEvent){
	//为本方飞机添加移动
	mainDiv.attachEvent("onmousemove",selfMove);

}

// 创建子弹
var bullets = [];
var createBullets = function () {
	options = {
		X : parseInt(selfPlan.imageNode.style.left) + 30,
		Y : parseInt(selfPlan.imageNode.style.top) - 0
	};
	bullets.push(oddStraightBulle(options));
};

// 判断子弹是否越过边界
var bulletCrossBorder = function(){
	var bulletsLen = bullets.length;
	for (var i = 0; i < bulletsLen; i++) {
		bullets[i].bulletMove();
		if(bullets[i].imageNode.offsetTop<0){
			mainDiv.removeChild(bullets[i].imageNode);
			bullets.splice(i,1);
			bulletsLen--;
		}
	}
};

// 判断碰撞事件
var HitEvent = function(){

	var bulletsLen = bullets.length;
	var enemysLen = enemys.length;
	for(var k=0;k<bulletsLen;k++){
		for(var j=0;j<enemysLen;j++){
			
			// 判断我方飞机与敌机碰撞
			if(enemys[j].isDead == false) {
				if (enemys[j].imageNode.offsetLeft + enemys[j].sizeX >= selfPlan.imageNode.offsetLeft && enemys[j].imageNode.offsetLeft <= selfPlan.imageNode.offsetLeft + selfPlan.sizeX) {
					if (enemys[j].imageNode.offsetTop + enemys[j].sizeY >= selfPlan.imageNode.offsetTop + 40 && enemys[j].imageNode.offsetTop <= selfPlan.imageNode.offsetTop - 20 + selfPlan.sizeY) {
						selfPlan.imageNode.src = selfAircraftImageconfig.selfBoom;
						enddiv.style.display = "block";
						planscore.innerHTML = total.score;
						hitcountlabel.innerHTML = total.shatterNumber;
						if (document.removeEventListener) {
							mainDiv.removeEventListener("mousemove", selfMove, true);
							bodyobj.removeEventListener("mousemove", selfCrossBorder, true);
						}
						else if (document.detachEvent) {
							bodyobj.removeEventListener("mousemove", selfCrossBorder, true);
						}
						clearInterval(set);
					}
				}
			}
			
			// 判断子弹与敌机碰撞
			if((bullets[k].imageNode.offsetLeft+bullets[k].sizeX>enemys[j].imageNode.offsetLeft)&&(bullets[k].imageNode.offsetLeft<enemys[j].imageNode.offsetLeft+enemys[j].sizeX)){
				if(bullets[k].imageNode.offsetTop<=enemys[j].imageNode.offsetTop+enemys[j].sizeY&&bullets[k].imageNode.offsetTop+bullets[k].sizeY>=enemys[j].imageNode.offsetTop){
					//敌机血量减子弹攻击力
					enemys[j].HP = enemys[j].HP - bullets[k].attach;
					//敌机血量为0，敌机图片换为爆炸图片，死亡标记为true，计分
					if(enemys[j].HP == 0){
						enemys[j].imageNode.src=enemys[j].boomImage;
						totalScore.totalScoreMethod.addScore({score : enemys[j].score});
						scorelabel.innerHTML = total.score;
						enemys[j].isDead=true;
					}
					//删除子弹
					mainDiv.removeChild(bullets[k].imageNode);
					bullets.splice(k,1);
					bulletsLen--;
					break;
				}
			}
		}
	}
};

var start = function () {
	createEnemys();
	enemyMoving();
	createBullets();
	bulletCrossBorder();
	HitEvent();
};
var set;
var begin = function(){
	startdiv.style.display="none";
	mainDiv.style.display="block";
	scorediv.style.display="block";
	set = setInterval(start,20);
};
//游戏结束后点击继续按钮事件
function goOn(){
	location.reload(true);
}