import React , {Component} from 'react';
import {
  AsyncStorage,
  ListView,
  Text,
  TextInput,
  View
} from 'react-native';

import ClientOrdersCell from './ClientOrdersCell';
import ModifyClientOrder from '../ModifyClientOrder'
import styles from './styles'; 

export default class ClientOrdersList extends Component{
  constructor(props){
    super(props)
    
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });
    
    this.state = {
      ds:new ListView.DataSource({
        rowHasChanged: (r1, r2) => r1 !== r2
      }),
      listOfTasks: [],
      text: ''
    };
  }
  
  componentDidMount(){
    console.log('loading from storage');
    this._updateList();
  }
  
  render(){
    const dataSource = this.state.ds.cloneWithRows(this.state.listOfTasks);
    return (
      <View>
        <TextInput autoCorrect={false}
          onChangeText={ (text) => this._changeTextInputValue(text) }
          onSubmitEditing={ () => this._addTask() }
          style={styles.textInput}
          returnKeyType={'done'}     
          value={this.state.text} />
        <ListView dataSource={dataSource} enableEmptySections={true} automaticallyAdjustContentInsets={false}
            renderRow={ (rowData,sectionID, rowID) => this._renderRowData(rowData, rowID) } />
      </View>  
    )
  }
  
  async _updateList(){
    //AsyncStorage.clear();
    let response = await AsyncStorage.getItem('listOfTasks');
    console.log('loaded from storage' + response);
    let listOfTasks = await JSON.parse(response) || [];
    this.setState({
      listOfTasks: listOfTasks
    });
    console.log('starting stage is' +  this.state.listOfTasks);
    this._changeTextInputValue('');
  }
  
  async _addTask(){
    const singleTask = {
      completed: false,
      text: this.state.text
    }
    const newListOfTasks = [...this.state.listOfTasks,singleTask];
    AsyncStorage.setItem('listOfTasks', JSON.stringify(newListOfTasks));
    console.log('saved task' + newListOfTasks);
    this._updateList();
  }
  
  _changeTextInputValue(text){
    this.setState({
      text: text
    });
  }
  
  _editTask(rowData){
    this.props.navigator.push({
      component: ModifyClientOrder,
      title: 'Modify Order'
    }
    );
  }
  
  async _completeTask(rowID){
    const singleUpdatedTask= {
      ...this.state.listOfTasks[rowID],
      completed:!this.state.listOfTasks[rowID].completed
    }
    
    const listOfTasks = this.state.listOfTasks.slice();
    listOfTasks[rowID] = singleUpdatedTask;
    await AsyncStorage.setItem('listOfTasks', JSON.stringify(listOfTasks));
    this._updateList();
  }
  
  _renderRowData(rowData, rowID){
    console.log('rendering...' + rowData);
    return (
      <ClientOrdersCell completed={rowData.completed} text={rowData.text} 
                        id={rowID} onPress={ (rowID) => this._completeTask(rowID) } 
                        onLongPress={ (rowData) => this._editTask(rowData)}/> 
    )
  }
  
}