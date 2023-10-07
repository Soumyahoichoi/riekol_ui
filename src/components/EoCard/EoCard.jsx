import React from "react";
import "./styles.css";
import dayjs from "dayjs";
import LocalizedFormat from "dayjs/plugin/localizedFormat";
import SeatsLeft from "../../assets/seats_left.jsx";
import Time from "../../assets/time";
import AddToCart from "../../assets/addToCart";
import RemoveFromCart from "../../assets/removeFromCart";
import { Button } from "@nextui-org/react";
import { useNavigate } from "react-router-dom";
dayjs.extend(LocalizedFormat);

export const EoCard = ({ name, image, startTime, endTime, date, id }) => {
  const navigate = useNavigate();
  const dateFormatted = dayjs(date).format("LL");
  const startTimeFormatted = dayjs(startTime).format("LT");
  const endTimeFormatted = dayjs(endTime).format("LT");
  return (
    <main
      className="border-1 border-slate-300 rounded-md  cursor-pointer"
      onClick={() => navigate(`/myeo/${id}`)}
    >
      <section className="mainContainer">
        <img
          src={image}
          alt="name"
          className="imageContainer"
          style={{ width: "100%", height: "12rem" }}
        />
      </section>
      <section className="flex items-start flex-col second text-sm p-2 gap-2">
        <p className="font-semibold text-rose-700">{name}</p>

        <div className="text-green-700 flex gap-2 items-center">
          <SeatsLeft />
          99 seats left
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
  );
};
