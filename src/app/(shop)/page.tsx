import getPaginatedProductsWhithImages from "@/actions/product/product-pagination";
import { Pagination, ProductGrid, Title } from "@/components";
import { redirect } from "next/navigation";

export const revalidate = 60;

interface Props {
  searchParams: Promise<{ page?: string }>;
}

export default async function Home({ searchParams }: Props) {
  const resolvedSearchParams = await Promise.resolve(searchParams);
  const page = resolvedSearchParams.page
    ? parseInt(resolvedSearchParams.page)
    : 1;

  const { products, totalPages } = await getPaginatedProductsWhithImages({
    page,
  });

  if (products.length === 0) {
    redirect("/");
  }

  return (
    <>
      <Title title="Tienda" subtitle="Todos los productos" className="mb-2" />
      <ProductGrid products={products} />
      <Pagination totalPages={totalPages} />
    </>
  );
}
