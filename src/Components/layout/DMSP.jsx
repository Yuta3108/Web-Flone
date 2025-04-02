function DMSP() {
  return (
    <nav className="bg-Purple-dark max-w-7xl w-8/12 flex-wrap justify-center md:justify-around items-center rounded-lg py-4 mx-auto mt-8 mb-8 lg:flex hidden md:flex">
      {[
        "Iphone",
        "Oppo",
        "Huawei",
        "SamSung",
        "RealMi",
        "Xiaomi",
        "Vivo",
      ].map((item, index) => (
        <div key={index} className="flex space-x-4 mx-2 my-2">
          <a
            href="#"
            className="px-4 py-2 text-white hover:text-metal hover:bg-white rounded-lg transition-all duration-200"
          >
            {item}
          </a>
        </div>
      ))}
    </nav>
  );
}

export default DMSP;