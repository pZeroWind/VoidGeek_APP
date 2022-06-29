<template>
	<view>
		<view class="big_box">
			<u-row customStyle="margin-bottom: 5px;justify-content: space-between;">
				<u-col class="box" span="3" @click="setCoin(5)">
					<view>500币</view>
					<view class="box_min">5元</view>
				</u-col>
				<u-col class="box" span="3" @click="setCoin(10)">
					<view >1000币</view>
					<view class="box_min">10元</view>
				</u-col>
				<u-col class="box" span="3" @click="setCoin(25)">
					<view>2500币</view>
					<view class="box_min">25元</view>
				</u-col>
			</u-row>
			<u-row customStyle="margin-bottom: 5px;justify-content: space-between;">
				<u-col class="box" span="3" @click="setCoin(50)">
					<view>5000币</view>
					<view class="box_min">50元</view>
				</u-col>
				<u-col class="box" span="3" @click="setCoin(150)">
					<view>15000币</view>
					<view class="box_min">150元</view>
				</u-col>
				<u-col class="box" span="3" @click="setCoin(200)">
					<view>20000币</view>
					<view class="box_min">200元</view>
				</u-col>
			</u-row>
			<view class="inp">
				<text>金额：</text>
				<input type="number" v-model="coin"/>
			</view>
		</view>
		<view class="btn" @click="inUrl">
			确认充值
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				coin:0
			};
		},
		methods:{
			setCoin(i){
				this.coin = i
			},
			inUrl(){
				uni.redirectTo({
					url:"./payInit?money="+this.coin
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.big_box{
		display: flex;
		flex-flow: column;
		justify-content: center;
		margin: 5px;
		margin-top: 10px;
		padding: 5px;
		border: 2px solid #eee;
		border-radius: 5px;
		view{
			text-align: center;
		}
		.box{
			padding: 5px 10px;
			text-align: center;
			font-weight: bold;
			font-size: 18px;
			border: 1px solid #eee;
			border-radius: 5px;
			margin: 2.5px;
			background-color: #333;
			color: gold;
			transition: all 100ms;
		}
		.box:active{
			background-color: #aaa;
			
		}
		.box_min{
			text-align: center;
			font-weight: bold;
			font-size: 12px;
			color: #aaa;
		}
	}
	.inp{
		display: flex;
		flex-flow: row nowrap;
		text{
			width: 100px;
			font-weight: bold;
		}
		input{
			text-align: left;
			border-bottom: 1px solid #aaa;
			width: 100%;
		}
		
	}
	.btn{
		border: 1px solid #eee;
		background-color: #333;
		border-radius: 5px;
		color: #fff;
		font-weight: bold;
		padding: 5px;
		margin: 5px;
		text-align: center;
		transition: all 100ms;
	}
	.btn:active{
		background-color: #aaa;
	}
</style>
