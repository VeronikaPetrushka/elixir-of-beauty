import { View } from "react-native"
import Article from "../components/Article"

const ArticleScreen = ({ route }) => {
    const { article } = route.params;

    return (
        <View style={styles.container}>
            <Article article={article} />
        </View>
    )
}; 

const styles = {
    container: {
        width: "100%",
        height: "100%",
    }
}

export default ArticleScreen;