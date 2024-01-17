import { Button, Label, TextInput, Textarea } from "flowbite-react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { courseApi } from "services";
import { useAuthContext } from "shared/contexts";
import { categoriesString } from "shared/util";
import { Course, isApiException } from "types";

type Props = {
  buttonName: string;
  type: "create" | "update";
  values?: Course;
  fetcher: () => Promise<void>;
  setCloseModal: () => void;
};

type ValidKeys = keyof Course;

export const CourseFormForModal = ({
  buttonName,
  type,
  values,
  fetcher,
  setCloseModal,
}: Props) => {
  const { register, handleSubmit, setValue } = useForm<Course>();
  const { user } = useAuthContext();

  useEffect(() => {
    if (type === "create") return;
    if (!values) return;

    Object.entries(values).forEach(([key, value]) => {
      if (key === "categories") {
        const newValue = categoriesString(values?.categories);
        setValue(key as ValidKeys, newValue);
        return;
      }

      setValue(key as ValidKeys, value);
    });
  }, []);

  const onSubmit = handleSubmit(async (data) => {
    if (!user) return;

    if (type === "create") {
      const newCourse = await courseApi.create(data, user?.id);

      if (newCourse === true) {
        fetcher();
        setCloseModal();
        return;
      }
      console.error("Erro ao criar curso. ", newCourse);
      return;
    }

    const newCourse = await courseApi.update(data);

    if (isApiException(newCourse) || !newCourse) {
      console.error("Erro ao atualizar curso. ", newCourse);
      return;
    }

    fetcher();
    setCloseModal();
    return;
  });

  return (
    <form onSubmit={onSubmit}>
      <div className="mb-2">
        <div className="mb-1 block">
          <Label htmlFor="titleCourse" value="Título" />
        </div>
        <TextInput
          id="titleCourse"
          type="text"
          placeholder="Curso de X"
          required
          {...register("title")}
        />
      </div>
      <div className="mb-2">
        <div className="mb-1 block">
          <Label htmlFor="image" value="Link da imagem" />
        </div>
        <TextInput
          id="image"
          type="text"
          placeholder="https://...jpg ...png"
          required
          {...register("image")}
        />
      </div>
      <div className="mb-2">
        <div className="mb-1 block">
          <Label htmlFor="description" value="Descrição" />
        </div>
        <Textarea
          id="description"
          placeholder="..."
          required
          {...register("description")}
        />
      </div>
      <div className="mb-2">
        <div className="mb-1 block">
          <Label htmlFor="categories" value="Categorias" />
        </div>
        <Textarea
          id="categories"
          placeholder="..."
          required
          {...register("categories")}
        />
      </div>
      <div className="w-full mt-4">
        <Button type="submit">{buttonName}</Button>
      </div>
    </form>
  );
};
