<template>
	<div class="huaka">
		<div class="top">
			<div class="topTit">
				<h1>我的花卡</h1>
			</div>
			<div class="kaImg">
				<img src="../../static/img/595.png" />
			</div>
			<div class="kaYoushi">
				<div class="one">
					<img src="../../static/img/cb.png" alt="" />
					<p>全场成本价</p>
				</div>
				<div class="one">
					<img src="../../static/img/yf.png" alt="" />
					<p>全场免运费</p>
				</div>
				<div class="one">
					<img src="../../static/img/kf.png" alt="" />
					<p>专属客服</p>
				</div>
			</div>
		</div>
		<div class="middle">
			<div class="middleTit">
				<h1>花卡服务</h1>
			</div>
			<div class="haochu">
				<ul>
					<li>
						<p>邀请返利</p>
						<p>邀请好友开通花卡立得100元</p>
						<p>去邀请</p>
					</li>
					<li>
						<p>会员权益</p>
						<p>享免运费、成本价、低息分期</p>
						<p>立即查看</p>
					</li>
					<li>
						<p>新人礼包</p>
						<p>花伴商城新人享1000元红包礼</p>
						<p>立即查看</p>
					</li>
				</ul>
			</div>
		</div>
		<div class="bottom">
			<div class="bottomTit">
				<h1>推荐商品</h1>
			</div>
			<div class="temai-info">
				<div class="temai-goods" v-for="(item,index) in tjGoods	" :key="index" @click='turnDetails(item.id)'>
					<img :src="item.attaUrl">
					<p>{{item.goodsName}}</p>
					<p>会员价<span>￥{{price(item.vipPrice)}}</span></p>
					<p>非会员价<span>￥{{price(item.price)}}</span></p>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'huaka',
		data() {
			return {
				tjGoods: []
			}
		},
		methods: {
			getGoods() {
				this.$axios({
					url: 'http://za.feiguotech.com/home/queryGroupGoods',
					method: 'post',
					data: {
						"groupId": "33",
						"numPerPage": "10",
						"pageNum": 1,
						"order": "asc"
					}
				}).then(res => {
					this.tjGoods = res.data.data.rows
					console.log(this.tjGoods);
				}).catch(err => {
					console.log('请求失败')
				})
			},
			price(price) {
				var aa = price % 100 == 0 ? "00" : price % 100
				var str = price / 100 + "." + aa;
				return str;
			},
			turnDetails(id){
				this.$router.push({name:'Details',params:{id:id}});
			}
		},
		mounted() {
			this.getGoods();
		}
	}
</script>

<style lang="less">
	.huaka {
		width: 100%;
		padding-bottom: 84px;
		background: #f2f2f2;
		box-sizing: border-box;
		font-family: "微软雅黑";
		.top {
			width: 100%;
			background: #fff;
			margin-bottom: 20px;
			padding-top: 95px;
			.topTit {
				width: 100%;
				text-align: center;
				height: 95px;
				background: #FFFFFF;
				border-bottom: 1px solid #BCBCBC;
				line-height: 95px;
				position: fixed;
				top: 0;
				left: 0;
				h1 {
					font-size: 30px;
					/*font-weight: 700;*/
					color: #393939;
				}
			}
			.kaImg {
				width: 100%;
				text-align: center;
				box-sizing: border-box;
				padding: 65px 0;
				img {
					width: 595px;
					height: 380px;
				}
			}
			.kaYoushi {
				width: 100%;
				box-sizing: border-box;
				padding: 0 78px;
				padding-bottom: 75px;
				display: flex;
				justify-content: space-between;
				align-items: center;
				.one {
					text-align: center;
					img {
						width: 66px;
						height: 66px;
					}
					p {
						font-size: 24px;
					}
				}
			}
		}
		.middle {
			width: 100%;
			box-sizing: border-box;
			padding: 30px;
			background: #FFFFFF;
			margin-bottom: 20px;
			.middleTit {
				width: 100%;
				height: 107px;
				text-align: center;
				h1 {
					font-size: 30px;
					color: #dfa345;
				}
			}
			.haochu {
				width: 100%;
				ul {
					width: 100%;
					li {
						display: flex;
						justify-content: space-between;
						height: 120px;
						line-height: 120px;
						align-items: center;
						p:nth-child(1) {
							font-size: 32px;
							color: #2c2c2c;
						}
						p:nth-child(2) {
							font-size: 24px;
							color: #a2a2a2;
						}
						p:nth-child(3) {
							display: block;
							height: 55px;
							width: 144px;
							line-height: 55px;
							text-align: center;
							border-radius: 10px;
							color: #313747;
							background: #fbc200;
						}
					}
				}
			}
		}
		.bottom {
			width: 100%;
			box-sizing: border-box;
			padding: 30px;
			background: #FFFFFF;
			margin-bottom: 20px;
			.bottomTit {
				width: 100%;
				height: 107px;
				h1 {
					font-size: 30px;
					color: #393939;
				}
			}
			.temai-info {
				width: 100%;
				display: flex;
				justify-content: space-around;
				flex-wrap: wrap;
				.temai-goods {
					margin-top: 25px;
					width: 334px;
					text-align: center;
					box-sizing: border-box;
					img {
						width: 100%;
						border-radius: 10px;
					}
					p {
						width: 100%;
						overflow: hidden;
						text-overflow: ellipsis;
						white-space: nowrap;
						font-size: 20px;
					}
					p:nth-child(2) {
						font-size: 24px;
						color: #000000;
						font-size: 700;
						padding-top: 15px;
					}
					p:nth-child(3) {
						padding: 20px 0;
						color: #c8c8c8;
						font-size: 20px;
						letter-spacing: 1px;
						span {
							color: #fd4b5b;
							font-size: 25px;
							letter-spacing: 0px;
						}
					}
					p:nth-child(4) {
						color: #bdbdbd;
						font-size: 14px;
					}
				}
			}
		}
	}
</style>