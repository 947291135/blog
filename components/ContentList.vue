<template>
	<view :class="['content_list',{active:!!selected}]" @touchstart="start" @touchmove.stop="move" @touchend="end" v-if="!selected">
		<view class="list" :style="{width:`${todos.length*100}%`,'min-width':`${todos.length*100}%`}">
			<view class="list_item" v-for="(item,index) of todos" :key='index' :style="{transform:`translate3d(-${currentIndex*105}%,0,0)`}">
				<Todo :selected='selected && item===selected.todo' :todo='item' :index='index' :icon='item.icon'></Todo>
			</view>
		</view>
	</view>
</template>

<script>
	import Todo from '@/components/Todo.vue'
	export default {
		data() {
			return {
				todos: [{
						icon: 'iconhtml',
						name: 'html',
						colors: ['#ff6262', '#ffa947']
					},
					{
						icon: 'iconlinux',
						name: 'linux',
						colors: ['#5b9df9', '#47bfff']
					},
					{
						icon: 'iconvuejs-fill',
						name: 'vue',
						colors: ['#2c7d59', '#3ba776']
					},
					{
						icon: 'iconphp',
						name: 'php',
						colors: ['#5C258D', '#4486A0'],
					},
					{
						icon: 'iconjs',
						name: 'js',
						colors: ['#B8BB0B', '#85C7F9'],
					},
					{
						icon: 'iconquanbuyingyong',
						name: 'all',
						colors: ['#182848', '#4867ac'] 
						
					}	
				],
				touch: {}
			};
		},
		computed: {
			currentIndex() {
				return this.$store.state.currentIndex
			},
			selected() {
				return this.$store.state.selected
			},
		},
		methods: {
			start(e) {
				this.touch.startX = e.touches[0].clientX
				this.touch.endX = 0
			},
			move(e) {
				this.touch.endX = e.touches[0].clientX
			},
			end(e) {
				if (!this.touch.endX || Math.abs(this.touch.endX - this.touch.startX) < 20) {
					return
				}
				let index = this.currentIndex;
				if (this.touch.endX < this.touch.startX) {
					index++;
					index = index >= this.todos.length ? this.todos.length - 1 : index
					this.$store.commit('UPcurrentIndex', index)
				} else {
					index--;
					index = index <= 0 ? 0 : index
					this.$store.commit('UPcurrentIndex', index)
				}
			}
		},
		components: {
			Todo
		}
	}
</script>

<style scoped>
	.content_list {
		padding: 0 32px;
		height: 370px;
		transition: all .5s ease;
		overflow: hidden;
		
	}
	.content_list.active{
		transform: scaleX(1.25);
	}
	.content_list>.list,
	.list>.list_item {
		display: flex;
		height: 100%;
		transition: all .5s ease;
	}

	.content_list>.list>.list_item {
		flex: 1;
		margin: 0 8px;
		box-sizing: border-box;
		position: relative;
	}
</style>
