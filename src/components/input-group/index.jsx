/**
 * @event 依赖
 **/
import React                from 'react';
import { fromJS }           from 'immutable'
import fetch                from 'Axios'
import moment               from 'moment'
/**
 * @event antDesign-引入
 **/
import { Form, Input, DatePicker, Col, TimePicker, Select, Cascader, InputNumber, Row, Button, Spin   }  from 'antd';
import { formItemLayout, isInput, isSelect, isCascader, isRangePicker, isSearch, isdoubleInput, isMonth, isDatePicker }                       from 'lib/util'

const { Item : FormItem }                        = Form;
const { Option  }                                = Select
const { MonthPicker, RangePicker, WeekPicker }   = DatePicker;

import './index.less'

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
        
        this.setState(
            {
                ...initialState,
                fetching   : false,
                startInput : null,
                endInput   : null,
                mode       : ['month', 'month'],
            }
        )

    }
    /**
     * @event 清空表单-由ref触发
     **/
    clearInput(){

        let { name } = this.state

        this.setState({
            value       :  null,
            startInput  : null,
            endInput    : null,
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
    inputChange( value, val  ){

        let { name, type } = this.state,
            { onChange }   = this.props
        

        this.setState({
            value: isInput( type ) ? value.target.value :  isSearch( type ) ? val.props.children : value
        })

        if( 
            ( isInput( type ) && value.target.value ) 
                || 
            ( isSelect( type ) && value !== -1) 
                || 
            ( isSearch( type ) && value )
        ){
            onChange({
                [ name ] : isInput( type ) ? value.target.value : value 
            })
        }
        else if( ( isMonth(type) && value ) || ( isDatePicker(type) && value ) ){
            onChange({
                [ name ] : val
            })
        }
        else if( ( isCascader( type ) || isRangePicker( type ) ) && Array.isArray(value) && value.length ){
            
            if( isCascader( type ) )    name.forEach( ( item, index ) => onChange( { [ item ] : value[ index ] }) )

            else if ( isRangePicker( type ) )   name.forEach( ( item, index ) => onChange( { [ item ] : val[ index ] }) )

        }

        else{
            this.props.onChange(this.state.name)
        }

    }

    /**
     * @event 下拉检索
     **/

    fetchUser( value ){
        
        const { searchUrl } = this.state

        this.setState({ data: [], fetching: true });

        fetch.get(`${searchUrl}${value}`).then( ( response ) => {
            
            let { code, result } = response

            if( code == 0 ) this.setState({ data: result , fetching: true });
            else this.setState({ data: [], fetching: false });
        })

    }

    /**
     * @event 双input的change
     **/

    doubleInputChange( type, value ){
        
        const index     = type == 'startInput' ? 0 : 1,
              { name }  = this.state


        this.setState({
            [ type ] : value
        })

        if( value || value === 0 )
            this.props.onChange({
                [ name[index]] : value
            })
        else this.props.onChange( name[index] )

    }


    /**
     * @event 双月份选择
     **/

    handlePanelChange (value, mode, qwe) {

        let { name } = this.state

        this.setState({ value });

        if( value.length )
            value.forEach( (item,index) => this.props.onChange( { [name[index]] : item.format('YYYY-MM') } ))
        else{
            this.props.onChange( name[0] )
            this.props.onChange( name[1] )
        }
            
    }
    
    /**
     * @event 双月份改变
     **/

    handleChange  (value)  {
        
        let { name } = this.state

        if( value.length )
            value.forEach( (item,index) => this.props.onChange( { [name[index]] : item.format('YYYY-MM') } ))
        else{
            this.props.onChange( name[0] )
            this.props.onChange( name[1] )
        }
            

        this.setState({ value });
    }


    render(){

        let { 
            value, 

            placeholder, 

            data, 

            type, 

            title, 

            mode, 

            fetching,

            startInput, 

            endInput

        } = this.state
     

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
                        defaultValue    =   { value }
                        value           =   { value }
                        placeholder     =   { placeholder } 
                        onChange        =   { this.inputChange.bind(this) }
                    />
                }
                {/** @event 下拉框 */}
                {
                    type == 'select' 
                        && 
                    <Select
                        value       =   {value} 
                        placeholder =   { placeholder } 
                        onChange    =   {this.inputChange.bind(this)}
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
                        options         =   {data} 
                        onChange        =   {this.inputChange.bind(this)} 
                        placeholder     =   {placeholder}
                        value           =   {value}
                    />
                }
                {/** @event 双日期 */}
                {
                    type == 'RangePicker' 
                        && 
                    <RangePicker
                        placeholder     =   {placeholder}
                        value           =   {value}
                        onChange        =   {this.inputChange.bind(this)} 
                    />
                }
                {/** @event 检索框 */}
                {
                    type == 'search'
                        &&
                    <Select
                        showSearch
                        value                       =   {value}
                        defaultActiveFirstOption    =   {false}
                        placeholder                 =   {placeholder}
                        notFoundContent             =   {fetching ? <Spin size="small" /> : null}
                        filterOption                =   {false}
                        onSearch                    =   {this.fetchUser.bind(this)}
                        onChange                    =   {this.inputChange.bind(this)}
                    >
                        {data.map(item => <Option key={item.value}>{item.label}</Option>)}
                    </Select>
                }
                {/** @event 双input */}
                {
                    type == 'doubleInput'
                        &&
                    <Row className='doubleInput'>
                        <Col span={11}>
                            <InputNumber 
                                min              =  {0}  
                                step             =  {1}
                                value            =  {startInput}
                                placeholder      =  {placeholder.length ? placeholder[0] : null }
                                onChange        =   {this.doubleInputChange.bind(this,'startInput')} 
                            >
                            </InputNumber>
                        </Col>
                        <Col span={2}>
                            -
                        </Col>
                        <Col span={11}>
                            <InputNumber 
                                min               =   {0}  
                                step              =   {1}
                                value             =   {endInput}
                                placeholder       =   {placeholder.length ? placeholder[1] : null }
                                onChange          =   {this.doubleInputChange.bind(this,'endInput')} 
                            >
                            </InputNumber>
                        </Col>
                    </Row>
                }
                {/** @event 月份 */}
                {
                    type == 'month'
                        &&
                    <MonthPicker
                        className       =   'monthClass'
                        onChange        =   {this.inputChange.bind(this)}
                        value           =   {value}
                        placeholder     =   {placeholder}
                    />
                }
                {/** @event 单日期 */}
                {
                    type == 'DatePicker'
                        &&
                    <DatePicker
                        className       =   'DatePickerClass'
                        value           =   {value}
                        onChange        =   {this.inputChange.bind(this)} 
                        placeholder     =   {placeholder}
                    />
                }
                {/** @event 双月份日期 */}
                {
                    type == 'RangeMonth'
                        &&
                    <RangePicker
                        placeholder         =   {['Start month', 'End month']}
                        format              =   "YYYY-MM"
                        value               =   {value}
                        mode                =   {mode}
                        onChange            =   {this.handleChange.bind(this)}
                        onPanelChange       =   {this.handlePanelChange.bind(this)}
                      />
                }
                
            </FormItem>
        );
    }
}



// [
//     {
//         name            : 'keyWord',
//         title           : '关键字',
//         type            : 'input',
//         placeholder     : '账单号、联系人、联系电话'
//     },
//     {   
//         name            : 'customId', 
//         title           : '归属客服' , 
//         type            : 'select' ,  
//         data            : customData , 
//         placeholder     : '请选择客服',
//     },
//     {   name            : ['province','city'], 
//         title           : '所在地' , 
//         type            : 'cascader' ,  
//         data            : options , 
//         placeholder     : '请选择所在地',
//     },
//     {   
//         name            : ['buildTimeBegin','buildTimeEnd'], 
//         title           : '生成日' , 
//         type            : 'RangePicker',  
//         placeholder     : ['生成日开始','生成日结束'],
//     },
//     {   
//         name            : 'search', 
//         title           : '供应商' , 
//         type            : 'search',  
//         placeholder     : '请输入供应商检索',
//         data            : [],
//         searchUrl       : '/wf-base/api/supplierManager/supplierSearch/'
//     },
//     {   
//         name            : ['inputStart','inputEnd'], 
//         title           : '核销金额' , 
//         type            : 'doubleInput',  
//         placeholder     : ['开始','结束'],
//     },
//     {   
//         name            : 'month', 
//         title           : '月份' , 
//         type            : 'month',  
//         placeholder     : '请选择月份',
//     },
//     {
//         name            : 'data', 
//         title           : '截止日期' , 
//         type            : 'DatePicker',  
//         placeholder     : '请选择日期',
//     },
//     {
//         name            : ['Startmonth', 'Endmonth'], 
//         title           : '截止日期' , 
//         type            : 'RangeMonth',  
//         placeholder     : ['Start month', 'End month'],
//     }
// ],
export default inputGroup;