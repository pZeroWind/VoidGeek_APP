<template>
	<view class="content">
		<view style="display: flex;justify-content: center;">
			<image src="../../../static/v_logo.png" mode="aspectFit"></image>
		</view>
		<u-cell>
			<view slot="title" class="title">当前版本</view>
			<view slot="value">{{vision}}</view>
		</u-cell>
		<u-cell>
			<view slot="title" class="title">联系电话</view>
			<view slot="value">18075566390</view>
		</u-cell>
		<u-cell>
			<view @click="toRet" slot="title" class="title">反馈</view>
		</u-cell>
		<u-cell>
			<view @click="check" slot="title" class="title">检查更新</view>
		</u-cell>
	</view>
</template>

<script>
	import {
		checkupdate,
		getUpdateUrl
	} from "../../../JS/PublicApi.js"
	export default {
		data() {
			return {
				vision:"1.1.0"
			}
		},
		methods: {
			toRet(){
				uni.navigateTo({
					url:"return"
				})
			},
			check(){
				checkupdate({
					vision:this.vision,
					out:res=>{
						if(res){
							uni.showToast({
								title:"有新版本，可前往更新",
								position:"bottom",
								icon:"none"
							})
							uni.request({
								url:""
							})
							getUpdateUrl({
								out:res=>{
									plus.runtime.openURL(res)
								}
							})
						}else{
							uni.showToast({
								title:"暂无新版本",
								position:"bottom",
								icon:"none"
							})
						}
					}
				})
			}
		}
	}
</script>

<style scoped lang="scss">
	image{
		height: 150px;
	}
	.title{
		font-weight: bold;
	}
</style>
