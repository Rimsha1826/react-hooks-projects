const menus = [
  {
    label: "Home",
    to: "/",
  },
  {
    label: "About",
    to: "/about",
  },
  {
    label: "Products",
    children: [
      {
        label: "Electronics",
        children: [
          { label: "Phones", to: "/phones" },
          { label: "Laptops", to: "/laptops" },
        ],
      },
      {
        label: "Clothing",
        children: [
          { label: "Men", to: "/men" },
          { label: "Women", to: "/women" },
        ],
      },
    ],
  },
  {
    label: "Services",
    children: [
      { label: "Web Design", to: "/web-design" },
      { label: "Development", to: "/development" },
    ],
  },
  {
    label: "Contact",
    to: "/contact",
  },
];

export default menus;