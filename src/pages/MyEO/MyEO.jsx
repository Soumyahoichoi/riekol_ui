import { Tab, Tabs } from '@nextui-org/react';
import React, { useEffect, useState } from 'react';
import './styles.css';
import { Cards } from '../../constants';
import { EoCard } from '../../components/EoCard/EoCard';
import { useStore } from '../../store/store';
// import Cart from "../../components/Cart/Cart";

const MyEO = () => {
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
					/>
				))}
			</section>

			{/* <Cart /> */}
		</div>
	);
};

export default MyEO;
