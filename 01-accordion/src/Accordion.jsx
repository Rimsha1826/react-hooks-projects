import { useState } from "react";

const data = [
  {
    id: 1,
    question: "What is React?",
    answer: "React is a JavaScript library for building user interfaces.",
  },
  {
    id: 2,
    question: "What are React Hooks?",
    answer: "Hooks are functions that let you use state and other React features in functional components.",
  },
  {
    id: 3,
    question: "What is useState?",
    answer: "useState is a Hook that lets you add state to functional components.",
  },
  {
    id: 4,
    question: "What is useEffect?",
    answer: "useEffect is a Hook that lets you perform side effects in functional components.",
  },
];

function Accordion() {
  const [selected, setSelected] = useState(null);
  const [multiSelect, setMultiSelect] = useState(false);
  const [multiSelected, setMultiSelected] = useState([]);

  function handleSingleClick(id) {
    setSelected(selected === id ? null : id);
  }

  function handleMultiClick(id) {
    setMultiSelected(
      multiSelected.includes(id)
        ? multiSelected.filter((item) => item !== id)
        : [...multiSelected, id]
    );
  }

  return (
    <div className="max-w-2xl mx-auto mt-10 px-4">
      <h1 className="text-3xl font-bold text-center mb-4">Accordion</h1>

      <div className="flex justify-center mb-8">
        <button
          onClick={() => setMultiSelect(!multiSelect)}
          className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition"
        >
          {multiSelect ? "Disable" : "Enable"} Multi Selection
        </button>
      </div>

      {data.map((item) => (
        <div key={item.id} className="border rounded-lg mb-3 overflow-hidden">
          <button
            onClick={() =>
              multiSelect
                ? handleMultiClick(item.id)
                : handleSingleClick(item.id)
            }
            className="w-full text-left px-6 py-4 bg-gray-100 hover:bg-gray-200 font-medium flex justify-between items-center"
          >
            {item.question}
            <span>
              {multiSelect
                ? multiSelected.includes(item.id) ? "−" : "+"
                : selected === item.id ? "−" : "+"}
            </span>
          </button>
          {multiSelect
            ? multiSelected.includes(item.id) && (
                <div className="px-6 py-4 bg-white text-gray-600">
                  {item.answer}
                </div>
              )
            : selected === item.id && (
                <div className="px-6 py-4 bg-white text-gray-600">
                  {item.answer}
                </div>
              )}
        </div>
      ))}
    </div>
  );
}

export default Accordion;