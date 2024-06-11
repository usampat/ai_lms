import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Dashboard.css";
import { Row, Col, Container } from "react-bootstrap";
import Sidebar from "../../components/Sidebar/sidebar";
import Header from "../../components/navbar/Navbar";
import { genderData, attendanceData } from "./dashConstants";
import { Pie, Bar } from "react-chartjs-2";

import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
} from "chart.js";
import { useNavigate } from "react-router-dom";

// Register ChartJS components
ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title
);

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

const BASE_URL = "http://localhost:4000";
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
  const [announcements, setAnnouncements] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("jwtToken");
    if (!token) {
      navigate("/");
      return;
    }

    const checkAuth = async () => {
      const response = await fetch(`${BASE_URL}/user`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        navigate("/");
        return;
      }

      const data = await response.json();

      setUser(data.body.user);
    };
    checkAuth();
    getAnnouncements();
  }, []);

  const getAnnouncements = async () => {
    const token = localStorage.getItem("jwtToken");
    const response = await fetch(`${BASE_URL}/announcement`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) return;
    const data = await response.json();
    if (data.status != "true") return;
   setAnnouncements(data.body);
  };

  useEffect(() => {
    if (selectedOrg) {
      const org = mockOrganizations.find(
        (org) => org.id === parseInt(selectedOrg)
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
        (student) => student.classId === parseInt(selectedClass)
      );
      if (studentsInClass.length === 0) toast.error("No students found");
      setFilteredStudents(studentsInClass);
    } else {
      toast.error(
        "Please select both organization and class to filter students."
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
        <Col className={`sidebar-col ${showSideBar ? "expanded" : ""}`}>
          <Sidebar showSideBar={showSideBar} />
        </Col>
        <Col
          className={`content-col ${showSideBar ? "collapsed" : "expanded"}`}
        >
          <div className="dashboard-container">
            <Container>
              <h2>DASHBOARD</h2>
              <Row>
                <Col className="box-content news" xl={5} lg={12}>
                  <div className="box-heading">Announcements</div>
                  <div className="news-content">
                    <marquee
                      direction="up"
                      scrollamount="3"
                      style={{ height: "250px" }}
                    >
                      {announcements.map((x) => {
                        return (
                          <React.Fragment key={x.id}>
                            <span>{x.text}</span>
                            <hr />
                          </React.Fragment>
                        );
                      })}
                    </marquee>
                  </div>
                </Col>
                <Col className="box-content graph-box graph1" xl={6} lg={12}>
                  <div className="box-heading">Male and Female</div>
                  <Pie data={genderData} />
                </Col>
              </Row>
              <Row>
                <Col className=" graph2" xl={12} lg={12}>
                  <div className="box-heading">Attendance Data</div>
                  <div style={{ height: "160px", width: "100%" }}>
                    <Bar
                      data={attendanceData}
                      options={{
                        maintainAspectRatio: false,
                        scales: {
                          y: {
                            beginAtZero: true,
                            max: 100,
                          },
                        },
                      }}
                    />
                  </div>
                </Col>
              </Row>
            </Container>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Dashboard;
