import { Job } from "./db.js";
import { Company } from "./db.js";

export const resolvers = {
  Query: {
    job: (_root, { id }) => Job.findById(id),
    jobs: () => Job.findAll(),
  },

  Job: {
    company: (job) => Company.findById(job.companyId),
  },
};
