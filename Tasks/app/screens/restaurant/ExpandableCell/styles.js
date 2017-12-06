import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  expandableCellContainer: {
    flex: 1,
    padding: 10,
    paddingTop: 0,
    height: 60
  },
  hiddenContent: {
    overflow: 'hidden'
  },
  visibleContent: {
    fontSize: 50,
    height: 60
  }
})

export default styles;