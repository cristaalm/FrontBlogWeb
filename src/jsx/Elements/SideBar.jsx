import { MoreVertical, ChevronLast, ChevronFirst } from "lucide-react";
import { useContext, createContext, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Tooltip } from "react-tooltip";
import { BaseUrl } from "../../constants/global";
const SidebarContext = createContext();

export default function Sidebar({ children }) {
  let navigate = useNavigate();

  const [expanded, setExpanded] = useState(true);
  const [user, setUser] = useState([]);
  const cerrarSesion = () => {
    localStorage.removeItem("isAuthenticated");
    navigate("/login");
    localStorage.clear();
  };

  useEffect(() => {
    let nombreusuario = localStorage.getItem("userName");
    // Mandar el nombre de usuario del fetch en el request body
    const fetchData = async () => {
      const response = await fetch(BaseUrl + "/api/users/find-user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ nombreusuario }),
      });
      const data = await response.json();
      setUser(data);
    };
    fetchData();
  }, []);

  return (
    // max-w-80
    <aside className="h-screen flex flex-col">
      {/* shadow-sm */}
      <nav className="h-full flex flex-col bg-cyan-950 shadow-sm">
        <div className={`p-4 pb-2 flex justify-between items-center border-b`}>
          {expanded && (
            <Link to="/welcome">
              <h3
                className={`transition-all w-0 mb-3.5 mt-1 font-semibold text-amber-50 text-2xl tracking-widest`}
              >
                AQUAVISION
              </h3>
            </Link>
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
          <ul className="mt-4 flex-1">{children}</ul>
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
          <Tooltip
            id="entradas"
            style={{ backgroundColor: "#CCFBF1", color: "#083344" }}
          />
          <img
            src="/img/logoRedW.png"
            alt=""
            data-tooltip-id="my-tooltip"
            data-tooltip-place={!expanded ? "right" : "top-start"}
            data-tooltip-content="Cerrar Sesión"
            onClick={cerrarSesion}
            className="ml-2.5 w-10 h-10 rounded-md cursor-pointer cerrar-tour"
          />
          <div
            className={`
              flex justify-between items-center
              overflow-hidden transition-all ${expanded ? "w-52 ml-3" : "w-0"}
          `}
          >
            {/* leading-4 */}
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

export function SidebarItem1({ icon, text, active, alert }) {
  const { expanded } = useContext(SidebarContext);

  return (
    <li
      className={`
        relative flex items-center px-3 my-1 
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
  to,
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
            data-tooltip-id={text === "Entradas" ? "entradas" : "tooltip-expa"}
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
          {subItems.map((item, index) => {
            return (
              <Link key={index} to={item.to} className="without_line">
                <SidebarItem icon={item.icon} text={item.text} />
              </Link>
            );
          })}
        </ul>
      )}

      {expanded1 && !expanded && (
        <ul className="mt-2">
          {subItems.map((item, index) => (
            <Link key={index} to={item.to} className="without_line">
              <SidebarItem icon={item.icon} text={item.text} />
            </Link>
          ))}
        </ul>
      )}
    </li>
  );
}
