<template>
	<view class="content">
		<view class="user_main">
			<u-avatar mode="aspectFill" style="margin-left: 10px;" :size="70" :src="userData.imgUrl"></u-avatar>
			<view class="user_data">
				<view>
					{{userData.userName}}
					<u-tag :bgColor="userData.color" :borderColor="userData.color" color="#fff" size="small"
						style="font-size: 12px; margin-left: 10px;" :text="'Lv'+userData.exc" plain></u-tag>
				</view>
				<view class="user_data_m">
					<view style="margin-right: 20px;">
						<image src="../../../static/icon/copper-diamond-fill.svg"></image>
						<u-count-to :startVal="0" :endVal="userData.coin" fontSize="16"></u-count-to>
					</view>
					<view>
						<image src="../../../static/icon/user-heart-fill.svg"></image>
						<u-count-to :startVal="0" :endVal="userData.fanNum" fontSize="16"></u-count-to>
					</view>
				</view>
				<view class="btn">
					<view @click="toData(userData.vid)">资料</view>
					<view v-if="isMe" @click="toPay">充值</view>
					<view v-else>
						<text v-if="!likeUser" @click="tolikeUser">关注</text>
						<text v-else  @click="tolikeUser">取消关注</text>
					</view>
				</view>
			</view>
		</view>
		<view style="padding: 10px;font-weight: bold;padding-bottom: 0;padding-top: 10px;">
			个性签名：
			<text style="font-weight: normal;">{{userData.resume}}</text>
		</view>
		<view class="user_list">
			<view class="user_title">当前经验：</view>
			<u-line-progress :percentage="userData.pre" height="20" inactiveColor="#eee" :activeColor="userData.color">
			</u-line-progress>
		</view>
		<view>
			<u-sticky>
				<u-subsection :list="list" :current="current" activeColor="#f00" @change="changeList"></u-subsection>
			</u-sticky>
			<u-empty v-if="indexList.list.length==0&&current==0" mode="list"></u-empty>
			<u-empty v-if="indexList1.list.length==0&&current==1" mode="list"></u-empty>
			<u-empty v-if="indexList2.list.length==0&&current==2" mode="list"></u-empty>
			<view v-if="current==0" v-show="indexList.list.length>0">
				<view v-for="(item, index) in indexList.list" :key="index">
					<u-cell @click="toUser(item.vid)">
						<u-avatar slot="icon" :src="item.imgUrl"></u-avatar>
						<text slot="title" class="list_title">{{item.userName}}</text>
					</u-cell>
				</view>
			</view>
			<view v-else-if="current==1" v-show="indexList1.list.length>0">
				<u-swipe-action v-if="isMe">
					<u-swipe-action-item  :options="options" v-for="(item, index) in indexList1.list" :key="index"  @click="removeFolder(item.fsId)">
						<u-cell @click="savelist(item.fsId,item.folderName)">
							<text slot="title" class="list_title">{{item.folderName}}</text>
						</u-cell>
					</u-swipe-action-item>
				</u-swipe-action>
				<view v-else>
					<view v-for="(item, index) in indexList1.list" :key="index">
						<u-cell @click="savelist(item.fsId,item.folderName)">
							<text slot="title" class="list_title">{{item.folderName}}</text>
						</u-cell>
					</view>
				</view>
				<view v-if="isMe">
					<u-cell @click="changeAddShow()">
						<u-avatar slot="icon" size="20" src="../../../static/icon/add.svg"></u-avatar>
						<text slot="title">添加收藏夹</text>
					</u-cell>
				</view>
			</view>
			<view v-else-if="current==2" v-show="indexList2.list.length>0">
				<view v-for="(item, index) in indexList2.list" :key="index">
					<u-cell  @click="toPage(item.pid)">
						<u-image width="75" height="75" slot="icon" :src="item.post"></u-image>
						<text slot="title" class="list_title">{{item.title}}</text>
						<text slot="label" class="value" v-html="item.content"></text>
					</u-cell>
				</view>
			</view>
		</view>
		<u-popup zIndex="10071" :show="showSave" mode="bottom" @close="savelist" closeable>
			<view style="background-color: #fff;">
				<view class="folder_title">{{saveList.folderName}}</view>
				<u-empty v-if="saveList.list.length==0" mode="list"></u-empty>
				<scroll-view style="height: 950rpx;" scroll-y>
					<view v-if="isMe">
						<view v-for="(it,i) in saveList.list" :key="i">
							<u-cell>
								<u-image @click="toPage(it.pid)" width="75" height="75" slot="icon" :src="it.post"></u-image>
								<text @click="toPage(it.pid)" slot="title" class="list_title">{{it.title}}</text>
								<text @click="toPage(it.pid)" slot="label" class="value" v-html="it.content"></text>
								<image @click="removeSave(it.pid)" src="../../../static/icon/delete-bin-line.svg"
								style="width: 20px;height: 30px;" slot="value"></image>
							</u-cell>
						</view>
					</view>
					<view v-else >
						<view v-for="(it,i) in saveList.list" :key="i">
							<u-cell @click="toPage(it.pid)">
								<u-image width="75" height="75" slot="icon" :src="it.post"></u-image>
								<text slot="title" class="list_title">{{it.title}}</text>
								<text slot="label" class="value" v-html="it.content"></text>
							</u-cell>
						</view>
					</view>
				</scroll-view>
			</view>
		</u-popup>
		<u-overlay zIndex="999" :show="addShow" @click="changeAddShow">
			<view class="add_f" @tap.stop>
				<view style="font-size: 18px;font-weight: bold;text-align: center;margin-bottom: 30px;">
					添加收藏夹
				</view>
				<input type="text" v-model="addData.folderName" placeholder="请输入新建收藏夹名" />
				<view class="btns">
					<view @click="addFolder()" style="background-color: #a00;color: #fff;">确认</view>
					<view @click="changeAddShow">取消</view>
				</view>
			</view>
		</u-overlay>
		<u-modal 
		:show="modal.show" 
		:title="modal.title" 
		:content='modal.content' 
		closeOnClickOverlay 
		showCancelButton
		asyncClose
		confirmColor="#a00"
		@confirm="modal.conf"
		@close="modal.show = false"
		@cancel="modal.show = false"
		></u-modal>
	</view>
</template>

<script>
	import {
		getUser,
		change,
		getFolder,
		getSave,
		removeFolder,
		addFolder,
		removeSave,
		checkLikeUser,
		likeUser
	} from "../../../JS/UserAPI.js"
	import {
		GetColor,
		GetLv,
		GetPre
	} from "../../../JS/exc.js"
	import {
		getLikeUserFind
	} from "../../../JS/LinkApi.js"
	import {
		getPageList
	} from "../../../JS/PageAPI.js"
	export default {
		data() {
			return {
				likeUser:false,
				modal:{
					show:false,
					title:"",
					content:"",
					targetId:0,
					conf:()=>{}
				},
				list: [
					"关注列表",
					"收藏夹",
					"发布列表"
				],
				options:[
					{
						text:'删除',
						style:{
							backgroundColor:"#f00",
							color:"#fff"
						}
					}
					
				],
				addData:{
					vid:"",
					folderName:""
				},
				current: 0,
				userData: {
					vid: ""
				},
				isMe: false,
				indexList: {
					page: 0,
					limt: 1,
					list: []
				},
				indexList1: {
					page: 0,
					limt: 1,
					list: []
				},
				indexList2: {
					page: 0,
					limt: 1,
					list: []
				},
				showSave:false,
				saveList:{
					page:0,
					limt:1,
					list:[],
					folderName:""
				},
				addShow:false
			}
		},
		onShow() {
			this.loadUser()
		},
		onLoad(data) {
			this.userData.vid = data.vid
			uni.showLoading()
			this.initData()
			checkLikeUser({
				vid:data.vid,
				userOut:res=>{this.likeUser = res}
			})
		},
		onReachBottom() {
			this.load()
		},
		methods: {
			tolikeUser(){
				likeUser({
					vid:this.userData.vid,
					out:res=>{
						this.likeUser = !this.likeUser
					}
				})
			},
			toPay(){
				uni.navigateTo({
					url:"../payPages/pay"
				})
			},
			//初始化
			initData() {
				uni.getStorage({
					key: "userData",
					success: data => {
						if (this.userData.vid == data.data.vid) {
							this.isMe = true
						}
					}
				})
				this.loadUser()
				this.changeList(0)
			},
			//载入个人信息
			loadUser(){
				getUser({
					vid: this.userData.vid,
					out: res => {
						res.pre = parseInt(GetPre(res.exc))
						res.exc = GetLv(res.exc)
						res.color = GetColor(res.exc)
						this.userData = res
						uni.hideLoading()
					}
				})
			},
			//打开关闭收藏夹添加窗口
			changeAddShow(){
				this.addShow = !this.addShow
				if(this.addShow){
					this.addData.vid=this.userData.vid
				}else{
					this.addData = {
						vid:"",
						folderName:""
					}
				}
			},
			//切换tab
			changeList(i) {
				this.current = i
				this.indexList = {
					page: 0,
					limt: 1,
					list: []
				}
				this.indexList1 = {
					page: 0,
					limt: 1,
					list: []
				}
				this.indexList2 = {
					page: 0,
					limt: 1,
					list: []
				}
				this.load()
			},
			//载入更多信息
			load() {
				uni.showLoading()
				switch (this.current) {
					case 0:
						this.getLikeUser()
						break
					case 1:
						this.getFolderList()
						break
					case 2:
						this.getPageList()
						break
				}
			},
			getLikeUser() {
				if (this.indexList.page > this.indexList.limt) {
					uni.hideLoading()
					return
				}
				this.indexList.page++
				getLikeUserFind({
					data: {
						vid: this.userData.vid,
						page: this.indexList.page,
						size: 15
					},
					out: (res,limt) => {
						this.indexList.limt = limt
						this.indexList.list.push(...res)
						uni.hideLoading()
					}
				})
			},
			getPageList() {
				if (this.indexList2.page > this.indexList2.limt) {
					uni.hideLoading()
					return
				}
				this.indexList2.page++
				getPageList({
					data: {
						vid: this.userData.vid,
						page: this.indexList2.page,
						size: 15
					},
					out: (res,limt) => {
						this.indexList2.limt = limt
						res.forEach(i=>{
							i.content = i.content.replace(/<[^>]+>/g,"")
						})
						this.indexList2.list.push(...res)
						uni.hideLoading()
					}
				})
			},
			getFolderList() {
				if (this.indexList1.page > this.indexList1.limt) {
					uni.hideLoading()
					return
				}
				this.indexList1.page++
				getFolder({
					vid: this.userData.vid,
					out: res => {
						this.indexList1.list.push(...res)
						uni.hideLoading()
					}
				})
			},
			savelist(i,name){
				this.showSave = !this.showSave
				if(this.showSave){
					this.saveList.folderName = name
					this.loadSave(i)
				}else{
					this.saveList = {
						list:[],
						limt:1,
						page:0,
						folderName:""
					}
				}
				
			},
			loadSave(i){
				uni.showLoading()
				this.modal.targetId = i
				if (this.saveList.page > this.saveList.limt) {
					uni.hideLoading()
					return
				}
				this.saveList.page++
				getSave({
					data:{
						sfid:i,
						page:this.saveList.page
					},
					out:(res,limt)=>{
						res.forEach(i=>{
							i.content = i.content.replace(/<[^>]+>/g,"")
						})
						this.saveList.limt = limt
						this.saveList.list.push(...res)
						uni.hideLoading()
					}
				})
			},
			addFolder(){
				if(this.addData.folderName==""){
					uni.showToast({
						title:"收藏夹名不得为空",
						icon:"none",
						position:"bottom"
					})
					return
				}
				uni.showModal({
					content:"你确定要添加该收藏夹吗？",
					success:op=> {
						if(op.confirm){
							uni.showLoading()
							addFolder({
								data:this.addData,
								out:res=>{
									uni.hideLoading()
									this.addShow = false
									this.addData.folderName=""
									this.changeList(1)
								}
							})
						}
					}
				})
			},
			removeFolder(id){
				this.modal.show = true
				this.modal.content = "是否确认删除",
				this.modal.title = "删除收藏夹"
				this.modal.conf=()=>{
					uni.showLoading()
					removeFolder({
						sfid:id,
						out:res=>{
							uni.hideLoading()
							if(!res){
								uni.showToast({
									title:"删除失败",
									icon:"none"
								})
							}else{
								this.indexList1.list = this.indexList1.list.filter(it=>{
									return it.fsId!=id
								})
								this.$forceUpdate()
								uni.showToast({
									title:"删除成功",
									icon:"none"
								})
							}
							this.modal.show = false
							this.modal.conf=()=>{}
						}
					})
				}
			},
			removeSave(id){
				this.modal.show = true
				this.modal.content = "是否确认删除",
				this.modal.title = "删除收藏文章"
				this.modal.conf = ()=>{
					uni.showLoading()
					removeSave({
						data:{
							pid:id,
							sfid:this.modal.targetId
						},
						out:res=>{
							uni.hideLoading()
							if(!res){
								uni.showToast({
									title:"删除失败",
									icon:"none"
								})
							}else{
								this.saveList.list = this.saveList.list.filter(it=>{
									return it.pid!=id
								})
								this.$forceUpdate()
								uni.showToast({
									title:"删除成功",
									icon:"none"
								})
							}
							this.modal.show = false
							this.modal.conf=()=>{}
						}
					})
				}
			},
			toPage(id){
				uni.navigateTo({
					url:"../indexPages/pageData?pid="+id
				})
			},
			toUser(id){
				uni.navigateTo({
					url:"./userData?vid="+id
				})
			},
			toData(id){
				uni.navigateTo({
					url:"./userData_All?vid="+id
				})
			}
		}
	}
</script>

<style scoped lang="scss">
	.user_main {
		display: flex;
		flex-flow: row nowrap;
		align-items: center;
		position: relative;

		.user_data {
			margin-left: 20px;

			image {
				width: 20px;
				height: 20px;
			}

			view {
				margin: 5px;
				display: flex;
				align-items: center;
			}

			.user_data_m {
				margin: 0;
			}

			.btn {
				flex-flow: column;
				position: absolute;
				right: 10px;
				bottom: -5px;
				font-weight: bold;

				view {
					width: 60px;
					display: flex;
					justify-content: center;
					font-size: 14px;
					padding: 2.5px 15px;
					background-color: #a00;
					color: #fff;
					border-radius: 10px;
				}
			}
		}
	}

	.user_list {
		padding: 20rpx;
		padding-top: 0;
		.user_title {
			margin: 10px;
			margin-left: 0;
			font-size: 16px;
			font-weight: bold;
		}
	}
	
	.value{
		width: 500rpx;
		font-size: 14px;
		color: #aaa;
		display: -webkit-box;
		overflow: hidden;
		text-overflow: ellipsis;
		-webkit-line-clamp: 3;
		-webkit-box-orient:vertical;
	}
	.list_title{
		font-weight: bold;
	}
	
	.folder_title{
		margin-bottom: 5rpx;
		padding: 25rpx;
		font-size: 35rpx;
		font-weight: bold;
		text-align: center;
		border-bottom: 1px solid #eee;
	}
	.add_f{
		transform: translateY(500rpx);
		background-color: #fff;
		margin: 10px;
		padding: 20px 10px;
		border-radius: 5px;
		input{
			font-size: 16px;
			padding: 5px;
			margin: 10px;
			border-bottom: 1px solid #aaa;
		}
		.btns{
			display: flex;
			flex-flow: row nowrap;
			justify-content: space-around;
			view{
				
				padding: 5px 35px;
				font-size: 14px;
				font-weight: bold;
				background-color: #ddd;
				border-radius: 5px;
			}
		}
	}
</style>
