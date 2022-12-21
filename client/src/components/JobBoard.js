import JobList from "./JobList";
import { jobs } from "../fake-data";
import { getJobs } from "../graphql/queries";

getJobs();

function JobBoard() {
  console.log(`jobs in JobBoard from fake-data:`, jobs);
  return (
    <div>
      <h1 className="title">Job Board</h1>
      <JobList jobs={jobs} />
    </div>
  );
}

export default JobBoard;
