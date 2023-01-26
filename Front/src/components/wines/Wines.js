import React from "react";
import { Row, Col, Button, Table, Form } from 'react-bootstrap'
import Axios from "../../apis/Axios";
import { withParams, withNavigation } from '../../routeconf';
import './../../index.css';


class Wines extends React.Component {

    constructor(props) {
        super(props)

        this.pageNo = 0;
        this.totalPages = 0;

        const search = {
            wineryId: "",
            name: ""
        }

        this.state = {
            wines: [],
            wineries: [],
            types: [],
            search: search,
            showing: false,
            quantity: 0
        }

    }

    componentDidMount() {
        this.getWines(0)
        this.getWineries()
        this.getTypes()
    }

    async getWines(newPageNo) {

        let config = {
            params: {
                wineryId: this.state.search.wineryId,
                name: this.state.search.name,
                pageNo: newPageNo
            }
        }

        try {
            let result = await Axios.get("/wines", config)
            this.pageNo = newPageNo
            this.totalPages = result.headers["total-pages"]
            this.setState({
                wines: result.data
            })
        } catch (error) {
            console.log(error)

        }
    }

    getWineries() {
        Axios.get("/wineries")
            .then((res) => {
                this.setState({ wineries: res.data })
            })
            .catch((error) => {
                console.log(error)
            })
    }

    getTypes() {
        Axios.get("/types")
            .then((res) => {
                this.setState({ types: res.data })
            })
            .catch((error) => {
                console.log(error)
            })
    }

    goToAdd() {
        this.props.navigate("/wines/add")
    }

    goToEdit(id) {
        this.props.navigate("/wines/edit/" + id)
    }

    async purchase(wineId) {

        try {
            var body = {
                "id": wineId,
                "quantity": this.state.quantity
            }
            let response = await Axios.post("/wines/purchase", body);
            alert("Successful purchase")
            this.getWines(0)

        } catch (error) {
            alert("Not a successful purchase")
        }
    }

    async order(wineId) {

        try {
            var body = {
                "id": wineId,
                "quantity": this.state.quantity
            }
            let response = await Axios.post("/wines/order", body);
            alert("Successful ordering")
            this.getWines(0)

        } catch (error) {
            alert("Order not successful")
        }
    }

    deleteFromState(wineId) {
        var wines = this.state.wines
        wines.forEach((element, index) => {
            if (element.id === wineId) {
                wines.splice(index, 1)
                this.setState({ wines: wines })
            }
        })
    }

    goToDelete(wineId) {
        Axios.delete("/wines/" + wineId)
            .then(res => {
                console.log(res)
                alert("Successful delete wine")
                this.deleteFromState(wineId)
            })
            .catch(error => {
                console.log(error)
                window.location.reload()
            })
    }

    onInputChange(event) {
        const name = event.target.name;
        const value = event.target.value

        let search = this.state.search;
        search[name] = value;

        this.setState({ search })
    }

    onQuantityChange(e) {
        this.state.quantity = e.target.value;
    }

    renderSearchForm() {
        return (
            <>
                <Form style={{ width: "100%" }}>
                    <Row><Col>
                        <Form.Group>
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                name="name"
                                as="input"
                                type="text"
                                onChange={(e) => this.onInputChange(e)}>
                            </Form.Control>
                        </Form.Group>
                    </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Form.Group>
                                <Form.Label>Winery</Form.Label>
                                <Form.Select
                                    name="wineryId"
                                    onChange={(e) => this.onInputChange(e)}>
                                    <option value=""></option>
                                    {this.state.wineries.map((winery) => {
                                        return (
                                            <option value={winery.id}>{winery.name}</option>
                                        );
                                    })}
                                </Form.Select>
                            </Form.Group>
                        </Col>
                    </Row>
                </Form>
                <Row><Col>
                    <Button className="mt-3" onClick={() => this.getWines()}>Search</Button>
                    <br />
                    <br />
                </Col>
                </Row>
            </>
        )
    }

    render() {
        return (
            <Col>
                <Row>Wines</Row>
                <label>
                    <input type="checkbox" onChange={() => this.setState({ showing: !this.state.showing })} />
                    Search
                </label>
                <div>
                    <Row hidden={this.state.showing}>
                        {this.renderSearchForm()}
                    </Row>
                </div>
                <Row><Col>
                    <Button onClick={() => this.goToAdd()}>Add</Button>
                </Col></Row>

                <Row><Col>

                </Col></Row>
                <Row><Col>

                    <Table style={{ marginTop: 5 }}>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Winery</th>
                                <th>type</th>
                                <th>Year</th>
                                <th>Description</th>
                                <th>Price for bottle</th>
                                <th>Available bottles</th>
                                <th>Quantity</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.wines.map((wine) => {
                                return (
                                    <tr key={wine.id}>
                                        <td>{wine.name}</td>
                                        <td>{wine.wineryName}</td>
                                        <td>{wine.typeName}</td>
                                        <td>{wine.year}</td>
                                        <td>{wine.description}</td>
                                        <td>{wine.priceForBottle}</td>
                                        <td>{wine.availableBottles}</td>

                                        <Form.Group>
                                            <Form.Label htmlFor="quantity"></Form.Label>
                                            <Form.Control id="quantity" type="number" onChange={(e) => this.onQuantityChange(e)} /> <br />
                                        </Form.Group>

                                        {window.localStorage['role'] == 'ADMIN' ?
                                            <td><Button onClick={() => this.order(wine.id)}>Order</Button></td> : null}
                                        {window.localStorage['role'] == 'KORISNIK' ?
                                            <td><Button variant="success" onClick={() => this.purchase(wine.id)}>Purchase</Button></td> : null}

                                        <td><Button variant="warning" onClick={() => this.goToEdit(wine.id)}>Edit</Button></td>
                                        <td><Button variant="danger" onClick={() => this.goToDelete(wine.id)}>Delete</Button></td>


                                    </tr>
                                );
                            })}
                        </tbody>
                    </Table>
                    <Button disabled={this.pageNo === 0} onClick={() => this.getWines(this.pageNo - 1)} className="mr-3">Prev</Button>
                    <Button disabled={this.pageNo == this.totalPages - 1} onClick={() => this.getWines(this.pageNo + 1)} className="mr-3">Next</Button>
                </Col></Row>
            </Col>
        )
    }

}

export default withNavigation(withParams(Wines))