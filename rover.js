class Rover {
   // Write code here!
   constructor(position, mode = 'NORMAL', generatorWatts = 110) {
     this.position = position;
     this.mode = mode;
     this.generatorWatts = generatorWatts;
  } 
  receiveMessage(message) {
    let response = {};
    response.message = message.name;
    response.results = [];
    let resultsObj = {completed: null};
    

    for (let i = 0; i < message.commands.length; i++) {
      if (message.commands[i].commandType === 'STATUS_CHECK'){
        let roverStatusObj = {mode: this.mode, generatorWatts: this.generatorWatts, position: this.position};
        resultsObj = {completed: true, roverStatus: roverStatusObj};
        response.results.push(resultsObj);
        
      }
       else if (message.commands[i].commandType === 'MODE_CHANGE'){
        this.mode = message.commands[i].value;
        resultsObj = {completed: true};
        response.results.push(resultsObj);

      } else if (message.commands[i].commandType === 'MOVE') {
          if (this.mode !== 'NORMAL') {
            resultsObj = {completed: false};
            response.results.push(resultsObj);
        } else {
            this.position = message.commands[i].value;
            resultsObj = {completed: true,
            };
            response.results.push(resultsObj);   
        }
      }  
    }
    //console.log(response);
    return response;
  }
};


module.exports = Rover;