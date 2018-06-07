import React from 'react'
import { Link } from 'react-router-dom'
import { Meteor } from 'meteor/meteor'
 
export default class Login extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            error: ''
        }
    }

    onSubmit(e) {
        e.preventDefault()

        const email = this.email.value.trim()
        const password = this.password.value.trim()

        Meteor.loginWithPassword({email}, password, (err)=>{

            if(err) {
                this.setState({
                    error: 'Unable to login. Check email and password'
                })
            }
            else {
                this.setState({
                    error :''
                })
            }
        })
    }
    
    render() {

        return (
            <div className = 'boxed-view'>
                <div className = 'boxed-view__box'>
                    <h1>Dynamic Learning</h1>
                    {this.state.error ? <p>{this.state.error}</p> : undefined}

                    <form className = 'boxed-view__form' onSubmit = {this.onSubmit.bind(this)} noValidate>
                        <input type='email' ref= { e => this.email = e} name='email' placeholder='Email'/>
                        <input type='password' ref= {e => this.password = e} name='password' placeholder='Password'/>
                        <button className = 'button'>Sign in</button>
                    </form>

                    <Link className = 'boxed-view__underline' to='/signup'>Don't have an account?</Link>
                </div>
            </div>
        )
    }
}
