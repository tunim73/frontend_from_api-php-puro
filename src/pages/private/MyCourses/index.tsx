import { CourseCard, CourseFormForModal, ModalForm } from "components";
import { Button } from "flowbite-react";
import { useState } from "react";
import { useAuthContext } from "shared/contexts";
import { useMyCourses } from "shared/hooks";

export const MyCourses = () => {
  const { courses, fetcher } = useMyCourses();
  const { user } = useAuthContext();
  const [openModal, setOpenModal] = useState(false);

  return (
    <div className="w-full h-full lg:px-24 md:px-24 px-3">
      <div className="w-full flex justify-start">
        <h2 className="text-2xl font-bold text-gray-700 mb-4 mt-2 ">
          Meus Cursos
        </h2>
      </div>
      {user?.type === "teacher" && (
        <>
          <ModalForm
            title="Novo Curso"
            openModal={openModal}
            setOpenModal={setOpenModal}
          >
            <CourseFormForModal type="create" buttonName="Novo" fetcher={fetcher} />
          </ModalForm>
          <Button
            color="green"
            className={"mb-10"}
            onClick={() => setOpenModal(true)}
          >
            Novo Curso
          </Button>
        </>
      )}
      <section className="flex justify-center gap-10 flex-wrap">
        {courses.map((course) => {
          return (
            <CourseCard
              key={course.id}
              categories={course.categories}
              description={course.description}
              id={course.id}
              title={course.title}
              image={course.image}
            />
          );
        })}
      </section>
    </div>
  );
};
