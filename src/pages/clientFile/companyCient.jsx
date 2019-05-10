import React from 'react'

import TableGroup from '&/table-group/'

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
                {   
                    name            : ['buildTimeBegin','buildTimeEnd'], 
                    title           : '生成日' , 
                    type            : 'RangePicker',  
                    placeholder     : ['生成日开始','生成日结束'],
                },
                {   
                    name            : 'search', 
                    title           : '供应商' , 
                    type            : 'search',  
                    placeholder     : '请输入供应商检索',
                    data            : [],
                    searchUrl       : '/wf-base/api/supplierManager/supplierSearch/'
                },
                {   
                    name            : ['inputStart','inputEnd'], 
                    title           : '核销金额' , 
                    type            : 'doubleInput',  
                    placeholder     : ['开始','结束'],
                },
                {   
                    name            : 'month', 
                    title           : '月份' , 
                    type            : 'month',  
                    placeholder     : '请选择月份',
                },
                {
                    name            : 'data', 
                    title           : '截止日期' , 
                    type            : 'DatePicker',  
                    placeholder     : '请选择日期',
                },
                {
                    name            : ['Startmonth', 'Endmonth'], 
                    title           : '截止日期' , 
                    type            : 'RangeMonth',  
                    placeholder     : ['Start month', 'End month'],
                }
            ]
        }
    }

    onSearch(){
        
    }

    render(){
        let  { inputGroup } = this.state
        return(
            <div className='companyCient'>
                <TableGroup 
                    inputGroup  = {inputGroup}
                    searchTitle = '搜索'
                    clearTitle  = '清空'
                    onSearch    = {this.onSearch.bind(this)}
                />
            </div>
        )
    }
}

export default companyCient