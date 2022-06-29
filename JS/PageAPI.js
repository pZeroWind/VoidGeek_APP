import {getUrl,modleWin,toForm} from "./ApiConf.js"

//获取轮播图
export function getBanner({out}){
	uni.request({
		url:getUrl()+"/api/PublicApi/getBanner",
		success:res =>{
			if(modleWin(res.data)){
				res.data.data.forEach(i=>{
					i.imgUrl = getUrl()+"/api/PublicApi/getImg?imgUrl="+i.imgUrl
				})
				out(res.data.data)
			}
		}
	})
}

//获取文章列表
export function getPageList({data,out}){
	uni.request({
		url:getUrl()+"/api/PageApi/getList?"+toForm(data),
		success:res=>{
			if(modleWin(res.data)){
				out(res.data.data,res.data.limt)
			}
		}
	})
}

export function PostPageList({data,tags,out}){
	uni.request({
		url:getUrl()+"/api/PageApi/getList?"+toForm(data),
		method:"POST",
		data:{
			tag:tags
		},
		header:{
			"Content-Type":"application/x-www-form-urlencoded"
		},
		success:res=>{
			if(modleWin(res.data)){
				out(res.data.data,res.data.limt)
			}
		}
	})
}

//获取文章信息
export function getPage({pid,out}){
	uni.request({
		url:getUrl()+"/api/PageApi/get?pid="+pid,
		success:res=>{
			if(modleWin(res.data)){
				out(res.data.data)
			}
		}
	})
}

//进入文章页面
export function toPage({pid,out}){
	uni.request({
		url:getUrl()+"/api/PageApi/to?pid="+pid,
		method:"PUT",
		success:res=>{
			if(modleWin(res.data)){
				out(res.data.data)
			}
		}
	})
}

//删除文章
export function deletePage({pid,out}){
	uni.getStorage({
		key:"userData",
		success: (data) => {
			uni.request({
				url:getUrl()+"/api/AdminApi/deletePage?pid="+pid,
				method:"DELETE",
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

//获取置顶热帖
export function getTop({out}){
	uni.request({
		url:getUrl()+"/api/PageApi/getTop",
		success:res=>{
			if(modleWin(res.data)){
				out(res.data.data)
			}
		}
	})
}

//获取评论
export function getSay({data,out}){
	uni.request({
		url:getUrl()+"/api/PageApi/getSayList?"+toForm(data),
		success: res => {
			if(modleWin(res.data)){
				out(res.data)
			}
		}
	})
}

//获取评论回复
export function getReSay({data,out}){
	uni.request({
		url:getUrl()+"/api/PageApi/getReSayList?"+toForm(data),
		success: res => {
			if(modleWin(res.data)){
				out(res.data)
			}
		}
	})
}

//获取模糊搜索关键词
export function getSearchCode({text,out}){
	uni.request({
		url:getUrl()+"/api/PageApi/getContains?text="+text,
		success:res=>{
			if(modleWin(res.data)){
				out(res.data.data)
			}
		}
	})
}

//获取标签
export function getTag({data,out}){
	uni.request({
		url:getUrl()+"/api/PageApi/getTag?"+toForm(data),
		success:res=>{
			if(modleWin(res.data)){
				out(res.data.data)
			}
		}
	})
}

//获取标签
export function getHotTag({out}){
	uni.request({
		url:getUrl()+"/api/PageApi/getHotTag",
		success:res=>{
			if(modleWin(res.data)){
				out(res.data.data)
			}
		}
	})
}

//获取标签
export function getUseTag({data,out}){
	uni.request({
		url:getUrl()+"/api/PageApi/getUseTag?"+toForm(data),
		success:res=>{
			if(modleWin(res.data)){
				out(res.data.data,res.data.limt)
			}
		}
	})
}

//点赞、取消点赞
export function likeChange({pid,mode,out}){
	uni.getStorage({
		key:"userData",
		success:data=>{
			if(!mode){
				uni.request({
					url:getUrl()+"/api/PageApi/like?pid="+pid,
					method:"PUT",
					header:{
						Authorization:data.data.token
					},
					success:res=>{
						if(modleWin(res.data)){
							out(true)
						}
					}
				})
			}else{
				uni.request({
					url:getUrl()+"/api/PageApi/unlike?pid="+pid,
					method:"PUT",
					header:{
						Authorization:data.data.token
					},
					success:res=>{
						if(modleWin(res.data)){
							out(false)
						}
					}
				})
			}
		},
		fail() {
			uni.showToast({
				title:"账号未登录，无法点赞",
				icon:"none",
				position:"bottom"
			})
		}
	})
}

//收藏文章
export function send({type,data,out}){
	uni.getStorage({
		key:"userData",
		success: d => {
			if(type == 0){
				uni.request({
					url:getUrl()+"/api/PageApi/AddSay",
					method:"POST",
					data:data,
					header:{
						"Content-Type":"application/json",
						Authorization:d.data.token
					},
					success:res=>{
						if(res.data){
							out(res.data.data)
						}
					}
				})
			}else{
				uni.request({
					url:getUrl()+"/api/PageApi/AddReSay",
					method:"POST",
					data:data,
					header:{
						"Content-Type":"application/json",
						Authorization:d.data.token
					},
					success:res=>{
						if(res.data){
							out(res.data.data)
						}
					}
				})
			}
		}
	})
}

//举报文章
export function TsumiPage({data,out}){
	uni.getStorage({
		key:"userData",
		success:d=>{
			uni.request({
				url:getUrl()+"/api/PageApi/falsePage",
				method:"POST",
				data:data,
				header:{
					"Content-Type":"application/json",
					Authorization:d.data.token
				},
				success: (res) => {
					if(modleWin(res.data)){
						out(res.data.data)
					}
				}
			})
		},
		fail() {
			uni.showToast({
				title:"暂未登录"
			})
		}
	})
}