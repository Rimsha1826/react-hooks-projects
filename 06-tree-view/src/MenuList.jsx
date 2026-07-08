import { useState } from "react";

function MenuItem({ item }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <li className="my-1">
      <div
        className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="font-medium text-gray-800">{item.label}</span>
        {item.children && (
          <span className="text-gray-400 text-sm">{isOpen ? "▼" : "▶"}</span>
        )}
      </div>

      {/* Recursive part — agar children hain toh MenuList dobara render karo */}
      {item.children && isOpen && (
        <MenuList items={item.children} />
      )}
    </li>
  );
}

function MenuList({ items }) {
  return (
    <ul className="pl-4 border-l-2 border-gray-200 ml-3">
      {items.map((item, index) => (
        <MenuItem key={index} item={item} />
      ))}
    </ul>
  );
}

export default MenuList;