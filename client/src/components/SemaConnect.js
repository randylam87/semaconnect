import React, { Component } from 'react'

export default class SemaConnect extends Component {
    constructor(props) {
        super(props);

        this.state = {
            available: null,
            stations: []
        }
    }

    componentDidMount() {
        const url = '/sema';

        fetch(url, {
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => response.json())
            .then(json => this.setState({
                available: json.aaData.stations[0].available,
                stations: json.aaData.stations.map(station => {
                    return {
                        name: station.name,
                        status: station.status
                    }
                })
            }));
    }

    render() {
        const { available, stations } = this.state;
        return (
            <div>
                {
                    available !== null
                        && <p>Available: {available}</p>
                }

                {
                    stations.length > 0 &&
                        stations.map((station, index) => 
                            <div key={index}>
                                <p>{station.name}</p>
                                {
                                    station.status === 'Available'
                                        ? <p style={{ color: 'green' }}>Status: {station.status}</p>
                                        : <p style={{ color: 'red' }}>Status: {station.status}</p>
                                }
                                
                            </div>)
                }
            </div>
        )
    }
}
