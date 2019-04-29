import React                    from 'react'
import fetch                    from 'Axios'
import { IconBar,  ActionUrl }  from 'lib/util'
import {  connect }             from 'react-redux'; 
import {withRouter}             from 'react-router-dom'

import {    Layout, Menu, Breadcrumb, Icon, } from 'antd';
const  {    Header, Content, Footer, Sider, } = Layout;
const SubMenu = Menu.SubMenu;


class siderComponent extends React.Component{

    constructor(props){
        super(props)
        this.state={
            menu:[]
        }
    }

    componentWillMount(){
        this.roleMenu()
    }

    roleMenu(){
        let loginInfo = JSON.parse(localStorage.loginInfo),
            ids       = loginInfo.roles.map( (item)=> item.id)

        fetch.post('/wf-base/api/rolemanage/menutree', {
            ids
        }).then( ( res )=>{
            
            let { code, result:menu } = res 

            if( code == 0 ){
                this.setState({
                    menu
                })
            }
        } )
    }


    onClickMenu( { item, key, keyPath } ){

        const { ADD_NAV, CHECKED_NAV, menuTopList, history }  = this.props
        let { parentindex, parentname, title, eventKey, openKeys, routeid, url  } = item.props;

        let repeat = menuTopList.some( item => item.eventKey === eventKey )
       
        if( !repeat ) {

            ADD_NAV({
                parentindex, 
                parentname, 
                title, 
                eventKey, 
                openKeys, 
                routeid
            })

        }

        CHECKED_NAV(eventKey)

        history.push( url )
    }

    render(){

        let { menu } = this.state
        let { collapsed } = this.props
        return (
            <Sider
                collapsed={collapsed}
                width={256}
            >
                <div className="logo" />
                <Menu 
                    theme="dark" 
                    mode="inline"
                    onClick={this.onClickMenu.bind(this)}
                    defaultOpenKeys={["23", "2"]}
                    defaultSelectedKeys={["23", "2"]}
                >
                    {
                        menu.map(  (Item,index)=>{
                            return (
                                <SubMenu
                                    key={Item.id}
                                    title={<span><Icon type={ IconBar[index] } /><span>{Item.name}</span></span>}
                                >
                                    {
                                        Item.children &&
                                        Item.children.map(  ( childrenItem )=>{
                                            return (
                                                <Menu.Item 
                                                    key        =      {childrenItem.id} 
                                                    title      =      {childrenItem.name}
                                                    routeid    =      {childrenItem.routeId}
                                                    parentname =      {Item.name}
                                                    parentindex=      {index}
                                                    url        =      {ActionUrl[childrenItem.id]}
                                                >
                                                    {childrenItem.name}
                                                </Menu.Item>
                                            )
                                        })
                                    }
                                    
                                </SubMenu>
                            ) 
                        })
                    }
                </Menu>
            </Sider>
        )
    }
}


const mapStateToProps = (state) => {
    let  { menuTopList,collapsed } = state.mainAction
	return { 
        menuTopList,
        collapsed
    }  
}  

const mapDispatchToProps = (dispatch) => {  
	return{  
        'ADD_NAV':( menu ) => dispatch({
            type:'ADD_NAV',
            menu
        }),
        'CHECKED_NAV' : ( eventKey ) => dispatch({
            type:'CHECKED_NAV',
            eventKey
        }),
	}  
}  


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(siderComponent))