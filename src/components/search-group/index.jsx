import React from 'react'
import { Form, Col, Row, Button  } from 'antd'
import { fromJS }          from 'immutable'

import InputGroup from '&/input-group/'
import ButtonGroup from 'antd/lib/button/button-group';

import { searchValue } from 'lib/util'

import './index.less'

class tableGroup extends React.Component{
    constructor( props ){
        super( props )
    }
    /**
     * @event 初始化赋值
     **/
    componentWillMount(){

        let initialState = fromJS(this.props).toJS()
        
        this.setState(
            {
                ...initialState
            }
        )

    }

    inputChange( val ){
        console.log( val )
        this.props.onChange( val )

    }

    clearBtn(){

        let { inputGroup } = this.state

        inputGroup.forEach( ( item, index ) => {
            this.refs[`${index}-input`].clearInput()
        })

        
        this.props.onClear()

    }

    searchBtn(){

        this.props.onSearch()

    }

    render(){
        let { inputGroup, clearTitle, searchTitle } = this.state
        return (
            <Form>
                <Row>
                    <Col span={20}>
                        <Row>
                            {
                                inputGroup.map( (item, index) =>{
                                    return (
                                        <Col span={6} key={index}>
                                            <InputGroup  ref={`${index}-input`} {...item} onChange={this.inputChange.bind(this)}/>
                                        </Col>
                                    )
                                })
                            }
                        </Row>
                    </Col>
                    <Col  span={3} offset={1} className='searchName'>
                        <Row>
                            <Button onClick={this.searchBtn.bind(this)} type="primary">{searchTitle}</Button>
                        </Row>
                        <Row>
                            <Button onClick={this.clearBtn.bind(this)} >{clearTitle}</Button>
                        </Row>
                    </Col>
                </Row>
            </Form>
        )
    }
}

export default tableGroup