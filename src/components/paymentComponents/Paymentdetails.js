import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listStudentsAsync } from "../../action/studentAction";
import { asynclistClass } from "../../action/classAction";
import { FadeLoader } from "react-spinners";
import { FormGroup, Label, Input } from "reactstrap";
import { jwtDecode } from "jwt-decode";
import NavComponent from "../principleContainer/navigation/principlenavigate";
import { useNavigate } from "react-router-dom";
import { Col, Row, Modal, Button } from "react-bootstrap";
import axios from "../../config/axios";

function ListStudent() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [viewModel, setViewModel] = useState(false);
  const [role, setRole] = useState("");
  const [feedetails, setFeeDetails] = useState(null);
  const [fee, setFee] = useState(null)
  const [studentFee, setStudentFee] = useState('')
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [studentsPerPage] = useState(10); // Change this value to adjust the number of students per page
  const students = useSelector((state) => state.students.data);
  const classess = useSelector((state) => state.classes.data);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const { role, id } = jwtDecode(token);
    setRole(role);
    dispatch(listStudentsAsync());
    dispatch(asynclistClass());
    setLoading(false);
  }, [dispatch]);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  useEffect(() => {
    const fetchData = async () => {
        try {
            const response = await axios.get("/api/getAllFeeDetails");
            console.log(response.data, "hii");
            setFee(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
            // Handle error here
        }
    };
    fetchData();
}, []);


  

  const viewToggle = () => {
    setViewModel(!viewModel);
  };

  const handlefee = async (id) => {
    try {
      const student = fee.map((ele) => console.log(ele))
      const response = await axios.get(`/api/paymentDetailOfOneStudent/${id}`);
      setFeeDetails(response.data);
      viewToggle();
    } catch (e) {
      console.log(e);
    }
  };

  const handleSortChange = (value) => {
    const sortedStudents = [...filteredStudents];
    if (value === "ascending") {
      sortedStudents.sort((a, b) => a.firstname.localeCompare(b.firstname));
    } else if (value === "descending") {
      sortedStudents.sort((a, b) => b.firstname.localeCompare(a.firstname));
    }
    setFilteredStudents(sortedStudents);
  };

  useEffect(() => {
    setFilteredStudents(
      searchQuery
        ? students.filter((student) => student.classId._id === searchQuery)
        : students
    );
  }, [searchQuery, students]);

  // Pagination Logic
  const indexOfLastStudent = currentPage * studentsPerPage;
  const indexOfFirstStudent = indexOfLastStudent - studentsPerPage;
  const currentStudents = filteredStudents.slice(
    indexOfFirstStudent,
    indexOfLastStudent
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div>
      <Row>
        <Col md={6}>
          <NavComponent />
        </Col>

        <Col md={6}>
          {loading ? (
            <div className="spinner-container">
              <FadeLoader
                color={"#36D7B7"}
                loading={loading}
                size={150}
              />
            </div>
          ) : (
            <div style={{ color: "#330000" }}>
              <h2 style={{ color: "brown" }}>Listing Students</h2>
              <div>
                <FormGroup>
                  <Label for="classes" style={{ color: "green" }}>
                    Search by Class:
                  </Label>
                  <Input
                    type="select"
                    id="classes"
                    value={searchQuery}
                    onChange={handleSearch}
                  >
                    <option value="">All</option>
                    {classess.map((ele) => (
                      <option key={ele._id} value={ele._id}>
                        {ele.name} - {ele.sectionname}
                      </option>
                    ))}
                  </Input>
                </FormGroup>
                <FormGroup>
                  <Label for="sort">Sort by Name:</Label>
                  <Input
                    type="select"
                    id="sort"
                    onChange={(e) => handleSortChange(e.target.value)}
                  >
                    <option value="ascending">A-Z</option>
                    <option value="descending">Z-A</option>
                  </Input>
                </FormGroup>
                <ul>
                  {currentStudents.map((student, i) => (
                    <li key={i}>
                      <div className="student-info">
                        <span>
                          {student.firstname} - {student.lastname}{" "}
                          <button onClick={() => handlefee(student._id)}>
                          {fee?.find((ele) => ele.studentId === student._id && ele.status === "success") ? "Paid" : "Not Paid"}
                        </button>

                        </span>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
              {/* Pagination */}
              <nav>
                <ul className="pagination">
                  {Array.from(
                    { length: Math.ceil(filteredStudents.length / studentsPerPage) },
                    (_, i) => (
                      <li key={i} className="page-item">
                        <a onClick={() => paginate(i + 1)} className="page-link">
                          {i + 1}
                        </a>
                      </li>
                    )
                  )}
                </ul>
              </nav>
            </div>
          )}
        </Col>

        <Modal show={viewModel} onHide={viewToggle}>
          <Modal.Header closeButton>
            <b style={{color:'brown'}}>fee Details</b>
          </Modal.Header>
          {feedetails && feedetails.length > 0 ? (
            <Modal.Body style={{ backgroundColor: "#FFFFCC" }}>
              <p>Amount Paid : {feedetails[0]?.amount}</p>
              <p>Mode Of Payment : {feedetails[0]?.modeOfPayment}</p>
              <p>Payment Date : {feedetails[0]?.paymentDate}</p>
              <p>Status : {feedetails[0]?.status}</p>
              <p>Transaction ID: {feedetails[0]?.transactionId}</p>
            </Modal.Body>
          ) : (
            <Modal.Body style={{ backgroundColor: "#FFFFCC" }}>
              <p>Payment not done</p>
            </Modal.Body>
          )}
          <Modal.Footer>
            <Button variant="secondary" onClick={viewToggle}>
              Cancel
            </Button>
          </Modal.Footer>
        </Modal>
      </Row>
    </div>
  );
}

export default ListStudent;
