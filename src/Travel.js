import { useParams } from "react-router-dom";
import { useEffect } from "react";
import Header from "./Header";
import { useState } from "react";

export default function Travel() {
  const { placeName } = useParams();
  const [startCount, addCount] = useState(1);
  const [things, setThings] = useState("");
  const [sortBy, setSort] = useState("order");
  const [items, setItems] = useState(() => {
    const saved = localStorage.getItem("items");
    return saved ? JSON.parse(saved) : [];
  });
  let sortedItems = [...items];
  if (sortBy === "order") {
    sortedItems = items;
  }
  if (sortBy === "desc") {
    sortedItems.sort((a, b) => a.name.localeCompare(b.name));
  }
  if (sortBy === "packed") {
    sortedItems.sort((a, b) => a.packed - b.packed);
  }

  useEffect(() => {
    localStorage.setItem("items", JSON.stringify(items));
  }, [items]);

  function addItem() {
    if (!things || !startCount) return;

    const newThing = {
      id: new Date(),
      name: things,
      count: startCount,
      packed: false,
    };

    setItems((prev) => [...prev, newThing]);
    setThings("");
    addCount(1);
  }
  return (
    <>
      <div className="top">
        <Header />
        <div className="things">
          <span>Item to pack</span>
          <input
            type="text"
            value={things}
            className="thing"
            onChange={(event) => setThings(event.target.value)}
          />
          <span>Count</span>

          <select
            value={startCount}
            onChange={(e) => addCount(Number(e.target.value))}
          >
            {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
              <option value={num} key={num}>
                {num}
              </option>
            ))}
          </select>
          <button className="addItem" onClick={addItem}>
            Add
          </button>
        </div>
        <h1>Welcome to {placeName}</h1>
      </div>
      {sortedItems.map((t) => (
        <div key={t.id}>
          <input
            type="checkbox"
            id="packed"
            name="subscribe"
            checked={t.packed}
            onChange={() =>
              setItems((prev) =>
                prev.map((item) =>
                  item.id === t.id ? { ...item, packed: !item.packed } : item,
                ),
              )
            }
          ></input>
          <li>{t.name}</li>
          <li>{t.count}</li>
          <button
            className="del btn"
            onClick={() =>
              setItems((prev) => prev.filter((item) => item.name !== t.name))
            }
          >
            ❌
          </button>
        </div>
      ))}

      <select
        className="sort"
        value={sortBy}
        onChange={(e) => setSort(e.target.value)}
      >
        <option className="order btn" value="order">
          SORT BY ORDER
        </option>
        <option className="desc btn" value="desc">
          SORT BY DESRIPTION
        </option>
        <option className="status btn" value="status">
          SORT BY PACKING STATUS
        </option>
      </select>
      <button
        className="clear btn"
        onClick={() => {
          if (window.confirm("Do you want to clear all items?")) {
            setItems([]);
          }
        }}
      >
        CLEAR LIST
      </button>
    </>
  );
}
