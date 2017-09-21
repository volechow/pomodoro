/**
* Filename: 	 main.js
* Description: Application logic for pomodoro timer.
* @version 	   1.0
*
* @author 		 Victor Olechow
* E-Mail: 		 victor.olechow@haw-hamburg.de
* Website: 	   http://users.informatik.haw-hamburg.de/~ace554/
*
* Copyright (C) 2017, Victor Olechow
* All rights reserved.
*/

/**
* Toggle status between break and pomodoro session.
*/
function toggleStatus() {
  var status = $("#status").text();
  status == "break" ? restart("session") : restart("break");
}

/**
* Counts down one second and updates timer screen accordingly.
*/
function countdown() {
  // get current minutes and seconds
  var time = $("#time").text().split(":")
  minutes = parseInt(time[0]);
  seconds = parseInt(time[1]);
  if (minutes == 0 && seconds == 0) {
    toggleStatus();
  } else if (seconds == 0) {
    $("#time").text((minutes-1)+":"+59);
  } else {
    $("#time").text(minutes+":"+(seconds-1));
  }
}

/**
* Counts down one second and updates timer screen accordingly.
* @param {String} display - name of display to be updated
* @param {Number} value - increment value for value on session/break duration
*/
function updateDuration(display, value) {
    var num = parseInt(display.text());
    if (num+value > 0) {
      display.text(num + value);
    }
}

/**
* Restarts the timer with the next status.
* @param {String} status - current status; either session or break
*/
function restart(status) {
  $("#status").text(status);
  var start = parseInt($("#"+status).text());
  console.log(status);
  $("#time").text(start + ":00");
}

$(document).ready(function() {

  var timer;
  var isRunning = false;
  restart("session");

  // Duration screens updating handlers
  $("#plus-break").click(function() {
    updateDuration($("#break"), 1);
  });
  $("#minus-break").click(function() {
    updateDuration($("#break"), -1);
  });
  $("#plus-session").click(function() {
    updateDuration($("#session"), 1);
  });
  $("#minus-session").click(function() {
    updateDuration($("#session"), -1);
  });

  // Timer controller handlers
  $("#start").click(function() {
    if (!isRunning) {
      timer = setInterval(countdown, 1000);
      isRunning = true;
    }
  });
  $("#pause, #restart").click(function() {
    clearInterval(timer);
    isRunning = false;
  });
  $("#restart").click(function() {
    restart($("#status").text());
  })
});
