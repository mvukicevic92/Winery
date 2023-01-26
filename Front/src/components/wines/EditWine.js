import React from "react";
import Axios from "../../apis/Axios";
import { Button, Col, Form, Row } from 'react-bootstrap';
import { withNavigation, withParams } from '../../routeconf'

class EditWine extends React.Component {

    state = {
        vinoId: -1,
        name: "",
        wineYear: 0,
        wineDescription: "",
        winePriceForBottle: 0,
        wineAvailableBottles: 0,
        wineWineryId: 0,
        wineWineryName: "",
        wineTypeId: 0,
        wineTypeName: "",
        wineries: [],
        types: []
    }

    componentDidMount() {
        var id = this.props.params.id
        this.getWineries()
        this.getTypes()
        this.getWineById(id)
    }

    async getWineries() {
        try {
            let result = await Axios.get("/wineries")
            let wineries = result.data
            this.setState({ wineries: wineries })
            console.log("Loading wineries")
        } catch (error) {
            console.log(error)
            alert("Wineries can't be found")
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
            alert("Types can't be found")
        }
    }

    getWineById(wineId) {
        Axios.get("/wines/" + wineId)
            .then(res => {
                console.log(res)
                this.setState({
                    wineId: res.data.id,
                    wineName: res.data.name,
                    wineYear: res.data.year,
                    wineDescription: res.data.description,
                    winePriceForBottle: res.data.priceForBottle,
                    wineAvailableBottles: res.data.availableBottles,
                    wineWineryId: res.data.wineryId,
                    wineWineryName: res.data.wineryName,
                    wineTypeId: res.data.typeId,
                    wineTypeName: res.data.typeName
                })
            })
            .catch(error => {
                console.log(error)
            })
    }

    edit(wineId) {
        var params = {
            "id": this.state.wineId,
            "name": this.state.wineName,
            "year": this.state.wineYear,
            "description": this.state.wineDescription,
            "priceForBottle": this.state.winePriceForBottle,
            "availableBottles": this.state.wineAvailableBottles,
            "wineryId": this.state.wineWineryId,
            "wineryName": this.state.wineWineryName,
            "typeId": this.state.wineTypeId,
            "typeName": this.state.wineTypeName
        }

        Axios.put("/wines/" + this.state.wineId, params)
            .then(res => {
                console.log(res)
                this.props.navigate("/wines")
            })
            .catch(error => {
                console.log(error)
            })
    }

    onNameChange(e) {
        console.log(e.target.value)
        this.setState({ wineName: e.target.value })
    }

    onYearChange(e) {
        console.log(e.target.value)
        this.setState({ wineYear: e.target.value })
    }

    onDescriptionChange(e) {
        console.log(e.target.value)
        this.setState({ wineDescription: e.target.value })
    }

    onPriceForBottleChange(e) {
        console.log(e.target.value)
        this.setState({ winePriceForBottle: e.target.value })
    }

    onAvailableBottlesFlasa(e) {
        console.log(e.target.value)
        this.setState({ wineAvailableBottles: e.target.value })
    }

    winerySelectionChanged(e) {
        let wineryId = e.target.value
        let winery = this.state.wineries.find((winery) => winery.id == wineryId)

        this.state.wineWineryId = winery.id
        this.state.wineWineryName = winery.name
    }

    typeSelectionChanged(e) {
        let typeId = e.target.value
        let type = this.state.types.find((type) => type.id == typeId)

        this.state.wineTypeId = type.id
        this.state.wineTypeName = type.name
    }

    render() {
        return (
            <>
                <Row>
                    <Col></Col>
                    <Col xs="12" sm="10" md="8">
                        <h1>Edit wine</h1>
                        <Form>
                            <Form.Group>
                                <Form.Label htmlFor="ime">Name</Form.Label>
                                <Form.Control id="name" name="name" value={this.state.wineName} onChange={(e) => this.onNameChange(e)} /> <br />
                            </Form.Group>

                            <Form.Group>
                                <Form.Label htmlFor="year">The year of production</Form.Label>
                                <Form.Control id="year" name="year" type="number" value={this.state.wineYear} onChange={(e) => this.onYearChange(e)} /> <br />
                            </Form.Group>

                            <Form.Group>
                                <Form.Label htmlFor="description">Description</Form.Label>
                                <Form.Control id="description" name="description" value={this.state.wineDescription} onChange={(e) => this.onDescriptionChange(e)} /> <br />
                            </Form.Group>

                            <Form.Group>
                                <Form.Label htmlFor="priceForBottle">Price of bottle</Form.Label>
                                <Form.Control id="priceForBottle" name="priceForBottle" type="number" value={this.state.winePriceForBottle} onChange={(e) => this.onPriceForBottleChange(e)} /> <br />
                            </Form.Group>

                            <Form.Group>
                                <Form.Label htmlFor="availableBottles">Available bottles</Form.Label>
                                <Form.Control id="availableBottles" name="availableBottles" type="number" value={this.state.wineAvailableBottles} onChange={(e) => this.onAvailableBottlesFlasa(e)} /> <br />
                            </Form.Group>

                            <Form.Group>
                                <Form.Label htmlFor="wineryId">Winery</Form.Label>
                                <Form.Control as="select" id="wineryId" onChange={event => this.winerySelectionChanged(event)}>
                                    <option>{this.state.wineWineryName}</option>
                                    {
                                        this.state.wineries.map((winery) => {
                                            return (
                                                <option key={winery.id} value={winery.id}>{winery.name}</option>
                                            )
                                        })
                                    }
                                </Form.Control><br />
                            </Form.Group>

                            <Form.Group>
                                <Form.Label htmlFor="typeId">Type</Form.Label>
                                <Form.Control as="select" id="typeId" onChange={event => this.typeSelectionChanged(event)}>
                                    <option>{this.state.wineTypeName}</option>
                                    {
                                        this.state.types.map((type) => {
                                            return (
                                                <option key={type.id} value={type.id}>{type.name}</option>
                                            )
                                        })
                                    }
                                </Form.Control><br />
                            </Form.Group>

                            <Button onClick={() => this.edit(this.state.wineId)}>Edit</Button>
                        </Form>
                    </Col>
                    <Col></Col>
                </Row>
            </>
        )
    }



}

export default withParams(withNavigation(EditWine))