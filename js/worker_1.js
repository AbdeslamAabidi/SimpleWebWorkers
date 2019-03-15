var i = 0;

function worker_1() {
  i = i + 1;
  postMessage(i);
  setTimeout("worker_1()",250);
}

worker_1();
