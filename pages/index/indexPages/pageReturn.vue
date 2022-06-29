<template>
	<view>
		<view class="content">
			<view class="title">
				<view>被举报文章标题：</view>
				<view class="title_inner">{{data.title}}</view>
			</view>
			<view>
				<u--textarea class="contents" placeholder="请输入具体原因" count maxlength="500" v-model="content"></u--textarea>
			</view>
			<view class="btn" @click="False">提交举报</view>
		</view>
	</view>
</template>

<script>
	import {
		TsumiPage
	} from "../../../JS/PageAPI.js"
	import {
		getMe
	} from "../../../JS/UserAPI.js"
	export default {
		data() {
			return {
				data:{
					pid:0,
					title:""
				},
				userData:{},
				content:""
			}
		},
		onLoad(op) {
			this.data.pid = op.pid
			this.data.title = op.title
			getMe({out:res=>{this.userData = res}})
		},
		methods: {
			False(){
				TsumiPage({
					data:{
						pid:this.data.pid,
						content:this.content
					},
					out:res=>{
						if(res){
							uni.showToast({
								title:"举报成功"
							})
							setTimeout(()=>{
								uni.navigateBack()
							},500)
						}
					}
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.title{
		font-size: 16px;
		font-weight: bold;
		padding: 5px;
		margin: 5px;
		border: 2px solid #eee;
		border-radius: 5px;
		.title_inner{
			font-size: 14px;
			font-weight: normal;
		}
	}
	
	.contents{
		padding: 5px;
		margin: 5px;
		border: 2px solid #eee;
		border-radius: 5px;
		height: 700rpx;
	}
	
	.btn{
		padding: 5px;
		margin: 5px;
		background-color: #000;
		border-radius: 5px;
		color: #fff;
		font-weight: bold;
		text-align: center;
		transition: all 100ms;
	}
	.btn:active{
		background-color: #aaa;
	}
</style>
