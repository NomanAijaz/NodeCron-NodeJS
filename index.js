const express = require("express");
const cron = require("node-cron");
const app = express();

app.use("/", (request, response) => {});

/* 
    you can customize the callbacks based on your logic.
    whether to send message, emails, resopnse, requests etc
*/

//  # ┌────────────── second (optional)
//  # │ ┌──────────── minute
//  # │ │ ┌────────── hour
//  # │ │ │ ┌──────── day of month
//  # │ │ │ │ ┌────── months
//  # │ │ │ │ │ ┌──── day of week
//  # │ │ │ │ │ │
//  # │ │ │ │ │ │
//  # * * * * * *

// simple cron schedule that runs after every minute
cron.schedule("* * * * *", () => {
  console.log("simple cron schedule that runs after every minute");
});

// simple cron schedule that run after every minute 1, 3, 2
// firstly it will run after 1 minute then after 3 minutes and then after 2 minutes
cron.schedule("1,3,2 * * * *", () => {
  console.log("simple cron schedule that run after every minute 1, 3, 2");
});

//you can also define range
cron.schedule("1-5 * * * *", () => {
  console.log("running every minute to 1 from 5");
});

//Using step values. if you want to say “every two minutes”, just use */2
cron.schedule("*/2 * * * *", () => {
  console.log("running a task every two minutes");
});

//For month and week day you also may use names or short names- Jan,Sep Sun
cron.schedule("* * * January,September Sunday", () => {
  console.log("running on Sundays of January and September");
});

//you can also define timezone that is used for job scheduling.
cron.schedule(
  "0 1 * * *",
  () => {
    console.log("Running a job at 01:00 at America/Sao_Paulo timezone");
  },
  {
    scheduled: true,
    timezone: "America/Sao_Paulo",
  }
);

// you can also manually start and stop cron running
var task = cron.schedule(
  "* * * * *",
  () => {
    console.log("stopped task");
  },
  {
    scheduled: false,
  }
);

task.start(); // task.stop() to stop schedule and won't be executed unless re-started.

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`App is running on ${PORT} PORT`);
});
