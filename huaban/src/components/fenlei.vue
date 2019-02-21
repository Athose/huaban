<template>
	<div class="fenlei" v-if="vflag">
		<!--顶部搜索框-->
		<div class="search">
			<div class="logo">
				<img src="../../static/img/logo.png" />
			</div>
			<div class="search-inp">
				<img src="../../static/img/search.png" />
				<input type="text" name="" id="" value="" placeholder="iphone8" />
			</div>
			<div class="news">
				<img src="../../static/img/news.png" />
			</div>
		</div>
		<div class="fenlei_info">
			<div class="info_left">
				<ul>
					<li @click="cc(index)" v-for="(item,index) in categoryList" :key="index">
						<p>{{item.name}}</p>
					</li>
				</ul>
			</div>
			<div class="info_right">
				<router-view></router-view>
			</div>
		</div>
	</div>
</template>

<script>
	import fenleiInfo from './fenlei_info'
	export default {
		name: 'fenlei',
		data(){
			return{
				categoryList:[],
				canshu:0,
				vflag:false
			}
		},
		components:{
			fenleiInfo
		},
		methods:{
			getFenlei(){
				this.$axios({
					url:'http://za.feiguotech.com/category/getJdCategoryList',
					data:{
						
					},
					method:'post'
				}).then(res=>{
					
					this.categoryList=res.data.data;
					this.vflag=true;
				}).catch(err=>{
					console.log('请求失败');
				})
			},
			cc(index){
				this.canshu=index;
				this.$router.push({name:'fenleiInfo',params:{canshu:index}});
				console.log(this.canshu);
				var lis = document.querySelectorAll('.info_left>ul>li');
				for(var i = 0;i<lis.length;i++){
					lis[i].style.color='#848484';
					lis[i].style.borderLeft='0';
 				}
				lis[index].style.color='#000';
				lis[index].style.borderLeft='2px solid #ff6700'
			}
		},
		mounted(){
			this.getFenlei();
		}
	}
</script>

<style lang="less">
	::-webkit-scrollbar{
		width: 0px;
	}
	.router-link-active{
		color: #000000;
	}
	.fenlei {
		font-family: "微软雅黑";
		/*搜索框*/
		.search {
			width: 100%;
			box-sizing: border-box;
			padding: 0 20px;
			height: 120px;
			display: flex;
			justify-content: space-between;
			align-items: center;
			.logo {
				width: 60px;
				height: 60px;
				img {
					width: 60px;
				}
			}
			.search-inp {
				width: 560px;
				height: 62px;
				background: #eeeeee;
				border-radius: 15px;
				display: flex;
				justify-content: space-around;
				box-sizing: border-box;
				align-items: center;
				padding: 0 15px;
				img {
					height: 62px;
				}
				input {
					border: 0;
					outline: 0;
					width: 488px;
					background: transparent;
					box-sizing: border-box;
					padding-left: 10px;
					font-size: 23px;
				}
				input::-webkit-input-placeholder {
					color: #bcbcbc;
					font-size: 23px;
				}
			}
			.news {
				width: 60px;
				height: 60px;
				img {
					width: 60px;
				}
			}
		}
		/*分类内容*/
		.fenlei_info{
			width: 100%;
			height: calc(100vh - 120px - 104px);
			display: flex;
			justify-content: flex-start;
			.info_left{
				height: 100%;
				width: 170px;
				border-right:1px solid #A2A2A2;
				ul{
					height: 100%;
					width: 100%;
					overflow: hidden;
					overflow-y: scroll;
					li{
						width: 100%;
						height: 85px;
						font-size: 28px;
						color: #848484;
						line-height: 85px;
						box-sizing: border-box;
						text-align: center;
					}
				}
			}
			.info_right{
				height: 100%;
				width: 580px;
				overflow: hidden;
				overflow-y: scroll;
			}
		}
	}
</style>