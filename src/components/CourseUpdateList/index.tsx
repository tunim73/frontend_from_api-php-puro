import { CourseFormForModal, ModalForm, UpdateButton } from "components";
import { LessonFormForModal } from "components/LessonFormForModal";
import { ListGroup } from "flowbite-react";
import {
  LessonRemoveForm,
  TeacherAddForm,
  TeacherRemoveForm,
} from "pages/private";
import { useCallback, useState } from "react";
import { Course } from "types";

type Props = {
  values: Course;
  fetcher: () => Promise<void>;
};

export const CourseUpdateList = ({ values, fetcher }: Props) => {
  const [showListGroup, setShowListGroup] = useState(false);

  const [modalAboutCourseUpdate, setModalAboutCourseUpdate] = useState(false);
  const [modalAboutLessonAdd, setModalAboutLessonAdd] = useState(false);
  const [modalAboutLessonRemove, setModalAboutLessonRemove] = useState(false);
  const [modalAboutTeacherAdd, setModalAboutTeacherAdd] = useState(false);
  const [modalAboutTeacherRemove, setModalAboutTeacherRemove] = useState(false);

  const closeAllModals = useCallback(() => {
    setModalAboutCourseUpdate(false);
    setModalAboutLessonAdd(false);
    setModalAboutLessonRemove(false);
    setModalAboutTeacherAdd(false);
    setModalAboutTeacherRemove(false);
  }, []);

  const onClickListGroup = () => {
    setShowListGroup((e) => !e);
  };

  const openModalAboutCourseUpdate = () => {
    setModalAboutCourseUpdate((e) => !e);
    onClickListGroup();
  };

  const openModalAboutLessonAdd = () => {
    setModalAboutLessonAdd((e) => !e);
    onClickListGroup();
  };

  const openModalAboutLessonRemove = () => {
    setModalAboutLessonRemove((e) => !e);
    onClickListGroup();
  };

  const openModalAboutTeacherAdd = () => {
    setModalAboutTeacherAdd((e) => !e);
    onClickListGroup();
  };

  const openModalAboutTeacherRemove = () => {
    setModalAboutTeacherRemove((e) => !e);
    onClickListGroup();
  };

  return (
    <div className="flex mt-[18px] relative">
      <UpdateButton
        colorButton="yellow"
        colorSVG="#374151"
        actionOnClick={onClickListGroup}
        className=""
      />
      {showListGroup && (
        <ListGroup
          className="absolute
          left-0 mt-11 ml-[-85px] bg-white border border-gray-300 rounded shadow"
        >
          <ListGroup.Item onClick={openModalAboutCourseUpdate}>
            Atualizar Curso
          </ListGroup.Item>
          <ListGroup.Item onClick={openModalAboutLessonAdd}>
            Adicionar Aula
          </ListGroup.Item>
          <ListGroup.Item onClick={openModalAboutLessonRemove}>
            Remover Aula
          </ListGroup.Item>
          <ListGroup.Item onClick={openModalAboutTeacherAdd}>
            Adicionar Professor
          </ListGroup.Item>
          <ListGroup.Item onClick={openModalAboutTeacherRemove}>
            Remover Professor
          </ListGroup.Item>
        </ListGroup>
      )}
      <ModalForm
        title="Atualizar Curso"
        openModal={modalAboutCourseUpdate}
        setOpenModal={setModalAboutCourseUpdate}
      >
        <CourseFormForModal
          type="update"
          buttonName="Atualizar"
          fetcher={fetcher}
          values={values}
          setCloseModal={closeAllModals}
        />
      </ModalForm>
      <ModalForm
        title="Adicionar Aula"
        openModal={modalAboutLessonAdd}
        setOpenModal={setModalAboutLessonAdd}
      >
        <LessonFormForModal
          buttonName="Adicionar"
          type="create"
          fetcher={fetcher}
          setCloseModal={closeAllModals}
        />
      </ModalForm>
      <ModalForm
        title="Remover Aula"
        openModal={modalAboutLessonRemove}
        setOpenModal={setModalAboutLessonRemove}
      >
        <LessonRemoveForm
          fetcher={fetcher}
          setCloseModal={closeAllModals}
          values={values.lessons ? values.lessons : []}
        />
      </ModalForm>
      <ModalForm
        title="Adicionar Professor"
        openModal={modalAboutTeacherAdd}
        setOpenModal={setModalAboutTeacherAdd}
      >
        <TeacherAddForm fetcher={fetcher} setCloseModal={closeAllModals} />
      </ModalForm>
      <ModalForm
        title="Remover Professor"
        openModal={modalAboutTeacherRemove}
        setOpenModal={setModalAboutTeacherRemove}
      >
        <TeacherRemoveForm
          fetcher={fetcher}
          values={values.teachers ? values.teachers : []}
          setCloseModal={closeAllModals}
        />
      </ModalForm>
    </div>
  );
};
