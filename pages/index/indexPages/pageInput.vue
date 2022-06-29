<template>
	<view>
		<view>
			<view class="stuBar"></view>
			<view style="background-color: #333;padding: 15px 0;">
				<view class="search">
					<image src="../../../static/icon/search-line.svg"></image>
					<input focus type="text" confirm-type="search" @input="getCodeList" v-model="search" @confirm="toSearch" placeholder="输入关键词搜索"/>
					<view class="srch" @click="toSearch">搜索</view>
				</view>
			</view>
			<view class="searchCell" v-show="onajiList.length > 0">
				<u-cell class="it_sel" :border="false" v-for="(it,i) in onajiList" :key="i">
					<text @click="searchGO(it)" slot="title" style="font-size: 14px;">{{it}}</text>
				</u-cell>
			</view>
			<view v-show="hisList.length > 0&&onajiList.length == 0">
				<view class="hisBox">
					<view class="titles">历史记录</view>
					<view class="clear" @click="removeHis">清空历史记录</view>
				</view>
				<view class="page_tag">
					<view @click="searchGO(it)" v-for="(it,i) in hisList" :key="i">{{it}}</view>
				</view>
			</view>
			<view v-show="onajiList.length == 0">
				<view class="titles">热门标签</view>
				<u-loading-icon :show="tags.length==0"></u-loading-icon>
				<view class="page_tag">
					<view @click="tagGo(it)" v-for="(it,i) in tags" :key="i">{{it}}</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		getSearchCode,
		getHotTag
	} from "../../../JS/PageAPI.js"
	export default {
		data() {
			return {
				search:"",
				tag:"",
				onajiList:[],
				hisList:[],
				tags:[]
			};
		},
		onLoad(op) {
			if(op.src != undefined){
				this.search = op.src
			}
			this.initData()
		},
		methods:{
			searchGO(it){
				this.search = it
				this.toSearch()
			},
			tagGo(it){
				this.tag = it
				uni.redirectTo({
					url:"pageSearch?src=&tag="+this.tag
				})
			},
			getCodeList(){
				getSearchCode({
					text:this.search,
					out:res=>{
						this.onajiList = res
					}
				})
			},
			toSearch(){
				if(this.search == ""||this.search == undefined){
					uni.showToast({
						title:"搜索内容为空",
						icon:"error"
					})
					return
				}
				uni.redirectTo({
					url:"pageSearch?src="+this.search+"&tag="+this.tag
				})
			},
			removeHis(){
				uni.getStorage({
					key:"His",
					success: () => {
						uni.removeStorageSync("His")
						this.hisList = []
					}
				})
			},
			getHis(){
				uni.getStorage({
					key:"His",
					success:res=>{
						this.hisList.push(...res.data)
					}
				})
			},
			initData(){
				getHotTag({
					out:res=>{
						this.tags = res
					}
				})
				this.getHis()
			}
		}
	}
</script>

<style scoped lang="scss">
	.search {
		flex: 0 0 575rpx;
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

		view {
			border: none;
			height: 20px;
			display: flex;
			align-items: center;
			justify-content: center;
			font-size: 14px;
			border-left: 2px solid #aaa;
			padding:0 15px;
			color: #636363;
		}
	}
	.hisBox{
		display: flex;
		flex-flow: row nowrap;
		justify-content: space-between;
	}
	.clear{
		padding: 5px 17.5px;
		font-size: 12px;
		text-decoration: underline;
		color: #aaa;
	}
	.titles{
		padding: 5px 17.5px;
		font-size: 14px;
		font-weight: bold;
	}
	
	.it_sel:active{
		background-color: #eee;
	}
</style>
