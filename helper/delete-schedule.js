import { ToadScheduler, SimpleIntervalJob, AsyncTask } from "toad-scheduler";
import URL from "../models/urlModel.js";

const scheduler = new ToadScheduler();

const task = new AsyncTask(
  "Delete public shortlinks every 10 days",
  () => {
    URL.deleteMany({ createdBy: "public" });
  },
  (err) => {
    console.log(err);
  }
);
const job = new SimpleIntervalJob({ days: 10 }, task);

scheduler.addSimpleIntervalJob(job);

export { scheduler };
