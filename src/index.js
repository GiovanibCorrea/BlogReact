import React from "react";
import ReactDOM from "react-dom";
import Main from "./Main";
import * as serviceWorker from './serviceWorker';
import { IntlProvider } from 'react-intl';

ReactDOM.render((
    <IntlProvider locale="en">
        <Main/>
    </IntlProvider>
    ),
    document.getElementById("root")
);
    
serviceWorker.unregister();