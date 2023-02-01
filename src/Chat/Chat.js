import React, { useState, useEffect, useCallback } from 'react';
import Axios from 'axios';
import Echo from 'laravel-echo';
import Pusher from 'pusher-js';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import Messagebox from './Messagebox';
import { local } from '../API'
// 2
export default function PublicMessagesPage(props) {
    const [profileID,] = useState(localStorage.getItem('UserID'));
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        Axios.defaults.baseURL = local + '/api/';
        Axios.defaults.headers = {
            Authorization: `Bearer ${localStorage.getItem('userToken')}`,
        }
        const echo = new Echo({
            broadcaster: 'pusher',
            key: 'cf1398e74504d96c4495',
            cluster: 'eu',
            forceTLS: true,
            wsHost: 'realtime-pusher.ably.io',
            wsPort: 443,
            disableStats: true,
            encrypted: true,

            // authEndpoint: Axios.defaults.baseURL +"room" + "broadcasting/auth",
        });

        // console.log("Room ID: " + localStorage.getItem('RoomID'))


        echo.channel("chat." + localStorage.getItem('RoomID'))
            .subscribed(() => {
                console.log('You are subscribed');
            })
            .listen('.message.new', (data) => {
                console.log(data.message)
                setMessages((oldMessages) => [data.message, ...oldMessages]);
                setMessage(data.message);
            })

        Axios.get('/message/' + profileID).then(res => {
            if (res.data.data != null) {
                //console.log(res.data.data)
                setMessages(res.data.data);
            }
        }).catch(err => console.error(err));
        

    }, []);


    async function handleSendMessage(e) {
        e.preventDefault();
        try {
            let params = {
                body: message,
            }
            await Axios.post('/message/' + profileID, params).then(
                res => {
                    console.log(res.data)
                })
        } catch (error) { console.error(error); }

    }

    // 4
    return (

        <div className="Chat container lightMode ">
            {props.isChatOn &&
                <div className="row chat-window col-xl-4 col-lg-5 col-md-6 col-sm-7" id="chat_window_1">
                    <div className="container">
                        <div className="panel panel-default">
                            <div className="panel-heading">
                                <div className="text-center ">
                                    <h5 className="panel-title mt-2">الدردشة</h5>
                                </div>
                            </div>
                            <div className="panel-body msg_container_base ">
                                {messages.map((message) => (
                                    <Messagebox key={message.id} body={message.body} img="/Img/man.png" status={message.user_id == localStorage.getItem('myID') ? 'sender' : 'reciver'} />
                                ))}

                            </div>
                            <div className="panel-footer">
                                <div className="input-group">
                                    <span className="input-group-btn w-100">
                                        <div className="p-inputgroup">
                                            <InputText placeholder="Vote" onChange={e => setMessage(e.target.value)} />
                                            <Button icon="pi pi-send" className="p-button-sm" onClick={handleSendMessage} />
                                        </div>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </div >
    );
}