var onoff = require('onoff');

var Gpio = onoff.Gpio,
  led1 = new Gpio(16, 'out'),
  led2 = new Gpio(21, 'out'),
  sensor = new Gpio(4, 'in', 'both');

sensor.watch(function (err, value) {
  if (err) exit(err);
  if (value){ led1.write(1) }
  else { led1.write(0) }
  console.log(value ? "SOMEONE!" : "NO ONE!" );
});

process.on('SIGINT', function () {
  led1.writeSync(0); 
  led1.unexport();
  led2.writeSync(0);
  led2.unexport();
  console.log('Bye, bye!');
  process.exit();
});