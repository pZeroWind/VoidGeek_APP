import {getUrl,modleWin,toForm} from "./ApiConf.js"
import {GetColor,GetLv} from "./exc.js"
import {CeilDate} from "./Time.js"
import {getUser} from "./UserAPI.js"
import {getSay} from "./PageAPI.js"

//获取关注列表
export function getLikeUser({data,out}){
	uni.getStorage({
		key:"userData",
		success:d=>{
			uni.request({
				url:getUrl()+"/api/LinkApi/getLikeUsers?"+toForm(data),
				header:{
					Authorization:d.data.token
				},
				success:res=>{
					if(modleWin(res.data)){
						res.data.data.forEach(i=>{
							i.imgUrl = getUrl()+"/api/PublicApi/getImg?imgUrl="+i.imgUrl
							i.exc = GetLv(i.exc)
							i.color = GetColor(i.exc)
							i.num = 0
							getLetterNum({
								vid:i.vid,
								out:res2=>{
									i.num = res2
								}
							})
						})
						out(res.data.data,res.data.limt)
						
					}
				}
			})
		}
	})
}

//获取关注列表
export function getLikeUserFind({data,out}){
	uni.getStorage({
		key:"userData",
		success:d=>{
			uni.request({
				url:getUrl()+"/api/LinkApi/getLikeUsersFind?"+toForm(data),
				success:res=>{
					if(modleWin(res.data)){
						res.data.data.forEach(i=>{
							i.imgUrl = getUrl()+"/api/PublicApi/getImg?imgUrl="+i.imgUrl
							i.exc = GetLv(i.exc)
							i.color = GetColor(i.exc)
							i.num = 0
						})
						out(res.data.data)
					}
				}
			})
		}
	})
}

//获取与目标未读消息数量
function getLetterNum({vid,out}){
	uni.getStorage({
		key:"userData",
		success:data=>{
			uni.request({
				url:getUrl()+"/api/LinkApi/getLetterNum?vid="+vid,
				header:{
					Authorization:data.data.token
				},
				success:res=>{
					if(modleWin(res.data)){
						out(res.data.data)
					}
				}
			})
		}
	})
}

//获取私信者列表
export function getLetterUser({data,out}){
	uni.getStorage({
		key:"userData",
		success:d=>{
			uni.request({
				url:getUrl()+"/api/LinkApi/getLetterMe?"+toForm(data),
				header:{
					Authorization:d.data.token
				},
				success:res=>{
					if(modleWin(res.data)){
						res.data.data.forEach(i=>{
							i.imgUrl = getUrl()+"/api/PublicApi/getImg?imgUrl="+i.imgUrl
							i.exc = GetLv(i.exc)
							i.color = GetColor(i.exc)
							i.num = 0
							getLetterNum({
								vid:i.vid,
								out:res2=>{
									i.num = res2
								}
							})
						})
						out(res.data.data,res.data.limt)
					}
				}
			})
		}
	})
}

//获取与目标历史消息
export function getLetter({data,out}){
	uni.getStorage({
		key:"userData",
		success:d=>{
			uni.request({
				url:getUrl()+"/api/LinkApi/getLetter?"+toForm(data),
				header:{
					Authorization:d.data.token
				},
				success:res=>{
					if(modleWin(res.data)){
						res.data.data.forEach(i=>{
							i.time=CeilDate(i.time)
						})
						out(res.data.data,res.data.limt)
					}
				}
			})
		}
	})
}

//向目标发送私信
export function toSend({data,out}){
	uni.getStorage({
		key:"userData",
		success:d=>{
			uni.request({
				url:getUrl()+"/api/LinkApi/toSend",
				method:"POST",
				data:data,
				header:{
					"Content-Type":"application/json",
					Authorization:d.data.token
				},
				success:res=>{
					if(modleWin(res.data)){
						out(res.data.data)
					}
				}
			})
		}
	})
}

//将目标私信转为已读
export function readed({vid}){
	uni.getStorage({
		key:"userData",
		success:d=>{
			uni.request({
				url:getUrl()+"/api/LinkApi/readedLetter?vid="+vid,
				method:"PUT",
				header:{
					Authorization:d.data.token
				},
				success:res=>{
					modleWin(res.data)
				}
			})
		}
	})
}

//获取未读回复
export function getReMe({data,out}){
	uni.getStorage({
		key:"userData",
		success:d=>{
			uni.request({
				url:getUrl()+"/api/LinkApi/getReMe?"+toForm(data),
				header:{
					Authorization:d.data.token
				},
				success:res=>{
					if(modleWin(res.data)){
						res.data.data.forEach(i=>{
							i.content = `<strong>` + i.userName+ `：</strong>` + i.content
							i.vid = "-2"
						})
						out(res.data.data,res.data.limt)
					}
				}
			})
		}
	})
}

//获取未读回复
export function getSayMe({data,out}){
	uni.getStorage({
		key:"userData",
		success:d=>{
			uni.request({
				url:getUrl()+"/api/LinkApi/getSayMe?"+toForm(data),
				header:{
					Authorization:d.data.token
				},
				success:res=>{
					if(modleWin(res.data)){
						res.data.data.forEach(i=>{
							i.content =  i.userName+ `：` + i.content
							i.vid = "-3"
						})
						out(res.data.data,res.data.limt)
					}
				}
			})
		}
	})
}

//获取系统消息
export function getPostMe({data,out}){
	uni.getStorage({
		key:"userData",
		success:d=>{
			uni.request({
				url:getUrl()+"/api/LinkApi/getPostMe?"+toForm(data),
				header:{
					Authorization:d.data.token
				},
				success:res=>{
					if(modleWin(res.data)){
						res.data.data.forEach(i=>{
							i.vid = "-1"
						})
						out(res.data.data,res.data.limt)
					}
				}
			})
		}
	})
}

//获取所有未读消息数量
export function getMsgNum({out}){
	uni.getStorage({
		key:"userData",
		success:d=>{
			uni.request({
				url:getUrl()+"/api/LinkApi/getMsgData",
				header:{
					Authorization:d.data.token
				},
				success:res=>{
					if(modleWin(res.data)){
						out(res.data.data)
					}
				}
			})
		}
	})
}
