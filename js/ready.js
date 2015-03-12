/**
 * Created by gengf.jy on 2014/12/10.
 */
var collide = function() {
    for (var k = 0; k < bulletslen; k++) {
        for (var j = 0; j < enemyslen; j++) {
            // 判断碰撞本方飞机
            if (enemys[j].planisdie == false) {
                var enemyLX = enemys[j].imagenode.offsetLeft + enemys[j].plansizeX,
                    enemyL = enemys[j].imagenode.offsetLeft,
                    enemyTY = enemys[j].imagenode.offsetTop + enemys[j].plansizeY,
                    enemyT = enemys[j].imagenode.offsetTop,
                    selfL = selfplan.imagenode.offsetLeft,
                    selfLX = selfplan.imagenode.offsetLeft + selfplan.plansizeX,
                    selfT = selfplan.imagenode.offsetTop + 40,
                    selfTY = selfplan.imagenode.offsetTop - 20 + selfplan.plansizeY;
                if (enemyLX >= selfL && enemyL <= selfR) {
                    if (enemyTY >= selfT && enemyT <= selfTY) {
                        // 加入观察者模式，当游戏结束，发布主题，相关订阅者接受主题，执行方法
                        gameOver();
                        clearInterval(set);
                    }
                }
                // 判断子弹与敌机碰撞
                var enemyLX = enemys[j].imagenode.offsetLeft + enemys[j].plansizeX,
                    enemyL = enemys[j].imagenode.offsetLeft,
                    enemyTY = enemys[j].imagenode.offsetTop + enemys[j].plansizeY,
                    enemyT = enemys[j].imagenode.offsetTop,
                    bulletL = bullets[k].bulletimage.offsetLeft,
                    bulletLX = bullets[k].bulletimage.offsetLeft + bullets[k].bulletsizeX,
                    bulletT = bullets[k].bulletimage.offsetTop,
                    bulletTY = bullets[k].bulletimage.offsetTop + bullets[k].bulletsizeY;
                if (bulletLX > enemyL && bulletL < enemyLX) {
                    if (bulletT <= enemyTY && bulletTY >= enemyT) {
                        // 加入观察者模式，当子弹与敌机碰撞时，发布主题，相关订阅者接受主题，执行方法

                    }
                }
            }
        }
    }

    var gameOver = function () {
        selfplan.imagenode.src = "image/本方飞机爆炸.gif";
        enddiv.style.display = "block";
        planscore.innerHTML = scores;
        if (document.removeEventListener) {
            mainDiv.removeEventListener("mousemove", yidong, true);
            bodyobj.removeEventListener("mousemove", bianjie, true);
        }
        else if (document.detachEvent) {
            mainDiv.detachEvent("onmousemove", yidong);
            bodyobj.removeEventListener("mousemove", bianjie, true);
        }
    }

    var df = function () {
        enemys[j].planhp = enemys[j].planhp - bullets[k].bulletattach;
        //敌机血量为0，敌机图片换为爆炸图片，死亡标记为true，计分
        if (enemys[j].planhp <= 0) {
            scores = scores + enemys[j].planscore;
            scorelabel.innerHTML = scores;
            enemys[j].imagenode.src = enemys[j].planboomimage;
            enemys[j].planisdie = true;
        }
        //删除子弹
        mainDiv.removeChild(bullets[k].bulletimage);
        bullets.splice(k, 1);
        bulletslen--;
    }


    var Aircraft = function (arg) {
        var args = arg || {}
        this.planhp = args.hp;
    }

// 行为
    Aircraft.prototype.planmove = function () {
        this.imagenode.style.top = this.imagenode.offsetTop + this.plansudu + 1 + "px";
    };

    Aircraft.prototype.bullet = function (callback) {
        if (typeof(callback) == "undefined") {
            console.log("回调函数错误")
        }
        else if (typeof(callback) == "function") {
            // 初始化子弹
        }
    };

// 初始化
    Aircraft.prototype.init = function () {
        this.planhp = 100;
        // this.imagenode = document.createElement("img");
        // this.imagenode.style.left = this.planX+"px";
        // this.imagenode.style.top = this.planY+"px";
        // this.imagenode.src = imagesrc;
        // mainDiv.appendChild(this.imagenode);
    };
    var aircraft = new Aircraft();
    aircraft.bullet();
};