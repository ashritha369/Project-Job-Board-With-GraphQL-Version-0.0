import JobList from "./JobList";
import { jobs } from "../fake-data";

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
