if (typeof process === 'undefined') process = {};
process.nextTick = setImmediate;

module.exports = process;
