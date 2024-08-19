export function score(rank){
  // var top10Score = 250/(Math.log(3 * rank + 10) / Math.log(13));
  // var top11_50Score = (Math.sin(0.08 * (rank + 8.905))*70) + 100;
  // var top51_75Score = 1.83 + (1/(0.0036*(rank-41)))

  // if(rank => 1){ //rank has to be above 1
  //   if(rank < 11)//if rank is 10 or above
  //   { 
  //     return round(top10Score);
  //   }
  //   else if(rank > 10 & rank < 51)//if rank is between 11 and 50
  //   { 
  //     return round(top11_50Score)
  //   }
  //   else if(rank > 50 && rank < 76)//if rank is between 51 and 75
  //   { 
  //     return round(top51_75Score);
  //   }
  //   else //return 0 if rank goes beyond 75 (it counts as legacy)
  //   {
  //     return 0;
  //   }
  // }

  //var top10Score = 149.61*(1.137^(1-rank))+100.39;
  //var top11_35Score = 166.611*(1.0099685^(17-rank))-31.152;
  //var top36_55Score = 212.61*(1.036^(14-rank))+6.071;
  //var top56_75Score = 56.191*(2^((78.147-(rank+3.2))((Math.log(50)/99))))-41.10949;
  if (rank >= 1){
    if(rank < 11){
      return round(149.61*(1.137**(1-rank)) + 100.39);
    }
    else if(rank > 10 & rank <= 35){
      return round(166.611*(1.0099685**(17-rank)) - 31.152);
    }
    else if (rank > 35 & rank <= 55){
      return round(212.61*(1.036**(14-rank)) + 6.071);
    }
    else if (rank > 55 & rank <= 75){
      return round(56.191*(2**((78.147 - (rank + 3.2))*(Math.log(50)/99)))-41.10949);
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
