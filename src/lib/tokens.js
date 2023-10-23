const generateToken = () => {
    const randomPart1 = Math.random().toString(32).substring(2);
    const timestamp = Date.now().toString(32);
    const randomPart2 = Math.random().toString(32).substring(2);
  
    return randomPart1 + timestamp + randomPart2;
  };
  
export {generateToken}