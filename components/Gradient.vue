<template>
	<view class="Gradient">
		<bg-color v-for="(item,index) of bgcolor" :key='index' :colors='item' :active='index===currentIndex'></bg-color>
	</view>
</template>

<script>
	import BgColor from '@/components/BgColor.vue'
	export default {
		data() {
			return {
				bgcolor:[
					['#ff6262', '#ffa947'],
					['#5b9df9', '#47bfff'],
					['#2c7d59', '#3ba776'],
					['#5C258D', '#4486A0'],
					['#B8BB0B', '#85C7F9'],
					['#182848', '#4867ac']
				]
			};
		},
		computed:{
			currentIndex () {
			      return this.$store.state.currentIndex
			},
		},
		components:{
			BgColor
		}
	}
</script>

<style scoped>
.Gradient{
	position: absolute;
	top:0;
	bottom: 0;
	right: 0;
	left: 0;
/* 	background-image: -webkit-gradient(linear, left bottom, left top, color-stop(30%, #ff6262), to(#ffa947)); */
	z-index: -1;
}
</style>
