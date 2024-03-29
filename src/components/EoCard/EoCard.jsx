import { useState, useEffect, lazy } from 'react';
import './styles.css';
import SeatsLeft from '../../assets/seats_left.jsx';
import Time from '../../assets/time';
import Dustbin from '../../assets/dustbin';
import { Button, Tooltip } from '@nextui-org/react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../../store/store';
import { toast } from 'sonner';
import Info from '../../assets/Info';
import * as _ from 'lodash';

export const EoCard = ({ name, image, startTime, endTime, date, priceInDollar, description, regFee, priceId, startDate, endDate, display, slots }) => {
    const navigate = useNavigate();
    // const startDateFormatted = dayjs(startDate).format('DD MMM');
    // const endDateFormatted = dayjs(endDate).format('DD MMM');
    const fixDateForAllBrowsers = (dateString) => dateString.replace(/-/g, '/');
    fixDateForAllBrowsers(startDate);
    fixDateForAllBrowsers(endDate);
    // const startTimeFormatted = dayjs(startTime).format('LT');
    // const endTimeFormatted = dayjs(endTime).format('LT');
    const [data, setData] = useState(false);
    const [count, setCount] = useState(1);
    const [buttonDisplay, setButtonDisplay] = useState(false);
    const { cart, setCart, isSelected, isOverlapping } = useStore((state) => state);

    const onClickHandler = () => {
        setData(!data);
    };

    const stringTruncate = function (str, length) {
        const dots = str.length > length ? '...' : '';
        return str.substring(0, length) + dots;
    };

    const onAddToCart = () => {
        const newCart = cart.filter((item) => item.name !== name);

        const entry = {
            name: name,
            start_time: startTime,
            end_time: endTime,
            event_date: `${startDate} - ${endDate}`,
            registration_fee: regFee,
            price_id: priceId,
            count: count,
            priceInDollar
        };
        const isOverLappingWith = isOverlapping(entry);
        if (isOverLappingWith.length > 0) {
            toast.error('This MyEO event overlaps with another MyEO event that you have already added to your cart. Please select only one of the two.');
            return;
        }

        newCart.push(entry);

        setCart(newCart);
        setButtonDisplay(true);

        // toast.success('Added to cart');
    };

    const removeFromCart = () => {
        const newCart = cart.filter((item) => item.name !== name);
        setCart(newCart);
        setButtonDisplay(false);
        setCount(1);

        // toast.success('Removed to cart');
    };

    useEffect(() => {
        const item = cart.find((item) => item.name === name);
        if (item) {
            setButtonDisplay(true);
            setCount(item.count);
        }
    }, []);

    useEffect(() => {
        if (cart.length === 0) {
            setButtonDisplay(false);
            setCount(1);
        }
    }, [cart]);

    const desc = description ? JSON.stringify(description) : ' ';
    const newDescription = desc.replace(/"/g, '');

    if (slots <= 0) {
        return null;
    }

    if (import.meta.env.PROD && name === 'Test') {
        return null;
    }
    // `../../src/assets/thumbnails/${name.replaceAll(' ', '_')}.webp`
    return (
        <main
            className="divContainer"
            // 	onClick={() => navigate(`/myeo/${id}`)
            // }
            style={{ display, opacity: slots <= 0 ? 0.5 : 1 }}
        >
            <section className="mainContainer">
                {console.log(name.replaceAll(' ', '_'))}
                <img
                    src={`/${name.replaceAll(' ', '_')}.webp`}
                    loading={name === 'MyEO Golf Tournament' ? 'eager' : 'lazy'}
                    type="image/webp"
                    alt="name"
                    className="imageContainer"
                    style={{ width: '100%', height: '15rem' }}
                />
            </section>
            <section className="flex items-start flex-col second text-sm p-2 gap-2">
                <p className="font-semibold text-rose-700 text-lg" style={{ textAlign: 'left' }}>
                    MyEO {name.includes('Montek') ? name.slice(5) : _.startCase(_.toLower(name.slice(5)))}{' '}
                    {name.match(/MyEO Governor House visit/) ? '(Only for Indian Nationals and EO Members)' : null}
                </p>
                <div
                    className={`${slots <= 0 ? 'text-red-700' : 'text-green-700'}
                 flex gap-2 items-center`}
                >
                    <SeatsLeft />
                    {slots <= 0 ? 'Sold Out' : /*`Only ${slots} seats left`*/ 'Filling Fast'}

                    {/* <Tooltip
                        showArrow
                        placement="right"
                        content="I am a tooltip"
                        classNames={{
                            base: 'py-2 px-4 shadow-xl text-black bg-gradient-to-br from-white to-neutral-400',
                            arrow: 'bg-neutral-400 dark:bg-white'
                        }}
                    >
                        <Button variant="flat" isIconOnly radius="full">
                            <Info width="15px" height="15px" />
                        </Button>
                    </Tooltip> */}
                </div>

                <div className="text-gray-500 flex gap-2">
                    <Time />
                    <p>
                        {/* {dateFormatted} */}
                        {startDate === endDate ? (
                            <>
                                {startDate + ' ' + startTime + ' '} - {' ' + endTime}
                            </>
                        ) : (
                            <>
                                {startDate + ' ' + startTime + ' '} - {' ' + endDate + ' ' + endTime}
                            </>
                        )}
                    </p>
                </div>
                <div className="text-gray-500 flex gap-2">
                    <p className="font-semibold">Registration Fees</p>
                    {isSelected ? <p>${priceInDollar}</p> : <p>₹{regFee}</p>}
                </div>

                {/* {data && (
					<> */}

                <div className="text-gray-500 flex gap-2 flex">
                    <p className="description">
                        {!data ? stringTruncate(newDescription, 140) : stringTruncate(newDescription, newDescription.length)}
                        {newDescription?.length >= 140 && (
                            <span className="font-semibold cursor-pointer" onClick={onClickHandler}>
                                {data ? '  Read Less...' : '  Read More...'}
                            </span>
                        )}
                    </p>
                    {/* {description?.length >= 160 && (
						
							{data ? 'Read Less...' : 'Read More...'}
						
					)} */}
                </div>

                {+slots > 0 && (
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

                            <Button onClick={onAddToCart} color={buttonDisplay ? 'success' : 'danger'} size="md" variant="solid" className="buttonContainers">
                                <span className="px-2">{buttonDisplay ? 'Added' : 'Add to Cart'}</span>
                            </Button>

                            {cart.find((item) => item.name === name) && (
                                <Button
                                    isIconOnly
                                    // color={count === 1 ? undefined : 'danger'}
                                    variant="light"
                                    // aria-label="Take a photo"
                                    size="sm"
                                    radius="md"
                                    className="ml-12 cursor-pointer"
                                    onClick={removeFromCart}
                                    // disabled={cart.length === 0}
                                >
                                    <Dustbin />
                                </Button>
                            )}
                        </span>
                    </div>
                )}
            </section>
        </main>
    );
};
