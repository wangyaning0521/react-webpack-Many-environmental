/**
 * @event 依赖
 **/
import React                from 'react';
import { fromJS }           from 'immutable'
import { formItemLayout, isInput, isSelect, isCascader, isRangePicker }   from 'lib/util'
/**
 * @event antDesign-引入
 **/
import { Form, Input, DatePicker, Col, TimePicker, Select, Cascader, InputNumber, Row, Button } from 'antd';


const { Item : FormItem }                        = Form;
const { Option  }                                = Select
const { MonthPicker, RangePicker, WeekPicker }   = DatePicker;



class inputGroup extends React.Component{

    constructor(props){

        super(props);
        
        this.state = {}

    }
    /**
     * @event 初始化赋值
     **/
    componentWillMount(){

        let initialState = fromJS(this.props).toJS()
        
        this.setState(initialState)

    }
    /**
     * @event 清空表单-由ref触发
     **/
    clearInput(){
        this.setState({
            value : ''
        })
    }
    /**
     * @event 监控状态改变
     **/
    componentWillReceiveProps(nextProps){
        Object.keys(nextProps).forEach( ( val ) =>{
            if( val !== 'value' ){
                this.setState({
                    [ val ]: nextProps[val]
                })
            }
        })
    }
    /**
     * @event 改变触发
     **/
    inputChange( value  ){

        let { name, type } = this.state

        this.setState({
            value: isInput( type ) ? value.target.value :  value
        })

        if( ( isInput( type ) && value.target.value ) || ( isSelect( type ) && value !== -1) ){
            this.props.onChange({
                [ name ] : isInput( type ) ? value.target.value : value 
            })
        }

        
        else if( ( isCascader( type ) || isRangePicker( type ) ) && Array.isArray(value) && value.length ){
            

        }

        else{
            this.props.onChange(this.state.name)
        }

    }
    
    render(){

        let { value, placeholder, data, type, title } = this.state
     

        return (
            <FormItem
                {...formItemLayout} 
                label={ title }
            >
                {/** @event 文本框 */}
                {
                    type == 'input' 
                        && 
                    <Input 
                        defaultValue={ value }
                        value={ value }
                        placeholder = { placeholder } 
                        onChange={ this.inputChange.bind(this) }
                    />
                }
                {/** @event 下拉框 */}
                {
                    type == 'select' 
                        && 
                    <Select
                        value={value} 
                        placeholder = { placeholder } 
                        onChange={this.inputChange.bind(this)}
                    >
                        {
                            data.map( (item) => {
                               return (
                                    <Option  key={item.value} value={item.value}>{item.label}</Option>
                               )
                           }) 
                        }
                    </Select>
                }
                {/** @event 级联选择 */}
                {
                    type == 'cascader' 
                        && 
                    <Cascader 
                        options={data} 
                        onChange={this.inputChange.bind(this)} 
                        placeholder={placeholder}
                        value={value}
                    />
                }
                {/** @event 双向时间框 */}
                {
                    type == 'RangePicker' 
                        && 
                    <RangePicker
                        placeholder= {placeholder}
                        value = {value}
                        onChange={this.inputChange.bind(this)} 
                    />
                }
                
            </FormItem>
        );
    }
}

export default inputGroup;