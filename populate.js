const fs = require("fs").promises;
const mongoose = require("mongoose");
require("dotenv").config();
const path = require("path");

const User = require("./model/user.model");
const Job = require("./model/Job.model");
async function main() {
try {
  await mongoose.connect(process.env.MONGO_URL);

  const user = await User.findOne({ email: "test@gmail.com" });
  const jsonjobs = JSON.parse(
    await fs.readFile(path.join(__dirname, "utils", "jobData.json"), "utf-8")
  );

  const jobs = jsonjobs.map((job) => {
    return { ...job, createdBy: user._id };
  });

  await Job.deleteMany({createdBy:user._id});
  await Job.create(jobs);
  console.log("done");
  process.exit(0)
} catch (error) {
    console.log(error);
  process.exit(1);

}
}

main();