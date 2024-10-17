export function score(rank){
  // var top10Score = 250/(Math.log(3 * rank + 10) / Math.log(13));
  // var top11_50Score = (Math.sin(0.08 * (rank + 8.905))*70) + 100;
  // var top51_75Score = 1.83 + (1/(0.0036*(rank-41)))

  //var top10Score = 149.61*(1.137^(1-rank))+100.39;
  //var top11_35Score = 166.611*(1.0099685^(17-rank))-31.152;
  //var top36_55Score = 212.61*(1.036^(14-rank))+6.071;
  //var top56_75Score = 56.191*(2^((78.147-(rank+3.2))((Math.log(50)/99))))-41.10949;
  if (rank >= 1){
    if(rank < 11){
      return round(149.61 * (1.137**(1 - rank)) + 100.39);
    }
    else if(rank > 10 & rank <= 35){
      return round(166.611 * (1.0099685**(17 - rank)) - 31.152);
    }
    else if (rank > 35 & rank <= 55){
      return round(212.61 * (1.036**(14 - rank)) + 6.071);
    }
    else if (rank > 55 & rank <= 75){
      return round(56.191 * (2**((78.147 - (rank + 3.2)) * (Math.log(50)/99))) - 41.10949);
    }
    else return 0;
}
}

const scale = 2; //Select how many decimal digits to round to

/** Returns a rounded number by decimal point, set by scale
 * @param {Number} num      Number to round
 * @param {Number} scale    Number of decimal points to round to
 * @returns {Number}        Rounded number
 */
export function round(num)
{
    return Math.round(num*(10**scale))/(10**scale);
}
