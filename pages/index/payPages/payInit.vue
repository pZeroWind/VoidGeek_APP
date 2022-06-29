<template>
	<view>
		<view>正在打开支付宝APP...</view>
	</view>
</template>

<script>
	import {
		getPayUrl
	} from "../../../JS/pay.js"
	export default {
		data() {
			return {
				back:false
			}
		},
		onLoad(op) {
			uni.getStorage({
				key:"userData",
				success:d=>{
					getPayUrl({
						data:{
							vid:d.data.vid,
							userName:d.data.vid,
							totalAmout:op.money
						},
						out:res=>{
							plus.runtime.openURL(res)
						}
					})
				}
			})
		},
		onShow() {
			if(this.back){
				uni.navigateBack()
			}else{
				this.back = true
			}
		}
	}
</script>

<style lang="scss">

</style>
