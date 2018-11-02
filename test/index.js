import Util from './Util.js';

console.log(Util.add(1, 3));
console.log('done');
setTimeout(async () => {
    const name = await import('./async.js');
    console.log(name.name);
}, 1000);