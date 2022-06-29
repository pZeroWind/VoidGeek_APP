<template>
	<view>
		<u-collapse accordion @open="open" value="LetterList">
			<u-collapse-item name="SysMsg">
				<text slot="title" class="msg_title">系统消息</text>
				<scroll-view>
					<u-cell-group :border="false">
						<u-cell @click="selUser(item)" :border="false" v-for="(item, index) in SysList" :key="index" >
							<view slot="title" class="msg_min_title">
								<view>{{item.userName}}</view>
							</view>
							<u-avatar slot="icon" shape="circle" size="30" :src="item.imgUrl"
								customStyle="margin: -3px 5px -3px 0"></u-avatar>
							<u-badge slot="value" numberType="overflow" max="99" :value="item.num"></u-badge>
						</u-cell>
					</u-cell-group>
				</scroll-view>
			</u-collapse-item>
			<u-collapse-item ref="likelist" name="LikeList">
				<text slot="title" class="msg_title">关注列表</text>
				<scroll-view>
					<u-cell-group :border="false">
						<u-cell @click="selUser(item)" :border="false" v-for="(item, index) in LikeUser.list" :key="index">
							<view slot="title" class="msg_min_name">
								<view>{{item.userName}}</view>
								<u-tag
									:bgColor="item.color" 
									:borderColor="item.color" 
									color="#fff"
									size="small"
									style="font-size: 12px;"
									:text="'Lv'+item.exc"
									plain></u-tag>
							</view>
							<u-avatar slot="icon" shape="circle" size="30" :src="item.imgUrl"
								customStyle="margin: -3px 5px -3px 0"></u-avatar>
							<u-badge slot="value" numberType="overflow" max="99" :value="item.num"></u-badge>
						</u-cell>
					</u-cell-group>
					<u-empty
						mode="list"
						v-if="LikeUser.list.length==0">
					</u-empty>
				</scroll-view>
			</u-collapse-item>
			<u-collapse-item ref="letterlist" name="LetterList">
				<text slot="title" class="msg_title">私信列表</text>
				<scroll-view>
					<u-cell-group :border="false">
						<u-cell @click="selUser(item)" :border="false" v-for="(item, index) in LetterUser.list" :key="index">
							<view slot="title" class="msg_min_name">
								<view>{{item.userName}}</view>
								<u-tag
									:bgColor="item.color" 
									:borderColor="item.color" 
									color="#fff"
									size="small"
									style="font-size: 12px;"
									:text="'Lv'+item.exc"
									plain></u-tag>
							</view>
							<u-avatar slot="icon" shape="circle" size="30" :src="item.imgUrl"
								customStyle="margin: -3px 5px -3px 0"></u-avatar>
							<u-badge slot="value" numberType="overflow" max="99" :value="item.num"></u-badge>
						</u-cell>
					</u-cell-group>
					<u-empty
						mode="list"
						v-if="LetterUser.list.length==0">
					</u-empty>
				</scroll-view>
			</u-collapse-item>
		</u-collapse>
		<u-popup @touchmove.stop :show="show" mode="bottom" @close="showPop" closeable closeOnClickOverlay>
		        <view class="letterBox" >
		            <view class="letter_title">{{letterData.userName}}</view>
					<scroll-view id="letter_list" scroll-y class="letter_list" :scroll-into-view="last">
						<u-loadmore
						@loadmore="loadNext_list"
						:status="letterData.status" 
						loading-text="正在加载" 
						loadmore-text="点击加载更多历史消息" 
						nomore-text="已无更多历史消息" />
						<view :id="'l'+i" v-for="(it,i) in letterData.list" :key="i">
							<view style="text-align: center;" v-if="letterData.list[i-1]==undefined||it.time!=letterData.list[i-1].time" class="time">
								{{it.time}}
							</view>
							<view v-if="it.vid==letterData.sendData.fid" class="left">
								<view class="user">
									<image mode="aspectFill" :src="letterData.imgUrl"></image>
									<view>
										<text>{{letterData.userName}}</text>
									</view>
								</view>
								<view class="contents">
									<view style="font-size: 12px;padding: 5px 0;color: #aaa;" v-show="it.reContent!=undefined&&it.reContent!=null">对
										<span style="color: #000;font-weight: bold;">“{{it.reContent}}”</span>
										的回复
									</view>
									<text v-html="it.content">
									</text>
									<navigator 
									style="font-size: 10rpx;
									margin: 20rpx;
									margin-bottom: 5rpx;
									width: 150px;
									overflow: hidden;
									text-overflow: ellipsis;
									white-space: nowrap;
									text-align: right;" v-if="it.vid<-1" :url="'indexPages/pageData?pid='+it.pid">《{{it.pageData.title}}》</navigator>
								</view>
							</view>
							<view v-else-if="it.vid==minData.vid" class="right">
								<view class="user">
									<image mode="aspectFill" :src="minData.imgUrl"></image>
									<view>
										<text>{{minData.userName}}</text>
										
									</view>
								</view>
								<u-loading-icon v-if="!it.load" style="position: absolute;left: 30rpx;top: 50%;"></u-loading-icon>
								<view class="contents">
									<text v-html="it.content">
									</text>
								</view>
							</view>
						</view>
					</scroll-view>
					<view class="letter_input" v-show="letterData.sendData.fid!='-1'&&letterData.sendData.fid!='-2'&&letterData.sendData.fid!='-3'">
						<u--textarea v-model="letterData.sendData.content" placeholder="输入内容发送私信" maxlength="300" count></u--textarea>
						<view class="send">
							<view @click="toSend()">发送</view>
						</view>
					</view>
		        </view>
		</u-popup>
	</view>
</template>

<script>
	import {
		getLikeUser,
		getLetterNum,
		getLetterUser,
		getLetter,
		toSend,
		readed,
		getMsgNum,
		getReMe,
		getSayMe,
		getPostMe
	} from "../../JS/LinkApi.js"
	import {
		getMe
	} from "../../JS/UserAPI.js"
	import {
		CeilDate
	} from "../../JS/Time.js"
	import {
		getWs
	} from "../../JS/ApiConf.js"
	var oldBottom = 0
	export default {
		data() {
			return {
				SysList:[
					{
						vid:'-1',
						userName:"系统通知",
						num:0,
						imgUrl:"../../static/v_logo.png"
					},
					{
						vid:'-2',
						userName:"全部回复",
						num:0,
						imgUrl:"../../static/v_logo.png"
					},
					{
						vid:'-3',
						userName:"全部评论",
						num:0,
						imgUrl:"../../static/v_logo.png"
					}
				],
				LikeUser:{
					list:[],
					page:0,
					limt:1
				},
				LetterUser:{
					list:[],
					page:0,
					limt:1
				},
				minData:{
					userName:"",
					imgUrl:""
				},
				nowList:"LetterList",
				show:false,
				letterData:{
					list:[],
					page:0,
					limt:1,
					status:"loadmore",
					userName:"",
					imgUrl:"",
					sendData:{
						fid:'-1',
						content:""
					}
				},
				last:"",
				loaded:0
			};
		},
		onPullDownRefresh() {
			uni.getStorage({
				key:"userData",
				success:res=>{
					this.LikeUser.list = []
					this.LikeUser.page = 0
					this.LetterUser.list = []
					this.LetterUser.page = 0
					this.initLoad()
					this.onSocket()
				},fail() {
					uni.stopPullDownRefresh()
				}
			})
		},
		onReachBottom() {
			switch(this.nowList){
				case "LikeList":
				this.loadNext_like()
				break
				case "LetterList":
				this.loadNext_letter()
				break
			}
		},
		onShow() {
			this.onSocket()
			this.LikeUser.list = []
			this.LikeUser.page = 0
			this.LetterUser.list = []
			this.LetterUser.page = 0
			uni.getStorage({
				key:"userData",
				success:res=>{
					this.initLoad()
				}
			})
		},
		methods:{
			//折叠切换
			open(e){
				this.nowList = e
			},
			//选择用户
			selUser(it){
				this.letterData.sendData.fid = it.vid,
				this.letterData.userName = it.userName
				this.letterData.imgUrl = it.imgUrl
				it.num = 0
				readed({
					vid:this.letterData.sendData.fid
				})
				this.showPop()
			},
			//初始化聊天区域
			openPop(){
				this.letterData.list=[]
				this.letterData.page=0
				this.letterData.limt=1
			},
			//显示聊天区域
			showPop(){
				this.show=!this.show
				if(this.show){
					this.loadNext_list()
				}else{
					this.openPop()
				}
			},
			//初始化
			initLoad(){
				this.loaded=0
				this.loadNext_like()
				this.loadNext_letter()
				getMsgNum({
					out:res=>{
						this.SysList[0].num = res.newPost
						this.SysList[1].num = res.newReSay
						this.SysList[2].num = res.newSay
					}
				})
			},
			//加载已关注用户
			loadNext_like(){
				if(this.LikeUser.page >= this.LikeUser.limt){
					return
				}
				this.LikeUser.page++
				console.log(this.loaded)
				getLikeUser({
					data:{
						page:this.LikeUser.page,
						size:10
					},
					out:(res,limt)=>{
						this.loaded++
						this.LikeUser.list.push(...res)
						this.LikeUser.limt = limt
						this.$nextTick(() => {
							this.$refs.likelist.init()
						})
						if(this.loaded>=2){
							uni.stopPullDownRefresh()
							uni.hideLoading()
						}
					}
				})
			},
			//加载私信者列表
			loadNext_letter(){
				if(this.LetterUser.page >= this.LetterUser.limt){
					return
				}
				this.LetterUser.page++
				getLetterUser({
					data:{
						page:this.LetterUser.page,
						size:10
					},
					out:(res,limt)=>{
						this.loaded++
						this.LetterUser.list.push(...res)
						this.LetterUser.limt = limt
						this.$nextTick(() => {
							this.$refs.letterlist.init()
						})
						if(this.loaded==2){
							uni.stopPullDownRefresh()
							uni.hideLoading()
						}
					}
				})
			},
			//加载聊天信息
			loadNext_list(){
				this.letterData.status = "loading"
				if(this.letterData.page >= this.letterData.limt){
					this.letterData.status = "nomore"
					return
				}
				this.letterData.page++
				if(this.letterData.sendData.fid == '-1'){
					getPostMe({
						data:{
							page:this.letterData.page,
							size:5
						},
						out:(res,limt)=>{
							res.forEach(i=>{
								i.time = CeilDate(i.time)
							})
							this.letterData.list.unshift(...res)
							this.letterData.limt = limt
							this.letterData.status = "loadmore"
							if(this.letterData.page==1){
								this.letterScroll()
							}
						}
					})
					return
				}else if(this.letterData.sendData.fid == '-2'){
					getReMe({
						data:{
							page:this.letterData.page,
							size:5
						},
						out:(res,limt)=>{
							res.forEach(i=>{
								i.time = CeilDate(i.time)
							})
							this.letterData.list.unshift(...res)
							this.letterData.limt = limt
							this.letterData.status = "loadmore"
							if(this.letterData.page==1){
								this.letterScroll()
							}
						}
					})
					return
				}else if(this.letterData.sendData.fid == '-3'){
					getSayMe({
						data:{
							page:this.letterData.page,
							size:5
						},
						out:(res,limt)=>{
							res.forEach(i=>{
								i.time = CeilDate(i.time)
							})
							this.letterData.list.unshift(...res)
							this.letterData.limt = limt
							this.letterData.status = "loadmore"
							if(this.letterData.page==1){
								this.letterScroll()
							}
						}
					})
					return
				}
				getLetter({
					data:{
						vid:this.letterData.sendData.fid,
						page:this.letterData.page,
						size:5
					},
					out:(res,limt)=>{
						res.forEach(i=>{
							i.load = true
						})
						this.letterData.list.unshift(...res)
						this.letterData.limt = limt
						this.letterData.status = "loadmore"
						if(this.letterData.page==1){
							this.letterScroll()
						}
					}
				})
			},
			//更新聊天区域Scroll位置
			letterScroll(){
				this.$nextTick(()=>{
					setTimeout(()=>{
						this.last = "l"+String(this.letterData.list.length-1)
					},50)
				})
			},
			//发送信息
			toSend(){
				let data = {
					content:this.letterData.sendData.content,
					fid:this.letterData.sendData.fid
				}
				let showData = JSON.parse(JSON.stringify(data))
				showData.vid = this.minData.vid
				showData.time = CeilDate(new Date().getTime())
				showData.load = false
				this.letterData.list.push(showData)
				this.letterData.sendData.content = ""
				this.letterScroll()
				toSend({
					data:data,
					out:res=>{
						if(res){
							showData.load = true
						}
					}
				})
			},
			//初始化、更新聊天服务器socket
			onSocket(){
				uni.getStorage({
					key:"userData",
					success:data=>{
						getMe({
							out:res=>{
								this.minData=res
							}
						})
						let link = uni.connectSocket({
							url:getWs()+"/api/LinkApi/connect?vid="+data.data.vid,
							success: () => {
								console.log("聊天服务器正在连接")
							}
						})
						link.onOpen(()=>{
							link.send({
								data:"1",
								success: () => {
									console.log("聊天服务器连接成功")
								}
							})
						})
						link.onMessage(res=>{
							if(res.data == "1"){
								link.send({
									data:"1"
								})
							}else{
								let data = JSON.parse(res.data)
								data.time = CeilDate(Number(data.time))
								this.letterData.list.push(data)
								if(this.letterData.sendData.fid!=data.vid&&!this.show){
									this.LikeUser.list.forEach(i=>{
										if(i.vid==data.vid){
											i.num++
										}
									})
									this.LetterUser.list.forEach(i=>{
										if(i.vid==data.vid){
											i.num++
										}
									})
								}else{
									readed({
										vid:this.letterData.sendData.fid
									})
								}
								this.letterScroll()
							}
						})
					}
				})
			}
		}
	}
</script>

<style scoped lang="scss">
	.msg_title{
		font-size: 35rpx;
		font-weight: bold;
	}
	.msg_min_title{
		font-size: 30rpx;
		font-weight: bold;
	}
	.msg_min_name{
		font-size: 30rpx;
		font-weight: bold;
		display: flex;
		flex-flow: row nowrap;
		view{
			margin-right: 20rpx;
		}
	}
	.letterBox{
		.letter_list{
			height: 500rpx;
		}
		.letter_input{
			border-top: 1px solid #eee;
			.send{
				display: flex;
				justify-content: flex-end;
				view{
					width: 200rpx;
					height: 65rpx;
					margin: 20rpx;
					display: flex;
					justify-content: center;
					align-items: center;
					font-weight: bold;
					border-radius: 20rpx;
					background-color: #ddd;
					border: 1px solid #eee;
					transition: all 100ms;
				}
				view:active{
					background-color: #aaa;
					border: 1px solid #aaa;
				}
			}
		}
		.letter_title{
			margin-bottom: 25rpx;
			padding: 25rpx;
			font-size: 35rpx;
			font-weight: bold;
			text-align: center;
			border-bottom: 1px solid #eee;
		}
		.left{
			padding: 20rpx;
			image{
				width: 65rpx;
				height: 65rpx;
				border-radius: 50%;
			}
			.user{
				display: flex;
				flex-flow: row nowrap;
				align-items: center;
				font-size: 27.5rpx;
				font-weight: bold;
				image{
					margin-right: 20rpx;
				}
			}
			.contents{
				font-size: 30rpx;
				font-weight: normal;
				background-color: #efefef;
				min-height: 30rpx;
				display: inline-block;
				min-width: 35%;
				max-width: 65%;
				margin-left: 35rpx;
				margin-top: 20rpx;
				word-wrap: break-word;
				padding: 15rpx;
				border-radius: 0 15rpx 15rpx 15rpx;
			}
		}
		.right{
			position: relative;
			display: flex;
			flex-direction: column;
			align-items: flex-end;
			padding: 20rpx;
			image{
				width: 75rpx;
				height: 75rpx;
				border-radius: 50%;
			}
			.user{
				display: flex;
				flex-flow: row-reverse nowrap;
				justify-content: flex-end;
				align-items: center;
				font-size: 27.5rpx;
				font-weight: bold;
				image{
					margin-left: 20rpx;
				}
			}
			.contents{
				font-size: 30rpx;
				font-weight: normal;
				background-color: #efefef;
				min-height: 30rpx;
				display: inline-block;
				min-width: 35%;
				max-width: 65%;
				margin-right: 35rpx;
				margin-top: 20rpx;
				word-wrap: break-word;
				padding: 15rpx;
				border-radius: 15rpx 0 15rpx 15rpx;
			}
			
			
		}
		.time{
			font-size: 20rpx;
			font-weight: normal;
			color: #aaa;
			margin: 0 10rpx;
		}
	}
</style>
