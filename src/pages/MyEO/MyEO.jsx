import { Tab, Tabs } from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import "./styles.css";
import { Cards } from "../../constants";
import { EoCard } from "../../components/EoCard/EoCard";
import { useStore } from "../../store/store";

const MyEO = () => {
  const [cartValues, setCartValues] = useState([]);
  const [bill, setBill] = useState(0);

  const setCart = useStore((state) => state.setCart);
  const onSelect = (cardDetails) => {
    switch (cardDetails.intent) {
      case "+": {
        const itemExists = cartValues.find(
          (item) => item.name === cardDetails.payLoad.name
        );

        if (itemExists) {
          setCartValues((cart) =>
            cart.map((item) =>
              item.name === cardDetails.payLoad.name
                ? { ...item, count: item.count + 1 }
                : item
            )
          );
        } else {
          setCartValues((cart) => [
            ...cart,
            Object.assign({ ...cardDetails.payLoad }, { count: 1 }),
          ]);
        }
        break;
      }
      case "-": {
        const itemExists = cartValues.find(
          (item) => item.name === cardDetails.payLoad.name
        );

        if (itemExists && itemExists.count > 1) {
          setCartValues((cart) =>
            cart.map((item) =>
              item.name === cardDetails.payLoad.name
                ? { ...item, count: item.count - 1 }
                : item
            )
          );
        } else {
          setCartValues((cart) =>
            cart.filter((item) => item.name !== cardDetails.payLoad.name)
          );
        }
        break;
      }
    }
  };

  useEffect(() => {
    if (cartValues.length > 0) {
      setBill(
        cartValues.reduce(
          (acc, item) => acc + +item.count * +item.registrationFee,
          0
        )
      );
      setCart({ cartValues, bill });
    } else {
      setBill(0);
      setCart(null);
    }
  }, [cartValues]);

  console.log(cartValues, bill);

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
            select={onSelect}
            registrationFee={item.registrationfee}
            quant={
              cartValues.filter(
                (_item) => _item.name.trim() === item.name.trim()
              )[0]
            }
            priceId={item.priceId}
          />
        ))}
      </section>
    </div>
  );
};

export default MyEO;
