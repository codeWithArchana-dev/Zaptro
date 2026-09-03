import React, { useEffect, useState } from "react";
import FilterSection from "../Components/FilterSection";
import Loading from "../assets/Loading4.webm";
import { getData } from "../Context/DataContext";
import ProductCard from "../Components/ProductCard";
import Pagination from "../Components/Pagination";
import MobileFilter from "../Components/MobileFilter";

const Products = () => {
  const { data, fetchAllProducts } = getData();

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [priceRange, setPriceRange] = useState([0, 5000]);
  const [page, setPage] = useState(1);
  const [openFilter , setOpenFilter] =useState(false)

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
    setPage(1);
    setOpenFilter(false)
  };

  const pageHandler = (selectedPage) => {
    setPage(selectedPage);
    window.scrollTo(0,0)
  };

  const filteredData = data?.filter(
    (item) =>
      item.title.toLowerCase().includes(search.toLocaleLowerCase()) &&
      (category === "All" || item.category === category) &&
      item.price >= priceRange[0] &&
      item.price <= priceRange[1],
  );
  const dynamicPage = Math.ceil(filteredData.length / 4);

  useEffect(() => {
    fetchAllProducts();
    window.scrollTo(0,0);
  }, []);

  return (
    <div>
    <div className="max-w-6xl mx-auto px-4 mb-10">
      <MobileFilter openFilter={openFilter} setOpenFilter={setOpenFilter}  search={search}
              setSearch={setSearch}
              category={category}
              setCategory={setCategory}
              priceRange={priceRange}
              setPriceRange={setPriceRange}
              handleCategoryChange={handleCategoryChange}/>
      {data?.length > 0 ? (
        <>
          <div className="flex gap-8">
            <FilterSection
              search={search}
              setSearch={setSearch}
              category={category}
              setCategory={setCategory}
              priceRange={priceRange}
              setPriceRange={setPriceRange}
              handleCategoryChange={handleCategoryChange}
            />

            {filteredData?.length > 0 ? (
              <div className="flex flex-col justify-center items-center">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-7 mt-10">
                  {filteredData
                    ?.slice(page * 4 - 4, page * 4)
                    .map((product, index) => {
                      return <ProductCard key={index} product={product} />;
                    })}
                </div>
                <Pagination
                  pageHandler={pageHandler}
                  page={page}
                  dynamicPage={dynamicPage}
                />
              </div>
            ) : (
              <div className="flex justify-center items-center md:h-[600px] md:w-[900px]">
               {/* is pr lottie k through json data lana h */}
              </div>
            )}
          </div>
        </>
      ) : (
        <div className="flex items-center justify-center h-[400px]">
          <video muted autoPlay loop>
            <source src={Loading} type="video/webm" />
          </video>
        </div>
      )}
    </div>
    </div>
  );
};

export default Products;
