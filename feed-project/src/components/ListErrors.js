import React from 'react';

class ListErrors extends React.Component {
    render() {
        const errors = this.props.errors;
        const styles = {
            textAlign: 'left'
        }
        if(errors) {
            return (
                <ul className="error-messages">
                    {
                        Object.keys(errors).map(key => {
                            return (
                                <li style={styles} key={key}>
                                    {key} {errors[key]}
                                </li>
                            )
                        })
                    }
                </ul>
            )
        } else {
            return null;
        }
    }
}

export default ListErrors;