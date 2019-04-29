/**
 * 
 * @param {*} users 
 * @param {*} action 
 * @event 主体导航模块
 */
import { fromJS }                                   from 'immutable'
import { defaultNavList , defaultNavValue }         from 'lib/util'

const initialState = {
    menuTopList :defaultNavList,
    checkedTag  :defaultNavValue,
    checkedNav  :defaultNavList,
    collapsed   :false
}

function mainAction(state = initialState, action) {

    switch(action.type) {
        /**
         * @event 添加导航
         */
        case 'ADD_NAV':
            return fromJS( Object.assign(
                {},
                state, 
                {   
                    menuTopList: [...state.menuTopList, action.menu ]
                }
            )).toJS()
        break;
        /**
         * @event 选中项
         */
        case 'CHECKED_NAV':
            let checkedNav = state.menuTopList.filter(item => item.eventKey == action.eventKey)
            return fromJS( Object.assign(
                {},
                state, 
                {   
                    checkedTag : action.eventKey,
                    checkedNav,
                }
            )).toJS()
            
        break;
        /**
         * @event 折叠
         */
        case 'CHECKED_SIDER':
            return fromJS( Object.assign(
                {},
                state, 
                {   
                    collapsed : action.collapsed
                }
            )).toJS()
        break;
        /**
         * @event 删除
         */
        case  'REMOVE_NAV' : 
            let 
                menuTopList = state.menuTopList, 
                actionNav = action.actionNav,
                obj,
                menuTopNew = defaultNavList
            ;
            /** @params  [单个] */
            if( action.removeType  == 1 || action.removeType  == 2 ){
                let index = menuTopList.findIndex(x => x == actionNav)
                menuTopList.splice(index, 1);
                obj = { menuTopList  }
                if( action.removeType  == 1 ){
                    obj.checkedTag = menuTopList[index-1].eventKey
                    obj.checkedNav = [menuTopList[index-1]]
                } 
            }
            /** @params  [全部] */
            else{
                if( action.removeType == 4 ){
                    let checkActionNav = state.menuTopList.filter((item) => item.eventKey == state.checkedTag)

                    menuTopNew = [ ...menuTopNew, ...checkActionNav]
                }
                obj = {
                    menuTopList : menuTopNew,
                    checkedNav  : [menuTopNew[1]],
                    checkedTag  : menuTopNew[1].eventKey
                }
            }
            return fromJS( Object.assign(
                {},
                state,
                obj
            )).toJS()

        break;
        default:
            return initialState;     
   }
}

export default mainAction