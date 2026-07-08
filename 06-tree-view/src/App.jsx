import MenuList from "./MenuList";
import menus from "./data";

function App() {
  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="max-w-sm mx-auto bg-white rounded-2xl shadow-lg p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Navigation Menu</h1>
        <MenuList items={menus} />
      </div>
    </div>
  );
}

export default App;