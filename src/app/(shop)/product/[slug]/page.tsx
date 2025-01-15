import {
  ProductMobileSlideshow,
  ProductSlideshow,
  QuantitySelector,
  SizeSelector,
} from "@/components";
import { titleFont } from "@/config/fonts";
import { initialData } from "@/seed/seed";
import { notFound } from "next/navigation";

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function ProductsBySlugPage({ params }: Props) {
  const resolvedParams = await Promise.resolve(params);
  const slug = resolvedParams.slug;

  const product = initialData.products.find((product) => product.slug === slug);

  if (!product) {
    notFound();
  }

  return (
    <div className="mt-5 mb-20 grid md:grid-cols-3 gap-3">
      <div className="col-span md:col-span-2">
        {/*Slideshow Mobile*/}
        <ProductMobileSlideshow
          images={product.images}
          title={product.title}
          className="block md:hidden"
        />
        {/*Slideshow Desktop*/}
        <ProductSlideshow
          images={product.images}
          title={product.title}
          className="hidden md:block"
        />
      </div>

      {/*Detalles*/}
      <div className="col-span-1 px-5 ">
        <h1 className={`${titleFont.className} antialiased font-bold text-xl`}>
          {product.title}
        </h1>
        <p className="text-lg mb-5">${product.price}</p>

        {/*Selector de tallas*/}
        <SizeSelector
          selectedSize={product.sizes[1]}
          availableSize={product.sizes}
        />

        {/*Selector Cantidad*/}
        <QuantitySelector quantity={1} />

        {/*Button*/}
        <button className="btn-primary my-5">Agregar al carrito</button>
        {/*Descripción*/}
        <h3 className="font-bold text-sm">Descripción</h3>
        <p className="font-light">{product.description}</p>
      </div>
    </div>
  );
}
