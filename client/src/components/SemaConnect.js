import React, { Component } from 'react'

export default class SemaConnect extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: true,
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
                isLoading: false,
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
        const { isLoading, available, stations } = this.state;
        return (
            <div>
                {
                    isLoading && <p>Loading...</p>
                }
                
                {
                    available !== null
                        && <p><b>Stations Available: {available}</b></p>
                }

                <div style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'center'
                }}>
                    {
                        stations.length > 0 &&
                            stations.map((station, index) => 
                                <div
                                    style={{
                                        margin: '0 2em'
                                    }}
                                    key={index}
                                >
                                    <p>{station.name}</p>
                                    {
                                        station.status === 'Available'
                                            ? <p style={{ color: 'green' }}>Status: {station.status}</p>
                                            : <p style={{ color: 'red' }}>Status: {station.status}</p>
                                    }
                                    
                                </div>)
                    }

                </div>
            </div>
        )
    }
}
