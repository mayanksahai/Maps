import React, {Component} from 'react';
import {View, ActivityIndicator} from 'react-native';
import {Header,Container,Title, Content, List, ListItem, InputGroup, Input, Icon, Text, Picker, Button} from 'native-base';
import {styles} from './Styles';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as LoginActionCreators from '../../redux/actions';

const mapStateToProps = (state) => { return{
    isLoginPending:state.isLoginPending,
    loginError:state.loginError,
    loggedInUser:state.loggedInUser
    };
}

function mapDispatchToProps(dispatch){ return bindActionCreators(LoginActionCreators,dispatch)}
console.log("Login actions are:" + LoginActionCreators)

class Login extends Component{

    constructor(props){
        super(props);
        this.state = {
            loading: false,
            email: '',
            password: '',
        }
    }

    componentDidMount(){
    }

    render(){
        const content = this.state.isLoginPending ?
            <View style={styles.body}>
                <ActivityIndicator size="large"/>
            </View>
            :
            <Content>
                <List>
                    <ListItem>
                        <InputGroup>
                            <Icon name="ios-person" style={{ color: '#0A69FE' }} />
                            <Input
                                onChangeText={(text) => this.setState({email: text})}
                                value={this.state.email}
                                placeholder={"Email Address"} />
                        </InputGroup>
                    </ListItem>
                    <ListItem>
                        <InputGroup>
                            <Icon name="ios-unlock" style={{ color: '#0A69FE' }} />
                            <Input
                                onChangeText={(text) => this.setState({password: text})}
                                value={this.state.password}
                                secureTextEntry={true}
                                placeholder={"Password"} />
                        </InputGroup>
                    </ListItem>
                </List>
                <Button style={styles.primaryButton} onPress={()=>this.doLogin()}>
                    <Text>Login</Text>
                </Button>
                <Button onPress={()=>this.goToSignup()} style={styles.primaryButton}>
                    <Text>New Here?</Text>
                </Button>

            </Content>
        ;

        // A simple UI with a toolbar, and content below it.
        return (
            <Container>
                {content}
            </Container>
        );
    }

    goToSignup(){
        const { navigate } = this.props.navigation;
        this.setState({
            loading: true
        });
        navigate('SignUp');
    }


    async doLogin(){
        const { navigate } = this.props.navigation;
        await this.props.login(this.state.email,this.state.password);
        let {isLoginPending,loginError,loggedInUser} = this.props.loggedInUser;
        console.log(isLoginPending + loginError);
        try {
            if(loggedInUser.role == 'Restaurant')
                 navigate('RestaurantStack',{loggedInUser:loggedInUser});

            else if(loggedInUser.role == 'Supplier')
                 navigate('SupplierStack',{loggedInUser:loggedInUser});

        } catch (error) {
            console.log('received error response' + error);
            navigate('LoggedOutStack')
            alert('Login Failed. Please try again or signUp'+error);
        }
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Login);
