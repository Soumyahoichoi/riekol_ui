import { Button, Tab, Tabs } from '@nextui-org/react';
import { useState } from 'react';
import './styles.css';
import { Cards } from '../../constants';
import { EoCard } from '../../components/EoCard/EoCard';
import { useStore } from '../../store/store';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { returnUrl } from '../../../decideENV';
import { createSession } from '../../api/checkout';
import { getResultFromData } from '../../helper';
// import Cart from "../../components/Cart/Cart";

const isBrowser = typeof window !== 'undefined';

const MyEO = () => {
    const cart = useStore((state) => state.cart);
    const navigate = useNavigate();
    const [tab, setTab] = useState('all');
    const [loading, setIsLoading] = useState(false);

    const handleCheckout = async () => {
        setIsLoading(true);
        // const billingAmount = cart?.reduce((acc, item) => {
        //   if (typeof item.registration_fee === "string") {
        //     return acc + item.count * +item.registration_fee.split(",").join("");
        //   }

        //   return acc + item.count * item.registration_fee;
        // }, 0);

        // // console.log(cart, billingAmount);

        // // return;
        // const url = `${returnUrl()}/checkout?billing=${billingAmount}`;
        // window.open(url, "__blank", "noopener,noreferrer");
        // navigate('/checkout');
        if (cart) {
            const session = await createSession(cart);
            const result = getResultFromData(session);

            if (isBrowser && result) {
                window.location.assign(result);
            } else {
                toast.error('Something went wrong!');
            }
            // createSession(cart).then((res) => {
            //   const result = getResultFromData(res);
            //   if (isBrowser && result) {
            //     window.location.assign(result);
            //   } else {
            //     toast.error("Something went wrong!");
            //   }
            // });
        } else {
            toast.error('Please add something to the cart');
        }
    };

    const handleTabChange = (value) => {
        setTab(value);
        document.body.scrollTop = 0; // For Safari
        document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
        //Call setTab here
    };

    return (
        <div className="flex justify-center flex-col container-box">
            <section className="primaryBox">
                <Tabs key="underlined" onSelectionChange={handleTabChange} variant="underlined" aria-label="Tabs variants" size="lg">
                    <Tab key="all" title="All" />
                    <Tab key="Sports" title="Sports" />
                    <Tab key="Spirituality" title="Spirituality" />
                    <Tab key="Experiential" title="Experiential" />
                    {/* <Tab key="interaction" title="Interaction" /> */}
                    <Tab key="F&B" title="F&B" />
                    {/* <Tab key="health & wellness" title="Health & Wellness" /> */}
                </Tabs>
            </section>

            <section className="card--content">
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
                        slots={item.totalslot}
                        display={item.category === tab || tab === 'all' ? 'block' : 'none'}
                    />
                ))}
            </section>
            {cart.length > 0 && (
                <div className="floating-container">
                    <Button onClick={handleCheckout} size="lg" className="bg-gradient-to-tr from-pink-500 to-yellow-500 text-white shadow-lg" isLoading={loading}>
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
