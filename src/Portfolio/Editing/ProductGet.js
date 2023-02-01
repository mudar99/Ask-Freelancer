import React, { Component } from "react";
import { Button } from 'primereact/button';
import { local, SuccessProduct } from '../../API';
import { Toast } from 'primereact/toast';
import axios from "axios";
import { DownloadIcon, FolderIcon } from "@heroicons/react/outline";

class ProductGet extends Component {

    successProduct = (e) => {
        e.preventDefault();
        axios.post(SuccessProduct + this.props.order_id).then(
            res => {
                if (res.data.status == true) {
                    console.log(res.data)
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
            <div >
                <Toast ref={(el) => this.toastSuccess = el} position="bottom-right" />
                <Toast ref={(el) => this.toastFailure = el} position="bottom-right" />

                {this.props.Products.map(file => {
                    return <div className="container card p-2 mb-2 d-flex justify-content-between">
                        <div>
                            <div className="w-100"><FolderIcon height={40} /> {file.id}</div>
                            <a className="float-right" href={local + file.file} download>
                                انقر لتحميل المرفق <DownloadIcon height={22} />
                            </a>
                            <h6>{file.updated_at}</h6>
                        </div>
                    </div>
                })}
                <div className="text-center">
                    <Button label="تأكيد الاستلام والقبول" icon='pi pi-check' className=" mt-2 w-25 p-button-raised p-button-plain p-button-sm p-button-text p-button-success " onClick={this.successProduct} />
                </div>
            </div>
        );
    }
}
export default ProductGet
