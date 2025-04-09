import React, { useState } from "react";
import SearchResultModal from "./SearchResultModal";

function Search({ onClose }) {
  const [searchText, setSearchText] = useState("");
  const [category, setCategory] = useState("");
  const [selectedPriceRange, setSelectedPriceRange] = useState("Tất cả");
  const [searchResults, setSearchResults] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const priceRanges = [
    { label: "Tất cả", min: null, max: null },
    { label: "Dưới 500,000đ", min: null, max: 500000 },
    { label: "500,000đ - 5,000,000đ", min: 500000, max: 5000000 },
    { label: "5,000,000đ - 15,000,000đ", min: 5000000, max: 15000000 },
    { label: "15,000,000đ - 30,000,000đ", min: 15000000, max: 30000000 },
    { label: "Trên 30,000,000đ", min: 30000000, max: null },
  ];

  const handlePriceRangeChange = (range) => {
    setSelectedPriceRange(range.label);
  };

  const handleApplyFilters = async () => {
    const selectedRange = priceRanges.find(
      (range) => range.label === selectedPriceRange
    );

    const minPrice = selectedRange.min;
    const maxPrice = selectedRange.max;

    try {
      const response = await fetch(`api/phones1?search=${searchText}&category=${category}&minPrice=${
          minPrice || ""
        }&maxPrice=${maxPrice || ""}`,
        {
          method: "GET",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }

      const data = await response.json();
      setSearchResults(data.phones1 || []);
      setIsModalOpen(true);
    } catch (error) {
      console.error("Error during search:", error);
    }
  };

  return (
    <>
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 w-full ">
        <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
          <h3 className="text-lg font-semibold mb-4">Bộ lọc tìm kiếm</h3>
          <div className="mb-4">
            <label className="block text-sm font-medium text-black mb-2">
              Tìm kiếm:
            </label>
            <input
              type="text"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              placeholder="Nhập tên sản phẩm..."
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-black mb-2">
              Thương Hiệu
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-3 py-2 border rounded-md"
            >
              <option value="">Tất cả</option>
              <option value="1">Xiaomi</option>
              <option value="2">Oppo</option>
              <option value="3">Iphone</option>
              <option value="4">Vivo</option>
              <option value="5">SamSung</option>
              <option value="7">Realme</option>
              <option value="8">Huawei</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-black mb-2">
              Lọc Giá
            </label>
            <div className="flex flex-col space-y-2">
              {priceRanges.map((range) => (
                <label
                  key={range.label}
                  className="flex items-center space-x-2"
                >
                  <input
                    type="radio"
                    name="priceRange"
                    value={range.label}
                    checked={selectedPriceRange === range.label}
                    onChange={() => handlePriceRangeChange(range)}
                    className="w-4 h-4 text-blue border-gray focus:ring-blue"
                  />
                  <span className="text-sm">{range.label}</span>
                </label>
              ))}
            </div>
          </div>
          <div className="flex justify-end space-x-4">
            <button
              onClick={onClose}
              className="items-center bg-Purple-dark text-white hover:bg-Purple-light transition-colors rounded-lg px-4 py-2"
            >
              Đóng
            </button>
            <button
              onClick={handleApplyFilters}
              className="items-center bg-Purple-dark text-white hover:bg-Purple-light transition-colors rounded-lg px-4 py-2"
            >
              Áp dụng
            </button>
          </div>
        </div>
      </div>
      {isModalOpen && (
        <SearchResultModal
          results={searchResults}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </>
  );
}

export default Search;