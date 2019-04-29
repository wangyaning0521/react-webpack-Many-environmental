import React                    from 'react'
import { withRouter }           from 'react-router-dom'
import fetch                    from 'Axios'
import md5                      from 'md5'

import 'style/login.less'




import {    Form, Icon, Input, Button, message   } from 'antd';
const FormItem =  Form.Item



const emailRule     =   /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
const passwordRule  =   /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,18}$/;



class Login extends React.Component{
    constructor( props ){
        super(props)
        this.state = {
            timestamp: '',
            codeUrl  : ''
        }
    }
    componentWillMount(){
        this.getTime()
    }

    getTime(){

        let timestamp = (new Date()).valueOf();
        this.setState({
            timestamp,
            codeUrl:`/api/wf-login/api/user/validateCode/${timestamp}`
        })

    }

    handleConfirm( rule, value, callback ){
        
        switch( rule.field ){
            case 'email':
                if( value && !emailRule.test(value)  )  callback('请填写正确邮箱')
            break;
            case 'password':
                if( value && !passwordRule.test(value)   )  callback('请填写6-18位包含字符数字')
            break;
            case 'validateCode':
                if( value && value.length < 4   )  callback('验证码格式错误！')
            break;
        }
        callback()
    }

    handleSubmit(){

        this.props.form.validateFields(
            async (err , val ) => {
                if( !err ){

                    let  { email, password, validateCode  } = val
                    let  { timestamp }                      = this.state

                    let LoginInfor = await fetch.post('/wf-login/api/user/login', {
                        email,
                        password:md5(md5(md5(password))),
                        validateCode,
                        time:timestamp
                    })
                    
                    let { code, message : messageApi, result } = LoginInfor
                    
                    if( code == 2026 ) {
                        message.success(messageApi)
                        localStorage.setItem('loginInfo',JSON.stringify(result))
                        this.props.history.push('/index')
                    }
                    else 
                        message.error(messageApi)
                    
                }
            }
        )

    }
    
    render(){
        const { getFieldDecorator } = this.props.form;
        let   { codeUrl }           = this.state 
        return (
            <div className='login'>
                <div className='login-main'>
                    <div className='login-main-title'>
                        登录
                    </div>
                    <Form>
                        <FormItem
                            hasFeedback
                        >
                            {
                                getFieldDecorator(
                                    'email', {
                                        rules: [
                                            { required: true, message: '请填写邮箱' },
                                            { validator: this.handleConfirm.bind(this) }
                                        ],
                                    }
                                )
                                (
                                    <Input prefix={<Icon type="user" />} placeholder="请填写邮箱" />
                                )
                            }
                        </FormItem>
                        <FormItem
                            hasFeedback
                        >
                            {
                                getFieldDecorator(
                                    'password', {
                                        rules: [
                                            { required: true, message: '请填写密码' },
                                            { validator: this.handleConfirm.bind(this) }
                                        ],
                                    }
                                )
                                (
                                    <Input prefix={<Icon type="lock" />} type="password" placeholder="请填写密码" />
                                )
                            }
                        </FormItem>
                        <FormItem
                            hasFeedback
                            className='code'
                        >
                            {
                                getFieldDecorator(
                                    'validateCode', {
                                        rules: [
                                            { required: true, message: '请填写验证码' },
                                            { validator: this.handleConfirm.bind(this) }
                                        ],
                                    }
                                )
                                (
                                    
                                    <Input prefix={<Icon type="check" />} type="password" placeholder="请填写验证码" />
                                    
                                )
                            }
                            <img onClick={this.getTime.bind(this)} src={codeUrl} alt="code"/>
                        </FormItem>
                    </Form>
                    <div className='submit'>
                        <Button type="primary" onClick={this.handleSubmit.bind(this)}>
                            登录
                        </Button>
                    </div>
                </div>
            </div>
        )
    }

}


export default withRouter(Form.create()(Login));