<template>
	<view>
		<view class="content">
			<view>
				<u--textarea class="contents" placeholder="请输入反馈内容" count maxlength="500" v-model="content"></u--textarea>
			</view>
			<view class="btn" @click="False">提交反馈</view>
		</view>
	</view>
</template>

<script>
	import {
		ToReturn
	} from "../../../JS/PublicApi.js"
	import {
		getMe
	} from "../../../JS/UserAPI.js"
	export default {
		data() {
			return {
				userData:{},
				content:""
			}
		},
		onLoad(op) {
			getMe({out:res=>{this.userData = res}})
		},
		methods: {
			False(){
				uni.getStorage({
					key:"userData",
					success: (res) => {
						ToReturn({
							data:{
								vid:this.userData.vid,
								content:this.content
							},
							out:res=>{
								if(res){
									uni.showToast({
										title:"反馈成功",
										position:"bottom",
										icon:"none"
									})
									setTimeout(()=>{
										uni.navigateBack()
									},500)
								}
							}
						})
					},
					fail() {
						uni.showToast({
							title:"请先进行登录",
							position:"bottom",
							icon:"none"
						})
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
