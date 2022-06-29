<template>
	<view>
		<u-row style="background-color: #000;" justify="space-between" gutter="10">
			<u-col span="4">
				<view class="th">登录地址</view>
			</u-col>
			<u-col span="4">
				<view class="th">登录IP</view>
			</u-col>
			<u-col span="4">
				<view class="th">登录时间</view>
			</u-col>
		</u-row>
		<u-row class="trs" :class="{trs_d:index%2==0}" v-for="(item,index) in list" :key="index" justify="space-between" gutter="10">
			<u-col span="4">
				<view class="tr">{{item.address}}</view>
			</u-col>
			<u-col span="4">
				<view class="tr">{{item.loginIP}}</view>
			</u-col>
			<u-col span="4">
				<view class="tr">{{item.loginTime}}</view>
			</u-col>
		</u-row>
		<u-loadmore @loadmore="load" :status="status"></u-loadmore>
	</view>
</template>

<script>
	import {
		getloginData
	} from "../../../JS/UserAPI.js"
	import{
		changeDate
	} from "../../../JS/Time.js"
	export default {
		data() {
			return {
				page:0,
				limt:1,
				list:[],
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
			load(){
				this.status = "loading"
				if(this.page > this.limt){
					this.status = "nomore"
					return
				}
				this.page++
				getloginData({
					page:this.page,
					out:(res,limt)=>{
						res.forEach(i=>{
							i.loginTime = changeDate(i.loginTime)
						})
						this.limt = limt
						this.list.push(...res)
						this.status = "loadmore"
						if(res.length<10){
							this.status = "nomore"
						}
					}
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.th,.tr{
		padding: 10px;
		text-align: center;
		font-weight: bold;
		font-size: 12px;
	}
	.th{
		color: #fff;
	}
	.trs{
		background-color: #eee;
	}
	.trs_d{
		background-color: #aaa;
	}
</style>
