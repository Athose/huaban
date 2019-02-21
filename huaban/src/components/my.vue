<template>
	<div class="my">
		<div class="unLog">
			<h1>我的</h1>
			<img src="../../static/img/myTou.png" @click="toLogin()"/>
			<h2>{{this.$store.state.ifLog?'用户'+this.$store.state.username:'未登录'}}</h2>
		</div>
		<div class="myInfo">
			<div class="yue">
				<p>账户余额</p>
				<p>￥0.00<i></i></p>
			</div>
			<div class="tixian">
				<div class="tixianInfo">
					<p>可提现金额</p>
					<p>申请提现</p>
					<p>￥0.00</p>
				</div>
				<div class="xiaofei">
					<p>可消费金额</p>
					<p>￥0.00</p>
				</div>
			</div>
			<div class="jiekuan common">
				<p>我要借款</p>
				<p>最高可借5万元现金，极速审核&nbsp;&nbsp;&nbsp;<i></i></p>
			</div>
			<div class="dindan common">
				<p>我的订单</p>
				<p><i></i></p>
			</div>
			<div class="dizhi common">
				<p>地址管理</p>
				<p><i></i></p>
			</div>
			<div class="piaojuan common">
				<p>我的卷包</p>
				<p><i></i></p>
			</div>
			<div class="yijian common">
				<p>意见反馈</p>
				<p><i></i></p>
			</div>
			<div class="us common">
				<p>关于我们</p>
				<p><i></i></p>
			</div>
			<div class="us common">
				<p>退出登录</p>
				<p><i></i></p>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'my',
		data(){
			return{
				
			}
		},
		methods:{
			toLogin(){
				this.$router.push({name:'Login'});
			}
		}
	}
</script>

<style lang="less">
	.my {
		width: 100%;
		font-family: "微软雅黑";
		background: #f2f2f2;
		padding-bottom: 104px;
		.unLog {
			width: 100%;
			height: 380px;
			text-align: center;
			background: #fbc200;
			h1 {
				line-height: 100px;
				font-size: 30px;
				color: #3e3d3c;
				font-weight: 500;
			}
			img {
				width: 130px;
				height: 130px;
			}
			h2 {
				line-height: 75px;
				font-size: 30px;
				color: #3e3d3c;
				font-weight: 500;
			}
		}
		.myInfo {
			width: 100%;
			.yue {
				box-sizing: border-box;
				padding: 0 33px;
				width: 100%;
				height: 125px;
				line-height: 125px;
				background: #fff;
				border-bottom: 1px solid #f2f2f2;
				display: flex;
				justify-content: space-between;
				p {
					font-size: 34px;
					color: #000;
					i {
						display: inline-block;
						width: 33px;
						height: 33px;
						background: url(../../static/img/right.png) no-repeat center center;
						background-size: cover;
						position: relative;
						top: 4px;
					}
				}
			}
			.tixian {
				box-sizing: border-box;
				padding: 0 33px;
				width: 100%;
				height: 125px;
				background: #fff;
				display: flex;
				justify-content: space-between;
				margin-bottom: 20px;
				div {
					width: 50%;
				}
				.tixianInfo {
					box-sizing: border-box;
					padding-top: 23px;
					display: flex;
					flex-flow: wrap;
					justify-content: space-between;
					border-right: 1px solid #f2f2f2;
					p {
						flex: 0 0 40%;
						width: 50%;
					}
					p:nth-child(1) {
						font-size: 24px;
						color: #9e9e9e;
					}
					p:nth-child(2) {
						text-align: right;
						font-size: 24px;
						color: #fbc200;
						padding-right: 20px;
					}
					p:nth-child(3) {
						font-size: 40px;
					}
				}
				.xiaofei {
					box-sizing: border-box;
					padding-top: 23px;
					padding-left: 10px;
					p:nth-child(1) {
						font-size: 24px;
						color: #9e9e9e;
					}
					p:nth-child(2) {
						padding-top: 10px;
						font-size: 40px;
						color: #000;
					}
				}
			}
			.common {
				box-sizing: border-box;
				padding: 0 33px;
				width: 100%;
				height: 125px;
				line-height: 125px;
				background: #fff;
				border-bottom: 1px solid #f2f2f2;
				display: flex;
				justify-content: space-between;
				p {
					font-size: 34px;
					color: #000;
					i {
						display: inline-block;
						width: 33px;
						height: 33px;
						background: url(../../static/img/right.png) no-repeat center center;
						background-size: cover;
						position: relative;
						top: 7px;
					}
				}
				p:nth-child(2) {
					font-size: 20px;
					color: #a0a0a0;
				}
			}
			.jiekuan,.dizhi,.piaojuan{
				margin-bottom: 20px;
			}
		}
	}
</style>