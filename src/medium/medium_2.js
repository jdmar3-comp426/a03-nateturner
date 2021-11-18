import mpg_data from "./data/mpg_data.js";
import {getStatistics} from "./medium_1.js";
import {getSum} from "./medium_1.js";

/*
This section can be done by using the array prototype functions.
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array
see under the methods section
*/


/**
 * This object contains data that has to do with every car in the `mpg_data` object.
 *
 *
 * @param {allCarStats.avgMpg} Average miles per gallon on the highway and in the city. keys `city` and `highway`
 *
 * @param {allCarStats.allYearStats} The result of calling `getStatistics` from medium_1.js on
 * the years the cars were made.
 *
 * @param {allCarStats.ratioHybrids} ratio of cars that are hybrids
 */

export const allCarStats = {
    avgMpg: {city: mpg_data.flatMap(x=>x["city_mpg"]).reduce((previousValue, currentValue)=>previousValue+currentValue)/mpg_data.length, highway: mpg_data.flatMap(x=>x["highway_mpg"]).reduce((previousValue, currentValue) => previousValue+currentValue)/mpg_data.length},
    allYearStats: getStatistics(mpg_data.flatMap(x=>x["year"])),
    ratioHybrids: mpg_data.flatMap(x=>x["hybrid"]).filter(x=>x==true).length/mpg_data.length,
};


/**
 * HINT: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce
 *
 * @param {moreStats.makerHybrids} Array of objects where keys are the `make` of the car and
 * a list of `hybrids` available (their `id` string). Don't show car makes with 0 hybrids. Sort by the number of hybrids
 * in descending order.
 *
 *[{
 *     "make": "Buick",
 *     "hybrids": [
 *       "2012 Buick Lacrosse Convenience Group",
 *       "2012 Buick Lacrosse Leather Group",
 *       "2012 Buick Lacrosse Premium I Group",
 *       "2012 Buick Lacrosse"
 *     ]
 *   },
 *{
 *     "make": "BMW",
 *     "hybrids": [
 *       "2011 BMW ActiveHybrid 750i Sedan",
 *       "2011 BMW ActiveHybrid 750Li Sedan"
 *     ]
 *}]
 *
 *
 * 
 *
 *
 * @param {moreStats.avgMpgByYearAndHybrid} Object where keys are years and each year
 * an object with keys for `hybrid` and `notHybrid`. The hybrid and notHybrid
 * should be an object with keys for `highway` and `city` average mpg.
 *
 * Only years in the data should be keys.
 *
 * {
 *     2020: {
 *         hybrid: {
 *             city: average city mpg,
 *             highway: average highway mpg
 *         },
 *         notHybrid: {
 *             city: average city mpg,
 *             highway: average highway mpg
 *         }
 *     },
 *     2021: {
 *         hybrid: {
 *             city: average city mpg,
 *             highway: average highway mpg
 *         },
 *         notHybrid: {
 *             city: average city mpg,
 *             highway: average highway mpg
 *         }
 *     },
 *
 * }
 */
// flatMap(x => x["id"]).filter(x=>)
//
function getMakerHybrids(){
    const m = new Set(mpg_data.flatMap(x => x["make"]));
    const l = [...m];
    const r = [];
    for(var i = 0; i < l.length; i++){
        let hybrids = mpg_data.filter(x=>x["hybrid"]==true).filter(x=>x["make"]==l[i]).flatMap(x => x["id"]);
        if(hybrids.length>0){
            var dict = {};
            dict["make"] = l[i];
            dict["hybrids"] = hybrids;
            r.push(dict);
        }
    }
    return r;
}

function getAvgByYandH(){
    const m = new Set(mpg_data.flatMap(x => x["year"]));
    const l = [...m];
    const r = {};
    for(var i = 0; i < l.length; i++){
        var diff = {};
        let hybrids_city = mpg_data.filter(x=>x["hybrid"]==true).filter(x=>x["year"]==l[i]).flatMap(x=>x["city_mpg"]);
        var h_c_m = hybrids_city.reduce((previousValue,currentValue)=>previousValue+currentValue)/hybrids_city.length;
        let hybrids_highway = mpg_data.filter(x=>x["hybrid"]==true).filter(x=>x["year"]==l[i]).flatMap(x=>x["highway_mpg"]);
        var h_h_m = hybrids_highway.reduce((previousValue,currentValue)=>previousValue+currentValue)/hybrids_highway.length;
        let non_hybrids_city = mpg_data.filter(x=>x["hybrid"]==false).filter(x=>x["year"]==l[i]).flatMap(x=>x["city_mpg"]);
        var n_h_c_m = non_hybrids_city.reduce((previousValue,currentValue)=>previousValue+currentValue)/non_hybrids_city.length;
        let non_hybrids_highway = mpg_data.filter(x=>x["hybrid"]==false).filter(x=>x["year"]==l[i]).flatMap(x=>x["highway_mpg"]);
        var n_h_h_m = non_hybrids_highway.reduce((previousValue,currentValue)=>previousValue+currentValue)/non_hybrids_highway.length;
        diff["hybrid"] = {"city": h_c_m, "highway": h_h_m};
        diff["notHybrid"] = {"city": n_h_c_m, "highway": n_h_h_m};
        r[l[i]] = diff;
    }
    return r;
}
export const moreStats = {
    makerHybrids: getMakerHybrids(),
    avgMpgByYearAndHybrid: getAvgByYandH()
};
