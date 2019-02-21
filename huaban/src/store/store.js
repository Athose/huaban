// vuex 
import Vue from 'vue';
import Vuex from 'vuex'
Vue.use(Vuex)

//公用状态管理
const state={
	footstyle:true,
	username:'',
	ifLog:false,
	goodsId:0
}

//公用函数 用来改变公用状态
const mutations={
	changefoot(state,x){
		state.footstyle=x
	}
}


// 暴露导出
export default new Vuex.Store ({
	state,
	mutations
})
