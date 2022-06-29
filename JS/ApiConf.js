export function getUrl(){
	return "http://120.76.177.46:5000"
}

export function getWs(){
	return "ws://120.76.177.46:5000"
}

export function modleWin(res){
	if(res.code!=200){
		uni.showToast({
			title:res.msg,
			icon:"none"
		})
		return false
	}
	return true
}

export function toForm(data){
	let arr = []
	for (let key in data) {
		arr.push(key+"="+data[key])
	}
	return arr.join("&")
}