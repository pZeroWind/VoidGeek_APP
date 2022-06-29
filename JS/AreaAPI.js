import {getUrl,modleWin,toForm} from "./ApiConf.js"

//获取分区
export function getArea({out}){
	uni.request({
		url:getUrl()+"/api/AreaApi/list",
		success:res=>{
			if(modleWin(res.data)){
				out(res.data.data)
			}
		}
	})
}