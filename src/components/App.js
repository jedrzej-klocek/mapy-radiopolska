import React, { Component } from 'react';
import { ModalContainer, ModalDialog } from 'react-modal-dialog';

import '../styles/App.css';
import Map from './Map';
import SystemButton from './Button';
import Table from './Table';
import LittleTable from './LittleTable';

class App extends Component {
    state = { loading: false };

    constructor(props) {
        super(props);
        this.state = {
            isShowingModal: false,
            arraySelectedStations: [],
            selectedRows: [],
            system: 'fm',
        };
        this.handleSystemClick = this.handleSystemClick.bind(this);
        this.handleRefreshClick = this.handleRefreshClick.bind(this);
        this.onRowSelect = this.onRowSelect.bind(this);
        this.onSelectAll = this.onSelectAll.bind(this);
    }

    onRowSelect(row, isSelected, e) {
        let tempArray = this.state.arraySelectedStations.slice();
        if (isSelected) {
            // add new object which was selected
            tempArray.push(row);
        } else if (!isSelected) {
            // remove object which has same kml as exist
            tempArray = tempArray.filter(obj => obj.kml !== row.kml);
        }
        const tempSelected = [];
        tempArray.forEach((element) => {
            tempSelected.push({
                id_nadajnik: element.id_nadajnik,
                program: element.program,
                mhz: element.mhz,
                obiekt: element.obiekt,
            });
        });
        this.setState({ arraySelectedStations: tempArray,
            selectedRows: tempSelected }, function () {
            console.log(this.state.arraySelectedStations);
        });
        console.log(e);
    }

    onSelectAll(isSelected, rows) {
        let tempArray = this.state.arraySelectedStations.slice();
        if (isSelected) {
            rows.forEach((element) => {
                tempArray.push(element);
            });
        } else {
            rows.forEach((element) => {
                tempArray = tempArray.filter(obj => obj.kml !== element.kml);
            });
        }
        const tempSelected = [];
        tempArray.forEach((element) => {
            tempSelected.push({
                id_nadajnik: element.id_nadajnik,
                program: element.program,
                mhz: element.mhz,
                obiekt: element.obiekt,
            });
        });
        this.setState({ arraySelectedStations: tempArray,
            selectedRows: tempSelected }, function () {
            console.log(this.state.arraySelectedStations);
        });
    }

    handleSystemClick(id) {
        console.log(`System was set as ${id}`);
        this.setState({ system: id, selectedRows: [], arraySelectedStations: [] });
    }

    handleRefreshClick(value) {
        console.log(`aaa ${value}`);
        window.location.reload();
    }

    openDialog = () => this.setState({ isShowingModal: true })

    handleClose = () => this.setState({ isShowingModal: false })

    render() {
        const modalStyle = {
            width: '50%',
            textAlign: 'center',
        };

        return (
            <div id="gridId" className="grid">
                <div id="systems_container" className="container systems">
                    <SystemButton id="fm" class="system" title="Change system to FM" value="FM" onSystemClick={this.handleSystemClick} />
                    <SystemButton id="dab" class="system" title="Change system to DAB+" value="DAB+" onSystemClick={this.handleSystemClick} />
                    <SystemButton id="dvbt" class="system" title="Change system to DVB-T" value="DVB-T" onSystemClick={this.handleSystemClick} />
                </div>
                <div id="buttons_container" className="container buttons">
                    <SystemButton id="home" class="home" title="Home" value="" onSystemClick={this.handleRefreshClick} /> <br />
                    <SystemButton id="stations" class="checkStation" title="Check stations to draw" value="" onSystemClick={this.openDialog} />

                </div>
                {
                    this.state.isShowingModal ?
                        <ModalContainer>
                            <ModalDialog style={modalStyle} onClose={this.handleClose}>
                                <h1>Check stations</h1>
                                <Table
                                    system={this.state.system}
                                    onSelectAll={this.onSelectAll}
                                    onRowSelect={this.onRowSelect}
                                    selected={this.state.selectedRows} />
                            </ModalDialog>
                        </ModalContainer>
                    : null
                }
                <SystemButton id="info" class="info" title="info" value="i" onSystemClick={this.handleRefreshClick} />
                <LittleTable
                    system={this.state.system}
                    onSelectAll={this.onSelectAll}
                    onRowSelect={this.onRowSelect}
                    selected={this.state.selectedRows} />
                <Map selectedStations={this.state.arraySelectedStations} />
            </div>
        );
    }
}

export default App;
