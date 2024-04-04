import { MoreVertical, ChevronLast, ChevronFirst } from "lucide-react";
import { useContext, createContext, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Tooltip } from "react-tooltip";

const SidebarContext = createContext();

export default function Sidebar({ children }) {
  let navigate = useNavigate();

  const [expanded, setExpanded] = useState(true);
  const [user, setUser] = useState([]);
  const cerrarSesion = () => {
    localStorage.removeItem("isAuthenticated");
    navigate("/login");
  };
  useEffect(() => {
    let nombreusuario = localStorage.getItem("userName");
    // Mandar el nombre de usuario del fetch en el request body
    const fetchData = async () => {
      const response = await fetch(
        "http://localhost:8080/api/users/find-user",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ nombreusuario }),
        }
      );
      const data = await response.json();
      setUser(data);
      console.log(data);
    };
    fetchData();
  }, []);

  return (
    // max-w-80
    <aside className="h-screen">
      {/* shadow-sm */}
      <nav className="h-full flex flex-col bg-cyan-950 shadow-sm">
        <div className={`p-4 pb-2 flex justify-between items-center border-b`}>
          {expanded && (
            <h3
              className={`transition-all w-0 mb-3.5 mt-1 font-semibold text-amber-50 text-2xl tracking-widest`}
            >
              AQUAVISION
            </h3>
          )}
          <button
            onClick={() => setExpanded((curr) => !curr)}
            className={`ml-1 p-1.5 rounded-lg bg-teal-100 hover:bg-teal-200 mb-3`}
          >
            {expanded ? (
              <ChevronFirst className="text-cyan-950" />
            ) : (
              <ChevronLast className="text-cyan-950" />
            )}
          </button>
        </div>

        <SidebarContext.Provider value={{ expanded }}>
          <ul className="mt-4 flex-1 px-3">{children}</ul>
        </SidebarContext.Provider>
        {/* <div className="border-t"> */}
        {/* <h4 className="font-semibold ml-4 mt-2">Cerrar Sesión</h4> */}
        <div className="border-t flex p-3 ">
          <Tooltip
            id="my-tooltip"
            style={{ backgroundColor: "#691100", color: "whitesmoke" }}
          />
          <Tooltip
            id="tooltip-expa"
            style={{ backgroundColor: "#083344", color: "whitesmoke" }}
          />
          <img
            src="../../../public/img/logoRedW.png"
            alt=""
            data-tooltip-id="my-tooltip"
            data-tooltip-place={!expanded ? "right" : "top-start"}
            data-tooltip-content="Cerrar Sesión"
            onClick={cerrarSesion}
            className="ml-2.5 w-10 h-10 rounded-md cursor-pointer"
          />
          <div
            className={`
              flex justify-between items-center
              overflow-hidden transition-all ${expanded ? "w-52 ml-3" : "w-0"}
          `}
          >
            <div className="leading-4">
              <h4 className="font-semibold text-amber-50">{user.nombre}</h4>
              <span className="text-xs text-amber-50">{user.correo}</span>
            </div>
            {/* <MoreVertical size={20} /> */}
          </div>
        </div>
        {/* </div> */}
      </nav>
    </aside>
  );
}

export function SidebarItem({ icon, text, active, alert }) {
  const { expanded } = useContext(SidebarContext);

  return (
    <li
      className={`
        relative flex items-center py-2 px-3 my-1 
        font-medium rounded-md cursor-pointer
        transition-colors group
        ${
          active
            ? "bg-gradient-to-tr from-indigo-200 to-indigo-100 "
            : "hover:bg-teal-100 text-amber-50 hover:text-cyan-950"
        }
    `}
    >
      {!expanded && (
        <div
          data-tooltip-id="tooltip-expa"
          data-tooltip-place="right"
          data-tooltip-content={text}
        >
          {icon}
        </div>
      )}
      {expanded && icon}
      <span
        className={`overflow-hidden transition-all ${
          expanded ? "w-52 ml-3" : "w-0 invisible"
        }`}
      >
        {text}
      </span>
      {alert && (
        <div
          className={`absolute right-2 w-2 h-2 rounded bg-indigo-400 ${
            expanded ? "" : "top-2"
          }`}
        />
      )}
    </li>
  );
}

export function SidebarItemWithSubItems({
  icon,
  text,
  subItems,
  active,
  alert,
}) {
  const { expanded } = useContext(SidebarContext);
  const [expanded1, setExpanded1] = useState(false);

  useEffect(() => {
    setExpanded1(expanded);
  }, [expanded]);

  const toggleExpanded = () => {
    setExpanded1((prevExpanded) => !prevExpanded);
  };

  return (
<li
  className={`
    relative flex flex-col py-2 px-3 my-1 
    font-medium rounded-md cursor-pointer
    transition-colors group
  `}
>
      <div className="flex items-center" onClick={toggleExpanded}>
        {!expanded && (
          <div
            data-tooltip-id="tooltip-expa"
            data-tooltip-place="right"
            data-tooltip-content={text}
          >
            {icon}
          </div>
        )}
        {expanded && icon}
        <span
          className={`overflow-hidden transition-all ${
            expanded ? "w-52 ml-3 text-amber-50" : "w-0 invisible"
          }`}
        >
          {text}
        </span>
        <div className="ml-auto">
          {expanded1 ? (
            <ChevronLast className="text-gray-400" />
          ) : (
            <ChevronFirst className="text-gray-400" />
          )}
        </div>
      </div>

      {!expanded1 && expanded && (
        <ul className="ml-8">
          {subItems.map((item, index) => (
            <SidebarItem key={index} icon={item.icon} text={item.text} />
          ))}
        </ul>
      )}
    </li>
  );
}

// export function SidebarItemColumn({ icon, text, active, alert }) {
//   const { expanded } = useContext(SidebarContext);

//   return (
//     <li
//       className={`
//         relative flex items-center flex-col py-2 px-3 my-1
//         font-medium rounded-md cursor-pointer
//         transition-colors group
//         ${
//           active
//             ? "bg-gradient-to-tr from-indigo-200 to-indigo-100 "
//             : "hover:bg-teal-100 text-amber-50 hover:text-cyan-950"
//         }
//     `}
//     >
//       {!expanded && (
//         <div
//           data-tooltip-id="tooltip-expa"
//           data-tooltip-place="right"
//           data-tooltip-content={text}
//         >
//           {icon}
//         </div>
//       )}
//       {expanded && icon}
//       <span
//         className={`overflow-hidden transition-all ${
//           expanded ? "w-52 ml-3" : "w-0 invisible"
//         }`}
//       >
//         {text}
//       </span>
//       {alert && (
//         <div
//           className={`absolute right-2 w-2 h-2 rounded bg-indigo-400 ${
//             expanded ? "" : "top-2"
//           }`}
//         />
//       )}
//     </li>
//   );
// }
