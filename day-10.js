const adapters1 = [  
  "99",
  "151",
  "61",
  "134",
  "112",
  "70",
  "75",
  "41",
  "119",
  "137",
  "158",
  "50",
  "167",
  "60",
  "116",
  "117",
  "62",
  "82",
  "31",
  "3",
  "72",
  "88",
  "165",
  "34",
  "8",
  "14",
  "27",
  "108",
  "166",
  "71",
  "51",
  "42",
  "135",
  "122",
  "140",
  "109",
  "1",
  "101",
  "2",
  "77",
  "85",
  "76",
  "143",
  "100",
  "127",
  "7",
  "107",
  "13",
  "148",
  "118",
  "56",
  "159",
  "133",
  "21",
  "154",
  "152",
  "130",
  "78",
  "54",
  "104",
  "160",
  "153",
  "95",
  "49",
  "19",
  "69",
  "142",
  "63",
  "11",
  "12",
  "29",
  "98",
  "84",
  "28",
  "17",
  "146",
  "161",
  "115",
  "4",
  "94",
  "24",
  "126",
  "136",
  "91",
  "57",
  "30",
  "155",
  "79",
  "66",
  "141",
  "48",
  "125",
  "162",
  "37",
  "40",
  "147",
  "18",
  "20",
  "45",
  "55",
  "83"
];

const adapters2 = [
  "28",
  "33",
  "18",
  "42",
  "31",
  "14",
  "46",
  "20",
  "48",
  "47",
  "24",
  "23",
  "49",
  "45",
  "19",
  "38",
  "39",
  "11",
  "1",
  "32",
  "25",
  "35",
  "8",
  "17",
  "7",
  "9",
  "4",
  "2",
  "34",
  "10",
  "3"
];

const adapters3 = [
  "16",
  "10",
  "15",
  "5",
  "1",
  "11",
  "7",
  "19",
  "6",
  "12",
  "4"
];

const adapters = adapters2.map(ad => parseInt(ad)).sort((a,b) => {
  return a > b ? 1 : a < b ? -1 : 0;
})

const result = adapters.reduce((acc, adapter) => {
  switch(adapter - acc.latest) {
    case 1:
      acc = {
        ...acc,
        latest: adapter,
        diff_one: acc.diff_one + 1
      };
      break;
    case 2:
      acc = {
        ...acc,
        latest: adapter,
        diff_two: acc.diff_two + 1
      };
      break;
    case 3:
      acc = {
        ...acc,
        latest: adapter,
        diff_three: acc.diff_three + 1
      };
      break;
  }
  return acc;
}, {
  latest: 0,
  diff_one: 0,
  diff_two: 0,
  diff_three: 0
})

result.diff_three = result.diff_three + 1


console.log('first', result, result.diff_one * result.diff_three, adapters.length)

const getRecursive = (key, array) => {
  // console.log('recursive', key, array)
  return array.reduce((acc, value, index) => {
    if(value - key === 1) {
      acc[value] = getRecursive(value, array.slice(index))
    }
    if(value - key === 2) {
      acc[value] = getRecursive(value, array.slice(index))
    }
    if(value - key === 3) {
      acc[value] = getRecursive(value, array.slice(index))
    }
    return acc;
  }, {})
}

const getBranches = (startKey, array) => {

  return {
    [startKey]: getRecursive(startKey, array)
  }

}

const tree = getBranches(0, adapters)

const countVariations = tree => {
  // if(Object.keys(tree).length === 0) {
  //   return 1;
  // }
  let count = 0;
  Object.keys(tree).map(branch => {
    if(Object.keys(tree[branch]).length === 0) {
      count = count + 1;
    }
    else {
      count = count + countVariations(tree[branch]);
    }
  });

  return count;
}

console.log('second', countVariations(tree))
