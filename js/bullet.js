// 子弹配置
var bulletImageConfig = {
    oddBullet : "../image/bullet1.png"
};

// 子弹类
var bullet = function(args){
    this.X = args.X;												// 子弹的x坐标
    this.Y = args.Y;												// 子弹的y坐标
    this.sizeX = args.sizeX;										// 子弹的x大小
    this.sizeY = args.sizeY;										// 子弹的y大小
    this.image = args.image;										// 子弹的图片
    this.attach = args.attach || 10;									// 子弹的攻击力，初始化为1
    this.imageNode = null;
};

// 子弹行为 (该方法可以重写)
bullet.prototype.move = function(){
    this.imageNode.style.top = this.imageNode.offsetTop - 20 + "px";
};

// 初始化子弹 (图片可以分离到具体的子弹型号,该方法可以重写)
bullet.prototype.init = function(){
    this.imageNode = document.createElement("img");
    this.imageNode.style.left = this.X + "px";
    this.imageNode.style.top = this.Y + "px";
    this.imageNode.src =this.image;
    mainDiv.appendChild(this.imageNode);
};

// 直行子弹，单行到多行
var straightBullet = function(args){
    bullet.call(this,args);
    this.init =  bullet.prototype.init;
    this.init();

};
straightBullet.prototype.bulletMove = bullet.prototype.move;

// 单行直行子弹
var oddStraightBulle = function(args){
    var options = {
        X : args.X,
        Y : args.Y,
        attach : 1,
        sizeX : 6,
        sizeY : 14,
        image : bulletImageConfig.oddBullet
    };
    return new straightBullet(options)
};
