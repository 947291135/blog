<template>
	<view :class="['todo',{'active': !!selected}]" @click="handleClick()">
		<view :class="['todo_header',todo_header?'active':'']">
			<view :class="['todo_icon',todo_header?'active':'']" @click.stop='$emit("cloe")'>
				<view :class="['iconfont',todo_header?'iconguanbi':icon]"></view>
			</view>
		</view>
		<view :class="['list',todo_header?'active':'']" v-if="selected !==null">
			列表自己写好吧~
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				todo_header:false
			};
		},
		methods:{
			handleClick(){
				// #ifdef  H5
				const appRect = uni.getSystemInfoSync().safeArea;
				const elRect =this.$el.getBoundingClientRect()
				const todo =this.todo
				const rect = {}
				rect.top = elRect.top - appRect.top
				rect.left = elRect.left - appRect.left
				rect.width = elRect.width;
				rect.height = elRect.height;
				rect.appWidth = appRect.width
				rect.appHeight = appRect.height
				this.$store.commit('selectTodo', {rect,todo})
				// #endif
			},
			clone(){
				this.todo_header =false;
			},
			ent(){
				this.todo_header =true;
			}
		},
		props:{
			selected:{
				type:Boolean,
				default:()=>{
					return false
				}
			},
			todo:{
				type:Object,
				required:true
			},
			icon:{
				type:String,
				default:()=>{
					return 'iconhuiyuan'
				}
			}
		},
	}
</script>

<style scoped>
	.todo {
		position: absolute;
		left: 0;
		right: 0;
		overflow: hidden;
		box-shadow: 0 10px 10px rgba(0, 0, 0, .2);
		color: #666;
		width: 100%;
		background-color: #fff;
		border-radius: 8px;
		height: 100%;
		box-sizing: border-box;
	}
	.todo.active{
		visibility: hidden;
	}
	.todo>.todo_header {
		display: flex;
		padding: 20px;
		height: 44px;
		justify-content: space-between;
		align-items: flex-start;
		transform: translate3d(0, 0, 0);
		will-change: transform;
		transition: all 0s;
	}
	.todo>.todo_header.active{
		padding: 10px;
	}
	.todo>.todo_header>.todo_icon {
		display: flex;
		width: 44px;
		height: 44px;
		border: 1px solid #eee;
		border-radius: 100%;
		justify-content: center;
		align-items: center;
		font-size: 18px;
		box-sizing: border-box;
		transition: all .3s;
	}
	.todo>.todo_header>.todo_icon.active{
		border: none;border: 0px solid #eee;
	}
	.todo > .list{
		opacity: 0;
		transition: all 1s;
		transform: translateY(888px);
	}
	.todo > .list.active{
		opacity: 1;
		transform: translateY(0px);
	}
</style>
