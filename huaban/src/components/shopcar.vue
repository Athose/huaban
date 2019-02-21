<template>
	<div class="shopCar">
		<div class="carTit">
			<h1>购物车</h1>
			<div class="bj" v-if='flag'>
				编辑
			</div>
		</div>
		<div class="carInfo">
			<div class="kong" v-if="!this.$store.state.ifLog">
				<img src="../../static/img/carkong.png" />
				<p>登录后同步购物车中的商品</p>
				<p @click='toLogin()'>立即登录</p>
			</div>
			<div class="userNothing" v-if='!flag&&this.$store.state.ifLog'>
				<img src="../../static/img/carkong.png" />
				<p>购物车暂无商品</p>
				<p @click='toList()'>去逛逛</p>
			</div>
			<div class="userThing" v-if='flag'>
				<div class="carThing" v-for='(item,index) in carThing' :key="index">
					<div class="checkBox">
						<input type="checkbox" value="" class="Checkbox" :id='"check"+index' />
						<label :for='"check"+index' @click='choose(index)'></label>
					</div>
					<div class="goodsImg">
						<img :src="item.normImageUrl" alt="">
					</div>
					<div class="goodsDesc">
						<div class="goodsName">
							<p>{{item.goodsName}}</p>
						</div>
						<div class="priceNum">
							<p>价格:<span>￥{{price(item.price)}}</span></p>
							<div class="num">
								<button @click="sub(index)">-</button>
								<div>{{item.num}}</div>
								<button @click="add(index)">+</button>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="infoBottom">
				<p>结算价: <span>￥{{price(total)}}</span></p>
				<div>
					去结算
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'shopcar',
		data() {
			return {
				flag: false,
				carThing: [],
				total:0,
				numFlag:false
			}
		},
		methods: {
			toLogin() {
				this.$router.push({
					name: 'Login'
				});
			},
			toList() {
				this.$router.push({
					name: 'Fenlei'
				});
			},
			getUserCar(goodsId, num) {
				this.$axios({
					url: 'http://za.feiguotech.com/goods/queryGoodsDetail',
					method: 'post',
					data: {
						'id': goodsId
					}
				}).then(res => {
					if (res.data.data != null) {
						res.data.data.normList[0].num = num;
						this.carThing.push(res.data.data.normList[0]);
					}
				}).catch(err => {
					console.log('获取商品失败')
				})
			},
			choose(index){
				var checkList = document.querySelectorAll('.carThing input');
				console.log(checkList[index])
				if(!checkList[index].checked){
					var obj = this.carThing[index];
					this.total=this.total+(obj.price*obj.num);
				}else{
					var obj = this.carThing[index];
					this.total=this.total-(obj.price*obj.num);
				}
			},
			changePrice(index,p){
				var checkBox = document.querySelectorAll('.Checkbox');
				console.log(checkBox[index].checked);
				if(checkBox[index].checked!=false){
					if(p==1){
						this.total = this.total+this.carThing[index].price;
					}else{
						this.total = this.total-this.carThing[index].price;
					}
				}
			},
			changeBacker(){
				var obj = {};
				if(this.carThing.length==0){
					obj={};
				}else{
					for(var i = 0;i<this.carThing.length;i++){
						console.log(this.carThing[i]);
						console.log(this.carThing[i].goodsId);
						obj[this.carThing[i].goodsId]=this.carThing[i].num;
					}
				}
				this.$axios({
					url:'/registeredRouter/addshopcar',
					method:'post',
					data:{
						username:this.$store.state.username,
						carGoods:obj
					}
				}).then(res=>{
					console.log(res)
				}).catch(err=>{
					console.log('修改购物车失败')
				})
			},
			add(index){
				if(this.numFlag){
					this.numFlag=false;
					var addBtn = document.querySelectorAll('.num button')[1];
					this.carThing[index].num++;
					this.changeBacker();
					this.getGoods();
					this.changePrice(index,1);
				}
			},
			sub(index){
				if(this.numFlag){
					this.numFlag=false;
					var addBtn = document.querySelectorAll('.num button')[0];
					if(this.carThing[index].num>1){
						this.carThing[index].num--;
						this.changeBacker();
						this.getGoods();
						this.changePrice(index,2);
					}else{
						this.changePrice(index,2);
						this.carThing.splice(index,1);
						this.changeBacker();
						this.getGoods();
					}
				}
			},
			price(price) {
				var aa = price % 100 == 0 ? "00" : price % 100
				var str = price / 100 + "." + aa;
				return str;
			},
			getGoods(){
				this.$axios({
					url: '/registeredRouter/fin',
					method: 'get',
					params: {
						usename: this.$store.state.username
					}
				}).then(res => {
					var userCar = res.data.re;
					if (userCar != {}) {
						console.log(userCar)
						this.flag = true;
					}else{
						this.flag = false;
					}
					for (var st in userCar) {
						this.getUserCar(st, userCar[st]);
						this.numFlag=true;
					}
				}).catch(err => {
					console.log('获取用户购物车信息失败')
				})
			}
		},
		mounted() {
			if(this.$store.state.username!=""){
				this.getGoods();
			}
		}
	}
</script>

<style lang="less">
	.shopCar {
		width: 100%;
		font-family: "微软雅黑";
		background: #f2f2f2;
		padding-bottom: 100px;
		padding-top: 100px;
		.carTit {
			width: 100%;
			height: 100px;
			background: #fff;
			line-height: 100px;
			text-align: center;
			font-size: 30px;
			border-bottom: 1px solid #f2f2f2;
			position: fixed;
			top: 0;
			left: 0;
			z-index: 999;
			.bj{
				position: absolute;
				top: 2px;
				right: 50px;
				color: #cbcbcb;
			}
		}
		.carInfo {
			width: 100%;
			height: calc(100vh - 200px);
			position: relative;
			padding-bottom: 200px;
			.kong,
			.userNothing {
				width: 100%;
				position: absolute;
				text-align: center;
				top: 50%;
				transform: translateY(-50%);

				img {
					width: 240px;
					height: 240px;
				}

				p {
					font-weight: 400;
				}

				p:nth-child(2) {
					font-size: 26px;
					color: #262626;
				}

				p:nth-child(3) {
					font-size: 26px;
					color: #e55562;
					line-height: 55px;
				}
			}

			.userThing {
				width: 100%;
				height: calc(100vh - 200px);
				// overflow: hidden;
				.carThing {
					width: 100%;
					height: 205px;
					border-bottom: 1px solid #f2f2f2;
					display: flex;
					background: #fff;
					align-items: center;

					.checkBox {
						width: 90px;
						text-align: center;
						position: relative;
						.Checkbox {
							position: absolute;
							visibility: hidden;
						}

						.Checkbox+label {
							position: absolute;
							top: 50%;
							left: 50%;
							transform: translate(-50%,-50%);
							width: 34px;
							height: 34px;
							background: #fff;
							border: 2px solid #333;
							border-radius: 50%;
							background-color: #fff;
						}

						.Checkbox:checked+label:after {
							content: "";
							position: absolute;
							left: 5px;
							top: 8px;
							width: 18px;
							height: 8px;
							border: 2px solid #424242;
							border-top-color: transparent;
							border-right-color: transparent;
							transform: rotate(-45deg);
							-ms-transform: rotate(-60deg);
							-moz-transform: rotate(-60deg);
							-webkit-transform: rotate(-60deg);
						}
					}

					.goodsImg {
						width: 135px;
						height: 135px;
						border-radius: 10px;
						border: 2px solid #262626;

						img {
							width: 100%;
							border-radius: 10px;
						}
					}

					.goodsDesc {
						width: calc(100% - 90px - 135px);
						height: 205px;
						box-sizing: border-box;
						padding: 33px;
						
						.goodsName {
							width: 100%;
							overflow: hidden;
							display: -webkit-box;
							text-overflow: ellipsis;
							-webkit-line-clamp: 2;
							-webkit-box-orient: vertical;
							white-space: normal;
							font-size: 26px;
						}

						.priceNum {
							display: flex;
							justify-content: space-between;
							height: 64px;
							align-items: center;
							font-size: 26px;

							.num {
								display: flex;
								width: 120px;
								height: 40px;
								border-radius: 10px;
								border: 2px solid #b9b9b9;

								button {
									width: 40px;
									height: 40px;
									border-radius: 10px;
									border: 0;
									outline: 0;
									background: #fff;
								}

								button:first-child {
									border-top-right-radius: 0;
									border-bottom-right-radius: 0;
									border-right: 2px solid #b9b9b9;
								}

								button:last-child {
									border-top-left-radius: 0;
									border-bottom-left-radius: 0;
									border-left: 2px solid #b9b9b9;
								}

								div {
									width: 40px;
									height: 40px;
									text-align: center;
								}
							}
						}
					}
				}
			}
			.infoBottom{
				width: 100%;
				height: 105px;
				position: fixed;
				left: 0;
				bottom: 100px;
				border-top: 2px solid #f2f2f2;
				background: #fff;
				display: flex;
				box-sizing: border-box;
				padding-left: 33px;
				justify-content: space-between;
				line-height: 105px;
				font-size: 30px;
				p{
					span{
						font-size: 34px;
						color: #fc4d5c;
					}
				}
				div{
					width: 290px;
					height: 105px;
					background: #bcbcbc;
					text-align: center;
					color: #fff;
				}
			}
		}
	}
</style>
