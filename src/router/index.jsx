import React                 from 'react'
import Loadable              from 'react-loadable';
import Bundle                from '../Bundle/index.jsx';
import Layout                from '../layout/index.jsx'
import { Provider }          from 'react-redux'; 
import store                 from '../store/index.jsx'

import AnimatedRouter from 'react-animated-router'; //导入我们的的AnimatedRouter组件
import './router.less'

import {
    BrowserRouter as Router,
    Route,
    Switch
} from 'react-router-dom' 


/**
 * @param {[type]} opstion [首页] 
*/
import Index from 'bundle-loader?lazy&name=app-[index]!../pages/index';
const IndexPage = () => (<Bundle load={Index}>{(Page) => <Page />}</Bundle>)


/**
 * @param {[type]} opstion [登录] 
*/
import Login from 'bundle-loader?lazy&name=app-[Login]!../pages/login';
const LoginPage = () => (<Bundle load={Login}>{(Page) => <Page />}</Bundle>)

/**
 * @param {[type]} opstion [单位客户] 
*/
import companyCient from 'bundle-loader?lazy&name=app-[companyCient]!../pages/clientFile/companyCient';
const companyCientPage = () => (<Bundle load={companyCient}>{(Page) => <Page />}</Bundle>)

/**
 * @param {[type]} opstion [个人客户] 
*/
import consumerCient from 'bundle-loader?lazy&name=app-[consumerCient]!../pages/clientFile/consumerCient';
const consumerCientPage = () => (<Bundle load={consumerCient}>{(Page) => <Page />}</Bundle>)

/**
 * @param {[type]} opstion [合同管理] 
*/
import contractAdministration from 'bundle-loader?lazy&name=app-[contractAdministration]!../pages/clientFile/contractAdministration';
const contractAdministrationPage = () => (<Bundle load={contractAdministration}>{(Page) => <Page />}</Bundle>)

/**
 * @param {[type]} opstion [项目管理] 
*/
import projectManagement from 'bundle-loader?lazy&name=app-[projectManagement]!../pages/clientFile/projectManagement';
const projectManagementPage = () => (<Bundle load={projectManagement}>{(Page) => <Page />}</Bundle>)

/**
 * @param {[type]} opstion [前道操作台] 
*/
import beforeWork from 'bundle-loader?lazy&name=app-[beforeWork]!../pages/socialService/beforeWork';
const beforeWorkPage = () => (<Bundle load={beforeWork}>{(Page) => <Page />}</Bundle>)

/**
 * @param {[type]} opstion [后道操作台] 
*/
import afterWork from 'bundle-loader?lazy&name=app-[afterWork]!../pages/socialService/afterWork';
const afterWorkPage = () => (<Bundle load={afterWork}>{(Page) => <Page />}</Bundle>)

/**
 * @param {[type]} opstion [前道大库] 
*/
import beforePool from 'bundle-loader?lazy&name=app-[beforePool]!../pages/socialService/beforePool';
const beforePoolPage = () => (<Bundle load={beforePool}>{(Page) => <Page />}</Bundle>)

/**
 * @param {[type]} opstion [后道大库] 
*/
import afterPool from 'bundle-loader?lazy&name=app-[afterPool]!../pages/socialService/afterPool';
const afterPoolPage = () => (<Bundle load={afterPool}>{(Page) => <Page />}</Bundle>)

/**
 * @param {[type]} opstion [派单交接表] 
*/
import sendMake from 'bundle-loader?lazy&name=app-[sendMake]!../pages/socialService/sendMake';
const sendMakePage = () => (<Bundle load={sendMake}>{(Page) => <Page />}</Bundle>)

/**
 * @param {[type]} opstion [供应商派单表] 
*/
import supplierSend from 'bundle-loader?lazy&name=app-[supplierSend]!../pages/socialService/supplierSend';
const supplierSendPage = () => (<Bundle load={supplierSend}>{(Page) => <Page />}</Bundle>)

/**
 * @param {[type]} opstion [实做账单管理] 
*/
import billManage from 'bundle-loader?lazy&name=app-[billManage]!../pages/socialCancel/billManage';
const billManagePage = () => (<Bundle load={billManage}>{(Page) => <Page />}</Bundle>)

/**
 * @param {[type]} opstion [标准差异处理] 
*/
import othernessHandle from 'bundle-loader?lazy&name=app-[othernessHandle]!../pages/socialCancel/othernessHandle';
const othernessHandlePage = () => (<Bundle load={othernessHandle}>{(Page) => <Page />}</Bundle>)

/**
 * @param {[type]} opstion [非标差异处理] 
*/
import nonstandardHandle from 'bundle-loader?lazy&name=app-[nonstandardHandle]!../pages/socialCancel/nonstandardHandle';
const nonstandardHandlePage = () => (<Bundle load={nonstandardHandle}>{(Page) => <Page />}</Bundle>)

/**
 * @param {[type]} opstion [超期未核追踪] 
*/
import extraTrace from 'bundle-loader?lazy&name=app-[extraTrace]!../pages/socialCancel/extraTrace';
const extraTracePage = () => (<Bundle load={extraTrace}>{(Page) => <Page />}</Bundle>)

/**
 * @param {[type]} opstion [二级路由] 
*/
class LayoutRouter extends React.Component{
    render(){
        return(
            <Layout>
                
                <AnimatedRouter>  
                    <Route path='/' exact component={IndexPage}></Route>
                    {/* 客户档案管理 */}
                    <Route path='/companyCient' component={companyCientPage}></Route>
                    <Route path='/consumerCient' component={consumerCientPage}></Route>
                    <Route path='/contractAdministration' component={contractAdministrationPage}></Route>
                    <Route path='/projectManagement' component={projectManagementPage}></Route>
                    {/* 社保服务 */}
                    <Route path='/afterPool' component={afterPoolPage}></Route>
                    <Route path='/afterWork' component={afterWorkPage}></Route>
                    <Route path='/beforePool' component={beforePoolPage}></Route>
                    <Route path='/beforeWork' component={beforeWorkPage}></Route>
                    <Route path='/sendMake' component={sendMakePage}></Route>
                    <Route path='/supplierSend' component={supplierSendPage}></Route>
                    {/* 社保核销 */}
                    <Route path='/billManage' component={billManagePage}></Route>
                    <Route path='/extraTrace' component={extraTracePage}></Route>
                    <Route path='/nonstandardHandle' component={nonstandardHandlePage}></Route>
                    <Route path='/othernessHandle' component={othernessHandlePage}></Route>
                </AnimatedRouter>  
            </Layout>
        )
    }
}
/**
 * @param {[type]} opstion [主体路由] 
*/
class RouterComponent extends React.Component{
    render(){
        return (
            <Router>
                <Provider store={store}>
                    <Switch>
                        <Route path='/login' component={LoginPage}></Route>
                        <Route path="/" render={ () => <LayoutRouter></LayoutRouter>} />
                    </Switch>
                </Provider>
            </Router>
        )
    }
}


export default RouterComponent