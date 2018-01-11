var myWorker;

function initWorker() {
  if(typeof(Worker) != 'undefined') {
    if(typeof(myWorker) == 'undefined') {
      myWorker = new Worker('web_worker.js');
      console.log('[Main]', 'Init Web Worker');
      myWorker.onmessage = function(event) {
        handleMessage(event);
      }
      myWorker.onerror = function(event) {
        console.log('[Main]', 'Error', event.message, event);
      }
    }
  } else {
    console.log("[Main]", "The browser doesn't support web worker");
  }
}

function handleMessage(event) {
  console.log('[Main]', 'Main Thread receives command: ', event.data.cmd, event.data.msg);
  if(event.data.cmd == 'stop') {
    console.log('[Main]', 'Web Worker is already stopped');
  }
}

function startWorker() {
  if(typeof(myWorker) != 'undefined') {
    var arrBuf1 = new ArrayBuffer(1000);
    var arrBuf2 = new ArrayBuffer(100000);

    console.log('[Main]', 'Before Transfering:');
    console.log('[Main]', 'Length of Array Buffer 1:', arrBuf1.byteLength);
    console.log('[Main]', 'Length of Array Buffer 2:', arrBuf2.byteLength);

    myWorker.postMessage({cmd : 'start', buf1 : arrBuf1, buf2 : arrBuf2}, [arrBuf1, arrBuf2]);

    console.log('[Main]', 'After Transfering:');
    console.log('[Main]', 'Length of Array Buffer 1:', arrBuf1.byteLength);
    console.log('[Main]', 'Length of Array Buffer 2:', arrBuf2.byteLength);
  } else {
    console.log('[Main]', 'Worker is undefined.');
  }
}

function stopWorker() {
  if(typeof(myWorker) != 'undefined') {
    myWorker.terminate();
    myWorker = undefined;
    console.log('[Main]', 'Worker terminated.');  
  } else {
    console.log('[Main]', 'Worker is undefined.');
  }
}
