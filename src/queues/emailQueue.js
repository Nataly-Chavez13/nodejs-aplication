const Queue = require("bull");
const emailQueue = new Queue("email", "redis://127.0.0.1:6379");

emailQueue.process(async (job) => {
  // Lógica para enviar correos electrónicos
  console.log(`Sending email to ${job.data.email}`);
});

const sendEmail = (email) => {
  emailQueue.add({ email });
};

module.exports = sendEmail;
