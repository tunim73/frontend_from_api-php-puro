import {
  ModalForm,
  NewsCard,
  NewsFormForModal,
  PasswordFormForModal,
} from "components";
import { RegisterFormForModal } from "components/RegisterFormForModal";
import { Button, Dropdown } from "flowbite-react";
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { userApi } from "services";
import { useAuthContext } from "shared/contexts";
import { useHighlightedNews } from "shared/hooks";
import { User, isApiException, typeFieldsLoginForm } from "types";
import { SetErrorOfForm } from "types/SetErrorOfForm";

const fieldsUpdateRegistrationForm: typeFieldsLoginForm[] = [
  {
    id: "name",
    label: "Nome",
    type: "text",
    placeholder: "Remando...",
    required: true,
  },
  {
    id: "email",
    label: "email",
    type: "email",
    placeholder: "email@email.com",
    required: true,
  },
  {
    id: "cpf",
    label: "CPF",
    type: "text",
    placeholder: "123.456.789-99",
    required: true,
  },
  {
    id: "address",
    label: "Endereço",
    type: "text",
    placeholder: "...",
    required: false,
  },
  {
    id: "city",
    label: "Cidade",
    type: "text",
    placeholder: "Rio de Janeiro",
    required: false,
  },
  {
    id: "uf",
    label: "UF",
    type: "text",
    placeholder: "RJ",
    required: false,
  },
];

export const HighlightedNews = () => {
  const { user, signout } = useAuthContext();
  const { news, fetcher } = useHighlightedNews();
  const [openModalNewNews, setOpenModalNewNews] = useState(false);
  const [openModalUpdatePassword, setOpenModalUpdatePassword] = useState(false);
  const [openModalUpdateRegister, setOpenModalUpdateRegister] = useState(false);
  const navigate = useNavigate();

  const setCloseModal = () => {
    setOpenModalNewNews(false);
  };

  const onUpdateRegister = async (data: User, setError: SetErrorOfForm) => {
    if (!data) return;

    if (data.cpf?.length !== 14) {
      setError("cpf", {
        type: "cpf inc",
        message: "FORMATO CPF: 123.456.789-11",
      });
      return;
    }

    if (data.uf?.length !== 2) {
      setError("uf", {
        type: "cpf inc",
        message: "FORMATO UF: RJ",
      });
      return;
    }

    const newUser = await userApi.update(data);

    if (!newUser) {
      return;
    }
    if (isApiException(newUser)) {
      if (newUser.message === "Já existe usuário com esse email cadastrado")
        setError("email", {
          type: "user já cadastrado",
          message: "Já existe usuário com esse email cadastrado",
        });

      if (newUser.message === "Já existe usuário com esse cpf cadastrado")
        setError("cpf", {
          type: "user já cadastrado",
          message: "Já existe usuário com esse cpf cadastrado",
        });
      return;
    }
    signout();
    navigate("/login");
    return;
  };

  return (
    <div className="w-full h-full lg:px-24 md:px-24 px-3">
      <div className="w-full flex justify-between items-center flex-wrap mb-2 ">
        <h2 className="text-2xl font-bold text-gray-700 mb-4 mt-2 ">
          Principais Notícias
        </h2>

        <div>
          <Dropdown
            color="yellow"
            label="Configurações do usuário"
            dismissOnClick={false}
          >
            <Dropdown.Item onClick={() => setOpenModalUpdateRegister(true)}>
              Alterar dados cadastrais
            </Dropdown.Item>
            <Dropdown.Item onClick={() => setOpenModalUpdatePassword(true)}>
              Alterar senha
            </Dropdown.Item>
          </Dropdown>
        </div>
      </div>
      <ModalForm
        title="Nova notícia"
        openModal={openModalNewNews}
        setOpenModal={setOpenModalNewNews}
      >
        <NewsFormForModal
          setCloseModal={setCloseModal}
          type="create"
          buttonName="Novo"
          fetcher={fetcher}
        />
      </ModalForm>
      {user?.type === 1 && (
        <Button
          color="green"
          className={"mb-4"}
          onClick={() => setOpenModalNewNews(true)}
        >
          Nova Notícia
        </Button>
      )}
      <NavLink
        to={`/noticias`}
        className={
          "inline-flex items-center text-blue-600 hover:underline mb-10"
        }
      >
        {"-> Veja mais Notícias aqui <-"}
      </NavLink>
      <section className="flex justify-center gap-10 flex-wrap mb-10">
        {news.map((e) => {
          return <NewsCard key={e.id} item={e} />;
        })}
      </section>

      <ModalForm
        title="Atualização de dados cadastrais"
        openModal={openModalUpdateRegister}
        setOpenModal={setOpenModalUpdateRegister}
      >
        <RegisterFormForModal
          type="update"
          buttonName="Atualizar"
          values={user}
          fields={fieldsUpdateRegistrationForm}
          actionOnSubmit={onUpdateRegister}
          fetcher={fetcher}
          setCloseModal={setCloseModal}
        />
      </ModalForm>

      <ModalForm
        title="Atualização da senha"
        openModal={openModalUpdatePassword}
        setOpenModal={setOpenModalUpdatePassword}
      >
        <PasswordFormForModal />
      </ModalForm>
    </div>
  );
};
