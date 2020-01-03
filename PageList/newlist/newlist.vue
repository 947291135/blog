<template>
	<view>
		<article-list></article-list>
	</view>
</template>

<script>
	import ArticleList from '@/components/ArticleList.vue'
	export default {
		data() {
			return {
				type:null
			}
		},
		onLoad(data){
			  let top = data.topcolor;
			  this.type = data.type
			  uni.setNavigationBarColor({
			      frontColor: '#ffffff',
			      backgroundColor: top,
			      animation: {
			          duration: 400,
			          timingFunc: 'easeIn'
			      }
			  })
			  uni.setNavigationBarTitle({
			      title: this.type
			  });
		},
		methods: {
			
		},
		computed:{
			selected() {
				return this.$store.state.selected
			}
		},
		components:{
			ArticleList
		}
	}
</script>

<style>

</style>
