<template>
	<view>
		<view class="btn" @click="shows">我要提现</view>
		<u-row style="background-color: #000;" justify="space-between" gutter="10">
			<u-col span="4">
				<view class="th">提现金额</view>
			</u-col>
			<u-col span="4">
				<view class="th">提现时间</view>
			</u-col>
			<u-col span="4">
				<view class="th">完成时间</view>
			</u-col>
		</u-row>
		<u-row v-show="list.length!=0" class="trs" :class="{trs_d:index%2==0}" v-for="(item,index) in list" :key="index" justify="space-between" gutter="10">
			<u-col span="4">
				<view class="tr">{{item.money}}元</view>
			</u-col>
			<u-col span="4">
				<view class="tr">{{item.pleaseTime}}</view>
			</u-col>
			<u-col span="4">
				<view class="tr">{{item.outTime}}</view>
			</u-col>
		</u-row>
		<u-loadmore @loadmore="load" :status="status"></u-loadmore>
		<u-popup closeable :show="show" @close="shows" mode="top">
			<view class="box" style="height: 300rpx;">
				<view>
					<view>现有硬币：<text>{{user.coin}}币</text></view>
					<view>相对金额：<text>{{user.coin*1.0/100}}元</text></view>
				</view>
				<view>
					<view >
						提现金额(元)：
						<input min="0" :max="user.coin*1.0/100" style="padding: 5px;border-bottom: 1px solid #000;" type="number" v-model="money" />
						<view @click="down" class="btn">确定</view>
					</view>
				</view>
				
			</view>
		</u-popup>
	</view>
</template>

<script>
	import {
		getPayPlase,
		downCoin
	} from "../../../JS/pay.js"
	import{
		getMe
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
				status:"loadmore",
				show:false,
				user:{
					coin:0
				},
				money:0
			}
		},
		onLoad() {
			this.load()
			getMe({
				out:res=>{
					this.user = res
				}
			})
		},
		onReachBottom() {
			this.load()
		},
		methods: {
			down(){
				uni.showLoading()
				downCoin({
					coin:parseInt(this.money*100),
					out:res=>{
						this.shows()
						uni.hideLoading()
						if(res){
							this.user.coin - this.money*100
							uni.showToast({
								title:"提交提现申请成功"
							})
						}
					}
				})
			},
			shows(){
				this.show = !this.show
				this.$forceUpdate()
			},
			load(){
				this.status = "loading"
				if(this.page > this.limt){
					this.status = "nomore"
					return
				}
				this.page++
				getPayPlase({
					page:this.page,
					out:(res,limt)=>{
						res.forEach(i=>{
							i.pleaseTime = changeDate(i.pleaseTime)
							if(i.outTime!=0){
								i.outTime = changeDate(i.outTime)
							}else{
								i.outTime = "暂未完成"
							}
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
	.box{
		padding: 10px;
		margin-top: 20px;
		font-weight: bold;
	}
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
	.btn{
		margin: 5px;
		text-align: center;
		padding: 5px;
		font-weight: bold;
		font-size: 14px;
		background-color: #000;
		color: #fff;
		border-radius: 10px;
		transition: all 100ms;
	}
	.btn:active{
		background-color: #aaa;
	}
</style>
