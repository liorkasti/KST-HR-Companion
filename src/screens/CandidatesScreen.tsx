import React, {useState} from 'react';
import {
  Dimensions,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import IconEntypo from 'react-native-vector-icons/Entypo';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useDispatch} from 'react-redux';
import CandidateForm from '../components/CandidateForm';
import CandidateList from '../components/CandidateList';
import FormModal from '../components/FormModal';
import {COLORS, HE_COMPANION_TITLE} from '../config';
import {addCandidate, filterCandidates} from '../redux/slices/candidates-slice';
import {Candidate} from '../redux/types';

const CandidatesScreen = () => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState<string>('');

  const dispatch = useDispatch();

  const onAddCandidate = async (newCandidate: Candidate) => {
    try {
      // Update the candidate in the local state
      const savedCandidates = await AsyncStorage.getItem('candidates');
      let localCandidates = savedCandidates ? JSON.parse(savedCandidates) : [];
      localCandidates.push(newCandidate);
      await AsyncStorage.setItem('candidates', JSON.stringify(localCandidates));
      // Add the candidate to the state
      dispatch(addCandidate(newCandidate));
      setIsAddModalOpen(false);
    } catch (error) {
      console.log('Error saving Candidate:', error);
    }
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    dispatch(filterCandidates(query));
  };

  return (
    <>
      <View style={styles.container}>
        <Text style={styles.title}>{HE_COMPANION_TITLE}</Text>
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search by name, position, etc."
            placeholderTextColor={COLORS.placeholder}
            cursorColor={COLORS.primary}
            value={searchQuery}
            onChangeText={handleSearch}
          />
          <Icon name={'filter-outline'} size={30} style={styles.searchIcon} />
        </View>
        <CandidateList />
      </View>
      <TouchableOpacity onPress={() => setIsAddModalOpen(prev => !prev)}>
        <View style={styles.iconContainer}>
          <IconEntypo name={'plus'} size={60} style={styles.modalButton} />
        </View>
      </TouchableOpacity>
      <FormModal
        visible={isAddModalOpen}
        onClose={() => setIsAddModalOpen(prev => !prev)}>
        <CandidateForm
          title={'Create Profile'}
          candidateData={undefined}
          onSubmit={onAddCandidate}
          isEditMode={false}
        />
      </FormModal>
    </>
  );
};

export default CandidatesScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    color: COLORS.primary,
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 15,
    marginTop: Platform.OS === 'ios' ? 60 : 24,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: Dimensions.get('window').width - 34,
    padding: 10,
    margin: 6,
    borderRadius: 8,
    backgroundColor: '#fff',
    marginBottom: 10,
    elevation: 5,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 2,
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },
  searchIcon: {
    width: 24,
    height: 24,
    marginRight: 10,
    color: COLORS.thirdary,
  },
  searchInput: {
    flex: 1,
    color: COLORS.thirdary,
  },
  modalButton: {
    color: COLORS.bkg,
    justifyContent: 'center',
    textAlign: 'center',
  },
  iconContainer: {
    position: 'absolute',
    bottom: 24,
    right: 24,
    width: 60,
    height: 60,
    backgroundColor: COLORS.secondary,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
