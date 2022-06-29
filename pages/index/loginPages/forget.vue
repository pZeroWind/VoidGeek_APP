<template>
	<view class="content">
		<view class="box">
			<image class="icon" src="../../../static/v_logo.png"></image>
			<view class="view">
				<text>VID</text>
				<input v-model="value1" type="text" placeholder="请输入VID" />
				<view v-if="!get" class="getCode" @click="getCode">获取验证码</view>
				<view v-else class="getCode" style="color: #aaa;">请等待{{time}}</view>
			</view>
			<view class="view">
				<text>验证码</text>
				<input v-model="inpCode" type="text" placeholder="请输入邮箱验证码" />
			</view>
			<view class="view">
				<text>新密码</text>
				<input v-model="value2" type="text" password placeholder="请输入新密码" />
			</view>
			<view class="view">
				<text>确认密码</text>
				<input v-model="value3" type="text" password placeholder="请重新输入新密码" />
			</view>
			<view class="view view_none">
				<view class="button" @click="login">修改密码</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		forget
	} from "../../../JS/UserAPI.js"
	import {
		getCodeForVid
	} from "../../../JS/PublicApi.js"
	var t
	export default {
		data() {
			return {
				value1:"",
				value2:"",
				value3:"",
				time: 60,
				get: false,
				inpCode:"",
				code:String(new Date().getTime())
			};
		},
		methods:{
			getCode(){
				if(this.value1== ""||this.value1 == undefined){
					uni.showToast({
						title:"请先输入VID",
						icon:"none",
						position:"bottom"
					})
					return
				}
				getCodeForVid({
					vid:this.value1,
					out:res=>{
						this.code = res
						this.get = true
						let timer = setInterval(()=>{
							this.time--
							if(this.time==0){
								clearInterval(timer)
								this.time = 60
								this.get = false
							}
						},1000)
					}
				})
			},
			login(){
				if (!/(?=.*[a-z])(?=.*\d)(?=.*[#@!~%^&*])[a-z\d#@!~%^&*]{8,12}/i.test(this.value2)) {
					uni.showToast({
						title: "密码格式不正确",
						icon: "none",
						position: "bottom"
					})
					return
				}
				if(this.value2!=this.value3){
					uni.showToast({
						title:"两次密码输入不一致",
						icon:"none",
						position:"bottom"
					})
					return
				}
				if(this.inpCode!=this.code){
					uni.showToast({
						title:"验证码不正确",
						icon:"none",
						position:"bottom"
					})
					return
				}
				forget({
					data:{
						vid:this.value1,
						pwd:this.value2
					},
					out:(res,msg)=>{
						if(msg == "操作成功"){
							msg = "修改成功"
							uni.navigateBack()
						}
						uni.showToast({
							title:msg,
							icon:"none",
							position:"bottom"
						})
					}
				})
			}
		}
	}
</script>

<style scoped lang="scss">
	.icon {
		width: 200rpx;
		height: 200rpx;
		padding-bottom: 50rpx;
	}
	
	.box {
		margin-top: 70rpx;
		border-radius: 20rpx;
		display: flex;
		flex-direction: column;
		align-items: center;
	
		.view {
			display: flex;
			width: 600rpx;
			padding: 10rpx;
			margin: 20rpx 10rpx;
			align-items: center;
			border: 1px solid #eee;
			border-radius: 20rpx;
	
			text {
				width: 200rpx;
				margin: 10rpx;
				font-weight: bold;
				font-size: 30rpx;
			}
	
			;
	
			input {
				font-size: 30rpx;
				width: 100%;
			}
	
			.getCode {
				width: 270rpx;
				font-size: 12px;
				text-align: center;
				padding: 5px 0;
				padding-left: 5px;
				font-weight: bold;
				border-left: 2px solid #eee;
			}
		}
	
		;
	
		.button {
			display: flex;
			justify-content: center;
			align-items: center;
			height: 80rpx;
			width: 100%;
			font-size: 32rpx;
			font-weight: bold;
			margin: 20rpx 0;
			background-color: #000;
			color: #fff;
			border-radius: 20rpx;
			transition: all 100ms;
		}
	
		;
	
		.button:active {
			background-color: #eee;
			color: #000;
		}
	
		;
	
		.view_none {
			justify-content: space-between;
			border: none;
	
			.button_none {
				background-color: #eee;
				color: #555;
			}
	
			.button_none:active {
				background-color: #aaa;
				color: #fff;
			}
		}
	}
</style>
