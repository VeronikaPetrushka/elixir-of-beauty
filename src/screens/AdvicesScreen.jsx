import { View } from "react-native"
import Advices from "../components/Advices"
import MenuPanel from "../components/MenuPanel";

const AdvicesScreen = () => {
    return (
        <View style={styles.container}>
            <Advices />
            <View style={styles.menu}>
                <MenuPanel />
            </View>
        </View>
    )
}; 

const styles = {
    container: {
        width: "100%",
        height: "100%",
    },
    menu: {
        position: 'absolute',
        width: "100%",
        bottom: 0
    }
}

export default AdvicesScreen;