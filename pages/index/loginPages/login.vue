<template>
	<view class="content">
		<view class="box">
			<image class="icon" src="../../../static/v_logo.png"></image>
			<view class="view">
				<text>VID</text>
				<input v-model="value1" type="number" placeholder="请输入VID" />
			</view>
			<view class="view">
				<text>密码</text>
				<input v-model="value2" type="text" password placeholder="请输入密码" />
			</view>
			<view class="view view_none">
				<view class="button" @click="login">登录</view>
				<view class="button button_none" @click="register">注册</view>
			</view>
			<view style="font-size: 14px;text-decoration: underline;" @click="forget">忘记密码</view>
		</view>
	</view>
</template>

<script>
	import {
		login
	} from "../../../JS/UserAPI.js"
	var t
	export default {
		data() {
			return {
				value1:"",
				value2:""
			};
		},
		onShow() {
			t = this
			uni.getStorage({
				key:"register",
				success:data=>{
					this.value1 = data.data
					uni.removeStorageSync("register")
				}
			})
		},
		onLoad() {
			t = this
			uni.getStorage({
				key:"userData",
				success:data=>{
					this.value1 = data.data.vid
				}
			})
		},
		methods:{
			login(){
				login({
					data:{
						vid:this.value1,
						password:this.value2
					},
					out:(res,msg)=>{
						if(res!=null){
							uni.setStorageSync("userData",{
								vid:t.value1,
								password:t.value2,
								token:"Bearer "+res
							})
						}
						if(msg == "操作成功"){
							msg = "登录成功"
							uni.switchTab({
								url:"../index"
							})
						}
						uni.showToast({
							title:msg,
							icon:"none",
							position:"bottom"
						})
					}
				})
			},
			register(){
				uni.navigateTo({
					url:"register"
				})
			},
			forget(){
				uni.navigateTo({
					url:"forget"
				})
			}
		}
	}
</script>

<style scoped lang="scss">
	.icon{
		width: 240rpx;
		height: 240rpx;
		padding-bottom: 50rpx;
	}
	.box{
		margin-top: 150rpx;
		border-radius: 20rpx;
		display: flex;
		flex-direction: column;
		align-items: center;
		.view{
			display: flex;
			width: 600rpx;
			padding: 10rpx;
			margin: 20rpx 10rpx;
			align-items: center;
			border: 1px solid #eee;
			border-radius: 20rpx;
			text{
				width: 70rpx;
				margin: 10rpx;
				font-weight: bold;
				font-size: 30rpx;
			};
			input{
				font-size: 30rpx;
				width: 100%;
			};
		};
		.button{
			display: flex;
			justify-content: center;
			align-items: center;
			height: 80rpx;
			width: 290rpx;
			font-size: 32rpx;
			font-weight: bold;
			margin: 20rpx 0;
			background-color: #000;
			color: #fff;
			border-radius: 20rpx;
			transition: all 100ms;
		};
		.button:active{
			background-color: #eee;
			color: #000;
		};
		.view_none{
			justify-content: space-between;
			border: none;
			.button_none{
				background-color: #eee;
				color: #555;
			}
			.button_none:active{
				background-color: #aaa;
				color: #fff;
			}
		}
	}
</style>
