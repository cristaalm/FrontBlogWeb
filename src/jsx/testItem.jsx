// import React, { createContext, useState } from "react";
// import Sidebar from "./test.jsx";
// import { LayoutDashboard, Users, Book, PlusSquare, Layers } from "lucide-react";

// export const SidebarContext = createContext();

// export default function App() {
//   const [expanded, setExpanded] = useState(true);

//   return (
//     <SidebarContext.Provider value={{ expanded, setExpanded }}>
//       <div className="flex">
//         <Sidebar>
//           <SidebarItem icon={<LayoutDashboard />} text="Dashboard" />
//           <SidebarItemWithSubItems
//             icon={<Book />}
//             text="Entradas"
//             subItems={[
//               { icon: <Layers />, text: "Todas" },
//               { icon: <PlusSquare />, text: "Añadir Nueva" },
//               { icon: <Layers />, text: "Categorías" }
//             ]}
//           />
//           <SidebarItem icon={<Users />} text="Usuario" />
//         </Sidebar>
//         <div className="flex-1 bg-gray-100">Main Content</div>
//       </div>
//     </SidebarContext.Provider>
//   );
// }

// function SidebarItem({ icon, text, children }) {
//   return (
//     <li className="flex items-center py-2 px-4 my-1 font-medium cursor-pointer transition-colors group">
//       {icon}
//       <span className="ml-2">{text}</span>
//       {children && <ul className="ml-8">{children}</ul>}
//     </li>
//   );
// }

// function SidebarItemWithSubItems({ icon, text, subItems }) {
//   const [expanded, setExpanded] = useState(false);

//   return (
//     <>
//       <li
//         className="flex items-center py-2 px-4 my-1 font-medium cursor-pointer transition-colors group"
//         onClick={() => setExpanded(!expanded)}
//       >
//         {icon}
//         <span className="ml-2">{text}</span>
//       </li>
//       {expanded && (
//         <ul className="ml-8">
//           {subItems.map((item, index) => (
//             <SidebarItem key={index} icon={item.icon} text={item.text} />
//           ))}
//         </ul>
//       )}
//     </>
//   );
// }