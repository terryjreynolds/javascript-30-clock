/*----------------------Set the initial time-----------------*/
//set the current time on the clock- IIFE so its done upon load
(function setCurrentTime() {
  const time = (() => {
    return convertTimeToDegrees(new Date());
  })();
  setClockTime(time);
  startClock();
})();

//this function builds the time object
function convertTimeToDegrees(timeNow) {
  let timeObject = {
    sec: timeNow.getSeconds() * 6 + 90,
    min: timeNow.getMinutes() * 6 + 90,
    hour: timeNow.getHours() * 30 + 90,
    actualmin: timeNow.getMinutes(),
    actualhour: timeNow.getHours()
  };
  return timeObject;
}
//manipulates the DOM only. Sets the intial setting for the clock hands
function setClockTime(time) {
  const seconds = time.actualmin * 60 * 0.00833 + time.hour;
  const degrees = seconds * 0.00833 + time.hour;
  document.querySelector("#hour").style.transform = `rotate(${degrees}deg)`;
  document.querySelector("#min").style.transform = `rotate(${time.min}deg)`;
  document.querySelector("#sec").style.transform = `rotate(${time.sec}deg)`;
}

/*------------------------------------------------------------------*/

/*-------------------functions to move hands------------- */

//this grabs the transform value, isolates the number and returns it
function currentRotationValue(el) {
  return Number(
    document.getElementById(el).style.transform.match(/\d+\.\d+|\d+/g)
  );
}

//with each passing second, this function rotates the min hand 0.1 degrees, the hour hand 0.00833 and the second hand 6 degrees
function startClock() {
  setInterval(() => {
    document.querySelector(
      "#sec"
    ).style.transform = `rotate(${currentRotationValue("sec") + 6}deg)`;
    document.querySelector(
      "#min"
    ).style.transform = `rotate(${currentRotationValue("min") + 0.1}deg)`;
    document.querySelector(
      "#hour"
    ).style.transform = `rotate(${currentRotationValue("hour") + 0.00833}deg)`;
  }, 1000);
}


