//检测邮箱
export function checkEmail(text){
	let exp = new RegExp(/^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/)
	if(exp.test(text)){
		return true
	}
	return false
}


//检测手机号
export function checkPhone(text){
	let exp = new RegExp(/^((13[0-9])|(14[5-9])|(15([0-3]|[5-9]))|(16[6-7])|(17[1-8])|(18[0-9])|(19[1|3])|(19[5|6])|(19[8|9]))\d{8}$/)
	if(exp.test(text)){
		return true
	}
	return false
}