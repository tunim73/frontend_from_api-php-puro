import { ProductCard, ModalForm, ProductFormForModal } from "components";
import { Button } from "flowbite-react";
import { useState } from "react";
import { useAuthContext } from "shared/contexts";
import { useMyProducts } from "shared/hooks";

export const MyProducts = () => {
  const { user } = useAuthContext();
  const { products, fetcher } = useMyProducts();

  const [openModal, setOpenModal] = useState(false);

  const setCloseModal = () => {
    setOpenModal(false);
  };

  return (
    <div className="w-full h-full lg:px-24 md:px-24 px-3">
      <div className="w-full flex justify-start">
        <h2 className="text-2xl font-bold text-gray-700 mb-4 mt-2 ">
          Meus Produtos
        </h2>
      </div>
      <ModalForm
        title="Novo Curso"
        openModal={openModal}
        setOpenModal={setOpenModal}
      >
        <ProductFormForModal
          setCloseModal={setCloseModal}
          type="create"
          buttonName="Novo"
          fetcher={fetcher}
        />
      </ModalForm>
      <Button
        color="green"
        className={"mb-10"}
        onClick={() => setOpenModal(true)}
      >
        Novo Curso
      </Button>
      <section className="flex justify-center gap-10 flex-wrap mb-10">
        {products.map((e) => {
          return <ProductCard key={e.cod} item={e} />;
        })}
      </section>
    </div>
  );
};
