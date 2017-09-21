function changeStatus(status) {
  var status = $("#status").text();
  status == "break" ? restart("session") : restart("break");
}

function countdown() {
  // get current minutes and seconds
  var time = $("#time").text().split(":")
  minutes = parseInt(time[0]);
  seconds = parseInt(time[1]);


  if (minutes == 0 && seconds == 0) {
    changeStatus();
  } else if (seconds == 0) {
    $("#time").text((minutes-1)+":"+59);
  } else {
    $("#time").text(minutes+":"+(seconds-1));
  }
}

function updateDuration(display, value) {
    var num = parseInt(display.text());
    if (num+value > 0) {
      display.text(num + value);
    }
}

function restart(status) {
  $("#status").text(status);
  var start = parseInt($("#"+status).text());
  console.log(status);
  $("#time").text(start + ":00");
}

$(document).ready(function() {

  var timer;
  var completed_pomodoros = 0;
  var isRunning = false;
  restart("session");

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

  $("#start").click(function() {
    if (!isRunning) {
      timer = setInterval(countdown, 1000);
      isRunning = true;
    }
  });

  $("#pause").click(function() {
    clearInterval(timer);
    isRunning = false;
  });

  $("#restart").click(function() {
    restart($("#status").text());
  })

});
