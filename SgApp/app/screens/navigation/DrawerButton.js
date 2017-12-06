import React from 'react';
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const DrawerButton = ({ navigation }) => (
    <TouchableOpacity
        onPress={() => navigation.navigate('DrawerOpen')}
    >
        <Icon
            name="bars"
        />
    </TouchableOpacity>
);

DrawerButton.propTypes = {
    navigation: React.PropTypes.object.isRequired,
};

export default DrawerButton;