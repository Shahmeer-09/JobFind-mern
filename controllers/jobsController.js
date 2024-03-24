const expressAsyncErrors = require("express-async-errors");
const Job = require("../model/Job.model");
const statusCode = require("http-status-codes");
const mongoose = require("mongoose");
const day = require("dayjs");

const getStats = async (req, res) => {
  let stats = await Job.aggregate([
    { $match: { createdBy: new mongoose.Types.ObjectId(req.user.id) } },
    { $group: { _id: "$jobStatus", count: { $sum: 1 } } },
  ]);
  stats = stats.reduce((acc, curr) => {
    const { _id: title, count } = curr;
    acc[title] = count;
    return acc;
  }, {});

  const defaultStats = {
    pending: stats.pending || 0,
    interview: stats.interview || 0,
    declined: stats.declined || 0,
  };

  let monthlyApplications = await Job.aggregate([
    { $match: { createdBy: new mongoose.Types.ObjectId(req.user.id) } },
    {
      $group: {
        _id: { year: { $year: "$createdAt" }, month: { $month: "$createdAt" } },
        count: { $sum: 1 },
      },
    },
    { $sort: { "_id.year": -1, "_id.month": -1 } },
    { $limit: 6 },
  ]);
  monthlyApplications = monthlyApplications
    .map((item) => {
      const {
        _id: { year, month },
        count,
      } = item;

      const date = day()
        .month(month - 1)
        .year(year)
        .format("MMM YY");
      return { date, count };
    })
    .reverse();

  res.status(statusCode.OK).json({ defaultStats, monthlyApplications });
};
const gettALljob = async (req, res) => {
  const { search, jobStatus, jobType, sort } = req.query;
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  const queryObject = {
    createdBy: req.user.id,
  };
  if (search) {
    queryObject.$or = [
      { company: { $regex: search, $options: "i" } },
      { position: { $regex: search, $options: "i" } },
    ];
  }
  if (jobStatus && jobStatus !== "all") {
    queryObject.jobStatus = jobStatus;
  }
  if (jobType && jobType !== "all") {
    queryObject.jobType = jobType;
  }
  const sortOptions = {
    newest: "-createdAt",
    oldest: "createdAt",
    "a-z": "position",
    "z-a": "-position",
  };
  const sortKey = sortOptions[sort] || sortOptions.newest;
  const jobs = await Job.find(queryObject)
    .sort(sortKey)
    .skip(skip)
    .limit(limit);
  const totalcount = await Job.countDocuments(queryObject);
  const numOfPages = Math.ceil(totalcount / limit);
  res.status(200).json({ totalcount, numOfPages, curerrentpage: page, jobs });
};
const createjob = async (req, res) => {
  req.body.createdBy = req.user.id;
  const job = await Job.create(req.body);
  res.status(200).json({ job });
};
const getaJob = async (req, res) => {
  const { id } = req.params;
  const job = await Job.find({ _id: id });
  res.status(200).json({ job });
};
const deletejob = async (req, res) => {
  const { id } = req.params;
  const removedJob = await Job.findByIdAndDelete(id);
  res.status(200).json({ msg: `job is deletd with id ${id}` });
};
const updatejob = async (req, res) => {
  const { id } = req.params;
  const updatedjob = await Job.findByIdAndUpdate(id, req.body, {
    new: true,
  });

  res.status(200).json({ updatedjob });
};

module.exports = {
  createjob,
  gettALljob,
  updatejob,
  deletejob,
  getaJob,
  getStats,
};
