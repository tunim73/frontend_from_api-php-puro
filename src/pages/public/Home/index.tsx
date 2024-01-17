import { Button } from "flowbite-react";
import { NavLink } from "react-router-dom";

export const Home = () => {
  return (
    <div className="w-full h-full">
      <section className="bg-white">
        <div className="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16 z-10 relative">
          <h1 className="mb-4 text-2xl font-extrabold tracking-tight leading-none text-indigo-500 md:text-3xl lg:text-4xl">
            Cursos online gratuitos
          </h1>
          <p className="mb-8 text-sm font-normal text-gray-500 md:text-base lg:text-xl sm:px-16 lg:px-48">
            Veja nossas principais áreas do conhecimento
          </p>
        </div>
        <div className="w-full flex justify-center flex-wrap gap-4 ">
          <NavLink to="">
            <Button color="purple">Programação</Button>
          </NavLink>
          <Button href="" color="red">
            Matemática
          </Button>
          <Button href="" color="green">
            Marketing
          </Button>
          <Button href="" color="yellow">
            Gestão
          </Button>
          <Button href="" color="blue">
            Idiomas
          </Button>
        </div>
      </section>
      <section>{/* Principais cursos, independente da cateogira */}</section>
    </div>
  );
};
