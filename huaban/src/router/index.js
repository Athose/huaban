import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import My from '@/components/my'
import Huaka from '@/components/huaka'
import Fenlei from '@/components/fenlei'
import Shopcar from '@/components/shopcar'
import Youxuan from '@/components/youxuan'
import fenleiInfo from '@/components/fenlei_info'
import fenleiList from '@/components/fenleiList'
import Search from '@/components/search'
import Details from '@/components/details'
import Login from '@/components/login'
Vue.use(Router)
export default new Router({
  routes: [
    {
      path: '/',
      redirect:'/youxuan',
      component:Youxuan
    },
     {
    	path:'/youxuan',
    	name:'Youxuan',
    	component:Youxuan
    },
    {
    	path:'/my',
    	name:'My',
    	component:My
    },
    {
    	path:'/huaka',
    	name:'Huaka',
    	component:Huaka
    },
    {
    	path:'/fenlei',
    	name:'Fenlei',
    	component:Fenlei,
    	children:[
    		{
    			name:'fenleiInfo',
    			path:'fenlei_info/:canshu',
    			component:fenleiInfo
    		}
    	],
    	redirect:'/fenlei/fenlei_info/0',
    },
    {
    	path:'/shopcar',
    	name:'Shopcar',
    	component:Shopcar
    },
    {
    	path:'/fenleiList',
    	name:'fenleiList',
    	component:fenleiList
    },
    {
    	path:'/search',
    	name:'Search',
    	component:Search
    },
    {
    	path:'/details',
    	name:'Details',
    	component:Details
    },
    {
    	path:'/login',
    	name:'Login',
    	component:Login
    }
  ]
})
