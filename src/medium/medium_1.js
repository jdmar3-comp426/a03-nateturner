import {variance} from "./data/stats_helpers.js";
import {maxAndMin} from "../mild/mild_1.js"

/**
 * Gets the sum of an array of numbers.
 * @param array
 * @returns {*}
 * see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array
 * prototype functions. Very useful
 */
export function getSum(array) {
    var n = 0;
    for (let i = 0; i < array.length; i++){
        n+=array[i];
    }
    return n
}


/**
 * Calculates the median of an array of numbers.
 * @param {number[]} array
 * @returns {number|*}
 *
 * example:
 * let array = [3,2,5,6,2,7,4,2,7,5];
 * console.log(getMedian(array)); // 4.5
 */
export function getMedian(array) {
    array.sort()
    const mid = Math.floor(array.length/2);
    if (array.length%2==0){
        return (array[mid-1]+array[mid])/2;
    }
    return array[mid];
}

/**
 * Calculates statistics (see below) on an array of numbers.
 * Look at the stats_helper.js file. It does variance which is used to calculate std deviation.
 * @param {number[]} array
 * @returns {{min: *, median: *, max: *, variance: *, mean: *, length: *, sum: *, standard_deviation: *}}
 *
 * example:
 * getStatistics([3,2,4,5,5,5,2,6,7])
 * {
  length: 9,
  sum: 39,
  mean: 4.333333333333333,
  median: 5,
  min: 2,
  max: 7,
  variance: 2.6666666666666665,
  standard_deviation: 1.632993161855452
 }
 */
export function getStatistics(array) {
    let max_min = maxAndMin(array);
    let s = getSum(array);
    let ave = sum/array.length;
    var vari = variance(array, ave);
    var std_dev = Math.sqrt(vari);
    var med = getMedian(array);
    var dict = {length: array.length, sum: s, mean: ave,  median: med, min: max_min["min"], max: max_min["max"], variance: vari, standard_deviation: std_dev};
    return dict;
}

