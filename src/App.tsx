import React, { useState, useEffect } from "react";
import ColorBlock from "./components/ColorBlock";
import { MdOutlineShuffle } from "react-icons/md";
import Cookies from "js-cookie";
import Layout from "./layout/Layout";
import Modal from "./components/Modal";

function App() {
  const [colors, setColors] = useState([]);
  const [currentColor, setCurrentColor] = useState("");
  const [isolateColor, setIsolateColor] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const middleItem = Math.floor(colors.length / 2);

  useEffect(() => {
    if (Cookies.get("ts_isolate")) {
      setIsolateColor(true);
    } else {
      setIsolateColor(false);
    }
  }, [isolateColor]);

  return (
    <div className={`${darkMode ? "dark" : ""}`}>
      <Layout
        currentColor={currentColor}
        setCurrentColor={setCurrentColor}
        setColors={setColors}
        isolateColor={isolateColor}
        setIsolateColor={setIsolateColor}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        showInfo={showInfo}
        setShowInfo={setShowInfo}>
        <div
          className={`flex flex-wrap items-stretch mt-1  min-h-[calc(100vh_-_65px)] md:min-h-[calc(100vh_-_85px)] ${
            isolateColor ? "gap-1" : ""
          }`}>
          {colors.map((color, index) => {
            return (
              <ColorBlock
                isCurrentColor={index === middleItem}
                color={color}
                key={index}
              />
            );
          })}
          {showInfo && (
            <Modal
              className={`${darkMode && "dark"}`}
              dismissMethod={setShowInfo}>
              <div className="border-b border-slate-300 dark:border-slate-600 dark:text-slate-50 w-full py-4">
                <h1 className="text-lg font-plex">getshades.co</h1>
              </div>
              <div className="font-plex py-4">
               <p className="dark:text-slate-50">
  Use this tool to create tints and shades for any hex color.
</p>
<h2 className="py-2 mt-4 font-bold dark:text-slate-50">Usage</h2>
<ol className="list-decimal pl-5 dark:text-slate-50">
  <li className="py-1">
    Enter a hex color code manually or use the color picker in the top panel.
  </li>
  <li className="py-1">
    Select a percentage value (1 to 100) to determine the tints and shades.
  </li>
  <li className="py-1">
    Press 'Return' to generate results, or click the 'Shuffle' (
    <MdOutlineShuffle className="inline" />
    ) button to pick a random color.
  </li>
</ol>
              </div>
            </Modal>
          )}
        </div>
      </Layout>
    </div>
  );
}

export default App;
