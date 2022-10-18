const Rover = require('../rover.js');
const Message = require('../message.js');
const Command = require('../command.js');

// NOTE: If at any time, you want to focus on the output from a single test, feel free to comment out all the others.
//       However, do NOT edit the grading tests for any reason and make sure to un-comment out your code to get the autograder to pass.


describe("Rover class", function() {
  // Test 7
  it("constructor sets position and default values for mode and generatorWatts", function(){
    rover = new Rover(98382);
    expect(rover.position).toEqual(98382);
    expect(rover.mode).toEqual('NORMAL');
    expect(rover.generatorWatts).toEqual(110);
  });
  // Test 8
  it("response returned by receiveMessage contains name of message", function(){
    let commands = [new Command('MODE_CHANGE', 'LOW_POWER'), new Command('STATUS_CHECK')];
    let message = new Message('Test message with two commands', commands);
    let rover = new Rover(98382);
    let actual = rover.receiveMessage(message).message;
    let expected = 'Test message with two commands';
    expect(actual).toEqual(expected);
  });
  // Test 9
  it('response returned by receiveMessage includes two results if two commands are sent in the message', function() {
    let commands = [new Command('MODE_CHANGE', 'LOW_POWER'), new Command('STATUS_CHECK')];
    let message = new Message('Test message with two commands', commands);
    let rover = new Rover(98382);
    let actual = rover.receiveMessage(message).results.length;
    expect(actual).toEqual(2);
 });
  // Test 10
  it('responds correctly to status check command', function(){
    let commands = [new Command('STATUS_CHECK')];
    let message = new Message('Test message with two commands', commands);
    let rover = new Rover(98382);
    let actual = rover.receiveMessage(message).results[0].roverStatus;
    let expected = {mode: 'NORMAL', generatorWatts: 110, position: 98382};
    expect(actual).toEqual(expected);
  });
  // Test 11
  it('responds correctly to mode change command', function(){
    let commands = [new Command('MODE_CHANGE', 'LOW_POWER'), new Command('STATUS_CHECK')];
    let message = new Message('Test message with two commands', commands);
    let rover = new Rover(98382);
    let actualOne = rover.receiveMessage(message).results[0].completed;
    let expectedOne = true;
    let actualTwo = rover.mode;
    let expectedTwo = 'LOW_POWER';
    expect(actualOne).toEqual(expectedOne);
    expect(actualTwo).toEqual(expectedTwo);

  });
  // // Test 12
  it('responds with false completed value when attempting to move in LOW_POWER mode', function(){
    let commands = [new Command('MODE_CHANGE', 'LOW_POWER'), new Command('STATUS_CHECK'), new Command('MOVE', 200)];
    let message = new Message('Test message with three commands', commands);
    let rover = new Rover(98382);
    let actual = rover.receiveMessage(message).results[2].completed;
    let expected = false;
    expect(actual).toEqual(expected);

  });
  // // Test 13
  it('responds with position for move command', function(){
    let commands = [new Command('MOVE', 1000), new Command('STATUS_CHECK')];
    let message = new Message('Test message with two commands', commands);
    let rover = new Rover(98382);
    rover.receiveMessage(message).results[0].value;
    let actual = rover.position;
    let expected = 1000;
    expect(actual).toEqual(expected);

  });

});

