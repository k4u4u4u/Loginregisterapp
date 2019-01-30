import React from "react";

export default() => {
    return (<footer className="py-5 bg-dark">
        <div className="container">
            <p className="m-0 text-center text-white">
                Copyright © Your Website {new Date().getFullYear()}
            </p>
        </div>
    </footer>);
};
