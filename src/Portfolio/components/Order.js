import { Component } from 'react';
import { ClockIcon, CalendarIcon, CurrencyDollarIcon } from '@heroicons/react/outline';
import { Button } from 'primereact/button';
import { AcceptOrder, RefuseOrder } from '../../API'
import axios from "axios";
import { Toast } from 'primereact/toast';

class Order extends Component {
    state = {

    }
    acceptOrder = (e) => {
        e.preventDefault();
        axios.post(AcceptOrder + this.props.id).then(
            res => {
                if (res.data.status == true) {
                    this.showSuccess(res.data.message);
                    // window.location.reload();
                }
                else {
                    this.showError(res.data.message);
                }
            }).catch(err => console.error(err));
    }
    rejectOrder = (e) => {
        e.preventDefault();
        axios.delete(RefuseOrder + this.props.id).then(
            res => {
                if (res.data.status == true) {
                    this.showSuccess(res.data.message);
                    // window.location.reload();
                }
                else {
                    this.showError(res.data.message);
                }
            }).catch(err => console.error(err));
    }
    showSuccess = (msg) => {
        this.toastSuccess.show({ severity: 'success', summary: 'نجاح', detail: msg, life: 3000 });
    }

    showError = (msg) => {
        this.toastFailure.show({ severity: 'error', summary: 'فشل', detail: msg, life: 3000 });
    }
    render() {
        return (
            <p className="container">
                <Toast ref={(el) => this.toastSuccess = el} position="bottom-right" />
                <Toast ref={(el) => this.toastFailure = el} position="bottom-right" />
                <div className="col-2 container">
                    <img src={this.props.profileImg} alt="user" className="notification-photo mr-2 " />
                </div>
                <div className="col-9 m-1">
                    {this.props.type == 0 &&
                        <div className='d-block text-right '>
                            <h6 className=''> تم قبول عرضك من قبل </h6>
                        </div>
                    }
                    {this.props.type == 1 &&
                        <div className='d-block text-right '>
                            <h6 className=''> لقد وافقت على العمل مع </h6>
                        </div>
                    }
                    <strong className='text-info mb-2'> {this.props.name} </strong>

                    <div className='text-right'>
                        <strong >تفاصيل العرض</strong>
                        <div className='text-left'>
                            <p className="m-0" style={{ lineHeight: '1.5' }}>Post Title: {this.props.orderTitle}</p>
                            <p className="m-0" style={{ lineHeight: '1.5' }}><CalendarIcon height={22} /> {this.props.deliveryDate}</p>
                            <p className="m-0" style={{ lineHeight: '1.5' }}><CurrencyDollarIcon height={22} /> {this.props.price}</p>
                        </div>
                    </div>
                    {this.props.check && <div className='text-right'><strong className='text-success'>In Progress</strong></div>}
                    {this.props.type == 0 &&
                        <div className='text-right'>
                            <span className=''>
                                <Button hidden={this.props.check} label='رفض' icon="pi pi-times" onClick={this.rejectOrder} className="p-button-rounded p-button-text p-button-sm p-button-danger mr-2" aria-label="Cancel" />
                                <Button hidden={this.props.check} label='موافقة' icon="pi pi-check" onClick={this.acceptOrder} className="p-button-rounded p-button-text p-button-sm p-button-info ml-2" aria-label="Filter" />
                                {/* {this.props.check && <strong className='text-success'>In Progress</strong>} */}
                            </span>
                        </div>
                    }

                    <hr />
                </div>

            </p>
        );
    }
}
export default Order
