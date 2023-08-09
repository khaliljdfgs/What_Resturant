import { Marker } from 'react-native-maps';
import { Image, StyleSheet, View } from 'react-native';

// CustomMarker component
export const CustomMarker = ({ imageUri }) => {
    return (
        <View style={styles.marker}>
            <Image source={{ uri: imageUri }} style={styles.markerImage} />
        </View>
    );
};

const styles = StyleSheet.create({
    marker: {
        width: 40,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
    },
    markerImage: {
        width: '80%',
        height: '80%',
        // borderTopStartRadius:100,
        // borderTopEndRadius:100,
        resizeMode: 'contain',
    },
});