import React, { useContext } from 'react';
import { Context } from '../context/Context';

function Error() {
    const { toggleError } = useContext(Context)
    return (
        <div className="alert alert-danger alert-dismissible fade show" role="alert">
            There was an error. Try again
            <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close" onClick={() => toggleError(false)}></button>
        </div>
    );
}

export default Error;