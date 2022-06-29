<template>
	<view>
		<view class="user_mode" @click="toPwdChange">
			<view class="lft">修改密码</view>
			<image class="rigt" src="../../../static/icon/arrow-right-s-line.svg"></image>
		</view>
		<view class="user_mode" @click="toLoginData">
			<view class="lft">登录信息记录</view>
			<image class="rigt" src="../../../static/icon/arrow-right-s-line.svg"></image>
		</view>
		<view class="user_mode" @click="toCoinToME">
			<view class="lft">获赏记录</view>
			<image class="rigt" src="../../../static/icon/arrow-right-s-line.svg"></image>
		</view>
		<view class="user_mode" @click="toCoinUp">
			<view class="lft">充值记录</view>
			<image class="rigt" src="../../../static/icon/arrow-right-s-line.svg"></image>
		</view>
		<view class="user_mode" @click="toCoinDown">
			<view class="lft">提现记录</view>
			<image class="rigt" src="../../../static/icon/arrow-right-s-line.svg"></image>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			toLoginData(){
				uni.navigateTo({
					url:"./loginData"
				})
			},
			toPwdChange(){
				uni.navigateTo({
					url:"../loginPages/changePwd"
				})
			},
			toCoinUp(){
				uni.navigateTo({
					url:"./upCoinData"
				})
			},
			toCoinDown(){
				uni.navigateTo({
					url:"./downData"
				})
			},
			toCoinToME(){
				uni.navigateTo({
					url:"./ToMeData"
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
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
</style>
