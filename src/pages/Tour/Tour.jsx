import React, { useEffect, useRef } from 'react';
import { Card, CardHeader, CardBody, CardFooter, Divider, Link, Image } from '@nextui-org/react';
import { TourCards } from '../../constants';
import './styles.css';

const googleTranslateElementInit = () => {
    new window.google.translate.TranslateElement(
        {
            pageLanguage: 'en',
            autoDisplay: false,
            includedLanguages: 'ja,zh-TW'
        },
        'google_translate_element'
    );
};

export default function Tour() {
    const loadRef = useRef(false);
    useEffect(() => {
        if (loadRef.current === false) {
            const addScript = document.createElement('script');
            addScript.setAttribute('src', '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit');
            document.body.appendChild(addScript);
            window.googleTranslateElementInit = googleTranslateElementInit;

            loadRef.current = true;
        }
    }, []);
    return (
        <div className="flex flex-col gap-4" style={{ padding: '1rem', maxWidth: 'calc(100vw - 1rem)' }}>
            <div id="google_translate_element"></div>

            {TourCards.map(({ name, desc, icon: Icon, html }) => (
                <TourCard name={name} desc={desc} Icon={Icon} html={html} />
            ))}
        </div>
    );
}

const TourCard = ({ name, desc, Icon, html }) => {
    return (
        <Card className="max-w-[400px]">
            <CardHeader className="flex gap-3" style={{ backgroundColor: '#5900c9', color: 'white' }}>
                <Image alt="nextui logo" height={40} radius="sm" src={Icon} width={40} />
                <div className="flex flex-col">
                    <p className="text-md">{name}</p>

                    {/* <p className="text-small text-default-500">nextui.org</p> */}
                </div>
            </CardHeader>
            <Divider />
            <CardBody>
                <p>{desc}</p>
            </CardBody>
            {/* <Divider />
            <CardFooter>
                <Link isExternal showAnchorIcon href="https://github.com/nextui-org/nextui">
                    Visit source code on GitHub.
                </Link>
            </CardFooter> */}
        </Card>
    );
};
