var j = 1000;

function worker_2() {
  j = j - 1;
  postMessage(j);
  setTimeout("worker_2()",250);
}

worker_2();
