<template>
	<view>
		<u-grid style="padding: 20px 0;" col="3" >
			<u-grid-item v-for="(it,i) in areas" :key="i" @click="toArea(it.aid)">
				<image style="width: 55px;height: 55px;" :src="'../../static/icon/'+it.iconUrl"></image>
				<text class="areaList">{{it.areaName}}</text>
			</u-grid-item>
		</u-grid>
		<view class="hotTitle">精选榜单</view>
		<view class="content">
			<view @click="toPage(it.pid)" class="page_list" v-for="(it,i) in Pages" :key="i">
				<image v-if="it.post!=null" :src="it.post"></image>
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
		</view>
	</view>
</template>

<script>
	import {
		getArea
	} from "../../JS/AreaAPI.js"
	import {
		getTop
	} from "../../JS/PageAPI.js"
	import {
		changeDate
	} from "../../JS/Time.js"
	export default {
		data() {
			return {
				areas: [],
				Pages: [],
			};
		},
		onPullDownRefresh() {
			this.initData()
		},
		onLoad() {
			this.initData()
		},
		methods: {
			//初始化页面
			initData() {
				uni.showLoading()
				getArea({
					out: res => {
						this.areas = res
					}
				})
				getTop({
					out: res => {
						res.forEach(i => {
							i.content = i.content.replace(/<[^>]+>/g, "")
							i.time = changeDate(i.time)
						})
						this.Pages = res
						uni.stopPullDownRefresh()
						uni.hideLoading()
					}
				})
			},
			//进入详情
			toPage(pid) {
				uni.navigateTo({
					url: "indexPages/pageData?pid=" + pid
				})
			},
			toArea(aid){
				uni.navigateTo({
					url: "indexPages/pageSearch?src=&tag=&aid=" + aid
				})
			}
		}
	}
</script>

<style scoped lang="scss">
	.imgBanner {
		margin: 10px;
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

	.hotTitle {
		text-align: center;
		background-color: snow;
		font-size: 40rpx;
		font-weight: bold;
		padding: 20rpx;
		margin: 0 5rpx;
		border-bottom: 1px solid #eee;
		border-left: 5px solid #555;
		border-right: 5px solid #555;
		border-radius: 30rpx;
	}

	.areaList {
		font-size: 20rpx;
		font-weight: bold;
		margin-bottom: 10px;
		color: #555;
	}
</style>
