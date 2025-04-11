import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Search from "../CacChucNang/Search";
import SearchResultModal from "../CacChucNang/SearchResultModal";
import { NODE } from "../../api";

function Header() {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [userName, setUserName] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      setUserName(user.hoTen || user.email);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/dangnhap");
  };

  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
  };

  const handleSearchSubmit = async () => {
    if (!searchText.trim()) return;

    try {
      const response = await fetch(`${NODE}/api/phones1?search=${searchText}`);

      if (!response.ok) {
        throw new Error("Lỗi kết nối đến API");
      }

      const data = await response.json();

      if (data && data.phones1) {
        setSearchResults(data.phones1);
        setIsSearchOpen(true);
      } else {
        alert("Không tìm thấy sản phẩm nào.");
        setSearchResults([]);
      }
    } catch (error) {
      console.error("❌ Lỗi khi tìm kiếm:", error);
      setSearchResults([]);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearchSubmit();
    }
  };

  return (
    <nav className="bg-Purple-dark w-full px-4 md:px-8 flex flex-wrap items-center justify-center py-4 mx-auto gap-7 top-0 left-0 z-30 ">
      <Link to="/home" className="flex items-center space-x-2">
        <img src="/img/LogoHinh.png" alt="Logo FLONE" className="w-8 h-8" />
        <img src="/img/LogoChu.png" alt="Logo FLONE" className="h-6 hidden md:flex" />
      </Link>

      <div className="relative flex w-full md:w-auto mt-4 md:mt-0">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 text-black dark:text-black">
          <svg className="w-5 h-5" aria-hidden="true" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <input
          type="text"
          id="search-input"
          className="w-full md:w-96 pl-10 pr-3 py-2 rounded-md border border-gray placeholder-black focus:outline-none focus:ring-blue focus:border-blue sm:text-sm"
          placeholder="Bạn cần tìm gì?"
          value={searchText}
          onChange={handleSearchChange}
          onKeyDown={handleKeyPress}
        />
        <button
          className="absolute inset-y-0 right-0 flex items-center pr-3 text-black dark:text-black border-l border-black px-2"
          onClick={() => setIsFilterOpen(true)}
        >
          <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16">
            <path d="M1.5 3.5A.5.5 0 0 1 2 3h12a.5.5 0 0 1 .4.8L10 9.5V14a.5.5 0 0 1-.76.43l-3-2A.5.5 0 0 1 6 12V9.5L1.6 4.3a.5.5 0 0 1 .4-.8z" />
          </svg>
        </button>
      </div>

      <div className="flex items-center space-x-4 mt-4 md:mt-0">
        {userName ? (
          <>
            <span className="text-white text-sm">Xin chào, <strong>{userName}</strong></span>
            <button
              onClick={handleLogout}
              className="px-4 py-2 text-white bg-red-500 hover:bg-red-600 rounded-md text-sm"
            >
              Đăng xuất
            </button>
          </>
        ) : (
          <Link
            to="/dangnhap"
            className="flex items-center px-4 py-2 text-white hover:text-metal bg-Purple-light rounded-md"
          >
            Đăng nhập
          </Link>
        )}

        <Link
          to="/giohang"
          className="flex items-center px-4 py-2 text-white hover:text-metal bg-Purple-light rounded-md"
        >
          Giỏ Hàng
        </Link>
      </div>

      {isFilterOpen && <Search onClose={() => setIsFilterOpen(false)} />}

      {isSearchOpen && (
        <SearchResultModal
          results={searchResults}
          onClose={() => setIsSearchOpen(false)}
        />
      )}
    </nav>
  );
}

export default Header;