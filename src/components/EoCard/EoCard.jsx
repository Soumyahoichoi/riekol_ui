import { useState } from 'react';
import './styles.css';
import dayjs from 'dayjs';
import LocalizedFormat from 'dayjs/plugin/localizedFormat';
import SeatsLeft from '../../assets/seats_left.jsx';
import Time from '../../assets/time';
import Dustbin from '../../assets/dustbin';
import { Button } from '@nextui-org/react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../../store/store';
import { toast } from 'sonner';

dayjs.extend(LocalizedFormat);

export const EoCard = ({ name, image, startTime, endTime, date, id, description, regFee, priceId, startDate, endDate, display, slots }) => {
    const navigate = useNavigate();
    const startDateFormatted = dayjs(startDate).format('DD MMM');
    const endDateFormatted = dayjs(endDate).format('DD MMM');
    // const startTimeFormatted = dayjs(startTime).format('LT');
    // const endTimeFormatted = dayjs(endTime).format('LT');
    const [data, setData] = useState(false);
    const [count, setCount] = useState(1);
    const [buttonDisplay, setButtonDisplay] = useState(false);
    const { cart, setCart } = useStore((state) => state);

    const onClickHandler = () => {
        setData(!data);
    };

    const stringTruncate = function (str, length) {
        const dots = str.length > length ? '...' : '';
        return str.substring(0, length) + dots;
    };

    const onAddToCart = () => {
        const newCart = cart.filter((item) => item.name !== name);

        newCart.push({
            name: name,
            start_time: startTime,
            end_time: endTime,
            date: date,
            registration_fee: regFee,
            price_id: priceId,
            count: count
        });

        setCart(newCart);
        setButtonDisplay(true);

        toast.success('Added to cart');
    };

    const removeFromCart = () => {
        const newCart = cart.filter((item) => item.name !== name);
        setCart(newCart);
        setButtonDisplay(false);
        setCount(1);

        toast.success('Removed to cart');
    };

    return (
        <main
            className="divContainer"
            // 	onClick={() => navigate(`/myeo/${id}`)
            // }
            style={{ display }}
        >
            <section className="mainContainer">
                <img src={image} alt="name" className="imageContainer" style={{ width: '100%', height: '12rem' }} />
            </section>
            <section className="flex items-start flex-col second text-sm p-2 gap-2">
                <p className="font-semibold text-rose-700 text-lg">{name}</p>
                <div className="text-green-700 flex gap-2 items-center">
                    <SeatsLeft />
                    {slots} seats left
                </div>

                <div className="text-gray-500 flex gap-2">
                    <Time />
                    <p>
                        {/* {dateFormatted} */}
                        {startDateFormatted === endDateFormatted ? (
                            <>
                                {startDateFormatted + ' ' + startTime + ' '} - {' ' + endTime}
                            </>
                        ) : (
                            <>
                                {startDateFormatted + ' ' + startTime + ' '} - {' ' + endDateFormatted + ' ' + endTime}
                            </>
                        )}
                    </p>
                </div>
                <div className="text-gray-500 flex gap-2">
                    <p className="font-semibold">Registration Fees</p>
                    <p>₹{regFee}</p>
                </div>

                {/* {data && (
					<> */}

                <div className="text-gray-500 flex gap-2 flex" style={{ height: '5rem' }}>
                    <p className="description">
                        {!data ? stringTruncate(description, 160) : stringTruncate(description, description.length)}
                        {description?.length >= 160 && (
                            <span className="font-semibold cursor-pointer" onClick={onClickHandler}>
                                {data ? '  Read Less...' : '  Read More...'}
                            </span>
                        )}
                    </p>
                    {/* {description?.length >= 160 && (
						
							{data ? 'Read Less...' : 'Read More...'}
						
					)} */}
                </div>

                <div
                    className="flex items-center w-full justify-left"
                    //   style={{ zIndex: "-1" }}
                >
                    <span className="flex items-center text-lg w-full">
                        <Button
                            disabled={count === 1}
                            isIconOnly
                            // color={count === 1 ? undefined : 'danger'}
                            variant="shadow"
                            aria-label="Take a photo"
                            size="md"
                            radius="md"
                            onClick={() => {
                                setCount((count) => (count < 1 ? count : count - 1));
                                setButtonDisplay(false);
                            }}
                        >
                            {/* <RemoveFromCart /> */}
                            <span className="text-2xl px-2">{' - '}</span>
                        </Button>
                        <p className="px-2">{count}</p>
                        <Button
                            disabled={count === 2}
                            isIconOnly
                            // color={count === 2 ? undefined : 'success'}
                            variant="shadow"
                            aria-label="Take a photo"
                            size="md"
                            radius="md"
                            onClick={() => {
                                setCount((count) => (count === 2 ? count : count + 1));
                                setButtonDisplay(false);
                            }}
                        >
                            {/* <AddToCart /> */}
                            <span className="text-2xl px-2">{' + '}</span>
                        </Button>
                        <Button onClick={onAddToCart} color={buttonDisplay ? 'success' : 'danger'} size="lg" variant="solid" className="buttonContainer">
                            <span className="px-2">{buttonDisplay ? 'Added to Cart' : 'Add to Cart'}</span>
                        </Button>
                        <Button
                            isIconOnly
                            // color={count === 1 ? undefined : 'danger'}
                            variant="light"
                            // aria-label="Take a photo"
                            size="sm"
                            radius="md"
                            className="ml-12"
                            onClick={removeFromCart}
                        >
                            <Dustbin />
                        </Button>
                    </span>
                </div>
            </section>
        </main>
    );
};
