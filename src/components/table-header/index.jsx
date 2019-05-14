import React from 'react'
import { Row, Col, Icon } from 'antd'
import './index.less'

export default class tableHeader extends React.Component{
    constructor( props ) {
        super( props )
    }
    HeaderClick( val ){
        if( val.action ) this.props.HeaderClick( val.action )
    }
    render(){
        let { HeaderData } = this.props
        return (
            <div className='tableHeader'>
                {
                    HeaderData.map( ( item, key )=>{
                        return (
                            <div className='tableHeader-item' key={ key } onClick={ this.HeaderClick.bind(this, item ) }>
                                {
                                    ( item.icon && <Icon type={ item.icon } /> ) || <Icon type="setting" />
                                }
                                { item.name }
                            </div>
                        )
                    })
                }
                
            </div>
        )
    }
}