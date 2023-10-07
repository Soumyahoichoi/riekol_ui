import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { Cards } from "../../constants";
import dayjs from "dayjs";
import "./styles.css";
import LocalizedFormat from "dayjs/plugin/localizedFormat";
import SeatsLeft from "../../assets/seats_left";
import { Button } from "@nextui-org/react";
import RemoveFromCart from "../../assets/removeFromCart";
import AddToCart from "../../assets/addToCart";
import Time from "../../assets/time";
import { useStore } from "../../store/store";
dayjs.extend(LocalizedFormat);

const EoDetails = () => {
  const params = useParams();
  const [count, setCount] = useState(1);
  const details = Cards.find((item) => item._id === params.id);

  const dateFormatted = dayjs(details.eoDate).format("LL");
  const startTimeFormatted = dayjs(details.startTime).format("LT");
  const endTimeFormatted = dayjs(details.endTime).format("LT");

  const { cart, setCart } = useStore((state) => state);

  const onAddToCart = () => {
    const newCart = cart.filter((item) => item.name !== details.name);

    newCart.push({
      name: details.name,
      start_time: details.startTime,
      end_time: details.endTime,
      date: details.eoDate,
      registration_fee: details.registrationfee,
      price_id: details.priceId,
      count: count,
    });

    setCart(newCart);
  };

  console.log(cart);
  return (
    <div>
      <main className="border-1 border-slate-300 w-full rounded-md  cursor-pointer">
        <section className="rounded-md">
          <img src={details?.thumb_image} alt="image" className="rounded-md" />
        </section>
        <section className="flex items-start flex-col second text-sm p-2 gap-2">
          <p className="font-semibold text-rose-700">{details.name}</p>

          <div className="text-green-700 flex gap-2 items-center">
            <SeatsLeft />
            99 seats left
            <span className="flex items-center">
              <Button
                disabled={count === 1}
                isIconOnly
                color="danger"
                variant="light"
                aria-label="Take a photo"
                size="sm"
                onClick={() =>
                  setCount((count) => (count < 1 ? count : count - 1))
                }
              >
                <RemoveFromCart />
              </Button>
              {count}
              <Button
                disabled={count === 2}
                isIconOnly
                color={count === 2 ? undefined : "success"}
                variant="light"
                aria-label="Take a photo"
                size="sm"
                onClick={() =>
                  setCount((count) => (count === 2 ? count : count + 1))
                }
              >
                <AddToCart />
              </Button>

              <Button onClick={onAddToCart}>Add to Cart</Button>
            </span>
          </div>

          <div className="text-gray-500 flex gap-2">
            <Time />
            <p>
              {dateFormatted} {startTimeFormatted + " "} -{" "}
              {" " + endTimeFormatted}
            </p>
          </div>
        </section>
      </main>
    </div>
  );
};

export default EoDetails;
