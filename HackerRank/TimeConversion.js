function timeConversion(s) {
  let result = "";
  if (s[8] == "P" || s[8] == "p") {
    let time = +s.slice(0, 2) + 12;
    result = s.replace(s.slice(0, 2), time).slice(0, 8);
    if (result.slice(0, 2) >= 24) {
      time = "0" + (+result.slice(0, 2) - 24);
      result = s.replace(s.slice(0, 2), time).slice(0, 8);
    }
  } else if (s[8] == "A" || s[8] == "a") {
    result = s.slice(0, 8);
    if (result.slice(0, 2) >= 12) {
      time = "0" + (+result.slice(0, 2) - 12);
      result = s.replace(s.slice(0, 2), time).slice(0, 8);
    }
  }
  return result;
}
lol = timeConversion("12:45:55PM");
console.log(lol);

function beautifulDays(i, j, k) {
  let result = 0;
  let arr = [];
  for (let index = i; index < j; index++) {
    arr.push(index);
    let splitted = "";
    for (let ind = i.lenght; ind >= 0; ind--) {
      console.log(index);
      splitted = splitted + index[i - 1];
    }
    console.log(splitted);
  }
  return arr;
}
console.log(beautifulDays(10, 12, 4));
