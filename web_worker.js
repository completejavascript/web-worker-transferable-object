self.onmessage = function(event) {
  handleMessage(event);
}

function handleMessage(event) {
  console.log('[Worker]', 'Worker Thread receives command: ', event.data.cmd);
  if(event.data.cmd == 'start') {
    console.log('[Worker]', 'Length of Array Buffer 1:', event.data.buf1.byteLength);
    console.log('[Worker]', 'Length of Array Buffer 2:', event.data.buf2.byteLength);
  }
}
