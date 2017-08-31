function startTimer() {

  var time = $("#time").text().split(":")
  minutes = parseInt(time[0])
  seconds = parseInt(time[1]);

  if (minutes == 0 && seconds == 0) {
    var status = $("#status").text();
    status == "break" ? restart("session") : restart("break");
  } else if (seconds == 0) {
    $("#time").text((minutes-1)+":"+59);
  } else {
    $("#time").text(minutes+":"+(seconds-1));
  }
}

function updateDuration(display, value) {
    var num = Number(display.text());
    if (num+value >= 0) {
      display.text(num + value);
    }
}

function restart(status) {
  var start;
  $("#status").text(status);
  if (status == "break") {
    start = Number($("#break").text())
  } else {
    start = Number($("#session").text())
  }
  $("#time").text(start + ":00");
}

$(document).ready(function() {
  
  var timer;
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
    timer = setInterval(startTimer, 1000);
    startTimer();
  });

  $("#pause").click(function() {
    clearInterval(timer);
  });

  $("#restart").click(function() {
    var status = $("#status").text();
    status == "break" ? restart("session") : restart("break");
  })

});