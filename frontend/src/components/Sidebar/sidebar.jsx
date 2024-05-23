import React, { useState } from "react";
import { Container } from "react-bootstrap";
import {
  FaTh,
  FaBars,
  FaUserAlt,
  FaRegChartBar,
  FaCommentAlt,
  FaShoppingBag,
  FaThList,
} from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { NavLink } from "react-router-dom";
import './sidebar.css';

const Sidebar = ({ showSideBar }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  const menuItem = [
    {
      path: "/dashboard",
      name: "Dashboard",
      icon: <FaTh />,
    },
    {
      path: "/quiz",
      name: "Quiz",
      icon: <FaCommentAlt />,
    },
    {
      path: "/assignments",
      name: "Assignments",
      icon: <FaShoppingBag />,
    },
    {
      path: "/productList",
      name: "Product List",
      icon: <FaThList />,
    },
    {
      path: "/result",
      name: "Result",
      icon: <FaRegChartBar />,
    },
    {
      path: "/",
      name: "About",
      icon: <FaUserAlt />,
    },
  ];
  return (
    <Container maxWidth="100%" maxHeight="100vh" className="bg-dark text-white">
      <div
        style={{
          width: showSideBar ? "100px" : "5px",
          justifyContent: "center",
        }}
        className="d-inline sidebar"
      >
        {menuItem.map((item, index) => (
          <NavLink
            to={item.path}
            key={index}
            className="link"
            activeclassName="active"
          >
            <div className="icon">{item.icon}</div>
            <div
              style={{ display: showSideBar ? "block" : "none" }}
              className="link_text"
            >
              {item.name}
            </div>
          </NavLink>
        ))}
      </div>
    </Container>
  );
};

export default Sidebar;
