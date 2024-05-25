import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { Container } from "react-bootstrap";
import { GrScorecard } from "react-icons/gr";
import { MdQuiz, MdAssignment, MdDashboard } from "react-icons/md";
import { IoChatboxEllipses } from "react-icons/io5";
import { IoIosCreate } from "react-icons/io";
import { TfiWrite } from "react-icons/tfi";
import "./sidebar.css";

const menuItem = [
  {
    path: "/",
    name: "Dashboard",
    icon: <MdDashboard size={20} />,
    rolw: 'all'
  },
  {
    path: "/quiz",
    name: "Quiz",
    icon: <MdQuiz size={20}/>,
    role: 'all'
  },
  {
    path: "/assignments",
    name: "Assignments",
    icon: <MdAssignment size={20}/>,
    role: 'all'
  },
  {
    path: "/result",
    name: "Result",
    icon: <GrScorecard />,
    role: 'all'
  },
  {
    path:'/chat',
    name:'Chat',
    icon:<IoChatboxEllipses/>,
    role: 'all'
  }
];
const menuItemTwo=[
  {
    path:'/makequiz',
    name:'Make Quiz',
    icon:<IoIosCreate/>
  }
  ,
  {
    path:'/makeassignment',
    name:'Make Assignment',
    icon:<TfiWrite/>
  }
]

const Sidebar = ({ showSideBar }) => {
  const [role, setRole] = useState('');
  useEffect(() => {
    const handleStorageChange = () => {
      const storedUser = localStorage.getItem('loggedInUser');
      if (storedUser) {
        const user = JSON.parse(storedUser);
        setRole(user.user.role);
      }
    };

    handleStorageChange(); // Call once on mount to set initial role

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  console.log(role);
  return (
    <Container className={`sidebar ${!showSideBar ? "expanded" : "collapsed"}`}>
      <div className="icons-container">
        {menuItem.map((item, index) => (
          <NavLink
            to={item.path}
            key={index}
            className="link" 
            activeClassName="active"
          >
            <div className="icon">{item.icon}</div>
            <div className={`link-text ${!showSideBar ? "" : "hidden"}`}>{item.name}</div>
          </NavLink>
        ))}
        {console.log(role)}
        {
          role==='teacher' && (
            <>
            {
              menuItemTwo.map((item, index) => (
                <NavLink
                  to={item.path}
                  key={index}
                  className="link" 
                  activeClassName="active"
                >
                  <div className="icon">{item.icon}</div>
                  <div className={`link-text ${!showSideBar ? "" : "hidden"}`}>{item.name}</div>
                </NavLink>
              ))
            }
          </>
        )
        }
      </div>
    </Container>
  );
};

export default Sidebar;
