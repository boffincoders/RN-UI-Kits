import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {StyleSheet, TouchableOpacity, View, Image, Text} from 'react-native';
import {Colors} from '../../constants/Colors';
const AccountInformation = () => {
  const navigation = useNavigation<ReactNavigation.RootParamList | any>();
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image source={require('../../assets/images/backButton.png')} />
        </TouchableOpacity>
        <View>
          <Text style={styles.headerTitle}>Account Information</Text>
        </View>
        <TouchableOpacity>
          <Text style={styles.saveButton}>Save</Text>
        </TouchableOpacity>
      </View>
      <View style={{alignItems: 'center', justifyContent: 'center'}}>
        <View style={styles.circleImage}>
          <Image
            style={styles.image}
             source={require('../../assets/images/Vector.png')}
           // source={{uri :"https://img.freepik.com/free-photo/half-profile-image-beautiful-young-woman-with-bob-hairdo-posing-gazing-with-eyes-full-reproach-suspicion-human-facial-expressions-emotions-reaction-feelings_343059-4660.jpg?w=2000"}}
          />
        </View>
      </View>
      <View>
        <View style={styles.account}>
          <View style={styles.row}>
            <Text style={{color: Colors.WHITE, fontSize: 16}}>Name</Text>
            <View style={styles.secondaryRow}>
              <Text style={{color: Colors.WHITE, fontSize: 14}}>
                Deborah Moore
              </Text>
              <TouchableOpacity>
                <Image source={require('../../assets/images/forward.png')} />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.borderListBottom}></View>
          <View style={styles.row}>
            <Text style={{color: Colors.WHITE, fontSize: 16}}>Weight</Text>
            <View style={styles.secondaryRow}>
              <Text style={{color: Colors.WHITE, fontSize: 14}}>52.7Kg</Text>
              <TouchableOpacity>
                <Image source={require('../../assets/images/forward.png')} />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.borderListBottom}></View>
          <View style={styles.row}>
            <Text style={{color: Colors.WHITE, fontSize: 16}}>
              Date of Birth
            </Text>
            <View style={styles.secondaryRow}>
              <Text style={{color: Colors.WHITE, fontSize: 14}}>
                Nov 30, 1990
              </Text>
              <TouchableOpacity>
                <Image source={require('../../assets/images/forward.png')} />
              </TouchableOpacity>
            </View>
          </View>
          <View
            style={[styles.borderListBottom, {borderBottomWidth: 0.5}]}></View>
          <View style={styles.row}>
            <Text style={{color: Colors.WHITE, fontSize: 16}}>Email</Text>
            <View style={styles.secondaryRow}>
              <Text style={{color: Colors.WHITE, fontSize: 14}}>
                deborah.moore@email.com
              </Text>
              <TouchableOpacity>
                <Image source={require('../../assets/images/forward.png')} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#222332',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  saveButton: {
    color: '#9662F1',
    fontSize: 16,
  },
  headerTitle: {
    fontSize: 16,
    color: Colors.WHITE,
    fontWeight: '400',
  },
  circleImage: {
    backgroundColor: '#D8D8D8',
    alignItems: 'center',
    height: '33%',
    width: '20%',
    justifyContent: 'center',
    borderRadius: 60,
  },
  account: {
    borderRadius: 10,
    backgroundColor: '#2D3450',
    marginLeft: 10,
    marginRight: 10,
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  image: {flex: 1, width: 50, height: 50, resizeMode: 'contain'},
  borderListBottom: {borderBottomColor: '#FFFFFF', borderBottomWidth: 0.2},
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 6,
    margin: 5,
  },
  secondaryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});
export default AccountInformation;
