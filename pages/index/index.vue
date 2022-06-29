<template>
	<view>
		<view>
			<view style="background-color: #333;">
				<view class="stuBar"></view>
				<view class="content" style="padding-top:10px;display: flex;">
					<view class="search" @click="toSearch()">
						<image src="../../static/icon/search-line.svg"></image>
						<input type="text" v-model="search" placeholder="输入关键词搜索" disabled />
					</view>
					<image @click="codeScan" style="height: 30px;height: 30px;" src="../../static/icon/qr-scan-2-line.svg"></image>
				</view>
				<view class="select_list">
					<u-tabs :current="selectIndex" @click="setTypeIndex" :list="selectList" lineWidth="30" lineColor="#f00" :activeStyle="{
											color: '#eee',
											fontWeight: 'bold',
											transform: 'scale(1.05)'
										}" :inactiveStyle="{
											color: '#fff',
											transform: 'scale(1)'
										}" itemStyle="padding-left: 15px; padding-right: 15px; height: 34px;">
					</u-tabs>
				</view>
			</view>
		</view>
		<swiper id="swp" :style="{height:boxHeight}" @change="setTypeIndex" :current="selectIndex">
			<swiper-item>
				<scroll-view refresher-enabled v-bind:refresher-triggered="isReflash[0]" @refresherrefresh="onSrcoll(0)" scroll-y @scrolltolower="loadPage(0,false)">
					<view class="content">
						<swiper class="imgBanner" indicator-dots indicator-active-color="#f00" indicator-color="#fff"
							autoplay interval="3000" circular>
							<swiper-item v-for="(it,i) in Banner" :key="i">
								<image @click="toPage(it.pid)" :src="it.post"></image>
								<view class="title">{{it.title}}</view>
							</swiper-item>
						</swiper>
					</view>
					<view @click="toPage(it.pid)" class="page_list" v-for="(it,i) in Pages" :key="i">
						<image v-if="it.post!=null&&it.post!='null'&&it.post!=''&&it.post!=undefined" :src="it.post">
						</image>
						<view>
							<text class="page_title">{{it.title}}</text>
							<text class="page_content" v-html="it.content"></text>
							<view class="page_data">
								<view>
									<image class="icon_small" src="../../static/icon/thumbupline.svg">{{it.likeNum}}
								</view>
								<view>
									<image class="icon_small" src="../../static/icon/eyeline.svg">{{it.readNum}}
								</view>
								<view class="page_time">{{it.time}}</view>
							</view>
						</view>
					</view>
					<u-loadmore :status="status[0]" />
				</scroll-view>
			</swiper-item>
			<swiper-item>
				<scroll-view refresher-enabled v-bind:refresher-triggered="isReflash[1]" @refresherrefresh="onSrcoll(1)" scroll-y @scrolltolower="loadPage(1,false)">
					<view @click="toPage(it.pid)" class="page_list" v-for="(it,i) in Pages1" :key="i">
						<image v-if="it.post!=null&&it.post!='null'&&it.post!=''&&it.post!=undefined" :src="it.post">
						</image>
						<view>
							<text class="page_title">{{it.title}}</text>
							<text class="page_content" v-html="it.content"></text>
							<view class="page_data">
								<view>
									<image class="icon_small" src="../../static/icon/thumbupline.svg">{{it.likeNum}}
								</view>
								<view>
									<image class="icon_small" src="../../static/icon/eyeline.svg">{{it.readNum}}
								</view>
								<view class="page_time">{{it.time}}</view>
							</view>
						</view>
					</view>
					<u-loadmore :status="status[1]" />
				</scroll-view>
			</swiper-item>
			<swiper-item>
				<scroll-view refresher-enabled v-bind:refresher-triggered="isReflash[3]" @refresherrefresh="onSrcoll(3)" scroll-y @scrolltolower="loadPage(3,false)">
					<view @click="toPage(it.pid)" class="page_list" v-for="(it,i) in Pages2" :key="i">
						<image v-if="it.post!=null&&it.post!='null'&&it.post!=''&&it.post!=undefined" :src="it.post">
						</image>
						<view>
							<text class="page_title">{{it.title}}</text>
							<text class="page_content" v-html="it.content"></text>
							<view class="page_data">
								<view>
									<image class="icon_small" src="../../static/icon/thumbupline.svg">{{it.likeNum}}
								</view>
								<view>
									<image class="icon_small" src="../../static/icon/eyeline.svg">{{it.readNum}}
								</view>
								<view class="page_time">{{it.time}}</view>
							</view>
						</view>
					</view>
					<u-loadmore :status="status[3]" />
				</scroll-view>
			</swiper-item>
			<swiper-item>
				<scroll-view refresher-enabled v-bind:refresher-triggered="isReflash[2]" @refresherrefresh="onSrcoll(2)" scroll-y @scrolltolower="loadPage(2,false)">
					<view scroll-y @click="toPage(it.pid)" class="page_list" v-for="(it,i) in Pages3" :key="i">
						<image v-if="it.post!=null&&it.post!='null'&&it.post!=''&&it.post!=undefined" :src="it.post">
						</image>
						<view>
							<text class="page_title">{{it.title}}</text>
							<text class="page_content" v-html="it.content"></text>
							<view class="page_data">
								<view>
									<image class="icon_small" src="../../static/icon/thumbupline.svg">{{it.likeNum}}
								</view>
								<view>
									<image class="icon_small" src="../../static/icon/eyeline.svg">{{it.readNum}}
								</view>
								<view class="page_time">{{it.time}}</view>
							</view>
						</view>
					</view>
					<u-loadmore :status="status[2]" />
				</scroll-view>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
	import {
		getBanner,
		getPage,
		getPageList
	} from "../../JS/PageAPI.js"
	import {
		changeDate
	} from "../../JS/Time.js"
	import {
		loginCode
	} from "../../JS/UserAPI.js"
	export default {
		data() {
			return {
				isReflash:[true,true,true,true],
				isUpper:false,
				search: "",
				Banner: [],
				selectIndex: 0,
				Pages: [],
				Pages1: [],
				Pages2: [],
				Pages3: [],
				page:[0,0,0,0],
				limt: [1,1,1,1],
				status: ["loadmore","loadmore","loadmore","loadmore"],
				selectList: [{
						name: "推荐"
					},
					{
						name: "热门"
					},
					{
						name: "最新"
					},
					{
						name: "点赞最多"
					}
				],
				boxHeight:'80vh'
			}
		},
		onLoad() {
			uni.getSystemInfo({
				success: (res) => {
					this.$nextTick(()=>{
						let qurey = uni.createSelectorQuery().in(this).select("#swp").boundingClientRect()
						qurey.exec(res2=>{
							let topHeight = res2[0].top;
							let winHeight = res.windowHeight;
							this.boxHeight = winHeight - topHeight + 'px';
						})
						
					})
				}
			});
			uni.showLoading()
			this.initData()
		},
		methods: {
			//扫描二维码
			codeScan(){
				uni.scanCode({
					success: res => {
						console.log(res)
						uni.getStorage({
							key:"userData",
							success:data=>{
								let d = {
									CodeKey:res.result,
									userData:{
										vid:data.data.vid,
										password:data.data.password,
										pass: true
									},
									token:"",
									status:false
								}
								uni.showModal({
									title:"即将登录至Web端",
									content:"是否确认登录？",
									success(res) {
										if(res.confirm){
											loginCode({
												data:d,
												out:res=>{
													console.log(res)
													uni.showToast({
														title:"授权登录成功"
													})
												}
											})
										}
									}
								})
							}
						})
					}
				})
			},
			//下拉刷新
			onSrcoll(i){
				this.isUpper=true
				this.Banner = []
				getBanner({
					out: data => {
						this.Banner = data
					}
				})
				this.Pages = []
				this.Pages1 = []
				this.Pages2 = []
				this.Pages3 = []
				this.page = [0,0,0,0]
				this.loadPage(i,false)
			},
			//初始化页面
			initData() {
				this.Banner = []
				getBanner({
					out: data => {
						this.Banner = data
					}
				})
				this.Pages = []
				this.Pages1 = []
				this.Pages2 = []
				this.Pages3 = []
				this.page = [0,0,0,0]
				this.loadPage(0,false)
			},
			//选择tab
			setTypeIndex(i) {
				let index
				if(i.detail==undefined){
					this.selectIndex = i.index
					index = i.index
				}else{
					this.selectIndex = i.detail.current
					index = i.detail.current
				}
				this.page[i] = 0
				if(index == 2){
					index = 3
				}else if(index == 3){
					index = 2
				}
				this.loadPage(index,true)
			},
			//加载
			loadPage(i,change) {
				this.status[i] = "loading"
				this.$forceUpdate()
				if (this.page[i] >= this.limt[i]) {
					this.status[i] = "nomore"
					this.$forceUpdate()
					return
				}
				this.page[i]++
				getPageList({
					data: {
						size: 10,
						page: this.page[i],
						mode: i
					},
					out: (data, limt) => {
						data.forEach(i => {
							i.content = i.content.replace(/<[^>]+>/g, "")
							i.time = changeDate(i.time)
						})
						switch (i) {
							case 0:
								this.Pages.push(...data)
								break
							case 1:
								this.Pages1.push(...data)
								break
							case 3:
								this.Pages2.push(...data)
								break
							case 2:
								this.Pages3.push(...data)
								break
						}
						this.limt[i] = limt
						this.status[i] = "loadmore"
						if(data.length<10){
							this.status[i] = "nomore"
						}
						uni.hideLoading()
						if(!this.isUpper){
							return
						}
						this.isUpper = false
						if(!this.isReflash[i]){
							this.isReflash[i] = true
						}
						setTimeout(()=>{
							this.isReflash[i] = false
							this.$forceUpdate()
						},200)
						
					}
				})
			},
			//进入文章详情
			toPage(pid) {
				uni.navigateTo({
					url: "indexPages/pageData?pid=" + pid
				})
			},
			//进入搜索页面
			toSearch(){
				uni.navigateTo({
					url:"indexPages/pageInput"
				})
			}
		}
	}
</script>

<style scoped lang="scss">
	#swp{
		scroll-view{
			height: 100%;
		}
	}
	.imgBanner {
		width: 100%;
		height: 400rpx;
		border-radius: 10px;
		overflow: hidden;
		image {
			width: 100%;
			height: 100%;
		}
		swiper-item {
			position: relative;
		}
		/deep/ .uni-swiper-dots {
			// 指示点整个区域
			left: 625rpx;
		}
	}

	.title {
		position: absolute;
		z-index: 10;
		bottom: 5px;
		left: 10px;
		width: 400rpx;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		font-size: 14px;
		font-weight: bold;
		color: #fff;
		text-shadow: -1px 1px 0 #000, 1px 1px 0 #000, 1px -1px 0 #000, -1px -1px 0 #000;
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
