import React                    from 'react'
import ReactDom                 from 'react-dom'
import RouterComponent          from 'router/index.jsx'
import 'style/reset.less'



ReactDom.render(
    <RouterComponent />,
    document.getElementById('root')
)