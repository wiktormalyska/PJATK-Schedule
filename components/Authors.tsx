import {Text, Image, View} from 'react-native';
import {useAuthors} from '@/hooks/use-authors';
import {useTheme} from "@/contexts/ThemeContext";

//Before entering more authors, fix component to allow more authors

const Authors = () => {
    const authors = useAuthors();
    const { currentTheme } = useTheme();

    return (
        <>
            {authors.map((item) => (
                <View key={item.name} style={{ flexDirection: 'row', alignItems: 'center', padding: 10 }}>
                    <Image source={{ uri: item.imageUrl }} style={{ width: 50, height: 50, borderRadius: 25, marginRight: 10 }} />
                    <View>
                        <Text style={{ fontWeight: 'bold', color: currentTheme.style.text }}>{item.name}</Text>
                        <Text style={{ color: currentTheme.style.textSecondary }}>{item.role}</Text>
                    </View>
                </View>
            ))}
        </>
    );
};
export default Authors;
