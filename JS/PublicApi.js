import {getUrl,modleWin} from "./ApiConf.js"

//上传图片
export function updateImg({data,out}){
	uni.uploadFile({
		url:getUrl()+"/api/PublicApi/update",
		filePath:data,
		success:res=>{
			if(modleWin(JSON.parse(res.data))){
				out(JSON.parse(res.data).data)
			}
		}
	})
}

//获取邮箱验证码
export function getCode({email,out}){
	uni.request({
		url:getUrl()+"/api/PublicApi/getEmailCode",
		method:"POST",
		data:{email:email},
		header:{
			"Content-Type":"application/x-www-form-urlencoded"
		},
		success:res => {
			if(modleWin(res.data)){
				out(res.data.data)
			}
		}
	})
}

export function getCodeForVid({vid,out}){
	uni.request({
		url:getUrl()+"/api/UserApi/getCodeForVid?vid="+vid,
		success:res => {
			if(modleWin(res.data)){
				out(res.data.data)
			}
		}
	})
}

export function checkupdate({vision,out}){
	uni.request({
		url:getUrl()+"/api/PublicApi/AndroidUpdateCheck?vision="+vision,
		success:res => {
			out(res.data)
		}
	})
}

export function ToReturn({data,out}){
	uni.request({
		url:getUrl()+"/api/PublicApi/sendReturn",
		method:"POST",
		data:data,
		header:{
			"Content-Type":"application/json"
		},
		success:res => {
			if(modleWin(res.data)){
				out(res.data.data)
			}
		}
	})
}

export function getUpdateUrl({out}){
	uni.request({
		url:getUrl()+"/api/PublicApi/AndroidDownload",
		success:res => {
			out(res.data)
		}
	})
}