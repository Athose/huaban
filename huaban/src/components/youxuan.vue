<template>
	<div class="youxuan">
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
		<!--轮播图-->
		<!-- <div class="wrapper" ref="wrapper"> -->
			<!-- <div class="content"> -->
				<div class="banner">
					<swiper :options="swiperOption">
						<swiper-slide v-for='(item,index) in banner' :key='index'><img :src="item.itemImgUrl"></swiper-slide>
					</swiper>
					<div class="swiper-pagination"></div>
				</div>
				<!--推荐-->
				<div class="tuijian">
					<div class="tuijian-info" v-for="(item,index) in tuijian" :key="index">
						<h3>{{item.itemName}}</h3>
						<img :src="item.itemImgUrl" />
					</div>
				</div>
				<!--分类-->
				<div class="fenlei">
					<div class="fenlei-info" v-for="(item,index) in fenlei" :key="index">
						<img :src="item.itemImgUrl" />
					</div>
				</div>
				<!--个性推荐-->
				<div class="styleTui">
					<div class="styleTui-info" v-for="(item,index) in styleTui" :key="index">
						<img :src="item.itemImgUrl" />
					</div>
				</div>
				<!--新品推荐-->
				<div class="newsTui">
					<div class="newsTui-tit">
						<h2>{{newgoods.shelfName}}</h2>
						<a href="#">更多<i></i></a>
					</div>
					<div class="newsTui-info">
						<div class="new-goods">
							<swiper :options="newGoods">
								<swiper-slide v-for='(item,index) in newgoodsList' :key='index'>
									<img :src="item.attaUrl">
									<p>{{item.goodsName}}</p>
									<p>会员价<span>￥{{price(item.vipPrice)}}</span></p>
									<p>非会员价<span>￥{{price(item.price)}}</span></p>
								</swiper-slide>
							</swiper>
						</div>
					</div>
				</div>
				<!--轮播图Ⅱ-->
				<div class="lunbo_2">
					<swiper :options="lun_2">
						<swiper-slide v-for='(item,index) in lunbo_2' :key='index' @click='turnDetails(item.id)'>
							<img :src="item.itemImgUrl">
						</swiper-slide>
					</swiper>
				</div>
				<!--超值特卖-->
				<div class="temai">
					<div class="temai-tit">
						<h2>{{temai.shelfName}}</h2>
					</div>
					<div class="temai-info">
						<div class="temai-goods" v-for="(item,index) in temaiList" :key="index" @click='turnDetails(item.id)'>
							<img :src="item.attaUrl">
							<p>{{item.goodsName}}</p>
							<p>会员价<span>￥{{price(item.vipPrice)}}</span></p>
							<p>非会员价<span>￥{{price(item.price)}}</span></p>
						</div>
					</div>
				</div>
			<!-- </div> -->
		<!-- </div> -->
	</div>
</template>

<script>
	import BScroll from 'better-scroll'
	export default {
		name: 'youxuan',
		data() {
			return {
				swiperOption: { //swiper3
					autoplay: 3000,
					speed: 1000,
				},
				newGoods: {
					slidesPerView: 3,
					//					freeMode : true,
					//					freeModeMomentum : false
				},
				lun_2: { //swiper3
					autoplay: 3000,
					speed: 1000,
				},
				banner: [],
				tuijian: [],
				fenlei: [],
				styleTui: [],
				newgoods: [],
				newgoodsList: [],
				lunbo_2: [],
				temai: [],
				temaiList: [],
			}
		},
		methods: {
			getData() {
				this.$axios({
					url: 'http://za.feiguotech.com/home/queryHome',
					method: 'post',
					data: {}
				}).then(res => {
					//请求第一个轮播图图片地址
					this.banner = res.data.data[0].shelfItemDtos;
					//请求推荐标题以及图片地址
					this.tuijian = res.data.data[1].shelfItemDtos;
					//请求分类
					this.fenlei = res.data.data[2].shelfItemDtos;
					//请求个性推荐图片
					this.styleTui = res.data.data[3].shelfItemDtos;
					//请求“新品推荐”文本
					this.newgoods = res.data.data[4];
					//请求新品推荐商品数据
					this.$axios({
						url: 'http://za.feiguotech.com/home/queryGroupGoods',
						method: 'post',
						data: {
							"groupId": this.newgoods.shelfItemDtos[0].groupId,
							"numPerPage": "10",
							"pageNum": 1,
							"order": "asc"
						}
					}).then(res => {
						this.newgoodsList = res.data.data.rows
					}).catch(err => {
						console.log("请求失败")
					});
					//请求第二个轮播图
					this.lunbo_2 = res.data.data[5].shelfItemDtos;
					//请求“特卖商品”文本
					this.temai = res.data.data[6];
					console.log(res.data.data[6]);
					//请求特卖商品数据
					this.$axios({
						url: 'http://za.feiguotech.com/home/queryGroupGoods',
						method: 'post',
						data: {
							"groupId": this.temai.shelfItemDtos[0].groupId,
							"numPerPage": "10",
							"pageNum": 1,
							"order": "asc"
						}
					}).then(res => {
						console.log(res.data.data.rows)
						this.temaiList = res.data.data.rows
					}).catch(err => {
						console.log("请求失败")
					})
				}).catch(err => {
					console.log('请求失败')
				});
			},
			price(price) {
				var aa = price % 100 == 0 ? "00" : price % 100
				var str = price / 100 + "." + aa;
				return str;
			},
			turnDetails(id) {
				this.$router.push({
					name: 'Details',
					params: {
						id: id
					}
				});
			},
// 			loadData() {
// 				requestData().then((res) => {
// 					this.data = res.data.concat(this.data)
// 					this.$nextTick(() => {
// 						if (!this.scroll) {
// 							this.scroll = new Bscroll(this.$refs.wrapper, {})
// 							this.scroll.on('touchend', (pos) => {
// 								// 下拉动作
// 								if (pos.y > 50) {
// 									this.loadData()
// 								}
// 							})
// 						} else {
// 							this.scroll.refresh()
// 						}
// 					})
// 				})
// 			}
		},
		created() {
// 			requestData().then((res) => {
// 				this.data = res.data
// 				this.$nextTick(() => {
// 					this.scroll = new Bscroll(this.$refs.wrapper, {})
// 				})
// 			})
		},
		mounted() {
// 			this.$nextTick(() => {
// 				this.scroll = new Bscroll(this.$refs.wrapper, {})
// 			})
			this.getData();
		}
	}
</script>

<style lang="less">
	.scroll-view {
		/* -- Attention: This line is extremely important in chrome 55+! -- */
		touch-action: none;
		/* -- Attention-- */
		position: fixed;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		overflow: hidden;
	}

	.youxuan {
		width: 100%;
		box-sizing: border-box;
		padding: 0 20px;
		font-family: "微软雅黑";
		padding-bottom: 120px;
		padding-top: 120px;

		/*搜索框*/
		.search {
			width: 100%;
			box-sizing: border-box;
			background: #fff;
			z-index: 999;
			padding: 0 20px;
			height: 120px;
			display: flex;
			justify-content: space-between;
			align-items: center;
			position: fixed;
			top: 0;
			left: 0;

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

		/*轮播图*/
		.banner {
			width: 100%;
			height: 216px;
			box-sizing: border-box;
			padding: 0 20px;
			border-radius: 10px;

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

		/*推荐*/
		.tuijian {
			width: 100%;
			height: 240px;
			display: flex;
			justify-content: space-between;

			.tuijian-info {
				height: 240px;
				width: 340px;

				h3 {
					line-height: 80px;
					font-size: 30px;
					font-weight: 400;
					color: #474747;
				}

				img {
					width: 340px;
				}
			}
		}

		/*分类*/
		.fenlei {
			width: 100%;
			height: 165px;
			display: flex;
			justify-content: space-between;
			margin-top: 50px;

			.fenlei-info {
				width: 165px;
				height: 165px;

				img {
					width: 165px;
					height: 165px;
					border-radius: 5px;
				}
			}
		}

		/*个性推荐*/
		.styleTui {
			width: 100%;
			height: 335px;
			display: flex;
			justify-content: space-between;
			margin-top: 50px;
			flex-wrap: wrap;

			.styleTui-info img {
				border-radius: 5px;
			}

			.styleTui-info:nth-child(1) {
				width: 100%;

				img {
					width: 100%;
				}
			}

			.styleTui-info:nth-child(2),
			.styleTui-info:nth-child(3) {
				width: calc((100% - 25px)/2);
				margin-top: 24px;

				img {
					width: 100%;
				}
			}
		}

		/*新品推荐*/
		.newsTui {
			width: 100%;
			margin-top: 50px;

			.newsTui-tit {
				width: 100%;
				height: 40px;
				display: flex;
				justify-content: space-between;
				font-size: 30px;

				h2 {
					font-weight: 700;
				}

				a {
					color: #000000;
					font-weight: 700;

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

			.newsTui-info {
				width: 100%;

				.new-goods {
					width: 100%;
					margin-top: 25px;

					.swiper-container {
						width: 100%;

						.swiper-wrapper {
							width: 33%;
						}

						.swiper-slide {
							width: 255px;
							text-align: center;
							box-sizing: border-box;
							padding: 0 10px;

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
		}

		/*第二个轮播图*/
		.lunbo_2 {
			width: 100%;
			margin-top: 50px;
			height: 157px;

			img {
				width: 100%;
				height: 157px;
				border-radius: 10px;
			}
		}

		/*超值特卖*/
		.temai {
			width: 100%;
			margin-top: 50px;

			.temai-tit {
				width: 100%;
				height: 40px;
				display: flex;
				justify-content: space-between;
				font-size: 30px;

				h2 {
					font-weight: 700;
				}

				margin-bottom:20px;
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
