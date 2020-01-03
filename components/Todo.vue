<template>
	<view :class="['todo',{'active': !!selected}]" @click="handleClick()">
		<view :class="['todo_header',todo_header?'active':'']">
			<view :class="['todo_icon',todo_header?'active':'']" @click.stop='$emit("cloe")'>
				<view :class="['iconfont',todo_header?'iconguanbi':todo.icon]" :style="{color:todo.colors[0]}"></view>
			</view>
		</view>
		<view :class="['list',todo_header?'active':'']">
			<article-list  v-if="selected!=null"></article-list>	
		</view>
	</view>
</template>

<script>
	import ArticleList from '@/components/ArticleList.vue'
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
				
				// #ifndef H5
				console.log(this.todo)
				uni.navigateTo({
					url:`/PageList/newlist/newlist?topcolor=${this.todo.colors[0]}&type=${this.todo.name}`
				})
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
		components:{
			ArticleList
		}
	}
</script>

<style scoped>
	.todo {
		display: flex;	
		flex: 1;
		overflow: hidden;
		box-shadow: 0 10px 10px rgba(0, 0, 0, .2);
		color: #666;
		width: 100%;
		margin: 0 8px;
		background-color: #fff;
		border-radius: 8px;
		height: 100%;
		box-sizing: border-box;
		flex-direction:column;
		transition: all .5s;
	}
	.todo.active{
		visibility: hidden;
	}
	.todo>.todo_header {
		display: flex;
		padding: 20px;
		flex: 44px 0 0;
		height: 44px;
		justify-content: space-between;
		align-items: flex-start;
		transform: translate3d(0, 0, 0);
		will-change: transform;
		transition: all 0.5s;
	}
	.todo>.todo_header.active{
		padding:0;
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
	.todo>.todo_header>.todo_icon >.iconfont{
		font-size: 24px;
	}
	.todo > .list{
		flex: 1;
		transition: all 1s;
		transform: translateY(888px);
		position: relative;
	}
	.todo > .list.active{
		opacity: 1;
		transform: translateY(0px);
	}
</style>
