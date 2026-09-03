import React from "react";
import { FaFilter } from "react-icons/fa6";
import { getData } from "../Context/DataContext";

const MobileFilter = ({
  openFilter,
  setOpenFilter,
  search,
  setSearch,
  category,
  setCategory,
  priceRange,
  setPriceRange,
  handleCategoryChange,
}) => {
  const { categoryOnlyData } = getData();

  const toggleFilter = ()=>{
    setOpenFilter(!openFilter)
  }
  return (
    <>
      <div className="bg-gray-100 flex justify-between items-center md:hidden px-4 p-2 mt-5 rounded-md">
        <h1 className="text-xl font-semibold">Filters</h1>
        <FaFilter onClick={toggleFilter} />
      </div>

      {openFilter ? (
        <div className="bg-gray-100 p-2 md:hidden">
          <input
            type="text"
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-white border-gray-400 rounded-md border-2 p-2 w-full"
          />
          {/* category only data */}

          <h1 className="mt-5 font-semibold text-xl">Category</h1>
          <div className="flex flex-col gap-2 mt-3">
            {categoryOnlyData?.map((item, index) => {
              return (
                <div key={index} className="flex gap-2">
                  <input
                    type="checkbox"
                    name={item}
                    checked={category === item}
                    value={item}
                    onChange={handleCategoryChange}
                  />
                  <button className="cursor-pointer uppercase">{item}</button>
                </div>
              );
            })}
          </div>
        </div>
      ) : null}

      {/* price range  */}

      <h1 className="mt-5 font-semibold text-xl md:hidden">Price Range</h1>

      <div className="flex flex-col gap-2  md:hidden">
        <label>
          Price Range: ${priceRange[0]} - ${priceRange[1]}
        </label>

        <input className="transition-all w-[200px] md:hidden"
          type="range"
          min="0"
          max="5000"
          value={priceRange[1]}
          onChange={(e) =>
            setPriceRange([priceRange[0], Number(e.target.value)])
          }
        />
      </div>
      <button
        className="bg-red-500 text-white rounded-md px-3 py-1 mt-5 cursor-pointer md:hidden"
        onClick={() => {
          setSearch("");
          setCategory("All");
          setPriceRange([0, 5000]); 
          setOpenFilter(false)
        }}>
        Reset Filters
      </button>
    </>
  );
};

export default MobileFilter;
