<template>
	<view class="bgcolor" :class="{ active:active}" :style="{backgroundImage:gradientColor}"></view>
</template>

<script>
	export default {
		created(){
			console.log()
		},
		props:{
			colors:{
				type:Array,
				default:()=>{
					return ['#fff','#fff']
				}
			},
			active:{
				type:Boolean,
				default:()=>{
					return false
				}
			}
		},
		computed:{
			gradientColor(){
				const colorBottom = `color-stop(30%, ${this.colors[0]})`
				const colorTop = `to(${this.colors[1]})`
				return `-webkit-gradient(linear, left bottom, left top, ${colorBottom}, ${colorTop})`
			}
		}
	}
</script>

<style>
.bgcolor{
	position: absolute;
	width: 100%;
	height: 100%;
	opacity: 0;
	transition: opacity .5s ease;
}
.bgcolor.active{
	opacity: 1;
}
</style>
