import { Button, Tab, Tabs } from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import "./styles.css";
import { Cards } from "../../constants";
import { EoCard } from "../../components/EoCard/EoCard";
import { useStore } from "../../store/store";
import { createSession } from "../../api/checkout";
import { getResultFromData } from "../../helper";
import { toast } from "sonner";
// import Cart from "../../components/Cart/Cart";

const isBrowser = typeof window !== "undefined";

const MyEO = () => {
  const cart = useStore((state) => state.cart);

  const handleCheckout = async () => {
    if (cart) {
      const session = await createSession(cart);
      const result = getResultFromData(session);

      if (isBrowser && result) {
        window.open(result, "_self", "noopener,noreferrer");
      } else {
        toast.error("Something went wrong!");
      }
    } else {
      toast.error("Please add something to the cart");
    }
  };

  return (
    <div className="flex justify-center flex-col container-box">
      <section className="primaryBox">
        <Tabs key="underlined" variant="underlined" aria-label="Tabs variants">
          <Tab key="a" title="All" />
          <Tab key="b" title="Sports" />
          <Tab key="c" title="Spirituality" />
          <Tab key="d" title="Experiential" />
          <Tab key="e" title="Interaction" />
          <Tab key="f" title="F&B" />
          <Tab key="g" title="Health & Wellness" />
        </Tabs>
      </section>

      <section className="card--content mt-12">
        {Cards.map((item) => (
          <EoCard
            key={item._id}
            image={item.thumb_image}
            startTime={item.startTime.trim()}
            endTime={item.endTime.trim()}
            date={item.eoDate?.trim()}
            name={item.name.trim()}
            id={item._id}
            description={item.description}
            champion={item.eventChampion}
            regFee={item.registrationfee}
            priceId={item.priceId}
          />
        ))}
      </section>
      <div class="floating-container">
        <Button
          color="danger"
          disabled={cart.length === 0}
          onClick={handleCheckout}
        >
          Checkout
        </Button>
        {/* <button class="button">Floating Button</button> */}
      </div>

      {/* <Cart /> */}
    </div>
  );
};

export default MyEO;
