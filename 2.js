function StrUtil(arr){
  const answers = [];
  // 1. Imporve readability : O(n) + O(n)
  // arr.forEach(targetStr => {
  //     const targetStr_ = targetStr.trim().replace(/\s+/g, ' ');
  //     if(targetStr_){
  //       var answer = '';
  //       targetStr_.split(' ').forEach(word => {
  //           answer += word[0].toUpperCase() + word.slice(1, word.length) + ' '
  //       })
  //       answers.push(answer.slice(0, answer.length - 1));
  //     }
  // })
  
  // 2. Imporve efficiency : O(n)
  arr.forEach(targetStr => {
    var word = '';
    // When detect charactor, readyForWrite will be true. And then read word.
    var readyForWrite = false;
    const targetStr_ = targetStr.trim();
    // When targetStr is blank, it will be ignored. And trim method can reduce unnecessary repetition. 
    if (targetStr_) {
      for (var chr of targetStr_) {
        if (chr !== ' ') {
          // First charator of word may not be string type. 
          // That case can be solved through /^[A-Za-z]$/.test(chr). 
          // But there is not mention about this situation, I didn't deal with it.
          if (readyForWrite === false) { // Start of word.
            readyForWrite = true;
            word += chr.toUpperCase();
          }
          else word += chr;
        } else if (chr === ' ' && readyForWrite === true) { // End of word.
          word += ' '
          readyForWrite = false;
        }
      }
      answers.push(word.trimRight());
    }
  })
  answers.sort();
  console.log(answers)
}

StrUtil(['  nice', 'hey there     ', '   woah       man '])