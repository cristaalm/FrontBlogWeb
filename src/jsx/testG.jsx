import React, { useContext } from "react";
// import { MoreVertical, ChevronLast, ChevronFirst } from "lucide-react";
import Sidebar, { SidebarItem } from "./Elements/SideNavBar.jsx";

const testG = () => {
  return (
    <>
      <aside
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          // width: "250px",
          height: "100%",
          backgroundColor: "#f0f0f0",
        }}
      >
        <Sidebar>
          <SidebarItem text={"ad"} />
          <SidebarItem text={"gd"} />
          <SidebarItem text={"g"} />
          <SidebarItem text={"Dashgaboard"} />
        </Sidebar>
      </aside>
    </>
  );
};

export default testG;
