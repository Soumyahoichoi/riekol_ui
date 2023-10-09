import { Button, Tab, Tabs } from '@nextui-org/react';
import React, { useEffect, useState } from 'react';
import './styles.css';
import { Cards } from '../../constants';
import { EoCard } from '../../components/EoCard/EoCard';
import { useStore } from '../../store/store';
import { createSession } from '../../api/checkout';
import { getResultFromData } from '../../helper';
import { toast } from 'sonner';
// import Cart from "../../components/Cart/Cart";

const isBrowser = typeof window !== 'undefined';

const MyEO = () => {
	const cart = useStore((state) => state.cart);
	const [tab, setTab] = useState('All');

	const handleCheckout = async () => {
		if (cart) {
			const session = await createSession(cart);
			const result = getResultFromData(session);

			if (isBrowser && result) {
				window.open(result, '_self', 'noopener,noreferrer');
			} else {
				toast.error('Something went wrong!');
			}
		} else {
			toast.error('Please add something to the cart');
		}
	};

	const handleTabChange = (value) => {
		console.log(value);
		setTab(value);
		//Call setTab here
	};

	console.log(cart.length, 'data', cart);

	return (
		<div className="flex justify-center flex-col container-box">
			<section className="primaryBox">
				<Tabs
					key="underlined"
					onSelectionChange={handleTabChange}
					variant="underlined"
					aria-label="Tabs variants"
				>
					<Tab key="all" title="All" />
					<Tab key="Iconic Kolkata" title="Iconic Kolkata" />
					<Tab key="Off the beaten path" title="Off the beaten path" />
					{/* <Tab key="experiential" title="Experiential" />
					<Tab key="interaction" title="Interaction" />
					<Tab key="f&b" title="F&B" />
					<Tab key="health & wellness" title="Health & Wellness" /> */}
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
						startDate={item.eoStartDate.trim()}
						endDate={item.eoEndDate.trim()}
						name={item.name.trim()}
						id={item._id}
						description={item.description}
						champion={item.eventChampion}
						regFee={item.registrationfee}
						priceId={item.priceId}
						display={item.category === tab || tab === 'all' ? 'block' : 'none'}
					/>
				))}
			</section>
			{cart.length > 0 && (
				<div className="floating-container">
					<Button color="danger" disabled={cart.length === 0} onClick={handleCheckout} size="lg">
						Checkout
					</Button>
					{/* <button class="button">Floating Button</button> */}
				</div>
			)}

			{/* <Cart /> */}
		</div>
	);
};

export default MyEO;
