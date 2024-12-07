import { View } from "react-native"
import Tracker from "../components/Tracker"
import MenuPanel from "../components/MenuPanel";

const TrackerScreen = () => {
    return (
        <View style={styles.container}>
            <Tracker />
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

export default TrackerScreen;