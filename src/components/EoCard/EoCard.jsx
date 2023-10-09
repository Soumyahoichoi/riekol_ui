import { useState } from 'react';
import './styles.css';
import dayjs from 'dayjs';
import LocalizedFormat from 'dayjs/plugin/localizedFormat';
import SeatsLeft from '../../assets/seats_left.jsx';
import Time from '../../assets/time';
import AddToCart from '../../assets/addToCart';
import RemoveFromCart from '../../assets/removeFromCart';
import { Button } from '@nextui-org/react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../../store/store';

dayjs.extend(LocalizedFormat);

export const EoCard = ({
	name,
	image,
	startTime,
	endTime,
	date,
	id,
	description,
	regFee,
	priceId,
	startDate,
	endDate,
	display
}) => {
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
	};

	return (
		<main className="divContainer">
			<section className="mainContainer">
				<img
					src={image}
					alt="name"
					className="imageContainer"
					style={{ width: '100%', height: '12rem' }}
				/>
			</section>
			<section className="flex items-start flex-col second text-sm p-2 gap-2">
				<p className="font-semibold text-rose-700 text-lg">{name}</p>

				<div className="text-green-700 flex gap-2 items-center">
					<SeatsLeft />
					99 seats left
				</div>

				<div className="text-gray-500 flex gap-2">
					<Time />
					<p>
						{/* {dateFormatted} */}
						{startDateFormatted + ' ' + startTime + ' '} - {' ' + endDateFormatted + ' ' + endTime}
					</p>
				</div>
				<div className="text-gray-500 flex gap-2">
					<p className="font-semibold">Registration Fees</p>
					<p>{regFee}</p>
				</div>

				{/* {data && (
					<> */}
				{description?.length >= 160 && (
					<div className="text-gray-500 flex gap-2 flex">
						<p className="description">
							{!data
								? stringTruncate(description, 160)
								: stringTruncate(description, description.length)}
						</p>
					</div>
				)}

				<div className="text-gray-500 flex gap-2">
					<p className="font-semibold cursor-pointer" onClick={onClickHandler}>
						{data ? 'Read Less...' : 'Read More...'}
					</p>
				</div>

				<div
					className="flex items-center w-full justify-center"
					//   style={{ zIndex: "-1" }}
				>
					<span className="flex items-center text-lg">
						<Button
							disabled={count === 1}
							isIconOnly
							color={count === 1 ? undefined : 'danger'}
							variant="light"
							aria-label="Take a photo"
							size="md"
							onClick={() => setCount((count) => (count < 1 ? count : count - 1))}
						>
							<RemoveFromCart />
						</Button>
						{count}
						<Button
							disabled={count === 2}
							isIconOnly
							color={count === 2 ? undefined : 'success'}
							variant="light"
							aria-label="Take a photo"
							size="md"
							onClick={() => setCount((count) => (count === 2 ? count : count + 1))}
						>
							<AddToCart />
						</Button>
						<Button
							onClick={onAddToCart}
							color={buttonDisplay ? 'success' : 'danger'}
							size="md"
							className="buttonContainer"
						>
							<span>{buttonDisplay ? 'Added to Cart' : 'Add to Cart'}</span>
						</Button>
					</span>
				</div>
			</section>
		</main>
	);
};
