import { Button, Label, Select, TextInput, Textarea } from "flowbite-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { categoryApi, productApi } from "services";
import { useAuthContext } from "shared/contexts";
import { Category, Product, ProductCreate, isApiException } from "types";

type Props = {
  buttonName: string;
  type: "create" | "update";
  values?: ProductCreate;
  fetcher: () => Promise<void>;
  setCloseModal: () => void;
};

type ValidKeys = keyof Product;

export const ProductFormForModal = ({
  buttonName,
  type,
  values,
  fetcher,
  setCloseModal,
}: Props) => {
  const { register, handleSubmit, setValue } = useForm<Product>();
  const [categories, setCategories] = useState<Category[]>([]);
  const { user } = useAuthContext();

  useEffect(() => {
    categoryApi.findAll().then((e) => setCategories(e));

    if (type === "create") return;
    if (!values) return;

    /* Object.entries(values).forEach(([key, value]) => {
      
      setValue(key as ValidKeys, value);
    }); */
  }, []);

  const onSubmit = handleSubmit(async (data) => {
    if (!user) return;

    if (type === "create") {
      data.userId = user?.id;
      const newProduct = await productApi.create(data);

      if (newProduct === true) {
        fetcher();
        setCloseModal();
        return;
      }
      console.error("Erro ao criar curso. ", newProduct);
      return;
    }

    const newProduct = await productApi.update(data);

    if (isApiException(newProduct) || !newProduct) {
      console.error("Erro ao atualizar curso. ", newProduct);
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
          <Label htmlFor="name" value="Selecione a categoria" />
        </div>
        <Select
          {...register("categoryId")}
          defaultValue={"Selecione uma opção"}
        >
          {categories.map((e) => {
            return (
              <option value={e.id} key={e.id}>
                {e.name}
              </option>
            );
          })}
          <option disabled value={"Selecione uma opção"}>
            Selecione uma opção
          </option>
        </Select>
      </div>
      <div className="mb-2">
        <div className="mb-1 block">
          <Label htmlFor="nameProduct" value="Nome" />
        </div>
        <TextInput
          id="nameProduct"
          type="text"
          placeholder="nome do produto"
          required
          {...register("name")}
        />
      </div>

      <div className="mb-2">
        <div className="mb-1 block">
          <Label htmlFor="quantityProduct" value="Quantidade" />
        </div>
        <TextInput
          id="quantityProduct"
          type="number"
          placeholder="20"
          required
          {...register("quantity")}
        />
      </div>

      <div className="mb-2">
        <div className="mb-1 block">
          <Label htmlFor="valueProduct" value="Valor" />
        </div>
        <TextInput
          id="valueProduct"
          type="number"
          placeholder="5000"
          required
          {...register("value")}
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

      <div className="w-full mt-4">
        <Button type="submit">{buttonName}</Button>
      </div>
    </form>
  );
};
