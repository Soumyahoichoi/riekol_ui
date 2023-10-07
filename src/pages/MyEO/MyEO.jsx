import { Tab, Tabs } from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import "./styles.css";
import { Cards } from "../../constants";
import { EoCard } from "../../components/EoCard/EoCard";
import { useStore } from "../../store/store";
// import Cart from "../../components/Cart/Cart";

const MyEO = () => {
  return (
    <div className="flex justify-center flex-col container-box">
      <section className="border-1 border-slate-300 rounded-md dimension">
        <Tabs key="underlined" variant="underlined" aria-label="Tabs variants">
          <Tab key="a" title="A" />
          <Tab key="b" title="B" />
          <Tab key="c" title="C" />
        </Tabs>
      </section>

      <section className="card--content mt-4">
        {Cards.map((item) => (
          <EoCard
            key={item._id}
            image={item.thumb_image}
            startTime={item.startTime.trim()}
            endTime={item.endTime.trim()}
            date={item.eoDate?.trim()}
            name={item.name.trim()}
            id={item._id}
          />
        ))}
      </section>

      {/* <Cart /> */}
    </div>
  );
};

export default MyEO;
