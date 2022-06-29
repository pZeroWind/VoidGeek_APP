<template>
	<view class="content">
		<view class="box">
			<view class="view">
				<text>用户名</text>
				<input v-model="data.userName" type="text" placeholder="请输入用户名" />
			</view>
			<view class="view">
				<text>密码</text>
				<input v-model="data.password" type="text" password placeholder="请输入密码" />
			</view>
			<view class="view">
				<text>确认密码</text>
				<input v-model="rePwd" type="text" password placeholder="请重新输入密码" />
			</view>
			<view class="view">
				<text>生日</text>
				<view style="width: 100%;" @click="showDate=true">{{change()}}</view>
				<u-datetime-picker :show="showDate" :minDate="0" v-model="data.birthday" mode="date" @confirm="dateChan" @cancel="showDate=false"></u-datetime-picker>
			</view>
			<view class="view">
				<text>性别</text>
				<view style="width: 100%;" @click="showGender=true">{{data.gender?'男':'女'}}</view>
				<u-picker :show="showGender" @confirm="genderChan" :columns="gender" @cancel="showGender=false"></u-picker>
			</view>
			<view class="view">
				<text>联系电话</text>
				<input v-model="data.phoneNum" type="number" placeholder="请输入联系电话" />
			</view>
			<view class="view">
				<text>邮箱</text>
				<input v-model="data.email" type="text" placeholder="请输入邮箱" />
				<view v-if="!get" class="getCode" @click="getCodeData">获取验证码</view>
				<view v-else class="getCode" style="color: #aaa;">请等待{{time}}</view>
			</view>
			<view class="view">
				<text>验证码</text>
				<input v-model="inpCode" type="text" placeholder="请输入邮箱验证码" />
			</view>
			<view class="view view_none">
				<view class="button" @click="back">返回</view>
				<view class="button" @click="register">注册</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		changePwd,
		reg,
		login
	} from "../../../JS/UserAPI.js"
	import {
		getCode
	} from "../../../JS/PublicApi.js"
	import {
		changeDateLong
	} from "../../../JS/Time.js"
	var t
	export default {
		data() {
			return {
				data: {
					userName: "",
					password: "",
					email: "",
					birthday: 949593600000,
					gender: true,
					phoneNum: ""
				},
				time: 60,
				get: false,
				rePwd: "",
				code: String(new Date().getTime()),
				inpCode: "",
				showDate:false,
				showGender:false,
				gender:[
					["男","女"]
				]
			};
		},
		methods: {
			getCodeData(){
				if (!/^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(this.data.email)) {
					uni.showToast({
						title: "邮箱格式不正确",
						icon: "none",
						position: "bottom"
					})
					return
				}
				getCode({
					email:this.data.email,
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
			genderChan(e){
				if(e.value[0]=="男"){
					this.data.gender = true
				}else{
					this.data.gender = false
				}
				this.showGender = false
			},
			dateChan(e){
				this.data.birthday = e
				this.showDate = false
			},
			change(){
				return changeDateLong(this.data.birthday)
			},
			register() {
				if (!/(?=.*[a-z])(?=.*\d)(?=.*[#@!~%^&*])[a-z\d#@!~%^&*]{8,12}/i.test(this.data.password)) {
					uni.showToast({
						title: "密码格式不正确",
						icon: "none",
						position: "bottom"
					})
					return
				}
				if (!/^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(this.data.email)) {
					uni.showToast({
						title: "邮箱格式不正确",
						icon: "none",
						position: "bottom"
					})
					return
				}
				if (!/^((13[0-9])|(14[5-9])|(15([0-3]|[5-9]))|(16[6-7])|(17[1-8])|(18[0-9])|(19[1|3])|(19[5|6])|(19[8|9]))\d{8}$/.test(this.data.phoneNum)) {
					uni.showToast({
						title: "联系电话格式不正确",
						icon: "none",
						position: "bottom"
					})
					return
				}
				if (this.rePwd != this.data.password) {
					uni.showToast({
						title: "两次密码输入不一致",
						icon: "none",
						position: "bottom"
					})
					return
				}
				if(this.inpCode!=this.code){
					uni.showToast({
						title: "验证码不正确",
						icon: "none",
						position: "bottom"
					})
					return
				}
				reg({
					data: this.data,
					out: (res, msg) => {
						if (msg == "操作成功") {
							msg = "注册成功"
							uni.setStorageSync("register",res.vid)
							setTimeout(()=>{
								this.back()
							},500)
						}
						uni.showToast({
							title: msg,
							icon: "none",
							position: "bottom"
						})
					}
				})
			},
			back(){
				uni.navigateBack()
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
			width: 275rpx;
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
