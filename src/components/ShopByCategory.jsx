import React from "react";
import { Link } from "react-router-dom";
import ArrowUpRight from "lucide-react/dist/esm/icons/arrow-up-right";

export default function ShopByCategory({ categories = [], loading = false }) {
  const filteredCategories = categories.filter((cat) => {
    const name = cat.name?.toLowerCase() || "";
    const slug = cat.slug?.toLowerCase() || "";
    return (
      !name.includes("laptop") &&
      !slug.includes("laptop") &&
      !name.includes("computer") &&
      !name.includes("pc") &&
      !name.includes("chromebook") &&
      !name.includes("notebook")
    );
  });

  const subcategories = filteredCategories
    .flatMap((parent) => parent.children || [])
    .filter((sub) => {
      const name = sub.name?.toLowerCase() || "";
      const slug = sub.slug?.toLowerCase() || "";
      return (
        !name.includes("laptop") &&
        !slug.includes("laptop") &&
        !name.includes("computer") &&
        !name.includes("pc")
      );
    })
    .slice(0, 12);

  const getImagePath = (image) => {
    if (!image) return "https://via.placeholder.com/300x300?text=Category";
    if (image.startsWith("http")) return image;
    return `/${String(image).replace(/\\/g, "/")}`;
  };

  const getProductCount = (item) => {
    if (typeof item.product_count === "number") return item.product_count;
    if (typeof item.products_count === "number") return item.products_count;
    if (Array.isArray(item.products)) return item.products.length;
    return 0;
  };

  return (
    <section className="w-full bg-white py-10 md:py-12 px-4 md:px-8 lg:px-10">
      <div className="max-w-[1900px] mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between gap-4 mb-8">
          <h2 className="text-[24px] md:text-[30px] font-semibold text-slate-900 tracking-tight">
            Popular Categories
          </h2>

          <Link
            to="/shop"
            className="inline-flex items-center gap-1 text-[14px] md:text-[15px] font-medium text-blue-800 hover:text-red-600 transition-colors"
          >
            See All Deals
            <ArrowUpRight size={16} />
          </Link>
        </div>

        {/* Categories */}
        {loading ? (
          <div className="flex gap-6 overflow-x-auto">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="min-w-[120px] flex flex-col items-center animate-pulse"
              >
                <div className="w-[100px] h-[100px] rounded-full bg-slate-200 mb-3" />
                <div className="h-4 w-20 rounded bg-slate-200 mb-2" />
                <div className="h-3 w-16 rounded bg-slate-100" />
              </div>
            ))}
          </div>
        ) : (
          <div className="flex items-start gap-6 md:gap-8 overflow-x-auto scrollbar-hide pb-2">
            {subcategories.map((item) => (
              <Link
                key={item.id}
                to={`/shop?category=${item.slug}`}
                className="group min-w-[110px] md:min-w-[125px] flex flex-col items-center text-center"
              >
                {/* Circle Image */}
                <div className="relative w-[92px] h-[92px] md:w-[110px] md:h-[110px] rounded-full overflow-hidden  shadow-sm flex items-center justify-center">
                  <img
                    src={getImagePath(item.image)}
                    alt={item.name}
                    width="110"
                    height="110"
                    loading="lazy"
                    decoding="async"
                    className="max-h-full max-w-full object-cover transition-opacity duration-300"
                    onError={(e) => {
                      e.currentTarget.src = `https://via.placeholder.com/110x110?text=${encodeURIComponent(
                        item.name
                      )}`;
                    }}
                  />
                </div>

                {/* Title */}
                <h3 className="mt-3 text-[18px] leading-tight  text-slate-900 group-hover:text-slate-700 transition-colors">
                  {item.name}
                </h3>

              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}