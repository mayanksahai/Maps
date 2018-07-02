import { Dimensions } from "react-native";
const { width, height } = Dimensions.get("window");
const styles = {
    pendingBookingsContainer:{
        flex:1,
    },
    primaryText:{
        fontWeight: "bold",
        color:"#3CB371"
    },
    fareText:{
        fontStyle: "italic",
        color:"#400D5D",
    },
    secondaryText:{
        fontStyle: "normal",
        color:"#FA8072",
    },
    leftContainer:{
        flexWrap: "wrap",
        alignItems: "flex-start",
        borderLeftColor:"#7D7D7D",
    },
    leftIcon:{
        fontSize:20,
        color:"#7DAF11",
    },
    distance:{
        fontSize:12,
    },
    itemRow:{
        backgroundColor: '#FAD7A0', 
        marginLeft: 0
    }
};

export default styles;