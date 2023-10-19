import { Button, Tab, Tabs, Switch } from '@nextui-org/react';
import { useState, useEffect } from 'react';
import './styles.css';
import { Cards } from '../../constants';
import { EoCard } from '../../components/EoCard/EoCard';
import { useStore } from '../../store/store';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { returnUrl } from '../../../decideENV';
import { createSession } from '../../api/checkout';
import { generateUUID, getResultFromData } from '../../helper';
import { getMyItems } from '../../api/data';
import CardSkeleton from '../../components/Skeleton/index';
// import Cart from "../../components/Cart/Cart";

const isBrowser = typeof window !== 'undefined';

const MyEO = () => {
    const { cart, isSelected, setIsSelected, setCart, myEo, setMyEo } = useStore((state) => state);
    const navigate = useNavigate();
    const [tab, setTab] = useState('all');
    const [loading, setIsLoading] = useState(false);
    const [cards, setCards] = useState([]);
    // const [isSelected, setIsSelected] = useState(false);

    const handleCheckout = async () => {
        setIsLoading(true);

        navigate(`/checkout`);
    };

    useEffect(() => {
        setIsLoading(true);
        const fetchMyItems = async () => {
            try {
                const res = await getMyItems();
                if (res) {
                    const response = res?.data?.data;
                    const sortedData = response.sort((a, b) => a.id - b.id);
                    setCards(sortedData);
                    setMyEo(sortedData);
                    setIsLoading(false);
                }
            } catch (err) {
                console.log(err);
                setIsLoading(false);
            }
        };

        if (myEo.length === 0) {
            fetchMyItems();
        } else {
            setCards(myEo);
            setIsLoading(false);
        }
    }, []);

    const handleTabChange = (value) => {
        setTab(value);
        document.body.scrollTop = 0; // For Safari
        document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
        //Call setTab here
    };
    // demo data to map the skeleton
    const arrayOfEmptyObjects = Array.from({ length: 12 }, () => ({}));
    // Generate unique IDs and add values to the objects
    const arrayWithIdsAndValues = arrayOfEmptyObjects.map((object, index) => ({
        id: index + 1, // Adding 1 to make IDs start from 1
        value: `Value ${index + 1}` // You can replace this with your desired value
    }));

    return (
        <div className="flex justify-center flex-col container-box">
            <section className="primaryBox">
                <div className="switch">
                    <div className="logo_container">
                        <img src="/logo.webp" alt="logo" width="80px" height="80px" />
                    </div>
                    <div className="currency">
                        <p style={{ marginTop: '5px', fontSize: '15px' }}>USD &nbsp;</p>

                        <Switch
                            defaultSelected={!isSelected}
                            size="md"
                            color="secondary"
                            onValueChange={() => {
                                setIsSelected(!isSelected);
                                setCart([]);
                            }}
                            thumbIcon={({ isSelected, className }) => (isSelected ? <div className={className}>₹</div> : <div className={className}>$</div>)}
                        >
                            <p style={{ marginTop: '5px', fontSize: '15px' }}>INR</p>
                        </Switch>
                    </div>
                </div>
                <div className="tabPrimary">
                    <Tabs key="underlined" onSelectionChange={handleTabChange} variant="underlined" aria-label="Tabs variants" size="lg">
                        <Tab key="all" title="All" className="tab" />
                        <Tab key="Sports" title="Sports" className="tab" />
                        <Tab key="Spirituality" title="Spirituality" className="tab" />
                        <Tab key="Experiential" title="Experiential" className="tab" />
                        {/* <Tab key="interaction" title="Interaction" /> */}
                        <Tab key="F&B" title="F&B" className="tab" />
                        {/* <Tab key="health & wellness" title="Health & Wellness" /> */}
                    </Tabs>
                </div>
            </section>

            <section className="card--content">
                {/* loading */}
                {loading && arrayWithIdsAndValues.map((item) => <CardSkeleton key={item.id} />)}
                {cards.map((item) => (
                    <EoCard
                        key={item.id}
                        image={item.thumb_image}
                        startTime={item.start_hour}
                        endTime={item.end_hour}
                        date={item.eoDate}
                        startDate={item.start_date}
                        endDate={item.end_date}
                        name={item.name}
                        id={item.name}
                        description={item.event_description}
                        // champion={item.eventChampion}
                        regFee={item.registartion_charges}
                        priceInDollar={item.price_in_dollars}
                        priceId={crypto?.randomUUID?.() ?? generateUUID?.()}
                        slots={item.slots_to_open}
                        display={item.category === tab || tab === 'all' ? 'block' : 'none'}
                    />
                ))}
            </section>
            {cart.length > 0 && (
                <div className="floating-container">
                    <Button onClick={handleCheckout} size="lg" color="secondary" isLoading={loading}>
                        Checkout {`(${cart.length} MyEOs added)`}
                    </Button>
                    {/* <button class="button">Floating Button</button> */}
                </div>
            )}

            {/* <Cart /> */}
        </div>
    );
};

export default MyEO;
