import React, { Component } from 'react'

export default class Error extends Component {
    render() {
        return (
            <div className="error">
                {this.props.message}
            </div>
        )
    }
}
