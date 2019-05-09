export const IconBar = [
    'area-chart',
    'pie-chart',
    'bar-chart',
    'dot-chart',
    'line-chart',
    'radar-chart',
    'heat-map',
    'fall',
    'rise',
    'stock',
    'box-plot',
    'fund',
    'sliders',
    'rise'
]
export const ActionUrl = {
    23:'/companyCient',
    24:'/consumerCient',
    21:'/contractAdministration',
    22:'/projectManagement',
    25:'/beforeWork',
    26:'/afterWork',
    28:'/beforePool',
    29:'/afterPool',
    27:'/sendMake',
    80:'/supplierSend',
    31:'/billManage',
    32:'/othernessHandle',
    33:'/nonstandardHandle',
    30:'/extraTrace',
    55:'/'
}
export const defaultNavList = [
    {
        eventKey: "55",
        openKeys: ["23", "2", "54"],
        parentindex: 13,
        parentname: "系统首页",
        routeid: null,
        title: "首页"
    }
]

export const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 18 },
}

export const defaultNavValue = '55'

export const isInput = ( type ) => type === 'input'

export const isSelect = ( type ) => type === 'select'

export const isCascader = ( type ) => type === 'cascader'

export const isRangePicker = ( type ) => type === 'RangePicker'
