import { View, Text, Image, TouchableOpacity, ImageBackground, StyleSheet, Dimensions, ScrollView, Share } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icons from "./Icons"

const { height } = Dimensions.get('window');

const Article = ({article}) => {
    const navigation = useNavigation();

    const handleShare = async () => {
        try {
            const result = await Share.share({
                message: `Check out this article: ${article.title}\n\n${article.description}\n\n${article.items?.map(item => `${item.item}: ${item.description}`).join('\n') || ''}\n\n${article.conclusion || ''}`,
            });
            if (result.action === Share.sharedAction) {
                if (result.activityType) {
                    console.log('Shared with activity type:', result.activityType);
                } else {
                    console.log('Shared successfully!');
                }
            } else if (result.action === Share.dismissedAction) {
                console.log('Share dismissed');
            }
        } catch (error) {
            console.error('Error sharing article:', error);
        }
    };

    return (
        <ImageBackground source={require('../assets/back/back1.png')} style={{flex: 1, transform: [{ rotate: '180deg' }]}}>
            <View style={styles.container}>
                <TouchableOpacity style={styles.back} onPress={() => navigation.goBack('')}>
                    <Icons type={'back'} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.share} onPress={handleShare}>
                    <Icons type={'share'} />
                </TouchableOpacity>

                <ScrollView style={{width: '100%'}}>
                    <Image source={article.image} style={styles.image} />

                    <Text style={styles.title}>{article.title}</Text>

                    <View style={styles.textContainer}>
                        <Text style={styles.description}>{article.description}</Text>
                        {
                            article.items && (
                                article.items?.map((item, index) => (
                                    <View key={index}>
                                        <Text style={styles.subTitle}>{item.item}</Text>
                                        <Text style={[styles.description, {color: '#8a0040'}]}>{item.description}</Text>
                                        {item.description2 && <Text style={[styles.description, {color: '#8a0040'}]}>{item.description2}</Text>}
                                    </View>
                                ))
                            )
                        }
                        {article.conclusion && (<Text style={styles.description}>{article.conclusion}</Text>)}
                    </View>
                </ScrollView>

            </View>
        </ImageBackground>
    )
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'flex-start',
        padding: 20,
        paddingTop: height * 0.15,
        transform: [{ rotate: '180deg' }]
    },

    back: {
        width: 50,
        height: 50,
        position: 'absolute',
        top: height * 0.055,
        left: 20
    },

    share: {
        width: 50,
        height: 50,
        position: 'absolute',
        top: height * 0.055,
        right: 20
    },

    image: {
        width: '100%',
        height: height * 0.3,
        borderRadius: 10,
        marginBottom: height * 0.03,
        resizeMode: 'cover'
    },

    title: {
        fontSize: 26,
        fontWeight: '900',
        color: '#fff',
        textAlign: 'center',
        marginBottom: height * 0.03
    },

    textContainer: {
        borderRadius: 10,
        width: '100%',
        padding: 7,
        backgroundColor: '#fff'
    },

    description: {
        fontSize: 16,
        fontWeight: '500',
        color: '#5e012c',
        textAlign: 'justify',
        marginBottom: height * 0.015
    },

    subTitle: {
        fontSize: 18,
        fontWeight: '800',
        color: '#5e012c',
        textAlign: 'justify',
        marginBottom: height * 0.015
    }

});

export default Article;