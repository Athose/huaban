<template>
	<div class="log">
		<div class="myTit">
			<div class="turnBack" @click='back'>
				<img src="../../static/img/jdpay_icon_back.png"/>
			</div>
			<div class="topTit">
				<p>登录</p>
			</div>
		</div>
		<div class="logInfo">
			<div class="logLogo">
				<img src="../../static/img/logo.png" alt="">
			</div>
			<div class="logInp">
				<div class="phone">
					手机号
					<input type="text" v-model='username' placeholder="请输入手机号"/>
				</div>
				<div class="pwd">
					验证码
					<input type="text" v-model='veri' placeholder="请输入验证码"/>
					<button @click="getVeri">获取验证码</button>
				</div>
			</div>
			<div class="logBtn" @click='login'>
				登录
			</div>
		</div>
	</div>
</template>

<script>
	export default{
		name:'login',
		data(){
			return{
				username:'',
				veri:'',
				testVeri:''
			}
		},
		methods:{
			back(){
				this.$router.go(-1);
				this.$store.state.footstyle=true
			},
			login(){
				var inp = document.getElementsByTagName('input');
				var phone = document.getElementsByClassName('phone')[0];
				var pwd = document.getElementsByClassName('pwd')[0];
				if(this.username!=''){
					var reg = /^1[34578]\d{9}$/;
					if(reg.test(this.username)){
						if(this.veri!=''){
							if(this.veri==this.testVeri){
								this.$axios({
									url:'/registeredRouter/fin',
									method:'get',
									params:{
										usename:this.username
									}
								}).then(res=>{
									console.log(res.data)
									if(res.data.success){
										this.$axios({
											url:'/registeredRouter/info',
											method:'post',
											data:{
												usename:this.username,
												shopcar:{}
											}
										}).then(res=>{
											console.log(res);
											alert('登录成功');
											this.$store.state.username=this.username;
											this.$store.state.ifLog=true;
											this.$router.go(-1);
										}).catch(err=>{
											console.log('失败');
										})
									}else{
										console.log(res);
										alert('登录成功');
										this.$store.state.username=this.username;
										this.$store.state.ifLog=true;
										this.$router.go(-1);
									}
								}).catch(err=>{
									console.log('失败')
								})
							}else{
								pwd.style.borderBottom='1px solid red';
								this.veri=''
								inp[1].placeholder='验证码错误'
							}
						}else{
							pwd.style.borderBottom='1px solid red';
							this.veri=''
							inp[1].placeholder='请输入验证码'
						}
						
					}else{
						phone.style.borderBottom='1px solid red';
						this.username=''
						inp[0].placeholder='手机号码有误'
					}
				}else{
					phone.style.borderBottom='1px solid red';
					inp[0].placeholder='请输入手机号'
				}
			},
			getVeri(){
				var str='';
				for(var i=0;i<6;i++){
					str+=Math.floor(Math.random(0,10)*10);
				}
				this.testVeri=str
				alert(str);
			}
		}
	}
</script>

<style lang="less">
	.log{
		width: 100%;
		box-sizing: border-box;
		font-family: "微软雅黑";
		background: #FFF;
		padding-top: 100px;
		.myTit{
			width: 100%;
			height: 100px;
			box-sizing: border-box;
			padding: 0 30px;
			border-bottom:1px solid #f2f2f2;
			background:#FFFFFF;
			position:fixed;
			top:0;
			left:0;
			z-index:999;
			.turnBack{
				float: left;
				width: 45px;
				height: 100px;
				text-align: center;
				line-height: 100px;
				vertical-align: middle;
				img{
					width: 45px;
					height: 45px;
					vertical-align: middle;
				}
			}
			.topTit{
				width: 75px;
				height: 100px;
				margin: 0 auto;
				line-height: 100px;
				font-size: 37px;
			}
		}
		.logInfo{
			width: 100%;
			box-sizing: border-box;
			padding: 0 30px;
			.logLogo{
				width: 100%;
				height: 230px;
				text-align: center;
				line-height: 230px;
				img{
					width: 120px;
					height: 120px;
					vertical-align: middle;
				}
			}
			.logInp{
				width: 100%;
				height: 210px;
				.phone,.pwd{
					width: 100%;
					height: 105px;
					box-sizing: border-box;
					border-bottom: 1px solid #f2f2f2;
					line-height: 105px;
					font-size: 30px;
				}
				input{
					border: 0;
					outline: 0;
					padding-left: 20px;
				}
				.pwd button{
					width: 150px;
					height: 58px;
					border-radius: 10px;
					text-align: center;
					background: #fe4c5c;
					border: 0;
					outline: 0;
					color: #fff;
					font-size: 26px;
					margin-left: 20px;
				}
			}
			.logBtn{
				width: 100%;
				height: 100px;
				text-align: center;
				line-height: 100px;
				border-radius: 10px;
				background: #bcbcbc;
				color: #fff;
				margin-top: 80px;
				font-size: 30px;
			}
		}
	}
</style>
