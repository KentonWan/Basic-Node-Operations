const fs = require("fs");

function done(output){
  process.stdout.write(output);
  process.stdout.write('\nprompt > ');
}
function errorHandler(input) {
  done(input + " is not a command")
}
function evaluateCmd(userInput){

  const userInputArray = userInput.split(" ");
  const command = userInputArray[0];

  switch(command) {
    case "echo":
      commandLibrary.echo(userInputArray.slice(1).join(" "))
      break;
    case "cat":
      commandLibrary.cat(userInputArray.slice(1));
      break;
    case "head":
      commandLibrary.head(userInputArray.slice(1))
    case "tail":
      commandLibrary.tail(userInputArray.slice(1));
      break;
    default:
      errorHandler(command);
      break;
  }
}

const commandLibrary = {
  "echo": function(userInput){
    done(userInput);
  },

  "cat": function(fullPath){
    const fileName = fullPath[0];
    fs.readFile(fileName, (err,data) => {
      if (err) throw err;
      done(data);
    });
  },

    "head": function(fullPath) {
      const fileName = fullPath[0];
      fs.readFile(fileName,"utf8", (err, data) => {
        if (err) {throw err};
        let dataArray = data.split('\n');
        done(dataArray.splice(0,10).join('\n'))
      })
    },

    "tail": function(fullPath) {
      const fileName = fullPath[0];
      fs.readFile(fileName,"utf8", (err, data) => {
        if (err) {throw err};
        let dataArray = data.split('\n');
        let length = dataArray.length;
        done(dataArray.splice(length-11,length-1).join('\n'))
      })
    }
};

module.exports.commandLibrary = commandLibrary;
module.exports.evaluateCmd = evaluateCmd;
