import {getUrl,modleWin,toForm} from "./ApiConf.js"


//获取用户信息
export function getUser({vid,out}){
	uni.request({
		url:getUrl()+"/api/UserApi/find?vid="+vid,
		success: res => {
			if(modleWin(res.data)){
				res.data.data.imgUrl = getUrl()+"/api/PublicApi/getImg?imgUrl="+res.data.data.imgUrl
				out(res.data.data)
			}
		}
	})
}

//获取自己的信息
export function getMe({out}){
	uni.getStorage({
		key:"userData",
		success:data=>{
			uni.request({
				url:getUrl()+"/api/UserApi/user",
				header:{
					Authorization:data.data.token
				},
				success: res => {
					if(modleWin(res.data)){
						res.data.data.imgUrl = getUrl()+"/api/PublicApi/getImg?imgUrl="+res.data.data.imgUrl
						out(res.data.data)
					}
				}
			})
		}
	})
}

//登录
export function login({data,out}){
	uni.request({
		url:getUrl()+"/api/UserApi/login",
		method:"POST",
		data:data,
		success:res=>{
			if(modleWin(res.data)){
				out(res.data.data,res.data.msg)
			}
		}
	})
}

//登录
export function loginCode({data,out}){
	uni.request({
		url:getUrl()+"/api/CodeApi/login",
		method:"POST",
		data:data,
		success:res=>{
			if(modleWin(res.data)){
				out(res.data.data,res.data.msg)
			}
		},
		fail:res=>{
			console.log(res)
		}
	})
}

//修改个人信息
export function change({data,out}){
	uni.getStorage({
		key:"userData",
		success:d=>{
			uni.request({
				url:getUrl()+"/api/UserApi/updateData",
				method:"PUT",
				data:data,
				header:{
					"Content-Type":"application/json",
					Authorization:d.data.token
				},
				success: res => {
					if(modleWin(res.data)){
						out(res.data.data)
					}
				}
			})
		}
	})
}

//获取用户历史记录
export function getHistory({out}){
	uni.getStorage({
		key:"userData",
		success:data=>{
			uni.request({
				url:getUrl()+"/api/UserApi/getHistory",
				header:{
					Authorization:data.data.token
				},
				success: res => {
					if(modleWin(res.data)){
						out(res.data.data)
					}
				}
			})
		}
	})
}

//添加历史记录
export function addHistory({pid}){
	uni.getStorage({
		key:"userData",
		success:data=>{
			uni.request({
				url:getUrl()+"/api/UserApi/addHistory?pid="+pid,
				method:"POST",
				header:{
					Authorization:data.data.token
				},
				success: res => {
					modleWin(res.data)
				}
			})
		}
	})
}

//获取收藏夹
export function getFolder({vid,out}){
	uni.request({
		url:getUrl()+"/api/UserApi/getFolderFind?vid="+vid,
		success: res => {
			if(modleWin(res.data)){
				out(res.data.data)
			}
		}
	})
}

//获取收藏文章
export function getSave({data,out}){
	uni.request({
		url:getUrl()+"/api/UserApi/getSavePage?"+toForm(data),
		success: res => {
			if(modleWin(res.data)){
				out(res.data.data,res.data.limt)
			}
		}
	})
}

//添加文件夹
export function addFolder({data,out}){
	uni.getStorage({
		key:"userData",
		success:d=>{
			uni.request({
				url:getUrl()+"/api/UserApi/addFolder",
				method:"POST",
				data:data,
				header:{
					"Content-Type":"application/json",
					Authorization:d.data.token
				},
				success: res => {
					if(modleWin(res.data)){
						out(res.data.data)
					}
				}
			})
		}
	})
}

//删除收藏夹
export function removeFolder({sfid,out}){
	uni.getStorage({
		key:"userData",
		success:d=>{
			uni.request({
				url:getUrl()+"/api/UserApi/deleteFolder?sfid="+sfid,
				method:"DELETE",
				header:{
					Authorization:d.data.token
				},
				success: res => {
					if(modleWin(res.data)){
						out(res.data.data)
					}
				}
			})
		}
	})
}

//收藏
export function setSave({data,out}){
	uni.getStorage({
		key:"userData",
		success:d=>{
			uni.request({
				url:getUrl()+"/api/UserApi/addSave?"+toForm(data),
				method:"POST",
				header:{
					Authorization:d.data.token
				},
				success: res => {
					if(modleWin(res.data)){
						out(res.data.data)
					}
				}
			})
		}
	})
}

//删除收藏的文章
export function removeSave({data,out}){
	uni.getStorage({
		key:"userData",
		success:d=>{
			uni.request({
				url:getUrl()+"/api/UserApi/deleteSave?"+toForm(data),
				method:"DELETE",
				header:{
					Authorization:d.data.token
				},
				success: res => {
					if(modleWin(res.data)){
						out(res.data.data)
					}
				}
			})
		}
	})
}

//检测是否点赞、收藏、关注
export function checkUser({pid,vid,likeOut,userOut,saveOut}){
	uni.getStorage({
		key:"userData",
		success:data=>{
			uni.request({
				url:getUrl()+"/api/UserApi/checkLike?pid="+pid,
				header:{
					Authorization:data.data.token
				},
				success:res=>{
					if(modleWin(res.data)){
						likeOut(res.data.data)
					}
				}
			})
			uni.request({
				url:getUrl()+"/api/UserApi/checkLikeUser?vid="+vid,
				header:{
					Authorization:data.data.token
				},
				success:res2=>{
					if(modleWin(res2.data)){
						userOut(res2.data.data)
					}
				}
			})
			uni.request({
				url:getUrl()+"/api/UserApi/checkSave?pid="+pid,
				header:{
					Authorization:data.data.token
				},
				success:res3=>{
					if(modleWin(res3.data)){
						saveOut(res3.data.data)
					}
				}
			})
		}
	})
}

export function checkLikeUser({vid,userOut}){
	uni.getStorage({
		key:"userData",
		success:data=>{
			uni.request({
				url:getUrl()+"/api/UserApi/checkLikeUser?vid="+vid,
				header:{
					Authorization:data.data.token
				},
				success:res2=>{
					if(modleWin(res2.data)){
						userOut(res2.data.data)
					}
				}
			})
		}
	})
}

//关注用户
export function likeUser({vid,out}){
	uni.getStorage({
		key:"userData",
		success:data=>{
			uni.request({
				url:getUrl()+"/api/UserApi/likeUser?vid="+vid,
				method:"PUT",
				header:{
					Authorization:data.data.token
				},
				success:res => {
					if(modleWin(res.data)){
						out(res.data.data)
					}
				}
			})
		},
		fail() {
			uni.showToast({
				title:"账号未登录，无法关注用户",
				icon:"none",
				position:"bottom"
			})
		}
	})
}

//获取账号登录信息
export function getloginData({page,out}){
	uni.getStorage({
		key:"userData",
		success:data=>{
			let d = {
				page:page,
				size:10,
				mode:3,
				vid:data.data.vid
			}
			uni.request({
				url:getUrl()+"/api/AdminApi/getLoginData?"+toForm(d),
				method:"GET",
				header:{
					Authorization:data.data.token
				},
				success:res => {
					if(modleWin(res.data)){
						out(res.data.data,res.data.limt)
					}
				}
			})
		},
		fail() {
			uni.showToast({
				title:"账号未登录，无法关注用户",
				icon:"none",
				position:"bottom"
			})
		}
	})
}

export function changePwd({data,out}){
	uni.getStorage({
		key:"userData",
		success:data=>{
			uni.request({
				url:getUrl()+"/api/UserApi/password",
				method:"PUT",
				data:data,
				header:{
					Authorization:data.data.token
				},
				success:res => {
					if(modleWin(res.data)){
						out(res.data.data,res.data.msg)
					}
				}
			})
		}
	})
}

export function forget({data,out}){
	uni.request({
		url:getUrl()+"/api/UserApi/forget?"+toForm(data),
		method:"PUT",
		success:res => {
			if(modleWin(res.data)){
				out(res.data.data,res.data.msg)
			}
		}
	})
}

export function reg({data,out}){
	uni.request({
		url:getUrl()+"/api/UserApi/register",
		method:"POST",
		data:data,
		header:{
			"Content-Type":"application/json"
		},
		success:res => {
			if(modleWin(res.data)){
				out(res.data.data,res.data.msg)
			}
		}
	})
}



