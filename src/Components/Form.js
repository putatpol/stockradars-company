import React, { useState, useEffect } from 'react';
import './Form.css';
import Nav from './Nav';

function Form() {
    const [ref, setRef] = useState('');
    const [email, setEmail] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phone, setPhone] = useState('');
    const [phoneError, setPhoneError] = useState('');
    const [emailError, setEmailError] = useState('');

    // เพิ่มฟังก์ชั่นสำหรับการส่งฟอร์ม
    const handleSubmit = (event) => {
        event.preventDefault();

        // ตรวจสอบเงื่อนไขในการ validate phone
        if (phone.length !== 10 || isNaN(phone)) {
            setPhoneError('กรุณากรอกเบอร์โทรศัพท์ 10 หลัก');
            return;
        } else {
            setPhoneError('');
        }

        // ตรวจสอบเงื่อนไขในการ validate email
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email)) {
            setEmailError('กรุณากรอกอีเมลให้ถูกต้อง');
            return;
        } else {
            setEmailError('');
        }

        // แสดงข้อความเมื่อผู้ใช้กด Submit และผ่านเงื่อนไข
        window.alert('ลงทะเบียนเรียบร้อยแล้ว');
    };

    useEffect(() => {
        const queryParams = new URLSearchParams(window.location.search);
        const refParam = queryParams.get('ref');
        const emailParam = queryParams.get('email');

        if (refParam) {
            setRef(refParam);
        }

        if (emailParam) {
            setEmail(emailParam);
        }
    }, []);

    return (
        <>
            <Nav />
            <div className='formMain'>

                <h1>ฟอร์มลงทะเบียน</h1><br />
                <form onSubmit={handleSubmit}>
                    <label>
                        First Name:
                        <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
                    </label>
                    <br />
                    <label>
                        Last Name:
                        <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} required />
                    </label>
                    <br />
                    <label>
                        Phone:
                        <input type="text" value={phone} onChange={(e) => { if (e.target.value.length <= 10) { setPhone(e.target.value); } }} required />
                        <span className="error">{phoneError}</span>

                    </label>
                    <br />
                    <label>
                        Ref:
                        <input type="text" value={ref} onChange={(e) => setRef(e.target.value)} required />
                    </label>
                    <br />
                    <label>
                        Email:
                        <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} required />
                        <span className="error">{emailError}</span>
                    </label>
                    <br />
                    <button type="submit">ลงทะเบียน</button>
                </form>
            </div >
        </>
    );
}

export default Form;
