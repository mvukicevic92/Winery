import React from 'react';
import { Row, Col, Form, Button } from "react-bootstrap";
import Axios from '../../apis/Axios';
import { withParams, withNavigation } from '../../routeconf';

class AddWine extends React.Component {

    constructor(props) {
        super(props)

        let wine = {
            name: "",
            year: 0,
            description: "",
            priceForBottle: 0,
            availableBottles: 0,
            wineryId: 0,
            wineryName: "",
            typeId: 0,
            typeName: ""
        }

        this.state = { wine: wine, wineries: [], types: [] }
    }

    componentDidMount() {
        this.getWineries()
        this.getTypes()
    }

    async getWineries() {
        try {
            let result = await Axios.get("/wineries")
            let wineries = result.data
            this.setState({ wineries: wineries })
            console.log("Loading wineries")
        } catch (error) {
            console.log(error)
        }
    }

    async getTypes() {
        try {
            let result = await Axios.get("/types")
            let types = result.data
            this.setState({ types: types })
            console.log("Loading types")
        } catch (error) {
            console.log(error)
        }
    }

    async create(e) {
        e.preventDefault()

        try {
            let wine = this.state.wine
            let wineDTO = {
                name: wine.name,
                year: wine.year,
                description: wine.description,
                priceForBottle: wine.priceForBottle,
                availableBottles: wine.availableBottles,
                wineryId: wine.wineryId,
                wineryName: wine.wineryName,
                typeId: wine.typeId,
                typeName: wine.typeName,
            }

            let response = await Axios.post("/wines", wineDTO)
            this.props.navigate("/wines")
        } catch (error) {
            alert("wine cannot be preserved")
        }
    }

    valueInputChanged(e) {
        let input = e.target;

        let name = input.name;
        let value = input.value;

        let wine = this.state.wine;
        wine[name] = value;

        this.setState({ wine: wine });
    }

    winerySelectionChanged(e) {
        let wineryId = e.target.value
        let winery = this.state.wineries.find((winery) => winery.id == wineryId)

        let wine = this.state.wine
        wine.wineryId = winery.id
        wine.wineryName = winery.name

        this.setState({ wine: wine })
    }

    typeSelectionChanged(e) {
        let typeId = e.target.value
        let type = this.state.types.find((type) => type.id == typeId)

        let wine = this.state.wine
        wine.typeId = type.id
        wine.typeName = type.name

        this.setState({ wine: wine })
    }

    render() {
        return (
            <>
                <Row>
                    <Col></Col>
                    <Col xs="12" sm="10" md="8">
                        <h1>Add wine</h1>

                        <Form>
                            <Form.Group>
                                <Form.Label>Name of wine</Form.Label>
                                <Form.Control
                                    id="name" name="name" onChange={(e) => this.valueInputChanged(e)} /> <br />
                            </Form.Group>

                            <Form.Group>
                                <Form.Label>The year of production</Form.Label>
                                <Form.Control type="number" id="year" name="year" onChange={(e) => this.valueInputChanged(e)} /> <br />
                            </Form.Group>

                            <Form.Group>
                                <Form.Label>Description</Form.Label>
                                <Form.Control
                                    id="description" name="description" onChange={(e) => this.valueInputChanged(e)} /> <br />
                            </Form.Group>

                            <Form.Group>
                                <Form.Label>Price of bottle</Form.Label>
                                <Form.Control type="number" id="priceForBottle" name="priceForBottle" onChange={(e) => this.valueInputChanged(e)} /> <br />
                            </Form.Group>

                            <Form.Group>
                                <Form.Label>Available bottles</Form.Label>
                                <Form.Control type="number" id="availableBottles" name="availableBottles" onChange={(e) => this.valueInputChanged(e)} /> <br />
                            </Form.Group>

                            <Form.Group>
                                <Form.Label>Winery</Form.Label>
                                <Form.Select name="winery" onChange={event => this.winerySelectionChanged(event)}>
                                    <option></option>
                                    {
                                        this.state.wineries.map((winery) => {
                                            return (
                                                <option key={winery.id} value={winery.id}>{winery.name}</option>
                                            )
                                        })
                                    }
                                </Form.Select><br />
                            </Form.Group>

                            <Form.Group>
                                <Form.Label>Type</Form.Label>
                                <Form.Select name="type" onChange={event => this.typeSelectionChanged(event)}>
                                    <option></option>
                                    {
                                        this.state.types.map((type) => {
                                            return (
                                                <option key={type.id} value={type.id}>{type.name}</option>
                                            )
                                        })
                                    }
                                </Form.Select><br />
                            </Form.Group>

                            <Button onClick={(event) => { this.create(event); }}>Add</Button>
                        </Form>
                    </Col>
                    <Col></Col>
                </Row>
            </>
        )
    }

}

export default withNavigation(AddWine);