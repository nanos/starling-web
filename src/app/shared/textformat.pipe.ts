import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'formatStarlingText' })
export class formatStarlingText implements PipeTransform {
    transform(value: any) {
        if (value) {
        	let temp = value.split('_');
        	return temp.reduce(( acc, currentValue ) =>{
        		return acc + ' ' + currentValue.charAt(0).toUpperCase() + currentValue.slice(1).toLowerCase();
        	}, '');
        }
        return value;
    }
}