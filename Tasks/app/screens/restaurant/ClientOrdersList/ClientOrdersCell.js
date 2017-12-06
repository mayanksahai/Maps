import React , {Component,PropTypes} from 'react';

import {
  Text,
  TouchableHighlight,
  View
} from 'react-native';

export default class ClientOrdersCell extends Component{
  static propTypes = {
    completed: PropTypes.bool.isRequired,
    id: PropTypes.string.isRequired,
    onPress: PropTypes.func.isRequired,
    text: PropTypes.string.isRequired,
    onLongPress: PropTypes.func.isRequired
  }
  
  constructor(props){
    super(props);
  }
  
  render(){
    const isCompleted = this.props.completed ? 'line-through' : 'none';
    const textStyle = {
      fontSize: 20,
      textDecorationLine: isCompleted
    };
    console.log('touchable highlight' + this.props.text);
    return(
      <View>        
        <TouchableHighlight
          onPress={ () => this.props.onPress(this.props.id) }
          onLongPress={ ()=> this.props.onLongPress()}
          underlayColor={ '#D5DBDE' } >
          <Text style={ textStyle }>{ this.props.text }</Text>
        </TouchableHighlight>
      </View>
    )
  }
  
}