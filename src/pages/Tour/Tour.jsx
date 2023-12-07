import React from 'react';
import { Card, CardHeader, CardBody, CardFooter, Divider, Link, Image } from '@nextui-org/react';
import { TourCards } from '../../constants';
import './styles.css';

export default function Tour() {
    return (
        <div className="flex flex-col gap-4" style={{ padding: '2rem' }}>
            {TourCards.map(({ name, desc, icon: Icon, html }) => (
                <TourCard name={name} desc={desc} Icon={Icon} html={html} />
            ))}
        </div>
    );
}

const TourCard = ({ name, desc, Icon, html }) => {
    return (
        <Card className="max-w-[400px]" style={{ margin: '0 10%' }}>
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
