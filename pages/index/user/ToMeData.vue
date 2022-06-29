<template>
	<view>
		<u-row style="background-color: #000;" justify="space-between" gutter="10">
			<u-col span="4">
				<view class="th">打赏者</view>
			</u-col>
			<u-col span="4">
				<view class="th">硬币数</view>
			</u-col>
			<u-col span="4">
				<view class="th">时间</view>
			</u-col>
		</u-row>
		<u-row v-show="list.length!=0" class="trs" :class="{trs_d:index%2==0}" v-for="(item,index) in list" :key="index" justify="space-between" gutter="10">
			<u-col span="4">
				<view class="tr">{{item.userData.userName}}</view>
			</u-col>
			<u-col span="4">
				<view class="tr">{{item.coin}}</view>
			</u-col>
			<u-col span="4">
				<view class="tr">{{item.time}}</view>
			</u-col>
		</u-row>
		<u-loadmore @loadmore="load" :status="status"></u-loadmore>
	</view>
</template>

<script>
	import {
		getCoinToMe
	} from "../../../JS/pay.js"
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
				getCoinToMe({
					page:this.page,
					out:(res,limt)=>{
						res.forEach(i=>{
							i.time = changeDate(i.time)
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
