import React, { useState, useEffect, useCallback } from 'react';

export default function Messagebox(message) {

    const [arabic, setArabic] = useState(/[\u0600-\u06FF]/);

    return (
        <>
            {
                message.status == 'sender' &&

                <div className={`row msg_container base_sent`}>
                    <div className="col-lg-10 col-md-10 col-sm-10 col-10">
                        <div className={`messages msg_sent `}>
                            <p className={arabic.test(message.body) ? 'text-right' : 'text-left'}>
                                {message.body}
                            </p>
                            <time datetime="2009-11-13T20:00">{message.time}</time>
                        </div>
                    </div>
                    <div className="col-lg-2 col-md-2 col-sm-2 col-2">
                        <img src={message.img} className="w-100" />
                    </div>
                </div>
            }
            {
                message.status == 'reciver' &&

                <div className={`row msg_container base_receive`}>
                    <div className="col-lg-2 col-md-2 col-sm-2 col-2">
                        <img src={message.img} className="w-100" />
                    </div>
                    <div className="col-lg-10 col-md-10 col-sm-10 col-10">
                        <div className={`messages msg_receive`}>
                            <p className={arabic.test(message.body) ? 'text-right' : 'text-left'}>
                                {message.body}
                            </p>
                            <time datetime="2009-11-13T20:00">{message.time}</time>
                        </div>
                    </div>

                </div>
            }
        </>
    );
}
