<template>
	<div class="juti" v-if='flag'>
		<div class="juti_info" v-for="(item,index) in qz[this.$route.params.canshu].jdCategroyDtos" :key='index'>
			<p>—&nbsp;&nbsp;{{item.name}}&nbsp;&nbsp;—</p>
			<div class="ff">
				<div class="ff_info" v-for='(item,index) in item.jdCategroyDtos' @click="turnList(item.catId)">
					<img :src="item.imgUrl" alt="" />
					<p>{{item.name}}</p>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'fenleiInfo',
		data() {
			return {
				qz: [],
				flag:false
			}
		},
		methods: {
			getJuti() {
				this.$axios({
					url: 'http://za.feiguotech.com/category/getJdCategoryList',
					data: {

					},
					method: 'post'
				}).then(res => {
					this.qz = res.data.data;
					this.flag=true;
				}).catch(err => {
					console.log('请求失败')
				})
			},
			turnList(catId){
				this.$router.push({name:'fenleiList',params:{catId:catId}});
			}
		},
		mounted() {
			this.getJuti();
		},
		props: ['canshu']
	}
</script>

<style lang="less">
.juti{
	width: 100%;
	text-align: center;
	color: #7a7a7a;
	.juti_info{
		margin-top:25px;
		p{
			font-size: 28px;
			font-weight: 400;
		}
		.ff{
			width: 100%;
			box-sizing: border-box;
			display: flex;
			flex-wrap: wrap;
			.ff_info{
				width: 145px;
				margin: 0 24px;
				margin-top:25px;
				img{
					width: 145px;
				}
				p{
					font-size: 24px;
				}
			}
		}
	}
	.juti_info:nth-child(1){
		margin-top: 0;
	}
}
</style>