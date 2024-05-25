import React, { useState } from "react";
import Header from "../../components/navbar/Navbar";
import { Container, Row, Col } from "react-bootstrap";
import Sidebar from "../../components/Sidebar/sidebar";
import { semesters } from "./marksData";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import "./result.css";

// Register the necessary components with Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Result = () => {
  const [showSideBar, setShowSideBar] = useState(false);

  const toggleSidebar = () => {
    setShowSideBar(!showSideBar);
  };

  const calculateTotalPercentage = (subjects) => {
    const totalScore = subjects.reduce(
      (total, subject) => total + subject.score,
      0
    );
    return totalScore / subjects.length;
  };

  const semesterPercentages = semesters.map((semester) =>
    calculateTotalPercentage(semester.subjects)
  );

  const data = {
    labels: semesters.map((semester) => `Semester ${semester.semester}`),
    datasets: [
      {
        label: "Total Percentage",
        data: semesterPercentages,
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
      },
    },
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
          <div className="dashboard-container page">
            <h2>RESULT DASHBOARD</h2>
            <div className="semesters-data">
              <Row>
                {semesters.map((semester) => (
                  <Col sm={3} className="mt-4" key={semester.semester}>
                    <div className="semester">
                      <h3>Semester {semester.semester}</h3>
                      <ul>
                        {semester.subjects.map((subject) => (
                          <li key={subject.name}>
                            {subject.name}: {subject.score}%
                          </li>
                        ))}
                      </ul>
                    </div>
                  </Col>
                ))}
                <Col sm={3} md={3} lg={3} xl={3}></Col>
                <Col
                  xs={12}
                  sm={6}
                  md={6}
                  lg={6}
                  xl={6}
                  className="mt-4 mb-2 text-center"
                >
                  <div style={{ height: "250px", width: "100%" }}>
                    <Bar data={data} options={options} />
                  </div>
                </Col>
              </Row>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Result;
