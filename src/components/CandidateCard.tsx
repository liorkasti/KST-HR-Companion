import React, {FC, useState} from 'react';
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import {Candidate} from '../redux/types';
import {COLORS} from '../config';
import CandidateDetailsScreen from './CandidateDetails';
import FormModal from './FormModal';

interface CandidateCardProps {
  candidate: Candidate;
  handleEdit: (candidate: Candidate) => void;
  handleDelete: (candidateId: string) => void;
  onEditCandidate: (candidate: Candidate) => void;
}

const CandidateCard: FC<CandidateCardProps> = ({
  candidate: candidateData,
  handleEdit,
  handleDelete,
  onEditCandidate,
}) => {
  const [isCandidateModalOpen, setIsCandidateModalOpen] =
    useState<boolean>(false);

  return (
    <View style={styles.cardContainer}>
      <TouchableOpacity onPress={() => setIsCandidateModalOpen(true)}>
        <View style={styles.imageContainer}>
          <Image
            source={{uri: candidateData.picture?.medium}}
            style={styles.image}
          />
        </View>
      </TouchableOpacity>
      <View style={styles.row}>
        <TouchableOpacity onPress={() => handleEdit(candidateData)}>
          <Icon name="edit" size={20} color="black" style={styles.editIcon} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleDelete(candidateData.id)}>
          <Icon
            name="delete"
            size={20}
            color="black"
            style={styles.deleteIcon}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.candidateInfoContainer}>
        <Text
          style={
            styles.name
          }>{`${candidateData.name.first} ${candidateData.name.last}`}</Text>
        <Text style={styles.position}>{candidateData.position}</Text>
        <Text style={styles.position}>{candidateData.salaryExpectations}</Text>
      </View>
      <FormModal
        visible={isCandidateModalOpen}
        onClose={() => setIsCandidateModalOpen(false)}>
        <CandidateDetailsScreen
          onEditCandidate={onEditCandidate}
          candidate={candidateData}
        />
      </FormModal>
    </View>
  );
};

const numColumns = 2; // Number of columns in the FlatList
const screenWidth = Dimensions.get('window').width;
const cardWidth = screenWidth / numColumns - 24;

const styles = StyleSheet.create({
  cardContainer: {
    margin: 6,
    width: cardWidth,
    borderRadius: 8,
    backgroundColor: '#ffffff',
    marginBottom: 10,
    elevation: 5, // For Android shadow effect
    shadowColor: '#000000', // For iOS shadow effect
    shadowOpacity: 0.2, // For iOS shadow effect
    shadowRadius: 2, // For iOS shadow effect
    shadowOffset: {
      width: 0,
      height: 2,
    }, // For iOS shadow effect
  },
  row: {
    marginHorizontal: 10,
    marginTop: -15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  editIcon: {
    marginRight: 16,
  },
  deleteIcon: {},
  imageContainer: {
    padding: 10,
  },
  image: {
    width: cardWidth - 20,
    height: cardWidth - 20,
    borderRadius: (cardWidth - 20) / 2,
  },
  candidateInfoContainer: {
    padding: 10,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    color: COLORS.title,
  },
  position: {
    fontSize: 12,
    color: COLORS.title,
  },
});

export default CandidateCard;
