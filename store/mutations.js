export default {
	updata(ctx,data){
		data = data || '';
		ctx.index =data;
	},
	UPcurrentIndex(ctx,data){
		data = Number(data) || 0;
		console.log(data)
		ctx.currentIndex =data;
	},
	selectTodo(state,selected){
		state.selected=selected
	}
}