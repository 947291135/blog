<template>
	<view :class="['content_list',{active:!!selected}]" @touchstart.stop="start" @touchmove.stop="move" @touchend.stop="end">
		<view class="list" :style="{width:`${todos.length*100}%`,'min-width':`${todos.length*100}%`}">
			<view class="list_item" v-for="(item,index) of todos" :key='index' :style="{transform:`translate3d(-${currentIndex*100}%,0,0)`}">
				<Todo :selected='selected && item===selected.todo' :todo='item'></Todo>
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
						icon: 'user',
						name: 'Personal',
						colors: ['#ff6262', '#ffa947']
					},
					{
						icon: 'suitcase',
						name: 'Work',
						colors: ['#5b9df9', '#47bfff']
					},
					{
						icon: 'home',
						name: 'Home',
						colors: ['#2c7d59', '#3ba776']
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

<style>
	.content_list {
		padding: 0 32px;
		height: 400px;
		transition: all .5s ease;
		overflow: hidden;
	}
	.content_list.active{
		/* transform: scaleX(1.25); */
	}
	.content_list>.list,
	.list>.list_item {
		display: flex;
		height: 100%;
		transition: all .5s ease;
	}

	.content_list>.list>.list_item {
		flex: 1;
	}

	.content_list>.list>.list_item .todo {
		background-color: #fff;
		border-radius: 8px;
	}
</style>
