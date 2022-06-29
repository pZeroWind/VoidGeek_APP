<template>
	<view>
		<view @click="toPage(it.pid)" class="page_list" v-for="(it,i) in Pages" :key="i">
			<image v-if="it.post!=null&&it.post!='null'&&it.post!=''&&it.post!=undefined" :src="it.post">
			</image>
			<view>
				<text class="page_title">{{it.pageData.title}}</text>
				
				<text class="page_content" v-html="it.pageData.content"></text>
				<view class="page_data">
					<view>
						<image class="icon_small" src="../../../static/icon/thumbupline.svg">{{it.pageData.likeNum}}
					</view>
					<view>
						<image class="icon_small" src="../../../static/icon/eyeline.svg">{{it.pageData.readNum}}
					</view>
					<view class="page_time" style="flex-flow: column;width: 150px;padding: 2.5px;">
						<view>浏览时间：{{it.time}}</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		getHistory
	} from "../../../JS/UserAPI.js"
	import {
		changeDate
	} from "../../../JS/Time.js"
	export default {
		data() {
			return {
				Pages:[]
			}
		},
		onLoad() {
			getHistory({
				out:res=>{
					res = res.filter(i=>i.pageData!=null)
					res.forEach(i=>{
						i.pageData.content = i.pageData.content.replace(/<[^>]+>/g, "")
						i.pageData.time = changeDate(i.pageData.time)
						i.time = changeDate(i.time)
					})
					this.Pages = res
				}
			})
		},
		methods: {
			toPage(pid) {
				uni.navigateTo({
					url: "../indexPages/pageData?pid="+pid
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
</style>
