import React                            from 'react'
import {  connect }                     from 'react-redux';
import { Layout, Icon, Breadcrumb }     from 'antd';
import { IconBar }                      from 'lib/util'
import {withRouter}                    from 'react-router-dom'
import 'style/layout.less'

const { Header, Footer, Sider, Content } = Layout;

class HeaderComponent extends React.Component{
    constructor(props){
        super(props)
    }

   
    silderClick(){
        let { CHECKED_SIDER, collapsed } = this.props
        CHECKED_SIDER(!collapsed)
    }

    

    render(){
        let { checkedNav, collapsed } = this.props
        return (
            <Header>
                <div className='ant-layout-header-title left'>
                    <div onClick={ this.silderClick.bind(this) } className='ant-layout-header-title-Icon pointer left'>
                        <Icon style={{ fontSize: '20px' }}  type={ collapsed ? 'more' : 'ellipsis'} />
                    </div>
                    <div className='ant-layout-header-title-menu left'>
                        <Breadcrumb>
                            <Breadcrumb.Item href="">
                                <Icon type="home" />
                            </Breadcrumb.Item>
                            {
                                checkedNav.length && 
                                <Breadcrumb.Item href="">
                                    <Icon type={IconBar[checkedNav[0].parentindex]} />
                                    <span>{checkedNav[0].parentname}</span>
                                </Breadcrumb.Item>
                            }

                            {
                                checkedNav.length && 
                                <Breadcrumb.Item>
                                    {checkedNav[0].title}
                                </Breadcrumb.Item>
                            }
                            
                        </Breadcrumb>
                    </div>
                </div>
            </Header>
        )
    }
}




const mapStateToProps = (state) => {
    let  { menuTopList, checkedTag, checkedNav, collapsed } = state.mainAction
	return { 
        menuTopList,
        checkedTag,
        checkedNav,
        collapsed
    }  
}
const mapDispatchToProps = (dispatch) => {
    return {
        'CHECKED_SIDER':( collapsed ) => dispatch({
            type:'CHECKED_SIDER',
            collapsed : collapsed
        }),
    }
}
  


export default  withRouter(connect(mapStateToProps,mapDispatchToProps)(HeaderComponent))