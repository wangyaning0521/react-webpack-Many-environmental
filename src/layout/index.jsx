import React                    from 'react'
import { Layout }               from 'antd';
import TagComponent             from './components/tag.jsx'
import SiderComponent           from './components/sider.jsx'
import HeaderComponent          from './components/header.jsx'
import 'style/layout.less'


const { Header, Footer, Sider, Content } = Layout;


class layout extends React.Component{
    constructor(props){
        super(props)
    }
    render(){
        return(
            <Layout>
                <SiderComponent></SiderComponent>
                <Layout>
                   <HeaderComponent></HeaderComponent>
                    <Content>
                        <Layout>
                            <TagComponent></TagComponent>
                            <Content className='main-content'>
                                {this.props.children}
                            </Content>
                        </Layout>
                    </Content>
                    <Footer>
                        1111
                    </Footer>
                </Layout>
            </Layout>
        )
    }
}


export default layout