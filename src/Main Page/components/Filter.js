
import { Component } from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { InputSwitch } from 'primereact/inputswitch';


class Filter extends Component {
    state = {
        searchValue: '',
        checked: false,
    }

    SearchPost = () => {
        this.props.SearchValueHandling(this.state.searchValue);
    }
    getServices = (e) => {
        this.setState({ checked: e.value })
        this.props.ServiceSize(e.value);
    }
    render() {
        return (
            <section className="Filter sticky-top">
                <div className=" ">
                    <div className="card">
                        <article className="filter-group">
                            {/* <header className="card-header">
                                <a href="#" data-toggle="collapse" data-target="#collapse_2" aria-expanded="true" className="">
                                    <i className="icon-control fa fa-chevron-down"></i>
                                    <h6 className="title">Brands </h6>
                                </a>
                            </header> */}
                            <div className="filter-content collapse show" id="collapse_2">
                                <div className="card-body">
                                    {/* <div className="input-group mb-3">
                                        <input type="text" className="form-control" onChange={e => this.setState({ searchValue: e.target.value })} placeholder="بحث" />
                                        <div className="input-group-append">
                                            <button className="btn btn-light" type="button" onClick={this.SearchPost}><i className="fa fa-search"></i></button>
                                        </div>
                                    </div> */}

                                    <div className="w-100">
                                        <div className="p-inputgroup">
                                            <Button icon="pi pi-search" onClick={this.SearchPost} className="p-button-success" />
                                            <InputText placeholder="بحث" onChange={e => this.setState({ searchValue: e.target.value })} />
                                        </div>
                                    </div>


                                    <hr />

                                    <label className="custom-control custom-checkbox row">
                                        <input type="checkbox" className="custom-control-input" />
                                        <div className="custom-control-label text-right">أعمال وخدمات استشارية
                                        </div>
                                    </label>
                                    <hr />
                                    <label className="custom-control custom-checkbox row">
                                        <input type="checkbox" className="custom-control-input" />
                                        <div className="custom-control-label text-right">كتابة، تحرير، ترجمة ولغات
                                        </div>
                                    </label>
                                    <hr />
                                    <label className="custom-control custom-checkbox row">
                                        <input type="checkbox" className="custom-control-input" />
                                        <div className="custom-control-label text-right">برمجة، تطوير المواقع والتطبيقات
                                        </div>
                                    </label>
                                    <hr />
                                    <label className="custom-control custom-checkbox row">
                                        <input type="checkbox" className="custom-control-input" />
                                        <div className="custom-control-label text-right">هندسة، عمارة وتصميم داخلي
                                        </div>
                                    </label>
                                    <hr />
                                    <label className="custom-control custom-checkbox row">
                                        <input type="checkbox" className="custom-control-input" />
                                        <div className="custom-control-label text-right">أعمال وخدمات استشارية
                                        </div>
                                    </label>
                                    <hr />
                                    <input type="range" className="custom-range mb-2 mt-4 " min="0" max="100" name="" />

                                    <label className="custom-control custom-checkbox d-flex justify-content-between mt-3">
                                        <InputSwitch checked={this.state.checked} onChange={this.getServices} />
                                        <h5 className=" text-right">
                                            خدمات كبيرة
                                        </h5>
                                    </label>
                                    <Button label='Apply' className="w-100 p-button-success  mt-3 mb-3" />

                                </div>
                            </div>
                        </article>
                    </div>
                </div>
            </section>
        );
    }
}

export default Filter;





