import React from "react";

const navigationItems = [
  {
    role: ["admin"],
    id: "requests",
    label: "Requests",
    to: "/signUpRequests"
  },

  {
    role: ["student", "teacher", "admin"],
    id: "dashboard",
    label: "Dashboard",
    to: "/"
  }
];
export default navigationItems;
