import { Component } from "react";
import LoadingIcon from "../../LoadingIcon";
import { XIcon, XCircleIcon } from '@heroicons/react/outline';
import { local } from '../../API'
import axios from "axios";
import Order from "./Order";


class Orders extends Component {
    state = {
        counter: 0,
        token: localStorage.getItem('userToken'),
        checkload: false,
        loading: true,
    };
    render() {
        return (
            <div className="container p-3">
                <div className="col">
                    <h5 className="p-2 rounded text-center font-weight-bolder">
                        الطلبات
                    </h5>
                </div>
                {this.props.Orders.length == 0 &&
                    <div className="w-100 m-4 text-center text-danger">
                        لايوجد طلبات لعرضها
                    </div>
                }{console.log(this.props.Orders)}
                {this.props.type == 1 &&
                    this.props.Orders.map(order => {
                        return <Order
                            type={this.props.type}
                            key={order.id}
                            id={order.id}
                            profileImg={local + order.freelancer.cover_image}
                            orderTitle={order.post != null && order.post.title}
                            check = {order.post == null && true}
                            deliveryDate={order.deliveryDate}
                            price={order.price}
                            name={order.freelancer.first_name + " " + order.freelancer.last_name}
                            time={order.created_at}
                        />
                    })
                }
                {this.props.type == 0 &&
                    this.props.Orders.map(order => {
                        return <Order
                            type={this.props.type}
                            key={order.id}
                            id={order.id}
                            profileImg={local + order.user.cover_image}
                            orderTitle={order.post != null && order.post.title}
                            check = {order.post == null && true}
                            deliveryDate={order.deliveryDate}
                            price={order.price}
                            name={order.user.first_name + " " + order.user.last_name}
                            time={order.created_at}
                        />
                    })
                }
            </div>
        )
    }
}
export default Orders
