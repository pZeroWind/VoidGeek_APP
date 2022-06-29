import {getUrl,modleWin,toForm} from "./ApiConf.js"


//获取payUrl
export function getPayUrl({data,out}){
	uni.request({
		url:getUrl()+"/api/PayApi/payLinkAndorid?"+toForm(data),
		success:res=>{
			out(res.data)
		}
	})
}

//获取充值记录
export function getPayHis({page,out}){
	uni.getStorage({
		key:"userData",
		success:d=>{
			let data={
				page:page,
				size:10,
				vid:d.data.vid
			}
			uni.request({
				url:getUrl()+"/api/PayApi/getPayHistory?"+toForm(data),
				success:res=>{
					if(modleWin(res.data)){
						out(res.data.data,res.data.limt)
					}
				}
			})
		}
	})
}

//获取提现记录
export function getPayPlase({page,out}){
	uni.getStorage({
		key:"userData",
		success:d=>{
			let data={
				page:page,
				size:10,
				vid:d.data.vid
			}
			uni.request({
				url:getUrl()+"/api/PayApi/getPayPlease?"+toForm(data),
				success:res=>{
					if(modleWin(res.data)){
						out(res.data.data,res.data.limt)
					}
				}
			})
		}
	})
}

//获取获赏记录
export function getCoinToMe({page,out}){
	uni.getStorage({
		key:"userData",
		success:d=>{
			let data={
				page:page,
				size:10
			}
			uni.request({
				url:getUrl()+"/api/PayApi/getCoinToMe?"+toForm(data),
				header:{
					Authorization:d.data.token
				},
				success:res=>{
					if(modleWin(res.data)){
						out(res.data.data,res.data.limt)
					}
				}
			})
		}
	})
}

//提现
export function downCoin({coin,out}){
	uni.getStorage({
		key:"userData",
		success:d=>{
			uni.request({
				url:getUrl()+"/api/PayApi/downCoin?coin="+coin,
				method:"POST",
				header:{
					Authorization:d.data.token
				},
				success:res=>{
					modleWin(res.data)
					out(res.data.data)
				}
			})
		}
	})
}

//打赏
export function toCoin({data,out}){
	uni.getStorage({
		key:"userData",
		success:d=>{
			uni.request({
				url:getUrl()+"/api/PayApi/toCoin?"+toForm(data),
				method:"POST",
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