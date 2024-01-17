import { Button, Label, TextInput } from "flowbite-react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { courseApi } from "services";
import { useAuthContext } from "shared/contexts";
import { User } from "types";

type Props = {
  fetcher: () => Promise<void>;
  setCloseModal: () => void;
};

export const TeacherAddForm = ({ fetcher, setCloseModal }: Props) => {
  const { register, handleSubmit } = useForm<User>();
  const { user } = useAuthContext();
  const { id } = useParams();

  const onSubmit = handleSubmit(async (data) => {
    if (!user) return;

    const newTeacher = await courseApi.addTeacherInCourse(
      Number(id),
      data.email
    );

    if (newTeacher === true) {
      fetcher();
      setCloseModal();
      return;
    }
    console.error("Erro ao adicionar professor. ", newTeacher);
    return;
  });

  return (
    <form onSubmit={onSubmit}>
      <div className="mb-2">
        <div className="mb-1 block">
          <Label htmlFor="email" value="Email" />
        </div>
        <TextInput
          id="email"
          type="text"
          placeholder="email@email.com"
          required
          {...register("email")}
        />
      </div>
      <div className="w-full mt-4">
        <Button type="submit">Adicionar</Button>
      </div>
    </form>
  );
};
