import getPaginatedProductsWithImages from "@/actions/product/product-pagination";
import { Pagination, ProductGrid, Title } from "@/components";

import { Gender } from "@prisma/client";
import { redirect } from "next/navigation";

// Revalidación en 60 segundos
export const revalidate = 60;

interface Props {
  params: Promise<{ gender: string }>;
  searchParams: Promise<{ page?: string }>;
}

export default async function GenderByPage({ params, searchParams }: Props) {
  // Resolver ambas promesas
  const resolvedParams = await Promise.resolve(params);
  const resolvedSearchParams = await Promise.resolve(searchParams);

  // Extraer valores
  const gender = resolvedParams.gender as Gender;
  const page = resolvedSearchParams.page
    ? parseInt(resolvedSearchParams.page)
    : 1;

  // Obtener productos
  const { products, totalPages } = await getPaginatedProductsWithImages({
    page,
    gender,
  });

  // Redirigir si no hay productos
  if (products.length === 0) {
    redirect(`/gender/${gender}`);
  }

  // Etiquetas traducidas
  const labels: Record<string, string> = {
    men: "para hombres",
    women: "para mujeres",
    kid: "para niños",
    unisex: "para todos",
  };

  return (
    <>
      <Title
        title={`Artículos de ${labels[gender]}`}
        subtitle="Todos los productos"
        className="mb-2"
      />
      <ProductGrid products={products} />
      <Pagination totalPages={totalPages} />
    </>
  );
}
