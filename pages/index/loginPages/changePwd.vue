<template>
	<view class="content">
		<view class="box">
			<image class="icon" src="../../../static/v_logo.png"></image>
			<view class="view">
				<text>旧密码</text>
				<input v-model="value1" type="text" password placeholder="请输入旧密码" />
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
		changePwd
	} from "../../../JS/UserAPI.js"
	var t
	export default {
		data() {
			return {
				value1:"",
				value2:"",
				value3:""
				
			};
		},
		methods:{
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
				changePwd({
					data:{
						oldPassword:this.value1,
						newPassword:this.value2
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
	.icon{
		width: 200rpx;
		height: 200rpx;
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
				width: 200rpx;
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
			width: 100%;
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
