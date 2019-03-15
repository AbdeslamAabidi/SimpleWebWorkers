var j = 1000;

function timedCount() {
  j = j - 1;
  postMessage(j);
  setTimeout("timedCount()",500);
}

timedCount();
