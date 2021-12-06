import React, { useState } from "react";
import AppNavBar from "../../components/AppNavBar";
import AppHeader from "../../components/AppHeader";
import KakaoMap from "../../components/KakaoMap";
import Layer from "../../components/Layer";
import ListPlace from "../../components/ListPlace";

const Home: React.FC = function () {
  const [mode, setMode] = useState<Number>(0);

  const changeMode = (newMode: Number): void => {
    setMode(newMode);
  };

  return (
    <>
      <AppHeader />
      <KakaoMap mode={mode} />
      <AppNavBar onChangeMode={changeMode} mode={mode} />
      <Layer visible>
        <ListPlace />
      </Layer>
    </>
  );
};

export default Home;
