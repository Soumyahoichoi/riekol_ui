import React from "react";
import "./styles.css";
import dayjs from "dayjs";
import LocalizedFormat from "dayjs/plugin/localizedFormat";
import SeatsLeft from "../../assets/seats_left.jsx";
import Time from "../../assets/time";
import AddToCart from "../../assets/addToCart";
import RemoveFromCart from "../../assets/removeFromCart";
import { Button } from "@nextui-org/react";
dayjs.extend(LocalizedFormat);

export const EoCard = ({
  name,
  image,
  startTime,
  endTime,
  date,
  registrationFee,
  select = () => {},
}) => {
  const dateFormatted = dayjs(date).format("LL");
  const startTimeFormatted = dayjs(startTime).format("LT");
  const endTimeFormatted = dayjs(endTime).format("LT");
  return (
    <main className="border-1 border-slate-300 rounded-md  cursor-pointer">
      <section className="p-2 py-4">
        <img
          src={image}
          alt="name"
          style={{ width: "18rem", height: "10rem" }}
        />
      </section>
      <section className="flex items-start flex-col second text-sm">
        <p className="font-semibold text-rose-700">{name}</p>

        <div className="text-green-700 flex gap-2">
          <SeatsLeft />
          99 seats left
          <span>
            <Button
              isIconOnly
              color="warning"
              variant="light"
              aria-label="Take a photo"
              size="sm"
              onClick={() =>
                select({
                  intent: "+",
                  payLoad: { name, startTime, endTime, date, registrationFee },
                })
              }
            >
              <AddToCart />
            </Button>
            &nbsp;
            <Button
              isIconOnly
              color="warning"
              variant="light"
              aria-label="Take a photo"
              size="sm"
              onClick={() =>
                select({
                  intent: "-",
                  payLoad: { name, startTime, endTime, date, registrationFee },
                })
              }
            >
              <RemoveFromCart />
            </Button>
          </span>
        </div>
        {/* <img src={seats_left} alt="" /> */}

        <div className="text-gray-500 flex gap-2">
          <Time />
          <p>
            {dateFormatted} {startTimeFormatted + " "} -{" "}
            {" " + endTimeFormatted}
          </p>
        </div>
      </section>
    </main>
  );
};
