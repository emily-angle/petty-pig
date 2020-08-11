import React from 'react';
import '../styles/login.css'
import { Form, Input, Button } from 'element-react';

export default class Login extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            form: {
                name: '',
                pass: '',
                code: ''
            },
            rules: {
                pass: [
                    {
                        required: true, message: '请输入密码', trigger: 'blur'
                    },
                    {
                        validator: (rule, value, callback) => {
                            if (value === '') {
                                callback(new Error('请输入密码'))
                            } else {
                                callback()
                            }
                        }
                    }
                ],
                name: [
                    {
                        required: true, message: '请输入用户名', trigger: 'blur'
                    },
                    {
                        validator: (rule, value, callback) => {
                            if (value === '') {
                                callback(new Error('请输入用户名'))
                            } else {
                                callback()
                            }
                        }
                    }
                ],
                code: [
                    {
                        required: true, message: '请输入验证码', trigger: 'blur'
                    },
                    {
                        validator: (rule, value, callback) => {
                            if (value === '') {
                                callback(new Error('请输入验证码'))
                            } else if (value.toUpperCase() !== document.getElementById('checkCode').innerHTML.toUpperCase()) {
                                callback(new Error('验证码输入有误'))
                            } else {
                                callback()
                            }
                        }
                    }
                ]
            }
        }
    }
    handleSubmit(e) {
        e.preventDefault()
        this.refs.form.validate(valid => {
            if (valid) {
                this.props.history.push('/home')
            } else {
                return false
            }
        })
    }
    onChange(key, value) {
        this.setState({
            form: Object.assign({}, this.state.form, { [key]: value })
        })
    }
    createCode(length) {
        var code = "";
        var codeLength = parseInt(length); //验证码的长度
        var checkCode = document.getElementById("checkCode");
        ////所有候选组成验证码的字符，当然也可以用中文的
        var codeChars = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9,
            'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z',
            'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z');
        //循环组成验证码的字符串
        for (var i = 0; i < codeLength; i++) {
            //获取随机验证码下标
            var charNum = Math.floor(Math.random() * 62);
            //组合成指定字符验证码
            code += codeChars[charNum];
        }
        if (checkCode) {
            //为验证码区域添加样式名
            checkCode.className = "code";
            //将生成验证码赋值到显示区
            checkCode.innerHTML = code;
        }

    }
    componentDidMount() {
        this.createCode(4)
    }
    render() {
        return (
            <div className='loginPage'>
                <div className='loginBox'>
                    <Form ref='form' model={this.state.form} rules={this.state.rules} labelWidth="80">
                        <Form.Item label="用户名" prop='name'>
                            <Input value={this.state.form.name} onChange={this.onChange.bind(this, 'name')} />
                        </Form.Item>
                        <Form.Item label="密码" prop="pass">
                            <Input type="password" value={this.state.form.pass} onChange={this.onChange.bind(this, 'pass')} />
                        </Form.Item>
                        <Form.Item>
                            <div id="checkCode" onClick={this.createCode.bind(this, 4)} ></div>
                            <Button onClick={this.createCode.bind(this, 4)}>看不清换一张</Button>
                        </Form.Item>
                        <Form.Item label="验证码" prop="code">
                            <Input value={this.state.form.code} onChange={this.onChange.bind(this, 'code')} />
                        </Form.Item>
                        <Form.Item>
                            <Button style={{ width: '100%' }} type='primary' onClick={this.handleSubmit.bind(this)}>登录</Button>
                        </Form.Item>
                    </Form>
                </div>
            </div >
        )
    }
}