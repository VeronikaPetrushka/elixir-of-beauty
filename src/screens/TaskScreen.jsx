import { View } from "react-native"
import Task from "../components/Task"

const TaskScreen = () => {

    return (
        <View style={styles.container}>
            <Task />
        </View>
    )
}; 

const styles = {
    container: {
        width: "100%",
        height: "100%",
    }
}

export default TaskScreen;