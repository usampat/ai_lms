import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Dashboard.css";
import { Row, Col, Container } from "react-bootstrap";
import Sidebar from "../../components/Sidebar/sidebar";
import Header from "../../components/navbar/Navbar";

const mockOrganizations = [
  {
    id: 1,
    name: "Organization 1",
    classes: [
      { id: 1, name: "Class 1" },
      { id: 2, name: "Class 2" },
    ],
  },
  {
    id: 2,
    name: "Organization 2",
    classes: [
      { id: 3, name: "Class 3" },
      { id: 4, name: "Class 4" },
      { id: 5, name: "Class 5" },
    ],
  },
  {
    id: 3,
    name: "Organization 3",
    classes: [
      { id: 6, name: "Class 6" },
      { id: 7, name: "Class 7" },
      { id: 8, name: "Class 8" },
      { id: 9, name: "Class 9" },
    ],
  },
  {
    id: 4,
    name: "Organization 4",
    classes: [
      { id: 10, name: "Class 10" },
      { id: 11, name: "Class 11" },
      { id: 12, name: "Class 12" },
      { id: 13, name: "Class 13" },
      { id: 14, name: "Class 14" },
    ],
  },
];

const mockAssignments = [
  { id: 1, name: "Assignment 1" },
  { id: 2, name: "Assignment 2" },
  { id: 3, name: "Assignment 3" },
];

const mockStudents = [
  { id: 1, name: "Student 1", classId: 1, grades: { 1: "A", 2: "B" } },
  { id: 2, name: "Student 2", classId: 2, grades: { 1: "B" } },
  { id: 3, name: "Student 3", classId: 1, grades: { 1: "C" } },
  { id: 4, name: "Student 4", classId: 3, grades: {} },
  { id: 5, name: "Student 5", classId: 4, grades: {} },
];

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [joinedOrgs, setJoinedOrgs] = useState([]);
  const [selectedOrg, setSelectedOrg] = useState("");
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedAssignment, setSelectedAssignment] = useState("");
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [showOrgModal, setShowOrgModal] = useState(false);
  const [showClassModal, setShowClassModal] = useState(false);
  const [showGradeModal, setShowGradeModal] = useState(false);
  const [showAssignmentModal, setShowAssignmentModal] = useState(false);
  const [availableClasses, setAvailableClasses] = useState([]);
  const [currentStudent, setCurrentStudent] = useState(null);
  const [newGrade, setNewGrade] = useState("");
  const [newAssignmentName, setNewAssignmentName] = useState("");
  const [showSideBar, setShowSideBar] = useState(false);

  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"))?.user;
    if (loggedInUser) {
      setUser(loggedInUser);
    }
  }, []);

  useEffect(() => {
    if (selectedOrg) {
      const org = mockOrganizations.find(
        (org) => org.id === parseInt(selectedOrg),
      );
      setAvailableClasses(org ? org.classes : []);
    } else {
      setAvailableClasses([]);
    }
  }, [selectedOrg]);

  const handleJoinOrganization = (orgId) => {
    setJoinedOrgs([...joinedOrgs, orgId]);
    toast.success("Joined organization successfully!");
    setShowOrgModal(false);
  };

  const handleJoinClass = (classId) => {
    mockStudents.push({
      id: mockStudents.length,
      name: user.username,
      classId: Number(classId),
      grades: {},
    });

    toast.success("Joined class successfully!");
    setShowClassModal(false);
  };

  const handleApplyFilters = () => {
    if (selectedOrg && selectedClass) {
      const studentsInClass = mockStudents.filter(
        (student) => student.classId === parseInt(selectedClass),
      );
      if (studentsInClass.length === 0) toast.error("No students found");
      setFilteredStudents(studentsInClass);
    } else {
      toast.error(
        "Please select both organization and class to filter students.",
      );
    }
  };

  const handleGradeAssignment = (student) => {
    setCurrentStudent(student);
    setShowGradeModal(true);
  };

  const handleSaveGrade = () => {
    const updatedStudents = filteredStudents.map((student) => {
      if (student.id === currentStudent.id) {
        const updatedGrades = {
          ...student.grades,
          [selectedAssignment]: newGrade,
        };
        return { ...student, grades: updatedGrades };
      }
      return student;
    });
    setFilteredStudents(updatedStudents);
    toast.success("Grade saved successfully!");
    setShowGradeModal(false);
  };

  const handleSaveAssignment = () => {
    const newAssignment = {
      id: mockAssignments.length + 1,
      name: newAssignmentName,
    };
    mockAssignments.push(newAssignment);
    setSelectedAssignment(newAssignment.id.toString());
    setShowAssignmentModal(false);
    toast.success("Assignment added successfully!");
  };

  const toggleSidebar = () => {
    setShowSideBar(!showSideBar);
  };
  return (
    <Container fluid className="main">
      <Row>
        <Header toggleSidebar={toggleSidebar} dashboard={true} />
      </Row>
      <Row className="content-row">
        <Col className="sidebar-col" sm={showSideBar ? 2 : 1}>
          <Sidebar showSideBar={showSideBar} />
        </Col>
        <Col className="content-col" sm={showSideBar ? 10 : 11}>
          <div className="dashboard-container page">
            <Container>
              <h2>Dashboard</h2>
              <Row>
                <Col className="news" xl={5}>
                  <marquee
                    direction="up"
                    scrollamount="3"
                    style={{ height: "250px" }}
                  >
                    <p>
                      Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                      Nam hic possimus ducimus modi exercitationem. Repellat
                      quos pariatur cumque odit necessitatibus quia, mollitia,
                      vero vel tenetur, ab eveniet consequuntur? Numquam,
                      explicabo quod, similique maiores voluptates ullam
                      possimus provident veniam, distinctio iure earum
                      reprehenderit excepturi eaque non quo. Assumenda sapiente
                      commodi pariatur eos error. Nobis sequi quaerat.
                    </p>
                    <p>
                      Content 2 Lorem ipsum, dolor sit amet consectetur
                      adipisicing elit. Nam hic possimus ducimus modi
                      exercitationem. Repellat quos pariatur cumque odit
                      necessitatibus quia, mollitia, vero vel tenetur, ab
                      eveniet consequuntur? Numquam, explicabo quod, similique
                      maiores voluptates ullam possimus provident veniam,
                      distinctio iure earum reprehenderit excepturi eaque non
                      quo. Assumenda sapiente commodi pariatur eos error. Nobis
                      sequi quaerat.
                    </p>
                    <p>
                      Content 3 Lorem ipsum, dolor sit amet consectetur
                      adipisicing elit. Nam hic possimus ducimus modi
                      exercitationem. Repellat quos pariatur cumque odit
                      necessitatibus quia, mollitia, vero vel tenetur, ab
                      eveniet consequuntur? Numquam, explicabo quod, similique
                      maiores voluptates ullam possimus provident veniam,
                      distinctio iure earum reprehenderit excepturi eaque non
                      quo. Assumenda sapiente commodi pariatur eos error. Nobis
                      sequi quaerat.
                    </p>
                  </marquee>
                </Col>
                <Col xl={1}></Col>
                <Col className="graph1" xl={6}>
                  box2
                </Col>
              </Row>
              <Row className="graph2" sm={12}>
                box3
              </Row>
            </Container>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Dashboard;
