import React from "react";
import { Text } from "react-native";
import { Footer, FooterTab, Button } from "native-base";
import Icon from "react-native-vector-icons/FontAwesome";
import styles from "./styles";


export const FooterComponent = ({logo}) =>{

    const tabs = [
        {
            title:"Taxi",
            subTitle:"",
            icon:"car"
        },
        {
            title:"PremiumTaxi",
            subTitle:"",
            icon:"car"

        },
        {
            title:"TaxiShare",
            subTitle:"",
            icon:"car"

        },
        {
            title:"VerifiedUsers",
            subTitle:"",
            icon:"car"

        }
    ];

    return(
        <Footer>
            <FooterTab style={styles.footerContainer} iosBarStyle="light-content">
            {
                tabs.map((obj,index)=>{
                    return(
                        <Button key={index}>
                            <Icon size={20} name={obj.icon}/>
                            <Text style={{fontSize:12,color:(index === 0) ? "#FF5E3A" : "gray"}}>{obj.title}</Text>
                            <Text style={styles.subText}>{obj.subTitle}</Text>
                        </Button>
                    )
                })
            }
            </FooterTab>
        </Footer>
    );
}

export default FooterComponent;