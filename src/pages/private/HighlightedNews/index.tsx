import { ModalForm, NewsCard, NewsFormForModal } from "components";
import { Button } from "flowbite-react";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useAuthContext } from "shared/contexts";
import { useHighlightedNews } from "shared/hooks";

export const HighlightedNews = () => {
  const { user } = useAuthContext();
  const { news, fetcher } = useHighlightedNews();
  const [openModal, setOpenModal] = useState(false);

  const setCloseModal = () => {
    setOpenModal(false);
  };

  return (
    <div className="w-full h-full lg:px-24 md:px-24 px-3">
      <div className="w-full flex justify-start">
        <h2 className="text-2xl font-bold text-gray-700 mb-4 mt-2 ">
          Principais Notícias
        </h2>
      </div>
      <ModalForm
        title="Nova notícia"
        openModal={openModal}
        setOpenModal={setOpenModal}
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
          onClick={() => setOpenModal(true)}
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
    </div>
  );
};
