import React from 'react';
import ReactDOM from 'react-dom';


class TaskEditComponent extends React.Component {
    constructor(props) {
        super(props)
    }

    render () {
        return(
            <h1> hellow world </h1>
        )
    }
}

ReactDOM.render(<TaskEditComponent />, document.getElementById('root'));

export default TaskEditComponent
