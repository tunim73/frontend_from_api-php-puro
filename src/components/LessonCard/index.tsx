import { ModalForm, UpdateButton } from "components";
import { LessonFormForModal } from "components/LessonFormForModal";
import { Card } from "flowbite-react";
import { useState } from "react";
import { useAuthContext } from "shared/contexts";
import { Lesson } from "types";

export const LessonCard = ({
  id,
  lessonType,
  name,
  watched,
  embed,
}: Lesson) => {
  const { user } = useAuthContext();
  const [openModal, setOpenModal] = useState(false);

  const valu = {
    id: 4,
    name: "Aula 01 - Typescript",
    embed: "https://www.youtube.com/embed/74Rks96yaAY?si=xkjX8DeDcTYMfnno",
    lessonTypeId: 2,
    courseId: 2,
    teacherId: 2,
    teacher: {
      id: 2,
      email: "iruka@email.com",
      name: "iruka",
      type: "teacher",
    },
    lessonType: {
      id: 2,
      type: "vídeo",
    },
  };

  const onClickForOpenModal = () => {
    setOpenModal(true);
  };

  const onClickWatchedButton = () => {};

  return (
    <Card className="max-w-xl w-full flex justify-center">
      <div className="w-full flex justify-center ">
        <iframe
          className=""
          width="560"
          height="315"
          src={embed}
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        ></iframe>
      </div>

      <div className="flex justify-between">
        <div className="flex justify-items-start">
          <h5 className="text-base font-bold tracking-tight text-gray-900 dark:text-white">
            {name}
          </h5>
          {user?.type === "student" && watched && (
            <button className="ml-2" onClick={onClickWatchedButton}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                x="0px"
                y="0px"
                width="38"
                height="38"
                viewBox="0 0 48 48"
              >
                <path
                  fill="#c8e6c9"
                  d="M44,24c0,11-9,20-20,20S4,35,4,24S13,4,24,4S44,13,44,24z"
                ></path>
                <polyline
                  fill="none"
                  stroke="#4caf50"
                  strokeMiterlimit="10"
                  strokeWidth="4"
                  points="14,24 21,31 36,16"
                ></polyline>
              </svg>
            </button>
          )}
          {user?.type === "student" && !watched && (
            <button className="ml-2" onClick={onClickWatchedButton}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                x="0px"
                y="0px"
                width="38"
                height="38"
                viewBox="0 0 48 48"
              >
                <path
                  fill="#888888"
                  d="M44,24c0,11-9,20-20,20S4,35,4,24S13,4,24,4S44,13,44,24z"
                ></path>
                <polyline
                  fill="none"
                  stroke="#ffffff"
                  strokeMiterlimit="10"
                  strokeWidth="4"
                  points="14,24 21,31 36,16"
                ></polyline>
              </svg>
            </button>
          )}
        </div>
      </div>
      <div className="flex justify-between items-center">
        <p className="font-normal capitalize text-gray-700 dark:text-gray-400">
          Formato: {lessonType.type}
        </p>
        {user?.type === "teacher" && (
          <UpdateButton actionOnClick={onClickForOpenModal} />
        )}

        <ModalForm
          title="Atualizar Aula"
          openModal={openModal}
          setOpenModal={setOpenModal}
        >
          <LessonFormForModal
            buttonName="Atualizar"
            type="update"
            values={valu}
          />
        </ModalForm>
      </div>
    </Card>
  );
};
