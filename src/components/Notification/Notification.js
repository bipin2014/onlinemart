// React Notification
import 'react-notifications/lib/notifications.css';
import { NotificationContainer } from 'react-notifications';

import React, { Component } from 'react'

export default class Notification extends Component {
    
    render() {
        return (
            <div>
            {this.props.type==="info" && NotificationManager.info('Info message')}
                <NotificationContainer/>
            </div>
        )
    }
}
