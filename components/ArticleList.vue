<!-- 文章列表组件 -->
<template>
	<scroll-view class="content" :scroll-y='true' :show-scrollbar='false' :style="{height:`${heights}px`}" @scrolltolower='bottom'>
		<view class="item scroll-view-item" v-for="(item,index) of arr" :key='index'>
			<view class="news_img">
				<image src="/static/img/user.png" mode="aspectFill"></image>
			</view>
			<view class="info">
				<view class="title">
					{{item.title}}
					<view class="date">
						{{time(item.time)}}
					</view>
				</view>
				<view class="brief">
					<view class="text">
						{{item.brief.en}}
					</view>
				</view>
				<view class="tools">
					<view class="given active">
						<view class="iconfont iconbuoumaotubiao16"></view>
						<view class="text">
							 {{item.given}}
						</view>
					</view>
					<view class="comment">
						<view class="iconfont iconpinglun"></view>
						<view class="text">
							{{item.comment}}
						</view>
					</view>
				</view>
			</view>
		</view>
	</scroll-view>
</template>

<script>
	export default {
		data() {
			return {
				arr:[
					{
						title:'MAIRE SLEDGE',
						zhTitle:'这是个标题',
						brief:{
							en:`This is Photoshop's version of Lorem lpsum.
								Proin gravida nibh vel velist austor aliquet.
								Aenean sollictudin456456456456546+456489`,
							zh:`这是一段很长很长很长很长很长很长很长很长很长很长很长很长,
								很长很长很长很长很长很长的简介说明`
						},
						given:2,
						comment:12,
						time:'2019-12-28 15:54:31'
					}
				]
			};
		},
		methods:{
			bottom(){
				this.length +=2
			},
			time(date){
				if(!date){
					return ''
				}
				let newDate =  new Date().getTime();
				let lowDate = new Date(date).getTime();
				console.log(this.date(lowDate));
				let lineTime = Math.round((newDate-lowDate)/1000/60); //间隔时间（分钟）
				if(lineTime<60){
					return `${lineTime}分钟前`
				}else{
					let longTime = Math.round(lineTime/60)
					if(longTime<60){
						return `${longTime}小时前`
					}
					
					return this.date(lowDate)	
				}
			},
			date(data){
				const d = new Date(data);
				let y = d.getFullYear();
				let m = d.getMonth()+1;
				let ri = d.getDate();
				return `${y}年${m}月${ri}日`
			}
		},
		computed: {
			heights() {
				const {
					screenHeight
				} = uni.getSystemInfoSync();
				let rel = screenHeight - 44;
				return rel;
			}
		}
	}
</script>

<style scoped>
	.content {
		width: 100%;
	}

	.content .item {
		height: 260rpx;
		text-align: left;
		padding: 28rpx 35rpx;
		box-sizing: border-box;
		border-bottom: 1px solid #f3f3f3;
		display: flex;
	}

	.content .item .news_img {
		flex: 207rpx 0 0;
		height: 100%;
		overflow: hidden;
	}

	.content .item .news_img>image {
		width: 100%;
		height: 100%;
	}

	.content .item .info {
		flex: 1;
		margin-left: 30rpx;
		font-size: 20rpx;
		display: flex;
		flex-direction: column;
		ustify-content:space-between
	}
	.content .item .info > .title{
		flex: 25rpx 0 0;
		display: flex;
		align-items:center;
		font-size: 28rpx;
		color: #000;
	}
	.content .item .info > .brief{
		flex: auto;
		display: flex;
		align-items:center;
		color: #000;
	}
	.content .item .info > .brief .text{
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 3;
		overflow: hidden;
	}
	.content .item .info>.tools{
		display: flex;
		flex: 27rpx 0 0;
		align-items:center;
		color: #d8d8d8;
	}
	.content .item .info>.tools > .given{
		margin-right: 10px;
	}
	.content .item .info>.tools > .given > view  {
		float: left;
		font-size: 24rpx;
		display: flex;
		line-height: 27rpx;
	}
	.content .item .info>.tools .given .iconfont{
		height: 27rpx;
		font-size: 27rpx;
		margin-right: 2px;
	}
	.content .item .info>.tools .given.active{
		color: #747474;
	}
	.content .item .info>.tools .given .text{
		height: 27rpx;
		vertical-align: middle;
	}
	.content .item .info>.tools .comment >view{
		float: left;
		font-size: 24rpx;
		display: flex;
		line-height: 27rpx;
	}
	.content .item .info>.tools .comment .iconfont{
		height: 27rpx;
		width: 27rpx;
		font-size: 29rpx;
		margin-right: 2px;
	}
	.content .item .info>.tools .comment .text{
		height: 27rpx;
		vertical-align: middle;
	}
</style>

