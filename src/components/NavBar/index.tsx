import { Navbar } from "flowbite-react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuthContext } from "shared/contexts";

export const NavBar = () => {
  const { user, signout } = useAuthContext();
  const navigate = useNavigate();

  const navLinks = [
    {
      link: "/",
      name: "Home",
    },
    {
      link: user ? "/meus-cursos" : "/login",
      name: "Meus Cursos",
    },
    {
      link: "/",
      name: "Contatos",
    },
  ];

  const onSignout = () => {
    signout();
    navigate("/");
    return;
  };

  return (
    <Navbar fluid rounded>
      <NavLink to="/">
        <span className="self-center whitespace-nowrap text-3xl font-semibold dark:text-white text-indigo-500">
          PCursos
        </span>
      </NavLink>
      <Navbar.Toggle />
      <Navbar.Collapse className="ml-2">
        {navLinks.map((e) => {
          return (
            <NavLink
              key={e.name}
              className="text-base text-gray-700 cursor-pointer hover:text-cyan-700"
              to={e.link}
            >
              {e.name}
            </NavLink>
          );
        })}
        {!user ? (
          <NavLink to={"/login"} className="text-base text-indigo-500">
            Entrar
          </NavLink>
        ) : (
          <label
            onClick={onSignout}
            className="text-base  text-gray-700 cursor-pointer hover:text-cyan-700"
          >
            Sair
          </label>
        )}
      </Navbar.Collapse>
    </Navbar>
  );
};
