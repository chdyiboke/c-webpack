module.exports = function (source) {  
  console.log('normal excution is working');   
  return source;
}

// loader上的pitch方法，非必须
module.exports.pitch =  function() { 
  console.log('pitching graph');
  // todo
}