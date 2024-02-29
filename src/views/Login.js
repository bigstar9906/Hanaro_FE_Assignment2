import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLogin } from '../state/UserContext';

const Login = () => {
    const navigate = useNavigate();

    const [userId, setUserId] = useState('');
    const [isUserIdValid, setIsUserIdValid] = useState(false);

    const { dispatch } = useLogin();

    const handleUserIdChange = (e) => {
        const value = e.target.value;
        setUserId(value);
        setIsUserIdValid(value > 0 && value < 11);
    };

    const warningTransition = () => {   // Valid 값이 아닐 경우 Highlight
        const warn = document.getElementById('warn');
            warn.classList.remove('warning-transition');
            setTimeout(() => {
                warn.classList.add('warning-transition');
            }, 500);
    };


    const handleSubmit = (e) => {
        e.preventDefault();
        if (!isUserIdValid) {
                warningTransition();
        } else {
            const controller = new AbortController();
            fetch(`https://jsonplaceholder.typicode.com/users/${userId}`,{signal: controller.signal})
                .then((response) => response.json())
                .then((data) => {
                    dispatch({
                        type: 'LOGIN',
                        payload: {
                            userId: data.id,
                            userName: data.name,
                        },
                    });
                    navigate('/album');
                }).catch((error) => {
                    console.log(error);
                });
                return () => {
                    controller.abort();
                };
        }
    };

    return (
        <div className="d-flex justify-content-center align-items-center vh-100">
            <div className="p-4 prm-border br-20 w-50 mb-5">
                <h1 className="text-center">로그인</h1>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <input
                            type="text"
                            placeholder="User ID"
                            className="form-control"
                            id="userId"
                            value={userId}
                            onChange={handleUserIdChange}
                        />
                    </div>
                    <div className="text-center">
                        <button className="btn btn-success" type="submit">
                            로그인
                        </button>
                    </div>
                </form>
                {!isUserIdValid && userId !== '' && (
                    <div id="warn" className="warning-transition warning mt-3 fit-content rounded p-1">
                        <h5>User ID 는 1부터 10번만 가능합니다.</h5>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Login;
