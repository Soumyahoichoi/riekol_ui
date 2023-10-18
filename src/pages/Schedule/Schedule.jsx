import React from 'react';
import './styles.css';
import Jump from '../../assets/white-logo.png';

const Schedule = () => {
    return (
        <div className="container">
            <section className="flex w-full justify-center">
                <img src={Jump} />
                {/* <img src={Jump} /> */}
            </section>
            <section className="mb-8 mt-8 flex justify-center">
                <h1 className="text-2xl">SCHEDULE </h1>
            </section>
            <div className="overflow">
                <table className="table" cellPadding="10" cellSpacing="10">
                    {' '}
                    <thead class="row--head">
                        {' '}
                        <th class="header-cell">Date</th>
                        <th class="header-cell">Time</th>
                        <th class="header-cell">Event</th>
                    </thead>
                    <tbody>
                        {' '}
                        <tr class="row">
                            {' '}
                            <td class="cell first">10 Jan 2024</td>
                            <td class="cell">11:00 hrs - 17:00 hrs</td>
                            <td class="cell">MyEO experience</td>
                        </tr>
                        <tr class="row">
                            {' '}
                            <td class="cell first"></td>
                            <td class="cell"></td>
                            <td class="cell"></td>
                        </tr>
                        <tr class="row">
                            {' '}
                            <td class="cell first"></td>
                            <td class="cell"></td>
                            <td class="cell"></td>
                        </tr>
                        <tr class="row">
                            {' '}
                            <td class="cell first"></td>
                            <td class="cell"></td>
                            <td class="cell"></td>
                        </tr>
                        <tr class="row">
                            {' '}
                            <td class="cell first">11 Jan 2024</td>
                            <td class="cell">11:00 hrs - 17:00 hrs</td>
                            <td class="cell">SMyEO experience</td>
                        </tr>
                        <tr class="row">
                            {' '}
                            <td class="cell first"></td>
                            <td class="cell">12:00 hrs - 18:00 hrs</td>
                            <td class="cell">Registrations for RIE</td>
                        </tr>
                        <tr class="row">
                            {' '}
                            <td class="cell first"></td>
                            <td class="cell">19:00 hrs onwards</td>
                            <td class="cell">RIE Opening Night</td>
                        </tr>
                        <tr class="row">
                            {' '}
                            <td class="cell first"></td>
                            <td class="cell"></td>
                            <td class="cell"></td>
                        </tr>
                        <tr class="row">
                            {' '}
                            <td class="cell first"></td>
                            <td class="cell"></td>
                            <td class="cell"></td>
                        </tr>
                        <tr class="row">
                            {' '}
                            <td class="cell first"></td>
                            <td class="cell"></td>
                            <td class="cell"></td>
                        </tr>
                        <tr class="row">
                            {' '}
                            <td class="cell first">12 Jan 2024</td>
                            <td class="cell">07:00 hrs - 09:00 hrs</td>
                            <td class="cell">MyEO experience</td>
                        </tr>
                        <tr class="row">
                            {' '}
                            <td class="cell first"></td>
                            <td class="cell">10:00 hrs - 14:00 hrs</td>
                            <td class="cell">Keynote</td>
                        </tr>
                        <tr class="row">
                            {' '}
                            <td class="cell first"></td>
                            <td class="cell">14:30 hrs - 17:00 hrs</td>
                            <td class="cell">Deep Dive</td>
                        </tr>
                        <tr class="row">
                            {' '}
                            <td class="cell first"></td>
                            <td class="cell">17:00 hrs - 18:00 hrs</td>
                            <td class="cell">Keynote</td>
                        </tr>
                        <tr class="row">
                            {' '}
                            <td class="cell first"></td>
                            <td class="cell">19:00 hrs onwards</td>
                            <td class="cell">Social</td>
                        </tr>
                        <tr class="row">
                            {' '}
                            <td class="cell first"></td>
                            <td class="cell"></td>
                            <td class="cell"></td>
                        </tr>
                        <tr class="row">
                            {' '}
                            <td class="cell first"></td>
                            <td class="cell"></td>
                            <td class="cell"></td>
                        </tr>
                        <tr class="row">
                            {' '}
                            <td class="cell first"></td>
                            <td class="cell"></td>
                            <td class="cell"></td>
                        </tr>
                        <tr class="row">
                            {' '}
                            <td class="cell first">13 Jan 2024</td>
                            <td class="cell">07:00 hrs - 09:00 hrs</td>
                            <td class="cell">MyEO experience</td>
                        </tr>
                        <tr class="row">
                            {' '}
                            <td class="cell first"></td>
                            <td class="cell">10:00 hrs - 14:00 hrs</td>
                            <td class="cell">Keynote</td>
                        </tr>
                        <tr class="row">
                            {' '}
                            <td class="cell first"></td>
                            <td class="cell">14:30 hrs - 17:00 hrs</td>
                            <td class="cell">Deep Dive</td>
                        </tr>
                        <tr class="row">
                            {' '}
                            <td class="cell first"></td>
                            <td class="cell">17:00 hrs - 18:00 hrs</td>
                            <td class="cell">Keynote</td>
                        </tr>
                        <tr class="row">
                            {' '}
                            <td class="cell first"></td>
                            <td class="cell">19:00 hrs onwards</td>
                            <td class="cell">Social</td>
                        </tr>
                        <tr class="row">
                            {' '}
                            <td class="cell first"></td>
                            <td class="cell"></td>
                            <td class="cell"></td>
                        </tr>
                        <tr class="row">
                            {' '}
                            <td class="cell first"></td>
                            <td class="cell"></td>
                            <td class="cell"></td>
                        </tr>
                        <tr class="row">
                            {' '}
                            <td class="cell first"></td>
                            <td class="cell"></td>
                            <td class="cell"></td>
                        </tr>
                        <tr class="row">
                            {' '}
                            <td class="cell first">14 Jan 2024</td>
                            <td class="cell"></td>
                            <td class="cell">Departure</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            {/* 
            <section className="grid">
                <div className="sticky">Date</div>
                <div className="sticky">Time</div>
                <div className="sticky">Event</div>
                <div className="mb-2"></div>
                <div>10 Jan 2024</div>
                <div>11:00 hrs - 17:00 hrs</div>
                <div>MyEO experience</div>
                <div>11 Jan 2024</div>
                <div>
                    <div>11:00 hrs - 17:00 hrs</div>
                    <div>12:00 hrs - 18:00 hrs</div>
                    <div>19:00 hrs onwards</div>
                </div>
                <div>
                    <div>MyEO experience</div>
                    <div>Registrations for RIE</div>
                    <div>RIE Opening Night</div>
                </div>
                <div>12 Jan 2024</div>
                <div>
                    <div>07:00 hrs - 09:00 hrs</div>
                    <div>10:00 hrs - 14:00 hrs</div>
                    <div>14:30 hrs - 17:00 hrs</div>
                    <div>17:00 hrs - 18:00 hrs</div>
                    <div>19:00 hrs onwards</div>
                </div>
                <div>
                    <div>MyEO experience</div>
                    <div>Keynote</div>
                    <div>Deep Dive</div>
                    <div>Keynote</div>
                    <div>Social</div>
                </div>
                <div>13 Jan 2024</div>
                <div>
                    <div>07:00 hrs - 09:00 hrs</div>
                    <div>10:00 hrs - 14:00 hrs</div>
                    <div>14:30 hrs - 17:00 hrs</div>
                    <div>17:00 hrs - 18:00 hrs</div>
                    <div>19:00 hrs onwards</div>
                </div>
                <div>
                    <div>MyEO experience</div>
                    <div>Keynote</div>
                    <div>Deep Dive</div>
                    <div>Keynote</div>
                    <div>Social</div>
                </div>
                <div>14 Jan 2024</div>
                <div></div>
                <div>Departure</div>
            </section> */}
        </div>
    );
};

export default Schedule;
