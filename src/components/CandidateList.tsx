import React, {useEffect, useState} from 'react';
import {Alert, FlatList, StyleSheet, Text, View} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch, useSelector} from 'react-redux';
import {
  editCandidate,
  fetchCandidates,
  removeCandidate,
} from '../redux/slices/candidates-slice';
import {RootState} from '../redux/store';
import {Candidate} from '../redux/types';
import {
  ADD__TITLE,
  CANDIDATE_LOCAL_STORAGE_KEY,
  COLORS,
  EDIT_TITLE,
} from '../config';
import CandidateCard from './CandidateCard';
import CandidateForm from './CandidateForm';
import FormModal from './FormModal';

const CandidateList: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(
    null,
  );
  // const [sortField, setSortField] = useState<string>('name');

  const dispatch = useDispatch();
  const {
    data: candidates,
    filteredData,
    status,
    error,
  } = useSelector((state: RootState) => state.candidates);

  useEffect(() => {
    dispatch(fetchCandidates());
  }, [dispatch]);

  useEffect(() => {
    const updateLocalStorage = async () => {
      try {
        await AsyncStorage.setItem(
          CANDIDATE_LOCAL_STORAGE_KEY,
          JSON.stringify(candidates),
        );
      } catch (error) {
        console.log('Error updating local storage:', error);
      }
    };
    updateLocalStorage();
  }, [candidates]);

  const handleEdit = (candidate: Candidate) => {
    setSelectedCandidate(candidate);
    setIsModalOpen(true);
  };

  const handleDelete = (candidateId: string) => {
    Alert.alert(
      'Confirm Delete',
      'Are you sure you want to delete this candidate?',
      [
        {text: 'Cancel', style: 'cancel'},
        {
          text: 'Confirm',
          onPress: () => dispatch(removeCandidate(candidateId)),
        },
      ],
    );
  };

  const handleSave = async (candidate: Candidate) => {
    try {
      const savedCandidates = await AsyncStorage.getItem(
        CANDIDATE_LOCAL_STORAGE_KEY,
      );
      let localCandidates = savedCandidates ? JSON.parse(savedCandidates) : [];
      localCandidates = localCandidates.map((c: Candidate) =>
        c.id === candidate.id ? candidate : c,
      );
      await AsyncStorage.setItem(
        CANDIDATE_LOCAL_STORAGE_KEY,
        JSON.stringify(localCandidates),
      );
      const serializedCandidate = {
        ...candidate,
        birthDate: new Date(candidate.birthDate).toISOString(),
      };
      dispatch(
        editCandidate({id: candidate.id, candidate: serializedCandidate}),
      );
      setIsModalOpen(false);
      setSelectedCandidate(null);
    } catch (error) {
      console.log('Error saving candidate:', error);
    }
  };

  //TODO: continue
  // const handleSort = (field: string) => {
  //   setSortField(field);
  // };

  const renderCandidateItem = ({item}: {item: Candidate}) => (
    <CandidateCard
      candidate={item}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
      onEditCandidate={handleSave}
    />
  );

  if (status === 'loading') {
    return (
      <View>
        <Text style={styles.statusText}>Loading...</Text>
      </View>
    );
  }

  if (status === 'failed') {
    return (
      <View>
        <Text style={styles.statusText}>Error: {error}</Text>
      </View>
    );
  }

  return (
    <>
      <FlatList
        data={filteredData.length > 0 ? filteredData : candidates}
        numColumns={2}
        keyExtractor={(item: Candidate) => item.id.toString()}
        renderItem={renderCandidateItem}
      />
      <FormModal visible={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <CandidateForm
          title={selectedCandidate ? EDIT_TITLE : ADD__TITLE}
          candidateData={selectedCandidate || undefined}
          onSubmit={handleSave}
          isEditMode={!!selectedCandidate}
        />
      </FormModal>
    </>
  );
};

const styles = StyleSheet.create({
  statusText: {
    fontSize: 24,
    padding: 24,
    color: COLORS.thirdary,
  },
});

export default CandidateList;
