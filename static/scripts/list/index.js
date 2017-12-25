new Vue({
    el: '#myApp',
    mixins: [commonObj.commonMixin()],   // mixins 公用方法
    data: {
    	fileUrlList: [
    		"../../static/images/list/bg-01.png",
    		"../../static/images/list/bg-01.png",
    		"../../static/images/list/bg-01.png",
    		"../../static/images/list/bg-01.png"
    	]
    },
    created: function () {
    	var _this = this;
    	var queryObj = url('?');
    	
    	//获取参数
    	if (queryObj && queryObj.code) {
    		console.log(queryObj.code);
    		queryObj.code = '';
    	}
    },
    mounted: function () {
        
    },
    methods: {
    	fileChange: function (e,index) {
    		console.log(this);
    		console.log(event, index);
    		var _this = this;
    			file = e.target,
    			value = file.value;
    			fileType = value.substr(value.lastIndexOf("."));
    		/*if (/(png)|(jpg)|(gif)/.test(fileType)) {
    			this.$toast("文件格式正确！");
    		} else {
    			this.$toast("文件格式错误！");
    		}
    		*/
    		var reader = new FileReader(); //新建FileReader对象
		    reader.readAsDataURL(file.files[0]); //读取为base64
		    //以下代码可以删除
		    reader.onloadstart = function(){
		        console.log('start');  //开始读取
		    };
		    reader.onprogress = function(e){
		        //这个是定时触发的事件，文件较大的时候较明显
		        //var p = '已完成：' + Math.round(e.loaded / e.total * 100) + '%' ;
		        console.log('uploading');  //文件较大，就会出现多个uploading
		    };
		    reader.onabort = function(){
		        console.log('abort'); //用作取消上传功能
		    };
		    reader.onerror = function(){
		        console.log('error'); //文件读取出错的时候触发，暂模拟不出
		    };
		    reader.onload = function(){
		        console.log('load complete'); //完成
		    };
		    //预览代码，没在onload里面写的原因是我不想
		    reader.onloadend = function (e) {
		        var dataURL = reader.result;
		        _this.$set(_this.fileUrlList, index, dataURL);
		        console.log(_this.fileUrlList);
		    }
    		
    	},
    	submitAction: function () {
           	var _this = this;
            var fileFormData = new FormData();
            // 通过DOM取文件数据
            var file0 =  document.getElementById("file0").files[0];
            var file1 =  document.getElementById("file1").files[0];
            var file2 =  document.getElementById("file2").files[0];
            var file3 =  document.getElementById("file3").files[0];
            if (!file0) {
            	_this.$toast("请上传现场照片！");
            	return;
            } else {
            	fileFormData.append('file0', file0, file0.name);
            }
            if (!file1) {
            	_this.$toast("责任方行驶证！");
            	return;
            } else {
            	fileFormData.append('file1', file1, file1.name);
            }
            if (!file2) {
            	_this.$toast("责任方车牌！");
            	return;
            } else {
            	fileFormData.append('file2', file2, file2.name);
            }
            if (!file3) {
            	_this.$toast("责任方车辆照片！");
            	return;
            } else {
            	fileFormData.append('file3', file3, file3.name);
            }
            
            _this.$http.post("xxxx.do", fileFormData).then(function (res) {
				var data = res.data;
				_this.$toast("提交成功！");
			}, function () {
				_this.$toast('系统繁忙，请稍后再试');
			});
        }
    }
});