<template>
	<view ref='TodoDetail' class="TodoDetail" v-show="selected" :animation="listAnimation">
		<todo ref='todo' :todo="selected.todo" @cloe='cloe()' v-if="selected"></todo>
	</view>
</template>

<script>
	import Todo from '@/components/Todo.vue'
	export default {
		data() {
			return {
				listAnimation:null
			};
		},
		methods:{
			cloe(){
				let listanimation = uni.createAnimation({
				    duration: 500,
				    timingFunction: 'ease',
				})
				listanimation.top(`${this.selected.rect.top}px`).left(`${this.selected.rect.left}px`).width(`${this.selected.rect.width}px`).height(`${this.selected.rect.height}px`).step();
				setTimeout(()=>{
					this.listAnimation = listanimation.export();
					this.$refs.todo.clone();
					setTimeout(()=>{
						this.$store.commit('selectTodo', null)
					},500)
					
				},0);
			}
		},
		computed: {
			selected() {
				return this.$store.state.selected
			}
			
		},
		components: {
			Todo
		},
		watch: {
			selected: {
				handler(newValue, oldValue) {
					// #ifdef  H5
					if (newValue) {
						setTimeout(() => {
							const el = this.$refs['TodoDetail'].$el;
							Object.assign(el.style, {
								top: `${this.selected.rect.top}px`,
								left: `${this.selected.rect.left}px`,
								width: `${this.selected.rect.width}px`,
								height: `${this.selected.rect.height}px`
							})
							let listanimation = uni.createAnimation({
							    duration: 500,
							    timingFunction: 'ease',
							})
							listanimation.top(0).left(0).width(`${this.selected.rect.appWidth}px`).height(`${this.selected.rect.appHeight}px`).step();
							setTimeout(()=>{
								this.listAnimation = listanimation.export()
								this.$refs.todo.ent()
							},1);
						}, 0)
					}
					// #endif
				},
				deep: true
			}
		}
	}
</script>

<style scoped>
	.TodoDetail {
		position: fixed;
		display: flex;
		flex-direction: column;
		border-radius: 0;
		background-color: #fff;
		color: #666;
		will-change: top, left, width, height;
	}
	.TodoDetail > .todo{
		margin: 0;
		box-shadow: none;
	}
</style>
