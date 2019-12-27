<template>
	<view id="mian" class="mian" @touchstart="movestart" @touchmove="move" @touchend="moveend">
		<list ref='list' @close='close'></list>
		<view class="content" :animation="contenAnimation">
			<uniNavBar left-icon="more-filled" background-color="transparent" color="#fff" :border='false' @clickLeft='shows'></uniNavBar>
			<!-- 背景切换 -->
			<Gradient></Gradient>
			 <!-- 主页介绍文本 -->
			<Avatar></Avatar>
			<content-list></content-list>
			<TodoDetail></TodoDetail>
		</view>
	</view>
</template>

<script>
	import uniNavBar from "@/components/uni-nav-bar/uni-nav-bar.vue"
	import list from "@/components/list.vue"
	import Gradient from '@/components/Gradient.vue'
	import Avatar from '@/components/Avatar.vue'
	import ContentList from '@/components/ContentList.vue'
	import TodoDetail from '@/components/TodoDetail.vue'
	export default {
		data() {
			return {
				title: 'Hello',
				listAnimation: null,
				contenAnimation: null,
				index: 1,
				touchX: 0,
				moveX: 0,
			}
		},
		onLoad() {
			this.$store.commit('updata', 'qie');
		},
		onPullDownRefresh() {
			console.log('refresh');
			setTimeout(function() {
				uni.stopPullDownRefresh();
			}, 1000);
		},
		methods: {
			shows() {
				var contenanimation = uni.createAnimation({
					duration: 300,
					timingFunction: 'ease',
				})
				contenanimation.translateX('100%').step();
				this.$refs.list.show();
				setTimeout(() => {
					this.contenAnimation = contenanimation.export()
				}, 0);
				this.index = 0;
			},
			close() {
				var contenanimation = uni.createAnimation({
					duration: 300,
					timingFunction: 'ease',
				})
				contenanimation.translateX('0').step();
				this.$refs.list.close();
				setTimeout(() => {
					this.contenAnimation = contenanimation.export()
				}, 0)
				this.index = 1;
			},
			moveanimation(val) {
				var contenanimation = uni.createAnimation({
					duration: 0,
					timingFunction: 'ease',
				})
				contenanimation.translateX(val).step();
				setTimeout(() => {
					this.contenAnimation = contenanimation.export()
				}, 0)
			},
			movestart(e) {
				this.touchX = e.touches[0].clientX;
			},
			move(e) {
				this.moveX = e.touches[0].clientX;
				let i = this.touchX - this.moveX
				if (i < 0 && this.index === 1) {
					this.moveanimation(Math.abs(i))
					// this.lefts = Math.abs(i)
					// console.log(this.lefts)
				} else if (i > 0 && this.index === 0) {
					let windowWidth = uni.getSystemInfoSync().windowWidth - i
					this.moveanimation(windowWidth)
				}

			},
			moveend(e) {
				let i = this.touchX - this.moveX
				if (i > 150 && this.index == 0) {
					this.close()
				} else if (i < -150 && this.index == 1) {
					this.shows()
				} else {
					this.index === 0 ? this.shows() : this.close()
				}
			},
			test(e) {
				console.log(e)
			}
		},
		components: {
			uniNavBar,
			list,
			Gradient,
			Avatar,
			ContentList,
			TodoDetail
		}
	}
</script>

<style>
	.uni-navbar {
		margin: 0 auto;
	}

	.mian {
		margin: 0 auto;
		overflow: hidden;
		position: absolute;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
	}

	.content {
		position: absolute;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		text-align: center;
		transition: all .1s;
		overflow: hidden;
	}

	.logo {
		height: 200rpx;
		width: 200rpx;
		margin: 0 auto;
	}

	.title {
		font-size: 36rpx;
		color: #8f8f94;
	}
</style>
