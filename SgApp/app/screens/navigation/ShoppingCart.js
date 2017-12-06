import React from 'react';
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const ShoppingCartButton = ({ search }) => (
    <TouchableOpacity
        onPress={() => search}
    >
        <Icon
            name="search"
        />
    </TouchableOpacity>
);

ShoppingCartButton.propTypes = {
    search: React.PropTypes.object.isRequired,
};

export default ShoppingCartButton;