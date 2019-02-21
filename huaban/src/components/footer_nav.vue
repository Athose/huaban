<template>
	<div class="footerNav" v-if='$store.state.footstyle'>
		<ul>
			<router-link tag='li' :to='item.turn' v-for='(item,index) in list' :key='index' @click.native='changeIcon(index)'>
				<img :src="item.isActive?item.iconActive:item.icon" alt="" />
				<p :style='item.isActive?"color:#e9c239":"color:#a2a2a2"'>{{item.title}}</p>
			</router-link>
		</ul>
	</div>
</template>

<script>
	export default {
		name:'footerNav',
		data(){
			return{
				list:[
					{turn:'/',title:'优选',icon:'../../static/img/youxuan_active.png',iconActive:'../../static/img/youxuan.png',isActive:true},
					{turn:'/fenlei',title:'分类',icon:'../../static/img/fenglei.png',iconActive:'../../static/img/fenlei_active.png',isActive:false},
					{turn:'/huaka',title:'花卡',icon:'../../static/img/huaka.png',iconActive:'../../static/img/huaka_active.png',isActive:false},
					{turn:'/shopcar',title:'购物车',icon:'../../static/img/shopcar.png',iconActive:'../../static/img/shopcar_active.png',isActive:false},
					{turn:'/my',title:'我的',icon:'../../static/img/my.png',iconActive:'../../static/img/my_active.png',isActive:false}
				]
			}
		},
	
		methods:{
			changeIcon(index){
				for(var i = 0;i<this.list.length;i++){
					this.list[i].isActive=false;
				}
				this.list[index].isActive=true;
			}
		},
		watch:{
			
		}
	}
</script>

<style lang="less">
	.footerNav {
		width: 100%;
		height: 104px;
		border-top:1px solid #a2a2a2;
		position: fixed;
		bottom: 0;
		left: 0;
		z-index: 999;
		background: #fff;
		font-family: "微软雅黑";
		ul {
			width: 100%;
			height: 104px;
			display: flex;
			justify-content: space-around;
			align-items: center;
			li {
				text-align: center;
				font-size: 21px;
			}
			li img{
				width: 44px;
				height: 44px;
			}
		}
	}
</style>