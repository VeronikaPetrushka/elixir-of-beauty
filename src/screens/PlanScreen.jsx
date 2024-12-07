import { View } from "react-native"
import Plan from "../components/Plan"
import MenuPanel from "../components/MenuPanel";

const PlanScreen = () => {
    return (
        <View style={styles.container}>
            <Plan />
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

export default PlanScreen;