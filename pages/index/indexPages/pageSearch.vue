<template>
	<view>
		<u-sticky>
			<view>
				<view style="background-color: #333;padding-bottom: 10px;">
					<view class="stuBar"></view>
					<view style="padding-top:10px;display: flex;">
						<image @click="toBack" style="width: 30px;height: 30px;" src="../../../static/icon/arrow-left-s-line.svg"></image>
						<view class="search" style="flex: 1;" @click="toSearch()">
							<image src="../../../static/icon/search-line.svg"></image>
							<input type="text" v-model="conSearch" placeholder="输入关键词搜索" disabled />
						</view>
					</view>
				</view>
				<view class="seletor">
					<view class="sel" @click="showList(1)">
						<image v-if="!round.show" src="../../../static/icon/arrow-down-s-fill.svg"></image>
						<image v-else src="../../../static/icon/arrow-up-s-fill.svg"></image>
						<view>{{round.list[round.index]}}</view>
					</view>
					<view class="sel" @click="showList(2)">
						<image v-if="!tags.show" src="../../../static/icon/arrow-down-s-fill.svg"></image>
						<image v-else src="../../../static/icon/arrow-up-s-fill.svg"></image>
						<view>标签</view>
					</view>
					<view class="sel" @click="showList(3)">
						<image v-if="!area.show" src="../../../static/icon/arrow-down-s-fill.svg"></image>
						<image v-else src="../../../static/icon/arrow-up-s-fill.svg"></image>
						<view>{{area.list[area.index].areaName}}</view>
					</view>
				</view>
				<view class="round downList" v-show="round.show">
					<u-cell :border="false" :key="i" v-for="(it,i) in round.list">
						<view @click="changeRound(i)" slot="title" :class="{cell_sel:it==round.list[round.index]}" hover-class="cell_sel" class="list_title">{{it}}</view>
					</u-cell>
				</view>
				<view class="downList" v-show="area.show">
					<u-cell :border="false" :key="i" v-for="(it,i) in area.list">
						<view @click="changeArea(it.aid,i)" :class="{cell_sel:it==area.list[area.index]}" hover-class="cell_sel" slot="title" class="list_title">{{it.areaName}}</view>
					</u-cell>
				</view>
				<view class="downList" v-show="tags.show">
					<view style="margin: 0;" class="page_tag">
						<view @click="pushTag(it)" :key="i" v-for="(it,i) in tags.list" class="tags"
						:class="{tag_sel:conTag.indexOf(it)!=-1}"
						>{{it}}</view>
					</view>
				</view>
			</view>
		</u-sticky>
		<u-empty mode="search" v-if="pageData.list.length==0">
		</u-empty>
		<scroll-view v-else scroll-y>
			<view @click="toPage(it.pid)" class="page_list" v-for="(it,i) in pageData.list" :key="i">
				<image v-if="it.post!=null&&it.post!='null'&&it.post!=''&&it.post!=undefined" :src="it.post">
				</image>
				<view>
					<text class="page_title">{{it.title}}</text>
					<text class="page_content" v-html="it.content"></text>
					<view class="page_data">
						<view>
							<image class="icon_small" src="../../../static/icon/thumbupline.svg">{{it.likeNum}}
						</view>
						<view>
							<image class="icon_small" src="../../../static/icon/eyeline.svg">{{it.readNum}}
						</view>
						<view class="page_time">{{it.time}}</view>
					</view>
				</view>
			</view>
			<u-loadmore @loadmore="postData" :status="status" />
		</scroll-view>
	</view>
</template>

<script>
	import {
		getArea
	} from "../../../JS/AreaAPI.js"
	import {
		PostPageList,
		getUseTag
	} from "../../../JS/PageAPI.js"
	import {
		changeDate
	} from "../../../JS/Time.js"
	export default {
		data() {
			return {
				tags:{
					list:[],
					show:false
				},
				conTag:[],
				conSearch:"",
				pageData:{
					list:[],
					limt:1,
					page:0
				},
				status:"loadmore",
				round:{
					list:[
						"推荐",
						"热门",
						"点赞",
						"最新"
					],
					index:0,
					show:false
				},
				area:{
					list:[{
						areaName:"全部专区",
						aid:"00"
					}],
					index:0,
					show:false
				},
				aid:"00",
				loading:false
			}
		},
		onPullDownRefresh() {
			this.flushData()
		},
		onReachBottom() {
			this.postData()
		},
		onLoad(op) {
			this.conSearch = op.src
			if(op.tag!=""){
				this.conTag.push(op.tag)
			}
			this.setHis()
			if(op.aid!=undefined){
				this.aid=op.aid
			}
			this.postData()
			getArea({
				out:res=>{
					this.area.list.push(...res)
					this.area.index = parseInt(this.aid)
				}
			})
			this.getTags()
		},
		methods:{
			toBack(){
				uni.navigateBack()
			},
			showList(i){
				switch(i){
					case 1:
					this.area.show = false
					this.tags.show = false
					this.round.show = !this.round.show
					break
					case 2:
					this.area.show = false
					this.round.show = false
					this.tags.show = !this.tags.show
					break
					case 3:
					this.tags.show = false
					this.round.show = false
					this.area.show = !this.area.show
					break
				}
			},
			pushTag(it){
				if(this.loading){
					return
				}
				if(this.conTag.indexOf(it)==-1){
					this.conTag.push(it)
				}else{
					this.conTag = this.conTag.filter(i=>{return i!=it})
				}
				this.flushData()
			},
			changeRound(i){
				if(this.loading){
					return
				}
				this.round.index = i
				this.flushData()
			},
			changeArea(aid,i){
				if(this.loading){
					return
				}
				this.aid = aid
				this.area.index = i
				this.flushData()
			},
			setHis(){
				uni.getStorage({
					key:"His",
					success:res=>{
						if(this.conSearch==""||this.conSearch==undefined){
							return
						}
						if(res.data.indexOf(this.conSearch)!=-1){
							res.data = res.data.filter(i=>{
								return i != this.conSearch
							})
						}
						res.data.push(this.conSearch)
						if(res.data.length>5){
							res.data.shift()
						}
						uni.setStorageSync("His",res.data)
					},
					fail: () => {
						uni.setStorageSync("His",[this.conSearch])
					}
				})
			},
			toSearch(){
				uni.navigateTo({
					url:"pageInput?src="+this.conSearch
				})
			},
			toPage(pid){
				uni.navigateTo({
					url:"./pageData?pid="+pid
				})
			},
			flushData(){
				this.pageData = {
					list:[],
					limt:1,
					page:0
				}
				this.postData()
			},
			getTags(){
				getUseTag({
					data:{
						page:1,
						size:50
					},
					out:res=>{
						this.conTag.forEach(i=>{
							if(res.indexOf(i)==-1){
								res.unshift(i)
							}
						})
						this.tags.list.push(...res)
					}
				})
			},
			//载入数据
			postData(){
				this.loading = true
				uni.showLoading()
				this.status = "loading"
				if(this.pageData.page > this.pageData.limt){
					this.status = "nomore"
					uni.hideLoading()
					return
				}
				this.pageData.page++
				if(this.aid!="00"){
					PostPageList({
						data:{
							page:this.pageData.page,
							size:10,
							aid:this.aid,
							mode:this.round.index,
							search:this.conSearch
						},
						tags:this.conTag.join("%"),
						out:(res,limt)=>{
							this.pageData.limt = limt
							res.forEach(i=>{
								i.time = changeDate(i.time)
								i.content = i.content.replace(/<[^>]+>/g,"")
							})
							this.pageData.list.push(...res)
							this.status = "loadmore"
							if(res.length<10){
								this.status = "nomore"
							}
							uni.hideLoading()
							uni.stopPullDownRefresh()
							this.loading = false
						}
					})
					return
				}
				PostPageList({
					data:{
						page:this.pageData.page,
						size:10,
						mode:this.round.index,
						search:this.conSearch
					},
					tags:this.conTag.join("%"),
					out:(res,limt)=>{
						this.pageData.limt = limt
						res.forEach(i=>{
							i.time = changeDate(i.time)
							i.content = i.content.replace(/<[^>]+>/g,"")
						})
						this.pageData.list.push(...res)
						this.status = "loadmore"
						if(res.length<10){
							this.status = "nomore"
						}
						uni.stopPullDownRefresh()
						uni.hideLoading()
						this.loading = false
					}
				})
			}
		}
	}
</script>

<style scoped lang="scss">
	.seletor{
		background-color: #eee;
		display: flex;
		flex-flow: row nowrap;
		justify-content: space-between;
		font-weight: bold;
		font-size: 13px;
		padding: 10px 25px;
		.sel{
			display: flex;
			flex-flow: row nowrap;
			align-items: center;
		}
		image{
			width: 15px;
			height: 15px;
		}
	}
	.downList{
		background-color: #eee;
		position: absolute;
		width: 100%;
		.moreload{
			padding: 10px;
			font-size: 12px;
			font-weight: bold;
			text-align: right;
		}
	}
	
	.cell_sel{
		color: red;
	}
	
	.tags{
		background-color: #ddd;
	}
	.tag_sel{
		background-color: #000;
		color: #fff;
	}
	.list_title{
		font-size: 12px;
		font-weight: bold;
	}
	.search {
		flex: 0 0 600rpx;
		display: flex;
		flex-flow: row nowrap;
		justify-content: space-around;
		align-items: center;
		background-color: #eee;
		border-radius: 10px;
		padding: 5px;
		margin: 0 10px;
		margin-bottom: 5px;
		font-weight: bold;

		image {
			width: 20px;
			height: 20px;
		}

		input {
			flex: 1;
			font-size: 14px;
			margin-left: 10px;
			height: 20px;
		}

		;

		view {
			border: none;
			height: 20px;
			border-left: 1.5px solid #e0e0e0;
			padding-left: 20px;
			color: #636363;
		}
	}
</style>
