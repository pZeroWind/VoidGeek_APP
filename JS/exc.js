export function GetLv(exc) {
	if(exc>=(1000+2000+4000+8000+16000+32000)){
		return 6
	}else if(exc>=(1000+2000+4000+8000+16000)){
		return 5
	}else if(exc>=(1000+2000+4000+8000)){
		return 4
	}else if(exc>=(1000+2000+4000)){
		return 3
	}else if(exc>=(1000+2000)){
		return 2
	}else if(exc>=(1000)){
		return 1
	}else{
		return 0
	}
}
export function GetPre(exc){
	let lv = GetLv(exc)
	let sum = 1000+2000+4000+8000+16000+32000
	switch(lv){
		case 6:
		return 100
		case 5:
		return (exc/(sum) * 100)
		case 4:
		return (exc/(sum-32000) * 100)
		case 3:
		return (exc/(sum-32000-16000) * 100)
		case 2:
		return (exc/(sum-32000-16000-8000) * 100)
		case 1:
		return (exc/(sum-32000-16000-8000-4000) * 100)
		case 0:
		return (exc/(sum-32000-16000-8000-4000-2000) * 100)
	}
}

export function GetColor(level){
	switch(level){
		case 0:
		return '#aaa'
		case 1:
		return '#aaa'
		break
		case 2:
		return '#0af'
		break
		case 3:
		return '#aa5'
		break
		case 4:
		return '#0a0'
		break
		case 5:
		return '#f50'
		break
		case 6:
		return '#f00'
		break
	}
}