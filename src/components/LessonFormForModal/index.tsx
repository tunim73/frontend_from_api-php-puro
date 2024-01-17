import { Button, Label, Select, TextInput } from "flowbite-react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { lessonApi } from "services";
import { Lesson, isApiException } from "types";

type Props = {
  buttonName: string;
  type: "create" | "update";
  values?: Lesson;
  setCloseModal: () => void;
  fetcher: () => Promise<void>;
};

export const LessonFormForModal = ({
  buttonName,
  type,
  values,
  setCloseModal,
  fetcher,
}: Props) => {
  const {
    register,
    handleSubmit,
    setValue,
    setError,
    formState: { errors },
  } = useForm<Lesson>();
  const { id } = useParams();

  useEffect(() => {
    if (type === "create") return;
    if (!values) return;
    Object.entries(values).forEach(([key, value]) => {
      setValue(key as keyof Lesson, value);
    });
  }, []);

  const onSubmit = handleSubmit(async (data) => {
    data.lessonType.id = Number(data.lessonType.id);

    if (type === "create") {
      const newLesson = await lessonApi.create(data, Number(id));

      if (isApiException(newLesson)) {
        if (newLesson.message === "user not found") {
          setError("teacher.email", {
            type: "user not found",
            message: "Professor não localizado",
          });
          return;
        }
      }

      if (newLesson === false) {
        console.error("error no servidor");
        return;
      }
      await fetcher();
      setCloseModal();
      return;
    }

    //update
  });
  return (
    <form onSubmit={onSubmit}>
      <div className="mb-2">
        <div className="mb-1 block">
          <Label htmlFor="nameLesson" value="Título" />
        </div>
        <TextInput
          id="nameLesson"
          type="text"
          placeholder="Aula 00 - xxx"
          required
          {...register("name")}
        />
      </div>
      <div className="mb-2">
        <div className="mb-1 block">
          <Label htmlFor="lessonTypeId" value="Tipo de aula: " />
        </div>
        <Select
          id="lessonTypeId"
          {...register("lessonType.id")}
          defaultValue={"Selecione uma opção"}
        >
          <option value={1}>Texto</option>
          <option value={2}>Vídeo</option>
          <option value={3}>Aúdio</option>
          <option disabled value={"Selecione uma opção"}>
            Selecione uma opção
          </option>
        </Select>
      </div>
      <div className="mb-2">
        <div className="mb-1 block">
          <Label htmlFor="embed" value="Embed do youtube" />
        </div>
        <TextInput
          id="embed"
          type="text"
          placeholder="https://..."
          required
          {...register("embed")}
        />
      </div>
      <div className="mb-2">
        <div className="mb-1 block">
          <Label htmlFor="teacherEmail" value="Email do professor" />
        </div>
        <TextInput
          id="teacherEmail"
          placeholder="email@email.com"
          type="email"
          required
          color={errors.teacher ? "failure" : undefined}
          helperText={
            errors.teacher?.email?.message && (
              <span>{errors.teacher?.email?.message}</span>
            )
          }
          {...register("teacher.email")}
        />
      </div>
      <div className="w-full mt-4">
        <Button type="submit">{buttonName}</Button>
      </div>
    </form>
  );
};
