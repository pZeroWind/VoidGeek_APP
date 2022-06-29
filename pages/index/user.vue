<template>
	<view>
		<view class="user_mode" @click="toUserData">
			<image mode="aspectFill" :src="userData.imgUrl"></image>
			<view>{{userData.userName}}</view>
			<image class="rigt" src="../../static/icon/arrow-right-s-line.svg"></image>
		</view>
		<view class="user_mode" @click="toHistoryData">
			<view class="lft">历史足迹</view>
			<image class="rigt" src="../../static/icon/arrow-right-s-line.svg"></image>
		</view>
		<view class="user_mode" @click="toPageData">
			<view class="lft">文章管理</view>
			<image class="rigt" src="../../static/icon/arrow-right-s-line.svg"></image>
		</view>
		<view class="user_mode" @click="toSafe">
			<view class="lft">账号安全</view>
			<image class="rigt" src="../../static/icon/arrow-right-s-line.svg"></image>
		</view>
		<view class="user_mode" @click="toForWe">
			<view class="lft">关于我们</view>
			<image class="rigt" src="../../static/icon/arrow-right-s-line.svg"></image>
		</view>
		<view v-if="logined" class="user_out">
			<u-button type="error" @click="loginOut" text="退出登录"></u-button>
		</view>
	</view>
</template>

<script>
	import {
		getMe
	} from "../../JS/UserAPI.js"
	export default {
		data() {
			return {
				userData:{
					imgUrl:"../../static/icon/user3line.svg",
					userName:"未登录"
				},
				logined:false
			};
		},
		onShow() {
			this.initLoad()
		},
		methods:{
			//初始化
			initLoad(){
				getMe({
					out:res=>{
						this.userData = res
						this.logined = true
					}
				})
			},
			//进入用户个人空间
			toUserData(){
				if(this.logined==false){
					uni.navigateTo({
						url:"loginPages/login"
					})
					return
				}
				uni.navigateTo({
					url:"user/userData?vid="+this.userData.vid
				})
			},
			toHistoryData(){
				if(this.logined==false){
					uni.navigateTo({
						url:"loginPages/login"
					})
					return
				}
				uni.navigateTo({
					url:"user/historyData"
				})
			},
			toPageData(){
				if(this.logined==false){
					uni.navigateTo({
						url:"loginPages/login"
					})
					return
				}
				uni.navigateTo({
					url:"user/userPageData"
				})
			},
			toSafe(){
				if(this.logined==false){
					uni.navigateTo({
						url:"loginPages/login"
					})
					return
				}
				uni.navigateTo({
					url:"user/userSafe"
				})
			},
			toForWe(){
				uni.navigateTo({
					url:"user/forWe"
				})
			},
			//退出登录
			loginOut(){
				this.logined = false
				this.userData = {
					imgUrl:"../../static/icon/user3line.svg",
					userName:"未登录"
				}
				uni.removeStorageSync("userData")
			}
		}
	}
</script>

<style scoped lang="scss">
	.user_mode{
		height: 70rpx;
		padding: 20rpx;
		display: flex;
		position: relative;
		padding-top: 25rpx;
		padding-bottom: 25rpx;
		align-items: center;
		image{
			margin-left: 20rpx;
			width: 100rpx;
			height: 100rpx;
			border-radius: 50%;
		};
		view{
			margin-left: 40rpx;
			font-weight: bold;
			font-size: 30rpx;
		};
		.rigt{
			position: absolute;
			width: 30rpx;
			height: 30rpx;
			right: 30rpx;
		};
		.lft{
			margin-left: 20rpx;
		}
		transition: all 100ms;
	}
	.user_mode:active{
		background-color: #eee;
		transform: scale(1.05);
	}
	.user_out{
		padding: 20rpx;
	}
</style>
