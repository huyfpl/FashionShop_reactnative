import React from "react";
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import SanPham from "../Component/SanPham";
import { API_SEARCH_SANPHAM } from "../helpers/api";
export default class SearchResults extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchResults: [],
    };
  }

  handleSearch = () => {
   
  };

  componentDidMount() {
    const { navigation } = this.props;
    navigation.setOptions({
      title: "Tìm kiếm thông tin",
     
    });
  }

  renderSearchResultItem = ({ item }) => (
    <View style={styles.searchResultItem}>
      <Text>{item.name}</Text>
    </View>
  );

  render() {
    const { searchResults } = this.state;

    return (
      <View style={styles.container}>
         <View style={styles.searchContainer}>
          <View style={styles.searchInputContainer}>
            <TextInput
              style={styles.searchInput}
              placeholder="Tìm kiếm"
            />
            <TouchableOpacity onPress={()=>this.handleSearch()} style={styles.searchButton}>
              <Icon name="search" size={20} color="red" />
            </TouchableOpacity>
          </View>
        </View>
        <FlatList
          data={searchResults}
          renderItem={this.renderSearchResultItem}
          keyExtractor={(item) => item.id.toString()}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchContainer: {
    flexDirection: "row",
    justifyContent: 'center',
    alignItems: 'center',
   
    paddingHorizontal: 10,
  
  },
  searchInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    borderWidth: 1,
    borderColor:'blue',
    borderRadius: 20,
    paddingHorizontal: 10,
    marginRight: 50,
    marginLeft:50,
    marginTop:10,
  },
  searchInput: {
    flex: 1,
    height: 40,
    fontSize:20,
    fontWeight:'bold',
    
  },
  searchButton: {
    marginLeft: 5,
 
   
    
  },
  searchResultItem: {
    padding: 10,
  },
});
