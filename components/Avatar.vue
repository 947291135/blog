<template>
	<view class="avatar">
		<view class="Weather">
			<image src="/static/psd7165.png" mode="aspectFit"></image>
		</view>
		<view class="title">
			{{$t(`Page.index.title`)}}
		</view>
		<view class="info">
			<view class="info_one">
				{{$t(`Page.index.info_one`)}}
			</view>
			<view class="info_one">
				{{$t(`Page.index.info_tow`)}}
			</view>
		</view>
		<view class="time">
			{{$t(`Page.index.data`)}}
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			};
		}
	}
</script>

<style scoped>
	.avatar {
		display: flex;
		padding: 0 40px;
		height: 300px;
		justify-content: center;
		flex-direction: column;
		transition: all .5s ease;
	}

	.avatar>.Weather {
		width: 90px;
		height: 90px;
		overflow: hidden;
	}

	.avatar>.Weather>image {
		display: block;
		width: 100%;
		height: 100%;
	}

	.title {
		white-space: nowrap;
		margin-top: 16px;
		padding: 0 6px;
		font-size: 16px;
		letter-spacing: 1px;
		font-weight: 300;
		text-align: left;
		color: #fff;
	}

	.info {
		color: #fff;
		padding: 0 6px;
		margin-top: 16px;
	}

	.info> view {
		font-size: 13px;
		font-weight: 100;
		opacity: 0.8;
		text-align: left;
		white-space: nowrap;
	}

	.time {
		margin-top: 22px;
		margin-bottom: 8px;
		padding: 0 6px;
		font-size: 14px;
		text-align: left;
		color: #fff;
		white-space: nowrap;
	}
</style>
