<template>
	<view class="list" :animation="listAnimation">
		<view class="close" @click="listClose">
			<view :class="['iconfont',clone]"></view>
		</view>
		<view class="header">
			<view class="logo">
				<image src="/static/img/user.png" mode="aspectFill"></image>
			</view>
			<view class="info">
				<view class="name">
					{{$t(`list.name`)}}
				</view>
				<view class="professional">
					{{$t(`list.Professional`)}}
				</view>
				<view class="skills">
					<view class="skills_i">
						HTML
					</view>
					<view class="skills_i">
						JavaScript
					</view>
					<view class="skills_i">
						VUE
					</view>
					<view class="skills_i">
						PHP
					</view>
					<view class="skills_i">
						axios
					</view>
				</view>
				<view :class="['code', 'iconfont', clone?'iconerweima':'iconguanbi']" @click="codeClick"></view>
			</view>
			
		</view>
		<view class="content">
				<view ref='item' :class="['item',hoverItem==index?'active':'']" v-for="(item,index) of list" :key='index' @touchstart.stop="hover" @touchmove.stop="hover" @touchend.stop="start" :data-item='index'>
					<view :class="['item_left','iconfont',item.icon]"></view>
					<view class="text">{{$t(`list.data[${index}].text`)}}</view>
					<view class="item_rigth iconfont iconarrow-right-copy-copy"></view>
				</view>
		</view>
		<view class="footer">
			<view class="f_item" @click="anguagelTab">
				<view :class="['iconfont',language==='zh'?'iconzhongwen':'iconyingwen']"></view>
				<view class="text ">
					{{language==='zh'?'中文':'English'}}
				</view>
			</view>
			<view class="f_item">
				<view class="OF">36</view>
				<view class="text">
					深圳
				</view>
			</view>
		</view>
	</view>
</template>

<script scoped>
	import icons from './uni-icons/icons.js';
	export default {
		data() {
			return {
				listAnimation: null,
				hoverItem:null,
				list:[
					{
						icon:'iconjurassic_apply',
						text:'全部文章'
					},
					{
						icon:'iconnpm',
						text:'我的npm'
					},
					{
						icon:'iconxiangmu',
						text:'项目库'
					},
					{
						icon:'iconruanjianxiazai',
						text:'软件分享'
					},
					{
						icon:'iconxiangce',
						text:'图片分享'
					},
					{
						icon:'iconresume-s',
						text:'我的简历'
					}
				],
				clone:null
			};
		},
		mounted(){
			// #ifdef  APP-PLUS || H5
			  this.clone = 'iconguanbi'
			// #endif
		},
		methods: {
			show() {
				let listanimation = uni.createAnimation({
				    duration: 300,
				    timingFunction: 'ease',
				})
				listanimation.translateX(0).step();
				setTimeout(()=>{
					this.listAnimation = listanimation.export()
				},0);
			},
			close() {
				let listanimation = uni.createAnimation({
				    duration: 300,
				    timingFunction: 'ease',
				})
				listanimation.translateX("-100%").step();
				setTimeout(()=>{
					this.listAnimation = listanimation.export()
				},0);
			},
			listClose(){
				this.$emit('close')
			},
			hover(e){
				let index = e.currentTarget.dataset.item
				this.hoverItem =index
				// this.$refs.item[index].$el.style.background='#f0f0f0'
			},
			start(e){
				let index = e.currentTarget.dataset.item
				this.hoverItem = null
			},
			anguagelTab(){
				//  语言切换
				let lg = this.language ==='zh'?'en':'zh'
				this._i18n.locale = lg
			},
			codeClick(){
				// #ifdef  MP-WEIXIN
				  this.listClose()
				// #endif
			}
		},
		computed:{
			language(){
				return this._i18n.locale
			}
		}
	}
</script>

<style scoped>
	.list {
		position: absolute;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		transform: translateX(-100%);
		background: #fff;
		display: flex;
		flex-direction:column;
		/* justify-content: center;
		align-items:stretch; */
	}
	/* header */
	.list > .header{
		/* #ifndef APP-NVUE */
		margin-top: 30px;
		/* #endif */
		flex: 195px 0 0;
		box-sizing: border-box;
		padding: 55px 35rpx 40px 35rpx;
		display: flex;
		justify-content:center;
		align-items:center;
	}
	.list > .header > .logo{
		flex: 110rpx 0 0;
		margin-right: 25rpx;
		height: 110rpx;
		overflow: hidden;
		border-radius: 50% ;
	}
	.list > .header > .logo >image{
		width: 100%;
		height: 100%;
	}
	.list > .header > .info{
		flex: 1;
		position: relative;
	}
	.list > .header > .info > .name{
		font-size: 16px;
		font-weight: 700;
	}
	.list > .header > .info > .professional{
		font-size: 12px;
		color: #c3c2c8;
		padding: 10rpx 0;
	}
	.list > .header > .info > .skills{
		font-size: 12px;	
	}
	.list > .header > .info > .skills .skills_i{
		padding: 2px 10px 2px 15px;
		margin-right: 5rpx;
		margin-bottom: 5rpx;
		display: inline-block;
		border-radius: 5rpx;
		background: rgb(236,245,255);
		color: #409eff;
		position: relative;
	}
	.list > .header > .info > .skills .skills_i:after{
		content: '';
		position: absolute;
		width: 5px;
		height: 5px;
		background: #409eff;
		border-radius: 50%;
		left: 5px;
		top: 50%;
		transform: translateY(-50%);
	}
	.list > .header > .info > .code.iconfont{
		font-size: 25px;
		color: #000;
		position: absolute;
		top: 0;
		right: 0;
	}
	.list > .header > .info > .code.iconfont.iconguanbi{
		font-size: 16px;
	}
	
	
	/* content */
	.list > .content{
		overflow-y: scroll;
		position: relative;
		flex: 1 1 auto;
	}
	.list > .content .item{
		height: 85rpx;
		width: 100%;
		position: relative;
		padding: 20rpx 35rpx;
		box-sizing: border-box;
		display: flex;
		align-items: center;
		min-width: 300px;
		justify-content: flex-start;
		background: #fff;
	}
	.list > .content .item.active{
		background: #f0f0f0;
	}
	.list > .content .item > view{
		vertical-align: middle;
		display: inline-block;
	}
	.list > .content .item > .item_left.iconfont{
		font-size: 40rpx;
		color: #9aa3b3;
		margin-right: 30rpx;
	}
	.list > .content .item > .text{
		font-size: 28rpx;
		color: #000;
		vertical-align: top;
	}
	.list > .content .item > .item_rigth{
		font-size: 28rpx;
		font-weight: 700;
		color: #9aa3b3;
		position: absolute;
		right: 30rpx;
		top: 50%;
		transform: translateY(-50%);
	}
	
	
	/* footer */
	.list > .footer{
		flex: 60px 0 0;
		box-sizing: border-box;
		padding: 0 35rpx 15px 35rpx;
		display: flex;
		align-items:stretch;
		text-align: center;
	}
	.list > .footer > .f_item{
		margin-right: 65rpx;
		position: relative;
	}
	.list > .footer > .f_item:last-child{
		margin: 0;
	}
	
	.list > .footer > .f_item > .iconfont{
		font-size: 24px;
		color: #9aa3b3;
		font-weight: 700;
		padding-left: 5px;
		padding-right: 5px;
	}
	.list > .footer > .f_item > .OF{
		font-size: 18px;
		color: #9aa3b3;
		font-weight: 700;
		position: relative;
		padding-left: 5px;
		padding-right: 5px;
	}
	.list > .footer > .f_item > .OF:after{
		content: 'o';
		position: absolute;
		font-size: 12px;
		top: 0;
	}
	.list > .footer > .f_item >.text{
		font-size: 12px;
		color: #0B0B0B;
		position: absolute;
		bottom: 0;
		left: 0;
		right: 0;
		width: 100%;
		display: inline-block;
		text-align: center;
	}
	
	
	
	
	.close{
		position: absolute;
		right: 35rpx;
		top: 20rpx;
		/*  #ifdef  APP-PLUS*/
		top: 80rpx;
		/*  #endif  */
		font-weight: 700;
		color: #333333;
		cursor: pointer;
	}
	.close .iconfont{
		font-size: 16px;
		color: #0b0b0b;
	}
</style>
