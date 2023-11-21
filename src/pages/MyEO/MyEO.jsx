import { Button, Tab, Tabs, Switch, Input } from '@nextui-org/react';
import { useState, useEffect, useRef } from 'react';
import './styles.css';
import { Cards } from '../../constants';
import { EoCard } from '../../components/EoCard/EoCard';
import { useStore } from '../../store/store';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { returnUrl } from '../../../decideENV';
import { createSession, saveDetailsForPaymentLink } from '../../api/checkout';
import { generateUUID, getResultFromData } from '../../helper';
import { getMyItems } from '../../api/data';
import CardSkeleton from '../../components/Skeleton/index';
import dayjs from 'dayjs';
import LocalizedFormat from 'dayjs/plugin/localizedFormat';
import Modal from '../../components/Modal/Modal';

dayjs.extend(LocalizedFormat);

const isBrowser = typeof window !== 'undefined';

const MyEO = () => {
    const { cart, isSelected, setIsSelected, setCart, myEo, setMyEo, setSchedule, schedule } = useStore((state) => state);
    const navigate = useNavigate();
    const [tab, setTab] = useState('all');
    const [loading, setIsLoading] = useState(false);
    const [cards, setCards] = useState([]);
    const modalRef = useRef(null);
    const [modalVal, setModalVal] = useState({
        name: '',
        chapter: cart.reduce((acc, item) => acc + item.name + ', ', ''),
        email: '',
        contact: ''
    });
    const [emailError, setEmailError] = useState(false);
    const [numberError, setNumberError] = useState(false);
    const [validEmail, setValidEmail] = useState(false);
    // const [isSelected, setIsSelected] = useState(false);

    const currency = isSelected ? '$' : '₹';

    const handleCheckout = async () => {
        // setIsLoading(true);
        setModalVal({
            name: '',
            chapter: '',
            email: '',
            contact: ''
        });
        modalRef.current?.onOpen();
    };

    const submitDetails = async () => {
        // mail validation
        console.log(modalVal);
        if (!modalVal.name || !modalVal.chapter || !modalVal.email || !modalVal.contact) {
            toast.error('All fields are mandatory');
            return;
        }

        if (validEmail) {
            setEmailError(true);
            return;
        }

        // contact number validation
        if (modalVal.contact.length <= 8) {
            setNumberError(true);
            return;
        }

        // const cartValue = cart?.reduce((acc, item) => {
        //     if (!isSelected) {
        //         if (typeof item.registration_fee === 'string') {
        //             return acc + item.count * +item.registration_fee.split(',').join('');
        //         }

        //         return acc + item.count * item.registration_fee;
        //     } else {
        //         if (typeof item.priceInDollar === 'string') {
        //             return acc + item.count * +item.priceInDollar.split(',').join('');
        //         }

        //         return acc + item.count * item.priceInDollar;
        //     }
        // }, 0);
        // const billingAmount = +cartValue + 0.18 * cartValue;
        // const savedDetails = await saveDetailsForPaymentLink({ modalVal, billingAmount, id: generateUUID(), currency });
        // if (getResultFromData(savedDetails)?.status === 201) {
        //     toast.success("Your details are saved successfully. You'll recieve payment link shortly");
        // } else {
        //     toast.error('Something went wrong! Please try again');
        // }
        sessionStorage.setItem('cart', JSON.stringify(cart));
        navigate(`/checkout`, { state: modalVal });

        modalRef.current?.onClose();
    };

    const validateEmail = (email) => {
        setEmailError(false);
        setModalVal((items) => ({ ...items, email: email }));
        const mailformat = /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/;
        setValidEmail(!mailformat.test(email));
    };

    useEffect(() => {
        sessionStorage.removeItem('cart');
        setIsLoading(true);
        const fetchMyItems = async () => {
            try {
                const res = await getMyItems();
                if (res) {
                    const response = res?.data?.data;
                    const sortedData = response.sort((a, b) => a.id - b.id);
                    setCards(sortedData);
                    setMyEo(sortedData);

                    sortedData.forEach((item) => {
                        setSchedule(item.name, {
                            start: dayjs(item.start_date + '-2024 ' + item.start_hour).format(),
                            end: dayjs(item.end_date + '-2024 ' + item.end_hour).format()
                        });
                    });
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

    const totalItems = cart.reduce((acc, item) => acc + item.count, 0);

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
            {/* modalVal.chapter */}
            {cart.length > 0 && (
                <div className="floating-container">
                    <Modal modalRef={modalRef} submitDetails={submitDetails}>
                        <>
                            <Input isRequired type="text" label="Name" value={modalVal.name} variant="bordered" onChange={(e) => setModalVal((items) => ({ ...items, name: e.target.value }))} />
                            <Input
                                isRequired
                                type="text"
                                label="Chapter"
                                variant="bordered"
                                value={modalVal.chapter}
                                onChange={(e) => setModalVal((items) => ({ ...items, chapter: e.target.value }))}
                            />
                            <Input
                                isRequired
                                type="email"
                                label="Email"
                                value={modalVal.email}
                                variant="bordered"
                                isInvalid={emailError}
                                errorMessage={emailError && 'Please enter a valid email'}
                                onChange={(e) => validateEmail(e.target.value)}
                            />
                            <Input
                                isRequired
                                type="number"
                                label="Contact Number"
                                value={modalVal.contact}
                                variant="bordered"
                                isInvalid={numberError}
                                errorMessage={numberError && 'Please enter a valid contact number'}
                                onChange={(e) => setModalVal((items) => ({ ...items, contact: e.target.value }))}
                            />
                        </>
                    </Modal>
                    <Button onPress={handleCheckout} onClick={handleCheckout} size="lg" color="secondary" isLoading={loading}>
                        Checkout {`(${totalItems} MyEOs added)`}
                    </Button>
                    {/* <button class="button">Floating Button</button> */}
                </div>
            )}

            {/* <Cart /> */}
        </div>
    );
};

export default MyEO;
