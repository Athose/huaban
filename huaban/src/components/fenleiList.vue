<template>
	<div class="fenleiList">
		
		<div class="search">
			<div class="search-inp">
				<i></i>
				<input type="text" placeholder="爽肤水" @click='toSearch'/>
			</div>
			<p @click="back()">取消</p>
		</div>
		<div class="paixu">
			<ul>
				<li>
					<p>综合</p>
				</li>
				<li>
					<p>上新</p>
				</li>
				<li>
					<p>价格</p>
				</li>
				<li>
					<p>销量</p>
				</li>
			</ul>
		</div>
		<div class="goodList">
			<div class="goods" v-for="(item,index) in listData" :key="index" @click='turnDetails(item.id)'>
				<img :src="item.attaUrl" />
				<div>{{item.goodsName}}</div>
				<p>会员价：<span>￥{{price(item.vipPrice)}}</span></p>
				<p>非会员价：<span>￥{{price(item.price)}}</span></p>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'fenleiList',
		data() {
			return {
				listData: []
			}
		},
		beforeMount() {
			this.$store.state.footstyle=false
		},
		methods: {
			getList() {
				this.$axios({
					url: 'http://za.feiguotech.com/goods/queryGoodsList',
					data: {
						"catId": this.$route.params.catId,
						"numPerPage": "10",
						"pageNum": "1",
						"keyWord": "",
						"order": "asc"
					},
					method: 'post'
				}).then(res => {
					this.listData = res.data.data.rows;
					console.log(this.listData)
				}).catch(err => {
					console.log('请求失败');
				})
			},
			price(price) {
				var aa = price % 100 == 0 ? "00" : price % 100
				var str = price / 100 + "." + aa;
				return str;
			},
			toSearch(){
				this.$router.push({name:'Search',params:{}});
			},
			turnDetails(id){
				this.$router.push({name:'Details',params:{id:id}});
			},
			back(){
				this.$router.go(-1);
				this.$store.state.footstyle=true;
			}
		},
		mounted() {
			this.getList();
		}
	}
</script>

<style lang="less">
	.fenleiList {
		width: 100%;
		font-family: "微软雅黑";
		background: #f2f2f2;
		padding-top: 216px;
		.search {
			width: 100%;
			height: 100px;
			background: #fff;
			box-sizing: border-box;
			padding: 0 30px;
			display: flex;
			align-items: center;
			border-bottom: 1px solid #f2f2f2;
			position: fixed;
			top: 0;
			left: 0;
			.search-inp {
				width: 623px;
				height: 57px;
				background: #f2f2f2;
				position: relative;
				border-radius: 25px;
				i {
					display: block;
					height: 40px;
					width: 40px;
					position: absolute;
					top: 10px;
					left: 10px;
					background: url(../../static/img/search.png) no-repeat center center;
					background-size: cover;
				}
				input {
					width: 100%;
					height: 57px;
					background: transparent;
					border: 0;
					outline: 0;
					box-sizing: border-box;
					padding-left: 62px;
				}
			}
			p {
				padding-left: 10px;
				font-size: 26px;
				color: #828282;
			}
		}
		.paixu {
			width: 100%;
			height: 96px;
			background: #fff;
			margin-bottom: 20px;
			position: fixed;
			top: 100px;
			left: 0;
			ul {
				width: 100%;
				height: 96px;
				display: flex;
				box-sizing: border-box;
				padding: 0 33px;
				justify-content: space-between;
				li {
					width: 123px;
					height: 96px;
					line-height: 96px;
					text-align: center;
					font-size: 28px;
					color: #484848;
				}
			}
		}
		.goodList {
			width: 100%;
			display: flex;
			justify-content: space-between;
			flex-wrap: wrap;
			.goods {
				width: 355px;
				background: #fff;
				margin-bottom: 20px;
				box-sizing:border-box;
				padding:0 20px;
				img {
					width: 100%;
				}
				div {
					height: 70px;
					overflow: hidden;
					display: -webkit-box;
					text-overflow: ellipsis;
					-webkit-line-clamp: 2;
					-webkit-box-orient: vertical;
					white-space: normal;
					font-size: 26px;
					margin-bottom: 35px;
				}
				p{
					font-size: 20px;
					color: #b9b9b9;
					span{
						font-size: 26px;
						color: #fe4455;
					}
				}
				p:last-child{
					padding-bottom: 10px;
					span{
						font-size: 20px;
						color: #000;
					}
				}
			}
		}
	}
</style>