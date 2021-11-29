/** @format */

class Answer {
  constructor({ message, ticketID }, answers) {
    this.id = answers[answers.length - 1].id + 1;
    this.message = message;
    this.ticketID = ticketID;
  }
}

module.exports = Answer;
