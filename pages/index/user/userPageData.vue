<template>
	<view>
		<view>
			<view class="page_list" v-for="(it,i) in Pages" :key="i">
				<image @click="toPage(it.pid)" v-if="it.post!=null&&it.post!='null'&&it.post!=''&&it.post!=undefined" :src="it.post">
				</image>
				<view>
					<text @click="toPage(it.pid)" class="page_title">{{it.title}}</text>
					<text @click="toPage(it.pid)" class="page_content" v-html="it.content"></text>
					<view class="page_data">
						<view>
							<image class="icon_small" src="../../../static/icon/thumbupline.svg">{{it.likeNum}}
						</view>
						<view>
							<image class="icon_small" src="../../../static/icon/eyeline.svg">{{it.readNum}}
						</view>
						<view style="position: absolute;right: -10px;">
							<image @click="deletePage(it.pid)" class="icon_small" src="../../../static/icon/delete-bin-line.svg"></image>
						</view>
						<view class="page_time" style="flex-flow: column;width: 150px;padding: 2.5px;">
							<view>{{it.time}}</view>
						</view>
						<view v-if="it.pass" class="border" style="border: 1px solid green;color: green;">已过审</view>
						<view v-else class="border" style="border: 1px solid red;color: red;">未过审</view>
					</view>
				</view>
			</view>
		</view>
		<u-loadmore :status="status" />
		<u-empty mode="list" :show="Pages.length==0"></u-empty>
	</view>
</template>

<script>
	import {
		getPageList,
		deletePage
	} from "../../../JS/PageAPI.js"
	import {
		changeDate
	} from "../../../JS/Time.js"
	export default {
		data() {
			return {
				Pages:[],
				page:0,
				limt:1,
				status:"loadmore"
			}
		},
		onLoad() {
			this.load()
		},
		onReachBottom() {
			this.load()
		},
		methods: {
			toPage(pid) {
				uni.navigateTo({
					url: "../indexPages/pageData?pid="+pid
				})
			},
			deletePage(id){
				console.log(id)
				uni.showModal({
					title:"是否确认删除？",
					success(res) {
						if(res.confirm){
							uni.showLoading()
							deletePage({
								pid:id,
								out:res=>{
									if(res){
										this.Pages = this.Pages.filter(i=>{
											return i.pid != pid
										})
										uni.hideLoading()
									}
								}
							})
						}
					}
				})
				
			},
			load(){
				uni.getStorage({
					key:"userData",
					success:d=>{
						if(this.page > this.limt){
							this.status="nomore"
							return
						}
						console.log(d)
						this.status = "loading"
						this.page++
						getPageList({
							data:{
								vid:d.data.vid,
								passMode:3,
								page:this.page,
								size:10,
								mode:3
							},
							out:(res,limt)=>{
								console.log(res)
								res.forEach(i=>{
									i.content = i.content.replace(/<[^>]+>/g, "")
									i.time = changeDate(i.time)
								})
								this.limt = limt
								this.Pages.push(...res)
								if(res.length<10){
									this.status="nomore"
								}else{
									this.status = "loadmore"
								}
							}
						})
					}
				})
			}
		}
	}
</script>

<style scoped lang="scss">
	.page_time{
		view{
			font-size: 12px;
			margin: 0;
			width: 100%;
			justify-content: flex-end;
		}
	}
	.border{
		border-radius: 5px;
		display: flex;
		justify-content: center;
		font-weight: bold;
	}
</style>
