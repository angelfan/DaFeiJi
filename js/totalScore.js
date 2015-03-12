// 单例模式
var totalScore = (function(){

	// 构造函数
	var scoreConstruct = function(args){
		var args = args || {};
		this.score = args.score || 0;
		this.shatterNumber = args.number || 0;
	};

	// 实例容器
	var instance;

    // 获取实例的方法
    // 返回Singleton的实例
	var getInstance = function(args){
		if (instance === undefined){
			instance = new scoreConstruct(args);
		}
		return instance;
	};

	// totalScore单例方法
	var totalScoreMethod = {
		
		// 增分数 
		addScore : function(args){
			if (instance !== undefined){
				instance.score = instance.score + args.score;
				instance.shatterNumber = instance.shatterNumber + 1;
			}else{
				return getInstance(args);
			}
		},
		
		// 减分数
		subScore : function(args){
			if (instance !== undefined){
				instance.score = instance.score - args.score;
				instance.shatterNumber = instance.shatterNumber + 1;
			}else{
				return getInstance(args);
			}
		}
	};
	
	return {
		getInstance : getInstance,
		totalScoreMethod : totalScoreMethod
	}

})();
