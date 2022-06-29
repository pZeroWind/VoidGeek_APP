<template>
	<view class="content">
		<view v-show="data.content!=undefined">
			<view class="page_title_min">
				<text>{{data.title}}</text>
			</view>
			<view class="page_user">
				<image mode="aspectFill" :src="userData.imgUrl" @click="toUserData(userData.vid)"></image>
				<view class="page_userData">
					<view @click="toUserData(userData.vid)">{{userData.userName}}</view>
					<u-tag :bgColor="userData.color" :borderColor="userData.color" color="#fff" size="small"
						style="font-size: 12px;" :text="'Lv'+userData.exc" plain> </u-tag>
					<view class="page_user_btn">
						<view @click="payShow">打赏</view>
						<view v-if="!type.user" @click="toLikeUser">关注</view>
						<view v-else @click="toLikeUser">取消关注</view>
					</view>
				</view>
			</view>
			<view class="page_data_min">
				<view>
					<image class="icon_small" src="../../../static/icon/eyeline.svg">
						{{data.readNum}}
				</view>
				<view class="page_time_min">
					{{data.time}}
				</view>
			</view>
			<view style="display: flex;justify-content: space-between;flex-flow: row nowrap;">
				<view class="page_tag">
					<text>标签：</text>
					<view v-for="(it,i) in data.tag" :key="i" @click="tagGo(it)">{{it}}</view>
				</view>
				<view style="width: 50px;display: flex;justify-content: center;padding-top: 10px;">
					<image @click="toReturn" style="flex: 0 0 20px; width: 20px;height: 20px;"
						src="../../../static/icon/error-warning-line.svg"></image>
				</view>
			</view>
			<u-parse class="page_content_min" :content="data.content"></u-parse>
			<view>
				<view style="border: 1px solid #eee; padding: 5px;border-radius: 5px;background-color: #eee;">
					<view style="border-left: 5px solid #000;padding-left: 10px;font-weight: bold">
						同类推荐
					</view>
				</view>
				<view>
					<view @click="toPageData(it.pid)" class="page_list" v-for="(it,i) in pageList" :key="i">
						<image v-if="it.post!=null&&it.post!='null'&&it.post!=''&&it.post!=undefined" :src="it.post">
						</image>
						<view>
							<text class="page_title">{{it.title}}</text>
							<text class="page_content" v-html="it.content"></text>
							<view class="page_data">
								<view>
									<image class="icon_small" src="../../../static/icon/thumbupline.svg">{{it.likeNum}}
								</view>
								<view>
									<image class="icon_small" src="../../../static/icon/eyeline.svg">{{it.readNum}}
								</view>
								<view class="page_time">{{it.time}}</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view v-show="show" class="say_list">
			<view class="background" v-show="show" @tap="showList()"></view>
			<transition name="fade">
				<view class="list" v-show="show">
					<view style="
					font-size: 18px;
					font-weight: bold;
					height: 30px;
					">评论</view>
					<scroll-view @scrolltolower="getSayList" scroll-y class="showList">
						<view class="say_box" v-for="(it,i) in say.data" :key="i">
							<view class="say_data" @click="sendData(1,it,it.usersData,it.content)">
								<image :src="it.usersData.imgUrl"></image>
								<view>
									<text>{{it.usersData.userName}}</text>
									<text class="time">{{it.time}}</text>
								</view>
							</view>
							<view class="say_content">{{it.content}}</view>
							<view class="say_re" v-for="(it2,i2) in it.reSayList" :key="i2"
								@click="sendData(1,it,it2.userData,it2.content)">
								<view class="say_data">
									<image :src="it2.userData.imgUrl"></image>
									<view>
										<view style="margin-left: 0;">
											<text class="txt">{{it2.userData.userName}}</text>
											<text style="color: red;
											font-weight: bold;
											margin-left: 5px;
											">@</text>
											<text class="txt">{{it2.toUserData.userName}}</text>
										</view>
										<text class="time">{{it2.time}}</text>
									</view>
								</view>
								<view class="say_content">{{it2.content}}</view>
							</view>
							<view class="more" v-if="it.page < it.limt " @click="it.load(it)">查看更多</view>
						</view>
					</scroll-view>
				</view>
			</transition>
		</view>
		<view class="page_say">
			<view v-show="!show" class="like" @click="likeC">
				<image v-if="!type.like" class="icon_small" src="../../../static/icon/thumbupline.svg"></image>
				<image v-else class="icon_small" src="../../../static/icon/thumb-up-fill.svg"></image>
				<view></view>
				{{data.likeNum}}
			</view>
			<input v-show="show" confirm-type="send" v-model="send.content" @confirm="toSend" adjust-position
				type="text" :placeholder="send.place" />
			<view style="display: flex;align-items: center;">
				<image @click="getF" v-show="!show" v-if="!type.save"
					style="width: 25px;height: 25px;margin-right: 10px;" src="../../../static/icon/star-line.svg">
				</image>
				<image v-else style="width: 25px;height: 25px;margin-right: 10px;"
					src="../../../static/icon/star-fill.svg"></image>
				<button v-if="!show" @click="showList">评论</button>
				<button v-else @click="showList">收起</button>
			</view>
		</view>
		<u-popup :show="moreListShow" closeable @close="moreListShow=false">
			<view
				style="font-weight: bold;display: flex;justify-content: center;align-items: center;padding:12.5px 15px;border-bottom: 1px solid #eee;">
				收藏夹列表
			</view>
			<scroll-view scroll-y style="height: 900rpx;background-color: #fff;">
				<u-cell @click="selectFolder=i" :class="{list_title_sel:selectFolder==i}" v-for="(it,i) in saveFolder"
					:key="i">
					<text slot="title" class="list_title">{{it.folderName}}</text>
				</u-cell>
				<u-cell v-if="!folder.add">
					<image @click="folder.add=!folder.add" slot="icon" src="../../../static/icon/add.svg"
						style="width: 25px;height: 25px;"></image>
					<text @click="folder.add=!folder.add" slot="title" class="list_title">新建收藏夹</text>
				</u-cell>
				<u-cell v-else>
					<image slot="icon" @click="folder.add=!folder.add" src="../../../static/icon/close-line.svg"
						style="width: 25px;height: 25px;"></image>
					<input slot="title" class="list_title" v-model="folder.name">
					<view slot="value" class="btn2" @click="addF">确定</view>
				</u-cell>
			</scroll-view>
			<view style="display: flex;padding: 10px;justify-content: center;align-items: center;">
				<view class="btn" @click="saveF">保存至该收藏夹</view>
			</view>
		</u-popup>
		<u-overlay :show="pay.show" @click="payShow">
			<view class="payBox">
				<view style="text-align: center;font-weight: bold;font-size: 18px; padding: 10px;">打赏</view>
				<view class="payBox_min"  @tap.stop>
					<view @click="payConfim(100)">100</view>
					<view @click="payConfim(200)">200</view>
					<view @click="payConfim(500)">500</view>
				</view>
			</view>
		</u-overlay>
		<u-skeleton style="padding: 10px;" title rows="3" :loading="data.content==undefined"></u-skeleton>
	</view>
</template>

<script>
	import {
		toPage,
		getSay,
		getReSay,
		likeChange,
		PostPageList,
		send
	} from "../../../JS/PageAPI.js"
	import {
		getUser,
		addHistory,
		checkUser,
		getFolder,
		addFolder,
		setSave,
		getMe,
		likeUser
	} from "../../../JS/UserAPI.js"
	import {
		toCoin
	} from "../../../JS/pay.js"
	import {
		changeDate
	} from "../../../JS/Time.js"
	import {
		GetLv,
		GetColor
	} from "../../../JS/exc.js"
	import {
		getUrl
	} from "../../../JS/ApiConf.js"
	export default {
		data() {
			return {
				pay:{
					show:false
				},
				data: {},
				pid: 0,
				userData: {
					imgUrl: "../../../static/icon/user-3-line.svg"
				},
				say: {
					data: [],
					limt: 1,
					page: 0
				},
				show: false,
				moreListShow: false,
				type: {
					like: false,
					user: false,
					save: false
				},
				pageList: [],
				saveFolder: [],
				selectFolder: 0,
				folder: {
					name: "",
					add: false
				},
				send: {
					place: "发表你的意见",
					content: "",
					reContent: "",
					type: 0,
					it: {},
					user: {}
				},
				meData: {
					userName: "",
					vid: 0
				}
			};
		},
		onNavigationBarButtonTap(e) {
			if (e.index == 0) {
				uni.navigateBack({
					delta: 1000
				})
			} else if (e.index == 1) {
				this.moreListShow = true
			}
		},
		onLoad(option) {
			this.pid = option.pid
			this.initData()
			getMe({
				out: res => {
					this.meData = res
				}
			})
		},
		methods: {
			payShow(){
				this.pay.show = !this.pay.show
			},
			payConfim(int){
				this.payShow()
				uni.showModal({
					title:"是否确认打赏",
					success:res=>{
						if(res.confirm){
							uni.showLoading()
							toCoin({
								data:{
									toid:this.userData.vid,
									size:int
								},
								out:res=>{
									uni.hideLoading()
									if(res){
										uni.showToast({
											title:"打赏成功"
										})
									}
								}
							})
						}
					}
				})
			},
			toUserData(vid) {
				uni.navigateTo({
					url: "../user/userData?vid="+vid
				})
			},
			toPageData(pid) {
				uni.navigateTo({
					url: "pageData?pid=" + pid
				})
			},
			toReturn() {
				uni.navigateTo({
					url: "pageReturn?pid=" + this.data.pid + "&title=" + this.data.title
				})
			},
			toLikeUser() {
				likeUser({
					vid: this.userData.vid,
					out: res => {
						this.type.user = !this.type.user
						if (this.type.user) {
							uni.showToast({
								title: "关注成功",
								icon: "none",
								position: "bottom"
							})
						} else {
							uni.showToast({
								title: "取消关注成功",
								icon: "none",
								position: "bottom"
							})
						}

					}
				})
			},
			sendData(type, it, user, content) {
				if (this.send.type == type) {
					if (type == 1) {
						this.send.type = 0
					} else {
						this.send.type = 1
					}
				} else {
					this.send.type = type
				}
				this.send.it = it
				this.send.user = user
				this.send.reContent = content
				if (this.send.type == 0) {
					this.send.place = "发表你的意见"
				} else {
					this.send.place = "@" + user.userName + "(再次点击对方取消回复)"
				}
			},
			toSend() {
				let data
				if (this.send.type == 0) {
					data = {
						"pid": this.data.pid,
						"content": this.send.content,
						"time": new Date().getTime()
					}
				} else {
					data = {
						"sid": this.send.it.sayid,
						"toid": this.send.user.vid,
						"content": this.send.content,
						"reContent": this.send.reContent,
						"time": new Date().getTime()
					}
				}
				send({
					type: this.send.type,
					data: data,
					out: res => {
						let pushData
						if (this.send.type == 0) {
							pushData = {
								sayid: res,
								usersData: this.meData,
								content: data.content,
								time: changeDate(data.time)
							}
							this.say.data.unshift(pushData)
						} else {
							pushData = {
								sayid: res,
								userData: this.meData,
								sid: this.send.it.sayid,
								toUserData: this.send.user,
								content: data.content,
								time: changeDate(data.time)
							}
							this.send.it.reSayList.unshift(pushData)
						}
						this.send = {
							place: "发表你的意见",
							content: "",
							reContent: "",
							type: 0,
							it: {},
							user: {}
						}
					}
				})
			},
			saveF() {
				let data = {
					sfid: this.saveFolder[this.selectFolder].fsId,
					pid: this.data.pid
				}
				uni.showLoading()
				setSave({
					data: data,
					out: res => {
						this.type.save = true
						this.moreListShow = false
						uni.hideLoading()
						uni.showToast({
							title: "收藏成功",
							icon: "none"
						})
					}
				})
			},
			addF() {
				uni.showLoading()
				addFolder({
					data: {
						folderName: this.folder.name
					},
					out: res => {
						this.saveFolder.push({
							folderName: this.folder.name,
							fsId: res
						})
						this.folder.name = ""
						uni.hideLoading()
					}
				})
			},
			getF() {
				uni.getStorage({
					key: "userData",
					success: data => {
						this.moreListShow = true
						getFolder({
							vid: data.data.vid,
							out: res => {
								this.saveFolder = res
							}
						})
					},
					fail() {
						uni.showToast({
							title: "账号未登录，无法收藏文章",
							icon: "none",
							position: "bottom"
						})
					}
				})

			},
			likeC() {
				likeChange({
					pid: this.pid,
					mode: this.type.like,
					out: res => {
						this.type.like = res
						if (res) {
							this.data.likeNum++
							uni.showToast({
								title: "点赞成功",
								icon: "none",
								position: "bottom"
							})
						} else {
							this.data.likeNum--
							uni.showToast({
								title: "取消点赞成功",
								icon: "none",
								position: "bottom"
							})
						}
					}
				})
			},
			tagGo(it) {
				uni.navigateTo({
					url: "pageSearch?src=&tag=" + it
				})
			},
			showList() {
				this.show = !this.show
			},
			initData() {
				addHistory({
					pid: this.pid
				})
				toPage({
					pid: this.pid,
					out: data => {
						data.time = changeDate(data.time)
						getUser({
							vid: data.vid,
							out: res => {
								res.exc = GetLv(res.exc)
								res.color = GetColor(res.exc)
								this.userData = res
								this.data = data
								checkUser({
									pid: this.pid,
									vid: res.vid,
									likeOut: res => {
										this.type.like = res
									},
									saveOut: res => {
										this.type.save = res
									},
									userOut: res => {
										this.type.user = res
									}
								})
							}
						})
						PostPageList({
							data: {
								page: 1,
								size: 5,
								invId: this.pid
							},
							tags: data.tag.join("%"),
							out: res => {
								res.forEach(i => {
									i.time = changeDate(i.time)
									i.content = i.content.replace(/<[^>]+>/g, "")
								})
								this.pageList = res
							}
						})
					}
				})
				this.getSayList()
			},
			getSayList() {
				if (this.say.page > this.say.limt) {
					return
				}
				this.say.page++
				uni.showLoading()
				getSay({
					data: {
						pid: this.pid,
						page: this.say.page,
						size: 10
					},
					out: res => {
						this.say.limt = res.limt
						res.data.forEach(i => {
							i.page = 0
							i.limt = 1
							i.time = changeDate(i.time)
							i.usersData.imgUrl = getUrl() + "/api/PublicApi/getImg?imgUrl=" + i
								.usersData.imgUrl
							i.reSayList = []
							this.getReList(i)
						})
						this.say.data.push(...res.data)
						uni.hideLoading()
					}
				})
			},
			getReList(item) {
				if (item.page > item.limt) {
					return
				}
				item.page++
				getReSay({
					data: {
						sayid: item.sayid,
						page: item.page,
						size: 2
					},
					out: res => {
						item.load = this.getReList
						item.limt = res.limt
						res.data.forEach(i => {
							i.time = changeDate(i.time)
							i.userData.imgUrl = getUrl() + "/api/PublicApi/getImg?imgUrl=" + i.userData
								.imgUrl
							i.toUserData.imgUrl = getUrl() + "/api/PublicApi/getImg?imgUrl=" + i
								.toUserData.imgUrl
						})
						item.reSayList.push(...res.data)
					}
				})
			}
		}
	}
</script>

<style scoped lang="scss">
	.payBox{
		margin: 10px;
		margin-top: 50%;
		border: 1px solid #eee;
		background-color: #eee;
		border-radius: 5px;
		.payBox_min{
			padding: 10px;
			padding-bottom: 30px;
			display: flex;
			justify-content: space-around;
			align-items: center;
			view{
				background-color: #aaa;
				color: #000;
				font-weight: bold;
				display: flex;
				justify-content: center;
				align-items: center;
				height: 30px;
				padding: 10px;
				border-radius: 50%;
			}
		}
	}
	.btn2 {
		border-radius: 10px;
		font-weight: bold;
		padding: 5px 20px;
		background-color: #a00;
		color: #fff;
		transition: all 100ms;
	}

	.btn {
		border-radius: 10px;
		font-weight: bold;
		padding: 10px 20px;
		background-color: #a00;
		color: #fff;
		transition: all 100ms;
	}

	.btn:active,
	.btn2:active {
		background-color: #eee;
		color: #000;
	}

	.list_title {
		font-weight: bold;
		padding: 5px;
	}

	.list_title_sel {
		transition: all 500ms;
		background-color: #aaa;
	}

	.page_user {
		position: relative;
		padding: 5px 10px;
		display: flex;
		flex-flow: row nowrap;
		align-items: center;

		image {
			width: 40px;
			height: 40px;
			border-radius: 50%;
		}

		;

		.page_userData {
			display: flex;
			flex-flow: row nowrap;
			align-items: center;

			view {
				font-weight: bold;
				display: flex;
				justify-content: center;
				align-items: center;
				margin-left: 15px;
			}

			.page_user_btn {
				display: flex;
				position: absolute;
				justify-content: flex-end;
				width: 150px;
				height: 30px;
				top: 50%;
				margin-top: -15px;
				right: 10px;

				view {
					flex: 1;
					padding: 5px;
					border-radius: 5px;
					display: flex;
					background-color: red;
					font-size: 12px;
					color: #fff;
					font-weight: bold;
					border: none;
					transition: all 200ms;
				}

				view:active {
					background-color: #f55;
					color: #eee;
				}
			}


		}

	}

	.topList {
		position: fixed;
		overflow: hidden;
		top: 45px;
		right: 15px;
		border-radius: 5px;
		background-color: #eee;
		box-shadow: 0 0 5px black;
		width: 75px;
		text-align: center;

		view {
			padding: 5px;
			font-size: 18px;
			font-weight: bold;
			transition: all 100ms;
		}

		;

		view:active {
			background-color: #aaa;
		}
	}

	.page_title_min {
		text-align: center;
		font-weight: bold;
		font-size: 20px;
		margin: 10px;
	}

	.page_data_min {
		display: flex;
		justify-content: space-between;
		font-size: 14px;
		color: #555;
		align-items: center;

		view {
			display: flex;
			flex-flow: row nowrap;
			margin: 5px 15px;
		}

		.icon_small {
			margin-right: 15px;
			width: 15px;
			height: 15px;
		}
	}

	.page_content_min {
		margin: 10rpx;
		padding-bottom: 40px;
		overflow: hidden;

		/deep/ div {
			width: 100%;
			overflow: scroll;
		}
	}

	.page_say {
		width: 750rpx;
		height: 40px;
		background-color: #eee;
		position: fixed;
		left: 0;
		bottom: 0;
		display: flex;
		align-items: center;
		justify-content: space-between;

		.like {
			display: flex;
			width: 100px;
			margin-left: 5px;
			height: 70%;
			justify-content: center;
			align-items: center;
			font-size: 12px;
			background-color: #d8d8d8;
			border-radius: 30px;
		}

		.icon_small {
			margin-right: 15px;
			width: 15px;
			height: 15px;
		}

		input {
			flex: 1;
			padding: 10px;
			font-size: 15px;
			font-weight: bold;
			transition: all 200ms;
		}

		button {
			line-height: 30px;
			font-size: 14px;
			width: 60px;
			height: 30px;
			color: #fff;
			font-weight: bold;
			margin: 5px;
			background-color: #f00;
			transition: all 200ms;
		}

		button:active {
			background-color: #f55;
			color: #eee;
		}
	}

	.say_list {
		position: fixed;
		left: 0px;
		top: 0px;
		width: 100%;
		height: 100%;

		.background {
			z-index: -1;
			position: absolute;
			top: 0px;
			opacity: 0.5;
			width: 100%;
			height: 100%;
			background-color: #000;
		}

		;

		.list {
			position: absolute;
			bottom: 40px;
			z-index: 1;
			background-color: snow;
			width: 700rpx;
			height: 900rpx;
			padding: 25rpx;
			border-radius: 25rpx 25rpx 0 0;
			transition: all 250ms;

			.showList {
				height: 850rpx;
			}

			.say_box {
				padding: 10px;

				.say_re {
					padding: 10px 15px;
					padding-right: 0;
				}

				.say_data {
					position: relative;
					display: flex;
					align-items: center;

					view {
						font-weight: bold;
						margin-left: 10px;
						font-size: 16px;
						display: flex;
						align-items: center;
					}

					.txt {
						display: inline-block;
						width: 65px;
						overflow: hidden;
						white-space: nowrap;
						text-overflow: ellipsis;
					}

					.time {
						position: absolute;
						right: 5px;
						top: 0px;
						font-size: 12px;
						color: gray;
						font-weight: normal;
					}
				}

				;

				image {
					width: 30px;
					height: 30px;
					border-radius: 50%;
				}

				;

				.say_content {
					padding: 10px 0;
					border-bottom: 1px solid #eee;
				}

				.more {
					font-size: 16px;
					font-weight: bold;
					text-align: center;
					height: 30px;
					display: flex;
					align-items: center;
					justify-content: center;
					background: #eee;
					border-radius: 15px;
					transition: all 200ms;
				}

				.more:active {
					background-color: #aaa;
				}
			}
		}
	}

	.fade-enter,
	.fade-leave-to {
		transform: translateY(100%);
	}

	.fade-leave,
	.fade-enter-to {
		transform: translateY(0)
	}
</style>
