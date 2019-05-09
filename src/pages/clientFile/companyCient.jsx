import React from 'react'
import InputGroup from '&/input-group/'

import { Form, Col, Row  } from 'antd'


const customData = [
    {
        label:'王三',
        value: 2
    },
    {
        label:'李四',
        value: 4
    },
    {
        label:'刘五',
        value: 3
    },
]

const options = [{
    value: 'zhejiang',
    label: 'Zhejiang',
    children: [{
      value: 'hangzhou',
      label: 'Hangzhou',
    }],
  }, {
    value: 'jiangsu',
    label: 'Jiangsu',
    children: [{
      value: 'nanjing',
      label: 'Nanjing',
    }],
  }];


class companyCient extends React.Component{
    constructor(props){
        super(props)

        this.state = {
            inputGroup : [
                {
                    name            : 'keyWord',
                    title           : '关键字',
                    type            : 'input',
                    value           : '',
                    placeholder     : '账单号、联系人、联系电话'
                },
                {   
                    name            : 'customId', 
                    title           : '归属客服' , 
                    type            : 'select' ,  
                    data            : customData , 
                    placeholder     : '请选择客服',
                },
                {   name            : ['province','city'], 
                    title           : '所在地' , 
                    type            : 'cascader' ,  
                    data            : options , 
                    placeholder     : '请选择所在地',
                },
            ]
        }
    }

    inputChange(){

    }

    render(){
        let { inputGroup } = this.state
        return(
            <div className='companyCient'>
                <Form>
                    <Row>
                        <Col span={20}>
                            <Row>
                                {
                                    inputGroup.map( (item, index) =>{
                                        return (
                                            <Col span={6} key={index}>
                                                <InputGroup  ref={`${item.name}-input`} {...item} onChange={this.inputChange.bind(this)}/>
                                            </Col>
                                        )
                                    })
                                }
                            </Row>
                        </Col>
                    </Row>
                </Form>
            </div>
        )
    }
}

export default companyCient