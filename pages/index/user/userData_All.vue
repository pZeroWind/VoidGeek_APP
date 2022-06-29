<template>
	<view>
		<u-cell class="user_mode" :border="false" @click="uploadImg">
			<view slot="title" class="lft">头像</view>
			<view slot="value" class="right">
				<image mode="aspectFill" :src="userData.imgUrl"></image>
				<image v-if="isMe" class="rigt" src="../../../static/icon/arrow-right-s-line.svg"></image>
			</view>
		</u-cell>
		<u-cell class="user_mode" :border="false" @click="updateData(userData.userName,1)">
			<view slot="title" class="lft">用户名</view>
			<view slot="value" class="right">
				<text>{{userData.userName}}</text>
				<image v-if="isMe" class="rigt" src="../../../static/icon/arrow-right-s-line.svg"></image>
			</view>
		</u-cell>
		<u-cell class="user_mode" :border="false" @click="updateData(userData.resume,2)">
			<view slot="title" class="lft">个性签名</view>
			<view slot="value" class="right">
				<text>{{userData.resume}}</text>
				<image v-if="isMe" class="rigt" src="../../../static/icon/arrow-right-s-line.svg"></image>
			</view>
		</u-cell>
		<u-cell class="user_mode" :border="false" @click="genderShow=true">
			<view slot="title" class="lft">性别</view>
			<view slot="value" class="right">
				<text>{{userData.gender?'男':'女'}}</text>
				<image v-if="isMe" class="rigt" src="../../../static/icon/arrow-right-s-line.svg"></image>
			</view>
		</u-cell>
		<u-cell class="user_mode" :border="false" @click="showDatePicker">
			<view slot="title" class="lft">出生日期</view>
			<view slot="value" class="right">
				<text>{{changeDate(userData.birthday)}}</text>
				<image v-if="isMe" class="rigt" src="../../../static/icon/arrow-right-s-line.svg"></image>
			</view>
		</u-cell>
		<u-cell class="user_mode" :border="false" @click="updateData(userData.email,3)">
			<view slot="title" class="lft">电子邮箱</view>
			<view slot="value" class="right">
				<text>{{userData.email}}</text>
				<image v-if="isMe" class="rigt" src="../../../static/icon/arrow-right-s-line.svg"></image>
			</view>
		</u-cell>
		<u-cell class="user_mode" :border="false" @click="updateData(userData.phoneNum,4)">
			<view slot="title" class="lft">联系电话</view>
			<view slot="value" class="right">
				<text>{{userData.phoneNum}}</text>
				<image v-if="isMe" class="rigt" src="../../../static/icon/arrow-right-s-line.svg"></image>
			</view>
		</u-cell>
		<u-cell class="user_mode" :border="false" @click="updateData(userData.cardNum,5)">
			<view slot="title" class="lft">银行卡号</view>
			<view slot="value" class="right">
				<text>{{userData.cardNum==null?"未绑定":String(userData.cardNum)}}</text>
				<image v-if="isMe" class="rigt" src="../../../static/icon/arrow-right-s-line.svg"></image>
			</view>
		</u-cell>
		<u-popup :show="update.show" mode="top">
			<view class="updateData">
				<input v-if="update.index<=3" type="text" v-model="update.data" />
				<input v-else="update.index==4" type="number" v-model="update.data" />
				<view class="btns">
					<view style="background-color: #a00; color: #fff;" @click="update.conf">确定</view>
					<view @click="clearUpdate">取消</view>
				</view>
			</view>
		</u-popup>
		<u-picker :show="genderShow" :columns="Gender" confirmColor="#a00" @confirm="updateSex" @cancel="genderShow=false"></u-picker>
		<u-datetime-picker :show="dateShow" v-model="date" :minDate="0" :maxDate="new Date().getTime()" mode="date" confirmColor="#a00" @confirm="updateDate" @cancel="dateShow=false"></u-datetime-picker>
	</view>
</template>

<script>
	import {
		getUrl
	} from "../../../JS/ApiConf.js"

	import {
		changeDate
	} from "../../../JS/Time.js"
	import {
		getUser,
		change
	} from "../../../JS/UserAPI.js"
	import {
		updateImg
	} from "../../../JS/PublicApi.js"
	import {
		checkEmail,
		checkPhone
	} from "../../../JS/Tool.js"
	export default {
		data() {
			return {
				userData: {
					vid: ""
				},
				isMe: false,
				update: {
					show: false,
					data: "",
					conf: () => {},
					index: 1
				},
				genderShow: false,
				Gender: [
					["男", "女"]
				],
				dateShow:false,
				date:0
			}
		},
		onLoad(data) {
			this.userData.vid = data.vid
			uni.getStorage({
				key: "userData",
				success: res => {
					if (res.data.vid == data.vid) {
						this.isMe = true
					}
				}
			})
			this.getUserData()
		},
		methods: {
			//获取个人信息
			getUserData() {
				getUser({
					vid: this.userData.vid,
					out: res => {
						this.userData = res
					}
				})
			},
			//更新个人信息
			updateUserData() {
				let data = JSON.parse(JSON.stringify(this.userData))
				data.imgUrl = data.imgUrl.replace(getUrl() + "/api/PublicApi/getImg?imgUrl=", "")
				change({
					data: data,
					out: res => {
						if (res) {
							uni.hideLoading()
							uni.showToast({
								title: "修改成功",
								icon: "none",
								position: "bottom"
							})
						}
					}
				})
			},
			//清除更新信息资料
			clearUpdate() {
				this.update = {
					show: false,
					data: "",
					conf: () => {}
				}
			},
			//转换时间戳
			changeDate(date) {
				return changeDate(date)
			},
			//上传图片
			uploadImg() {
				if (!this.isMe) {
					return
				}
				uni.chooseImage({
					count: 1,
					success: res => {
						this.userData.imgUrl = res.tempFilePaths[0]
						uni.showLoading()
						updateImg({
							data: res.tempFilePaths[0],
							out: r => {
								this.userData.imgUrl = r[0]
								this.updateUserData()
							}
						})
					},
					fail() {
						console.log(this.userData)
					}
				})
			},
			//更新数据
			updateData(text, index) {
				if (!this.isMe) {
					return
				}
				this.update = {
					show: true,
					data: text,
					index: index,
					conf: () => {
						uni.showLoading()
						switch (index) {
							case 1:
								this.userData.userName = this.update.data
								break
							case 2:
								this.userData.resume = this.update.data
								break
							case 3:
								if (checkEmail(this.update.data)) {
									this.userData.email = this.update.data
								} else {
									uni.showToast({
										title: "邮箱输入不正确",
										icon: "none",
										position: "bottom"
									})
								}
								break
							case 4:
								if (checkPhone(this.update.data)) {
									this.userData.phoneNum = this.update.data
								} else {
									uni.showToast({
										title: "联系电话输入不正确",
										icon: "none",
										position: "bottom"
									})
								}
								break
							case 5:
								this.userData.cardNum = this.update.data
								break
						}
						this.updateUserData()
						this.update.show = false
					}
				}
			},
			//更改性别
			updateSex(i) {
				uni.showLoading()
				if (i.value[0] == "男") {
					this.userData.gender = true
				} else {
					this.userData.gender = false
				}
				this.genderShow = false
				this.updateUserData()
			},
			showDatePicker(){
				this.dateShow=true
			},
			updateDate(date){
				uni.showLoading()
				this.userData.birthday = date.value
				this.dateShow = false
				this.updateUserData()
			}
		}
	}
</script>

<style lang="scss" scoped>
	.updateData {
		input {
			padding: 10px;
			margin: 10px;
			border-bottom: 1px solid #aaa;
		}

		.btns {
			display: flex;
			flex-flow: row nowrap;
			justify-content: space-around;
			view {
				
				margin: 15px 10px;
				padding: 5px 50px;
				border: 1px solid #eee;
				border-radius: 5px;
				background-color: #eee;
				font-weight: bold;
			}
		}
	}

	.user_mode {
		padding: 10rpx;
		display: flex;
		position: relative;

		image {
			margin-left: 20rpx;
			width: 100rpx;
			height: 100rpx;
			border-radius: 50%;
		}

		view {
			font-weight: bold;
			font-size: 30rpx;
		}

		.right {
			display: flex;
			align-items: center;
			font-weight: normal;
		}

		.rigt {
			width: 20px;
			height: 20px;
		}
		
		.lft{
			width: 100px;
		}
		transition: all 100ms;
	}

	.user_mode:active {
		background-color: #eee;
		transform: scale(1.05);
	}

	.user_out {
		padding: 20rpx;
	}
</style>
