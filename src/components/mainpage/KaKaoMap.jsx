import React, { useState } from "react";
import Map from "./mapcomp/Map.jsx";
import Pics from "./Pics.jsx";
import MapBox from "./mapcomp/MapBox.jsx";
import { picData } from "./picData.js";

const KakaoMap = ({ keyword }) => {
  const [selectedIndex, setSelectedIndex] = useState(null);

  const filteredData = picData.filter((item) =>
    item.name.toLowerCase().includes(keyword.toLowerCase())
  );

  return (
    <>
      <MapBox>
        <Map
          data={filteredData} // map의 data에 pic data 저장
          selectedIndex={selectedIndex}
          onMarkerClick={setSelectedIndex}
        />
      </MapBox>
      <Pics
        data={filteredData} // pic의 data에 pic data 저장
        selectedIndex={selectedIndex}
        onSelect={setSelectedIndex}
      />
    </>
  );
};

export default KakaoMap;
