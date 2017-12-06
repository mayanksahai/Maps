import React from 'react'
import { TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'

const SearchOrdersButton = ({ search }) => (
    <TouchableOpacity
        onPress={() => search}
    >
        <Icon
            name="search"
        />
    </TouchableOpacity>
);

SearchOrdersButton.propTypes = {
    search: React.PropTypes.object.isRequired,
};

export default SearchOrdersButton;