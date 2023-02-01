import React, { Component } from "react";
import { Button } from 'primereact/button';
import { BadgeCheckIcon, BanIcon } from "@heroicons/react/outline";
import { Dialog } from 'primereact/dialog';
import ProductSend from "../Editing/ProductSend";
import ProductGet from "../Editing/ProductGet";
import { GetProduct } from '../../API'
import axios from 'axios'

class About extends Component {
    state = {
        isChatOn: false,
        showDialog: false,
        showProduct: false,
        Products: [],
        order_id: ''
    }
    ChatHandler = e => {
        this.setState(prevState => ({
            isChatOn: !prevState.isChatOn
        }
        ), () => this.props.isChatOn(this.state.isChatOn))
    }
    getProducts = () => {
        axios.get(GetProduct + localStorage.getItem('UserID')).then(
            res => {
                if (res.data.status == true) {
                    console.log(res.data.data)
                    this.setState({
                        Products: res.data.data.files,
                        order_id: res.data.data.order_id,
                    });
                }
            }).catch(err => console.error(err));
    }
    render() {
        this.header1 = <h5 className="text-center">تسليم الملف النهائي</h5>
        this.header2 = <h5 className="text-center">المنتجات</h5>
        return (
            <div id="about" className="container mt-5">
                <div className="row d-flex justify-content-center">
                    <div className="col-md-10">
                        <div className="card p-3 py-4">
                            <div className="text-center">
                                <img src={this.props.profileImg} className="rounded-circle" />
                            </div>
                            <div className="text-center mt-4">
                                <span className="bg-info p-1 px-4 rounded text-white">
                                    {this.props.is_documented == 1 ?
                                        <big className="w-25 m-4">
                                            <BadgeCheckIcon height={20} className="text-light mt-1 mr-2" />
                                            الحساب موثّق
                                        </big>
                                        :
                                        <big className="w-25 m-4">
                                            الحساب غير موثّق
                                        </big>
                                    }
                                </span>
                                <h5 className="mt-3 mb-2 ">{this.props.Fname} {this.props.Lname}</h5>
                                {this.props.type == 0 && <font className="text-info">Freelancer</font>}
                                {this.props.type == 1 && <font className="text-info">Client</font>}

                                <div className="text-center ">
                                    {this.props.type == 0 && <><span><big className="text-success ">Specalization: </big>{this.props.Specalization}</span><br /></>}
                                    {this.props.type == 0 && <><span><big className="text-success">Profission Name: </big>{this.props.ProfissionName}</span><br /></>}
                                    <span hidden={this.props.isVisible}><big className="text-success">Balance: </big>{this.props.Balance == "" ? '0.0' : this.props.Balance}</span>
                                </div>

                                <div className="px-4 mt-2">
                                    <p className="fonts">{this.props.Bio}</p>
                                </div>
                                <ul className="social-list">
                                    <li><i className="fa fa-facebook"></i></li>
                                    <li><i className="fa fa-twitter"></i></li>
                                    <li><i className="fa fa-instagram"></i></li>
                                    <li><i className="fa fa-linkedin"></i></li>
                                    <li><i className="fa fa-google"></i></li>
                                </ul>
                                <div className=" ">
                                    <Button hidden={this.props.myID == this.props.userID} label="مراسلة" icon='pi pi-send' onClick={this.ChatHandler} className="p-button-raised p-button-plain p-button-text" />
                                    <Button hidden={this.props.myID == this.props.userID} label="تسليم المنتج" icon='pi pi-file' className="ml-4 p-button-raised p-button-plain p-button-text p-button-success" onClick={() => this.setState({ showDialog: true })} />
                                    <Button hidden={this.props.myID != this.props.userID} label="المنتجات" icon='pi pi-file' className="ml-4 p-button-raised p-button-plain p-button-text p-button-success" onClick={() => this.setState({ showProduct: true })} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Dialog header={this.header1} dismissableMask visible={this.state.showDialog} style={{ width: '50vw' }} onHide={() => this.setState({ showDialog: false })}>
                    <ProductSend
                        userID={this.props.userID}
                    />
                </Dialog>

                <Dialog onShow={this.getProducts} header={this.header2} dismissableMask visible={this.state.showProduct} style={{ width: '70vw' }} onHide={() => this.setState({ showProduct: false })}>
                    <ProductGet
                        order_id={this.state.order_id}
                        Products={this.state.Products} />
                </Dialog>
            </div>
        );
    }
}
export default About

