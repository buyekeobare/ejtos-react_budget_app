import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';

const CurrencyDropdown = () => {
    const { dispatch, currency } = useContext(AppContext);

    const handleCurrencyChange = (event) => {
        dispatch({
            type: 'CHG_CURRENCY',
            payload: event.target.value,
        });
    };

    const dropdownStyle = {
        backgroundColor: '#f8f9fa',
        color: '#343a40',
        border: '1px solid #ced4da',
        padding: '0.8rem',
        borderRadius: '0.35rem',
        marginBottom: '1rem',
        width: '32%',
        minWidth: '150px',
    };

    const selectStyle = {
        width: '60%',
        padding: '0.5rem',
        fontSize: '1rem',
        backgroundColor: '#fff',
        color: '#495057',
        border: '1px solid #ced4da',
        borderRadius: '0.25rem',
    };

    const optionStyle = {
        backgroundColor: '#fff',
        color: '#495057',
    };

    return (
        <div style={dropdownStyle}>
            <label htmlFor="currency" style={{ marginRight: '0.5rem' }}>Currency: </label>
            <select id="currency" value={currency} onChange={handleCurrencyChange} style={selectStyle}>
                <option value="£" style={optionStyle}>£ Pound</option>
                <option value="$" style={optionStyle}>$ Dollar</option>
                <option value="€" style={optionStyle}>€ Euro</option>
                <option value="₹" style={optionStyle}>₹ Rupee</option>
            </select>
        </div>
    );
};

export default CurrencyDropdown;
