/** @format */

class Ticket {
  constructor({ title, message }, tickets) {
    this.id = tickets[tickets.length - 1].id + 1;
    this.title = title;
    this.message = message;
    this.received = new Date().toISOString();
    this.status = "pending";
  }
}

module.exports = { Ticket };
