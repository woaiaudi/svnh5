// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import FastClick from 'fastclick'
import ISJS from 'is_js'

import router from './router/index'
import App from './App'

import {
	AlertPlugin,
	querystring,
	ConfirmPlugin,
	AjaxPlugin
} from 'vux'

Vue.use(AlertPlugin) //在根组件中 全局导入
Vue.use(ConfirmPlugin)

//ajax请求 插件
Vue.use(AjaxPlugin)

//定义全局的 ISJS对象
Vue.prototype.$ISJS = ISJS

FastClick.attach(document.body)

Vue.config.productionTip = false

Vue.prototype.showAlert = function(msgContent = '提醒内容', msgTitle = '提醒') {
	this.$vux.alert.show({
		title: msgTitle,
		content: msgContent
	})
}

Vue.prototype.showConfirm = function(msgContent = '提醒内容', okHandler, msgTitle = '提醒', cancelHandler) {
	const self = this;
	this.$vux.confirm.show({
		title: msgTitle,
		content: msgContent,
		onConfirm() {
			if(ISJS.existy(okHandler)) {
				okHandler(self)
			}
		},
		onCancel() {
			if(ISJS.existy(cancelHandler)) {
				cancelHandler(self)
			}
		}
	})
}

/**
 * 基础请求
 */
Vue.prototype.BaseHttp = function(url, paramMap, on200Code, onErrorCode,onCatch) {
	this.$http.defaults.baseURL = 'http://192.168.2.156:8080/svnlog/';
	
	//postman 调试用，不添加时间戳，会返回304 not modify
	//paramMap.t = (Date.parse(new Date())/1000);
	
	this.$http({
			url: url,
			method: "GET",
			params: paramMap
		})
		.then(response => {
			if(response.data.resultCode == 1) {
				if(ISJS.existy(on200Code)) {
					on200Code(response.data.data)
				}
			} else {
				if(ISJS.existy(onErrorCode)) {
					onErrorCode(response.data.msg)
				}
			}
		})
		.catch((error) => {
			if(ISJS.existy(onCatch)) {
				onCatch(error)
			}
		});
}



/* eslint-disable no-new */
new Vue({
	router,
	mounted: function() {
		//设置 is.eppPhone(value:any)  检验格式为中国手机号码
		this.$ISJS.setRegexp(/^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/, 'eppPhone');
	},
	render: h => h(App)
}).$mount('#app-box')