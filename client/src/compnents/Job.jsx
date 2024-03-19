import { FaLocationArrow, FaCalendarAlt, FaBriefcase } from "react-icons/fa";
import { Link } from "react-router-dom";
import Wrapper from "../assets/wrappers/Job";
import { Form } from "react-router-dom";
import day from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
import Jobinfo from "./Jobinfo";
day.extend(advancedFormat);
const Job = ({
  _id,
  position,
  company,
  jobLocation,
  jobType,
  createdAt,
  jobStatus,
}) => {
  const date = day(createdAt).format("MMM DD, YYYY");
  return (
    <Wrapper>
      <header>
        <div className="main-icon">{company.charAt(0)}</div>
        <div className="info">
          <h5>{position}</h5>
          <p>{company}</p>
        </div>
      </header>
      <div className="content">
        <div className="content-center">
          <Jobinfo icon={<FaLocationArrow />} text={jobLocation} />
          <Jobinfo icon={<FaCalendarAlt />} text={date} />
          <Jobinfo icon={<FaBriefcase />} text={jobType} />
          <div className={`status ${jobStatus}`}>{jobStatus}</div>
        </div>
        <div className="actions">
          <Link to={`/dashboard/edit-jobs/${_id}`} className="btn edit-btn">edit</Link>
          <Form method="delete" action={`../delete-jobs/${_id}`} >
            <button type="submit" className="btn delete-btn">
              delete
            </button>
          </Form>
        </div>
      </div>
    </Wrapper>
  );
};

export default Job;
