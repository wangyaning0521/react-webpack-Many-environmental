import React                            from 'react'
import { Menu, Dropdown, Icon, Tag  }   from 'antd';
import {  connect }                     from 'react-redux';
import {withRouter}                     from 'react-router-dom'
import {ActionUrl}                      from 'lib/util'



class TagComponent extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            tagBodyLeft  :0,
            outerPadding :4
        }
    }
    componentWillMount(){

        this.props.history.listen(route => {
            
            let pathId = (Object.keys(ActionUrl).filter((item) => ActionUrl[item] == route.pathname))

            setTimeout(()=>{
                this.moveToView(this.refs[`tagsPageOpened${pathId[0]}`])
            },500)
            
        })

    }
    /**
     * @param {距离} offset 
     */
    handleScroll( offset ){
        const outerWidth = this.refs.scrollOuter.offsetWidth
        const bodyWidth = this.refs.scrollBody.offsetWidth
        let tagBodyLeft;
        if (offset > 0) {
            tagBodyLeft = Math.min(0, this.state.tagBodyLeft + offset)
        } else {
            if (outerWidth < bodyWidth) {
                if (this.state.tagBodyLeft < -(bodyWidth - outerWidth)) {
                    tagBodyLeft =   this.state.tagBodyLeft
                } else {
                    tagBodyLeft = Math.max(this.state.tagBodyLeft + offset, outerWidth - bodyWidth)
                }
            } else {
                tagBodyLeft = 0
            }
        }
        this.setState({
            tagBodyLeft
        })
    }

    /**
     *  @event 移动 
    */
    moveToView (tag) {

        const outerWidth = this.refs.scrollOuter.offsetWidth
        const bodyWidth = this.refs.scrollBody.offsetWidth
        let tagBodyLeft;

        if (bodyWidth < outerWidth) {
            this.tagBodyLeft = 0
        } else if (tag.offsetLeft < -this.state.tagBodyLeft) {
            // 标签在可视区域左侧
            tagBodyLeft = -tag.offsetLeft + this.state.outerPadding
        } else if (tag.offsetLeft > -this.state.tagBodyLeft && tag.offsetLeft + tag.offsetWidth < -this.state.tagBodyLeft + outerWidth) {
            // 标签在可视区域
            tagBodyLeft = Math.min(0, outerWidth - tag.offsetWidth - tag.offsetLeft - this.state.outerPadding)
        } else {
            // 标签在可视区域右侧
            tagBodyLeft = -(tag.offsetLeft - (outerWidth - this.state.outerPadding - tag.offsetWidth))
        }
        this.setState({
            tagBodyLeft
        })
        
    }
    
    // 标签关闭
    onClose( val, e ){
        /** @params [删除单个] */

        let { checkedTag, REMOVE_NAV } = this.props 

        if(typeof val == 'object'){
            REMOVE_NAV({
                actionNav : val,
                removeType: checkedTag ==  val.eventKey ? 1 : 2
            })
            
            e.stopPropagation();
            e.preventDefault();
        }
        /** @params [删除全部] */
        else{
            REMOVE_NAV({
                actionNav : null,
                removeType: val
            })
        }
    }

    onClick( val, e ){

        let { CHECKED_NAV, history } = this.props

        CHECKED_NAV( val.eventKey )

        history.push( ActionUrl[val.eventKey] )

    }



    render(){
        let { menuTopList, checkedTag } = this.props
        let { tagBodyLeft } = this.state

        const menu = (
            <Menu>
                <Menu.Item onClick={this.onClose.bind(this,3)}>
                    <a href="javascript:void(0)">关闭所有</a>
                </Menu.Item>
                <Menu.Item  onClick={this.onClose.bind(this,4)}>
                    <a href="javascript:void(0)">关闭其他</a>
                </Menu.Item>
            </Menu>
        );

        return (
            <div className="tag-nav">
                <div className='tag-nav-wrapper'>
                    <div className='tag-nav-wrapper-item left-btn' onClick={this.handleScroll.bind(this,240)}>
                        <Icon type="left" />
                    </div>
                    <div className='tag-nav-wrapper-item right-btn' onClick={this.handleScroll.bind(this,-240)}>
                        <Icon type="right" />
                    </div>
                    <div className='tag-nav-wrapper-item close-btn'>
                        <Dropdown overlay={menu}>
                            <a className="ant-dropdown-link" href="#">
                                <Icon type="close-circle" />
                            </a>
                        </Dropdown>
                    </div>
                    
                    <div className='tag-nav-wrapper-item tag' ref="scrollOuter">
                        <div className='tag-main' ref="scrollBody" style={ {left : tagBodyLeft+'px' }}>
                            {
                                menuTopList.map( ( item ) => {
                                    return (
                                        <div
                                            style={{display: 'inline-block'}}
                                            ref={'tagsPageOpened'+item.eventKey}
                                            key={item.eventKey}
                                            className={ item.eventKey == checkedTag ? 'checkedTag': ''}
                                            onClick={ this.onClick.bind(this,item) }
                                        >
                                            <Tag 
                                                color="blue" 
                                                closable={ item.eventKey == '55' ? false : true }
                                                key={item.eventKey}
                                                onClose={ this.onClose.bind(this,item) }
                                            > 
                                                { item.title } 
                                            </Tag>
                                        </div>
                                    )
                                })
                            } 
                        </div>
                    </div>
                </div>
            </div>
        )
        
    }
}


const mapStateToProps = (state) => {
    let  { menuTopList, checkedTag } = state.mainAction
	return { 
        menuTopList,
        checkedTag
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
        'REMOVE_NAV' : ( { actionNav, removeType } ) => dispatch({
            type:'REMOVE_NAV',
            removeType,
            actionNav
        })
	}  
}  


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(TagComponent))