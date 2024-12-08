import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './SeoulBike.module.css';

const SeoulBike = () => {
    const [bikeData, setBikeData] = useState([]);
    const [selectedIndex, setSelectedIndex] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const apiKey = '6977416c7968733038346b73514f75';
        const apiUrl = `http://openapi.seoul.go.kr:8088/${apiKey}/json/bikeList/1/1000/`;

        const fetchBikeData = async () => {
            try {
                const response = await axios.get(apiUrl, {
                    params: {
                        KEY: apiKey,
                        TYPE: 'json',
                        SERVICE: 'bikeList',
                        START_INDEX: 1,
                        END_INDEX: 1000,
                    },
                });
                console.log(response.data);
                if (response.data.rentBikeStatus) {
                    setBikeData(response.data.rentBikeStatus.row);
                } else {
                    throw new Error('Invalid response structure');
                }
                setLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
                setError(error);
                setLoading(false);
            }
        };

        fetchBikeData();
    }, []);

    const handleSelectChange = (e) => {
        setSelectedIndex(e.target.value);
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    const selectedBikeInfo = selectedIndex !== null ? bikeData[selectedIndex] : null;

    return (
        <div className={styles.bikeContainer}>
            <h1>서울 공공자전거 실시간 대여정보</h1>
            <label htmlFor="bikeIndex">대여소 선택: </label>
            <select id="bikeIndex" onChange={handleSelectChange}>
                <option value="">선택...</option>
                {bikeData.map((station, index) => (
                    <option key={station.stationId} value={index}>
                        {station.stationName}
                    </option>
                ))}
            </select>

            {selectedBikeInfo && (
                <div className={styles.bikeItem}>
                    <h2>{selectedBikeInfo.stationName}</h2>
                    <p>총 거치대 수: {selectedBikeInfo.rackTotCnt}</p>
                    <p>주차된 자전거 수: {selectedBikeInfo.parkingBikeTotCnt}</p>
                    <p>공유율: {selectedBikeInfo.shared}%</p>
                    <p>위도: {selectedBikeInfo.stationLatitude}</p>
                    <p>경도: {selectedBikeInfo.stationLongitude}</p>
                </div>
            )}
        </div>
    );
};

export default SeoulBike;
