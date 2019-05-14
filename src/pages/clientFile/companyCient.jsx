import React from 'react'

import SearchGroup from '&/search-group/'
import TableHeader from '&/table-header/'
import { Table }   from 'antd'
import fetch       from 'Axios'

import { searchValue } from 'lib/util'
import { fromJS }          from 'immutable'

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

        this.pages          = this.pages.bind(this)
        this.pageSizeChange = this.pageSizeChange.bind(this)

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
            ],
            HeaderData:[
                {
                    name   : '添加单位',
                    action : 'addCompany'
                },
                {
                    name   : '批量删除',
                    action : 'batchRemove'
                },
            ],
            dataSource:[],
            columns:[
                {
                    title: '单位',
                    dataIndex: 'companyName',
                    key: 'companyName',
                    align:'center',
                    width: 120,
                },
                {
                    title: '所在地',
                    dataIndex: 'region',
                    key: 'region',
                    align:'center',
                    width: 130,
                },
                {
                    title: '单位规模',
                    dataIndex: 'scale',
                    key: 'scale',
                    align:'center',
                    width: 120,
                },
                {
                    title: '所在行业',
                    dataIndex: 'industry',
                    key: 'industry',
                    align:'center',
                    width: 120,
                },
                {
                    title: '员工人数',
                    dataIndex: 'employeeCount',
                    key: 'employeeCount',
                    align:'center',
                    width: 120,
                },
                {
                    title: '会员等级',
                    dataIndex: 'memberLevel',
                    key: 'memberLevel',
                    align:'center',
                    width: 120,
                },
                {
                    title: '归属销售',
                    dataIndex: 'saleName',
                    key: 'saleName',
                    align:'center',
                    width: 120,
                },
                {
                    title: '前道客服',
                    dataIndex: 'befName',
                    key: 'befName',
                    align:'center',
                    width: 120,
                },
                {
                    title: '账户余额',
                    dataIndex: 'cashAccount',
                    key: 'cashAccount',
                    align:'center',
                    width: 120,
                },
                {
                    title: '创建时间',
                    dataIndex: 'createTime',
                    key: 'createTime',
                    align:'center',
                    width: 120,
                },
                {
                    title: '最近登录',
                    dataIndex: 'lastLogin',
                    key: 'lastLogin',
                    align:'center',
                    width: 120,
                },
                {
                    title: '状态',
                    dataIndex: 'status',
                    key: 'status',
                    align:'center',
                    width: 120,
                },
                {
                    title: '操作',
                    align:'center',
                    width: 120,
                },
            ],
            sendMsg:{},
            page:{}
        }
    }
    componentDidMount(){
        this.onSearch()
    }
    onSearch(){
        
        let { sendMsg, page } = this.state,
                    obj       = fromJS(
                Object.assign( 
                    sendMsg , 
                    { 
                        pageSize:page.pageSize ? page.pageSize : 10,
                        pageNum :page.pageNum  ? page.pageNum  : 1,
                    },
                    this.sendMsg
                )
            ).toJS()
        
        fetch
            .post('/wf-base/api/clientManager/companies', obj )
            .then( (response) => {

                let { code, result : dataSource , pageMessage } = response

                if( code == 0 ) {

                    var page = {
                        ...pageMessage,
                        current          : pageMessage.pageNum,
                        showSizeChanger  : true,
                        onChange         : this.pages,
                        onShowSizeChange : this.pageSizeChange,
                        showTotal        : (total, range) => `共 ${ total } 页数据`
                    }

                    this.setState({
                        page,
                        dataSource
                    })
                } 

            })
            .catch( (error) => {
                console.log( error )
            });
    }

    onChange( val ){

        let { sendMsg } = this.state 
        
        this.setState({
            sendMsg : fromJS(searchValue( sendMsg, val )).toJS()
        })

    }

    onClear() {
        this.setState({
            sendMsg : {}
        })
    }

    pages( pageNum , pageSize ){
        let { page } = this.state
        this.setState({
            page : {
                ...page,
                pageNum  : pageNum,
                pageSize : pageSize
            }
        },()=> {
            this.onSearch()
        })
    }

    pageSizeChange( pageNum , pageSize ){
        let { page } = this.state
        this.setState({
            page : {
                ...page,
                pageNum  : pageNum,
                pageSize : pageSize
            }
        },()=> {
            this.onSearch()
        })
    }

    HeaderClick( action ){
        if( action ) this[action]()
    }

    addCompany() {
        console.log('添加单位')
    }

    batchRemove() {
        console.log('批量删除')
    }
    
    render(){

        let  { inputGroup, HeaderData, dataSource, columns, page } = this.state
        
        return(
            <div className='companyCient container'>
                <SearchGroup 
                    inputGroup  = {inputGroup}
                    searchTitle = '搜索'
                    clearTitle  = '清空'
                    onSearch    = {this.onSearch.bind(this)}
                    onChange    = {this.onChange.bind(this)}
                    onClear     = {this.onClear.bind(this)}
                />
                <TableHeader
                    HeaderData  = { HeaderData }
                    HeaderClick = { this.HeaderClick.bind(this) }
                />
                <Table
                    rowKey      = { record => record.id }
                    columns     = { columns } 
                    dataSource  = { dataSource }
                    bordered    = { true }
                    pagination  = { page }
                />
            </div>
        )
    }
}

export default companyCient