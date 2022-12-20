import { Database } from "fakebase";

const db = new Database("./data");
// exporting the 'Company' table
export const Company = db.table("companies");
// exporting the 'Job' table
export const Job = db.table("jobs");
// exporting the 'User' table
export const User = db.table("users");
