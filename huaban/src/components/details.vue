<template>
	<div class="details">
		<div class="detailTop">
			<div class="turnBack" @click='back'>
				<img src="../../static/img/jdpay_icon_back.png"/>
			</div>
			<div class="topTit">
				<p>商品详情</p>
			</div>
		</div>
		<!--轮播图-->
		<div class="banner">
			<swiper :options="swiperOption">
				<swiper-slide v-for='(item,index) in banner' :key='index'>
					<img :src="item.attaUrl">
				</swiper-slide>
			</swiper>
			<div class="swiper-pagination"></div>
		</div>
		<!--商品名字及详情-->
		<div class="goodsName">
			<div class="name">
				{{detail.goodsName}}
			</div>
			<div class="desc">
				{{detail.goodsDesc}}
			</div>
		</div>
		<!--价格-->
		<div class="goodsPrice">
			<div class="vipPrice">
				<div class="left">
					花卡会员价<p>￥{{price(detail.vipPrice)}}</p>
				</div>
				<div class="right">
					开通<i></i>
				</div>
			</div>
			<div class="basePrice">
				<div class="price">
					非会员价：￥{{price(detail.basePrice)}}
				</div>
				<div class="saleNum">
					{{detail.saleNum}}件已售
				</div>
			</div>
			<!--产地-->
			<div class="origin">
				<div class="originImg">
					<img :src="res.originImageUrl"/>{{res.origin}}
				</div>
				<div class="shipAddress">
					{{res.shipAddress}}
				</div>
				<div class="shipMethod">
					{{res.shipMethod}}
				</div>
			</div>
		</div>
		<!--选择规格-->
		<div class="choose">
			<div class="normName">
				<p>已选"{{chooseNum}}套"</p>
				<i></i>
			</div>
			<div class="promit">
				<div class="promitList">
					<div v-for='(item,index) in res.goodsNormParams' :key='index'>
						<i class="iconfont icon-beishubaozheng"></i>{{item.promiseDesc}}
					</div>
				</div>
			</div>
		</div>
		<!--详情介绍图片-->
		<div class="otherImg">
			<p>&mdash;&nbsp;&nbsp;<i class="iconfont icon-img"></i>&nbsp;&nbsp;详情&nbsp;&nbsp;&mdash;</p>
			<div class="imgShow" v-for="(item,index) in otherImg" :key='index'>
				<img :src="item.attaUrl"/>
			</div>
		</div>
		<!-- 脚部（加入购物车、立即购买） -->
		<div class="joinCar">
			<div class="carIcon">
				<img src="../../static/img/caricon.png" alt="">
			</div>
			<div class="nowBuy" @click="joinCar">
				加入购物车
			</div>
			<div class="join">
				立即购买
			</div>
		</div>
		<div class="mask"></div>
		<div class="carMask">
			<i class="close" @click="close"></i>
			<div class="goodsPic">
				<img :src="detail.normImageUrl" alt="">
			</div>
			<div class="goodsNamePrice">
				<p>{{detail.goodsName}}</p>
				<p>现价：￥{{price(detail.price)}}</p>
			</div>
			<div class="num">
				<p>购买数量</p>
				<div class="change">
					<button @click="sub">-</button>
					<div>{{num}}</div>
					<button @click="add">+</button>
				</div>
			</div>
			<div class="trueBtn" @click="trueJoin">
				确定
			</div>
		</div>
	</div>
</template>

<script> 
	export default{
		name:'Details',
		data(){
			return{
				swiperOption: { //swiper3
					autoplay: 3000,
					speed: 1000,
				},
				detail:[],
				banner:[],
				res:[],
				chooseNum:1,
				otherImg:[],
				num:1,
				goodsId:0
			}
		},
		methods:{
			joinCar(){
				if(this.$store.state.username){
					var mask = document.getElementsByClassName('carMask')[0];
					mask.style.bottom = '0';
					var bigMask = document.getElementsByClassName('mask')[0];
					bigMask.style.display = 'block';
				}else{
					alert('请先登录');
					this.$router.push({name:'Login'});
				}
			},
			close(){
				var mask = document.getElementsByClassName('carMask')[0];
				mask.style.bottom = '-605px';
				var bigMask = document.getElementsByClassName('mask')[0];
				bigMask.style.display = 'none';
			},
			getGoodsDetails(){
				if(this.$route.params.id){
					this.goodsId=this.$route.params.id;
				}else{
					this.goodsId=this.$store.state.goodsId;
				}
				this.$axios({
					url:'http://za.feiguotech.com/goods/queryGoodsDetail',
					method:'post',
					data:{
						'id':this.goodsId
					}
				}).then(res=>{
					this.res=res.data.data;
					this.detail=res.data.data.normList[0];
					for(var i=0;i<res.data.data.attaList.length;i++){
						if(res.data.data.attaList[i].attaType=='MAIN'){
							this.banner.push(res.data.data.attaList[i]);
						}else{
							this.otherImg.push(res.data.data.attaList[i]);
						}
					}
				}).catch(err=>{
					console.log('请求失败')
				})
			},
			price(price) {
				var aa = price % 100 == 0 ? "00" : price % 100
				var str = price / 100 + "." + aa;
				return str;
			},
			back(){
				this.$router.go(-1);
				this.$store.state.footstyle=true
			},
			sub(){
				if(this.num>1){
					this.num=this.num-1;
				}
			},
			add(){
				this.num=this.num+1;
			},
			trueJoin(){
				this.$axios({
					url:'/registeredRouter/fin',
					method:'get',
					params:{
						usename:this.$store.state.username
					}
				}).then(res=>{
					var carGoods = res.data.re;
					var id = this.goodsId;
					if(JSON.stringify(carGoods)!='{}'){
						console.log(true)
						for(var st in carGoods){
							if(st == id){
								console.log(carGoods[st])
								carGoods[st]=carGoods[st]+this.num;
							}else{
								console.log(carGoods[id])
								carGoods[id]=this.num;
							}
						}
					}else{
						carGoods[id]=this.num;
					}
					
					console.log(carGoods,id)
					this.$axios({
						url:'/registeredRouter/addshopcar',
						method:'post',
						data:{
							username:this.$store.state.username,
							carGoods:carGoods
						}
					}).then(res=>{
						this.num = 1;
						var mask = document.getElementsByClassName('carMask')[0];
						mask.style.bottom = '-605px';
						var bigMask = document.getElementsByClassName('mask')[0];
						bigMask.style.display = 'none';
						console.log(res)
					}).catch(err=>{
						console.log('加入购物车失败')
					})
				}).catch(err=>{
					console.log('加入购物车失败')
				})
			}
		},
		beforeMount(){
			this.$store.state.footstyle=false
		},
		mounted(){
			this.getGoodsDetails();
			this.$store.state.goodsId=this.goodsId;
		}
	}
</script>

<style lang='less'>
	.details{
		width: 100%;
		box-sizing: border-box;
		font-family: "微软雅黑";
		background: #F2F2F2;
		padding-top: 100px;
		padding-bottom: 104px;
		.detailTop{
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
			transition: 2s;
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
				width: 150px;
				height: 100px;
				margin: 0 auto;
				line-height: 100px;
				font-size: 37px;
			}
		}
		/*轮播图*/
		.banner {
			width: 100%;
			height: 807px;
			box-sizing: border-box;
			padding: 0 20px;
			background: #fff;
			.swiper-container {
				width: 100%;
				.swiper-wrapper {
					width: 100%;
				}
				.swiper-slide {
					width: 100%;
					img {
						width: 100%;
						border-radius: 10px;
					}
				}
			}
		}
		.goodsName{
			width: 100%;
			box-sizing: border-box;
			padding: 0 25px;
			padding-bottom: 20px;
			background: #fff;
			div {
				overflow: hidden;
				display: -webkit-box;
				text-overflow: ellipsis;
				-webkit-line-clamp: 2;
				-webkit-box-orient: vertical;
				white-space: normal;
			}
			.name{
				width: 100%;
				height: 75px;
				font-size: 30px;
				margin-bottom: 5px;
				color: #232323;
			}
			.desc{
				width: 100%;
				height: 60px;
				font-size: 25px;
				color: #808080;
			}
		}
		.goodsPrice{
			width: 100%;
			height: 270px;
			background: #fff;
			box-sizing: border-box;
			padding: 0 30px;
			margin-bottom: 20px;
			.vipPrice{
				width: 100%;
				height: 100px;
				line-height: 100px;
				
				display: flex;
				justify-content: space-between;
				border-top:1px solid #f2f2f2;
				border-bottom:1px solid #f2f2f2;
				.left{
					font-size: 30px;
					display: flex;
					p{
						color: #f8374f;
					}
				}
				.right{
					font-size: 26px;
					color: #f8374f;
					i {
						display: inline-block;
						width: 33px;
						height: 33px;
						background: url(../../static/img/right.png) no-repeat center center;
						background-size: cover;
						position: relative;
						top: 8px;
					}
				}
			}
			.basePrice{
				width: 100%;
				height: 75px;
				line-height: 75px;
				display: flex;
				justify-content: space-between;
				font-size: 26px;
				color: #797979;
			}
			.origin{
				width: 100%;
				height: 75px;
				line-height: 75px;
				display: flex;
				background: #f2f2f2;
				justify-content: space-between;
				box-sizing: border-box;
				padding: 0 30px;
				font-size: 25px;
				color: #5a5a5a;
				.originImg{
					img{
						width: 40px;
						margin-right: 2px;
						position: relative;
						top: 5px;
					}
				}
			}
		}
		.choose{
			width: 100%;
			background: #FFFFFF;
			.normName{
				width: 100%;
				height: 103px;
				line-height: 103px;
				display: flex;
				box-sizing: border-box;
				padding: 0 25px;
				border-bottom: 1px solid #f2f2f2;
				justify-content: space-between;
				font-size:30px;
				i {
					display: inline-block;
					width: 33px;
					height: 33px;
					background: url(../../static/img/right.png) no-repeat center center;
					background-size: cover;
					position: relative;
					top: 35px;
				}
			}
			.promit{
				width: 100%;
				line-height: 70px;
				.promitList{
					display: flex;
					flex-wrap: wrap;
					box-sizing: border-box;
					padding: 0 25px;
					justify-content: space-around;
					font-size:30px;
					color: #787878;
					div{
						i{
							color: #f8bf01;
						}
					}
				}
			}
		}
		.otherImg{
			width: 100%;
			text-align: center;
			color: #a0a0a0;
			p{
				font-size: 24px;
				line-height: 80px;
				i{
					font-size: 40px;
				}
			}
			.imgShow{
				width: 100%;
				img{
					width: 100%;
				}
			}
		}
		.joinCar{
			width: 100%;
			height: 100px;
			line-height: 100px;
			position: fixed;
			left: 0;
			bottom: 0;
			display: flex;
			background: #FFFFFF;
			text-align: center;
			font-size: 28px;
			.carIcon{
				width: 145px;
				height: 100px;
				text-align: center;
				img{
					width: 70px;
					vertical-align: middle
				}
			}
			.nowBuy{
				width: 305px;
				height: 100px;
				background: #fbc200;
			}
			.join{
				width: 302px;
				height: 100px;
				background: #ff8c19;
			}
		}
		.mask{
			width: 100%;
			height: 100vh;
			background: rgba(0, 0, 0, .3);
			position: fixed;
			top: 0;
			left: 0;
			z-index: 999;
			display: none;
		}
		.carMask{
			width: 100%;
			height: 550px;
			background: rgba(255, 255, 255,1);
			box-sizing: border-box;
			position: fixed;
			bottom: -605px;
			right: 0;
			z-index: 1000;
			transition: 1s;
			.close{
				display: block;
				position: absolute;
				width: 65px;
				height: 65px;
				top: 20px;
				right: 20px;
				background: url(../../static/img/close.png) no-repeat center center;
				background-size: 40px 40px;
			}
			.goodsPic{
				padding:0 20px;
				width: 210px;
				height: 210px;
				border-radius: 20px;
				border: 2px solid #f2f2f2;
				background: #FFF;
				position: relative;
				top: -50px;
				img{
					border-radius: 20px;
					width: 100%;
				}
			}
			.goodsNamePrice{
				padding:0 20px;
				width: 70%;
				p{
					width: 100%;
					overflow:hidden;
					text-overflow:ellipsis;
					white-space:nowrap;
					line-height: 60px;
					font-size: 30px;
				}
				p:last-child{
					font-size: 30px;
					color: #5a5a5a;
				}
			}
			.num{
				padding:0 20px;
				display: flex;
				justify-content: space-between;
				margin: 20px 0;
				p{
					font-size: 30px;
					line-height: 70px;
					color: #787878;
				}
				.change{
					display: flex;
					width: 216px;
					height: 70px;
					line-height: 70px;
					font-size:35px;
					text-align: center;
					justify-content: space-between;
					button{
						width: 70px;
						height:70px;
						border: 0;
						outline: 0;
						font-size: 40px;
						background: #f2f2f2;
					}
					div{
						width: 70px;
						height: 70px;
						border: 0;
						outline: 0;
						background: #f2f2f2;
						font-weight: lighter;
					}
				}
			}
			.trueBtn{
				width: 100%;
				height: 100px;
				background: #fbc200;
				text-align: center;
				line-height: 100px;
				font-size: 36px;
				color:#5a5a5a;
			}
		}
	}
</style>