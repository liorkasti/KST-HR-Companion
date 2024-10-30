import React, {FC, useState} from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {COLORS} from '../config';
import CandidateForm from './CandidateForm';
import FormModal from './FormModal';
import {Candidate} from '../redux/types';

interface CandidateDetailsProps {
  candidate: Candidate;
  onEditCandidate: (candidate: Candidate) => void;
}

const CandidateDetailsScreen: FC<CandidateDetailsProps> = ({
  candidate,
  onEditCandidate,
}) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);

  if (!candidate) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>Candidate not found.</Text>
      </View>
    );
  }

  const statusColor =
    candidate.status == 'In Process'
      ? COLORS.submit
      : candidate.status == 'Declined'
      ? COLORS.error
      : COLORS.primary;

  return (
    <ScrollView style={styles.container}>
      <View style={styles.headerContainer}>
        <Image
          source={{uri: candidate.picture?.medium}}
          style={styles.avatar}
        />
        <View style={styles.headerTextContainer}>
          <Text
            style={
              styles.name
            }>{`${candidate.name.first} ${candidate.name.last}`}</Text>
          <Text style={styles.position}>{candidate.position}</Text>
          <View
            style={[styles.statusContainer, {backgroundColor: statusColor}]}>
            <Text style={[styles.status]}>{candidate.status}</Text>
          </View>
        </View>
      </View>
      <View style={styles.detailsContainer}>
        <Text style={styles.label}>Date of Birth:</Text>
        <Text style={styles.value}>
          {new Date(candidate.birthDate).toDateString()}
        </Text>
        <Text style={styles.label}>Salary Expectations:</Text>
        <Text style={styles.value}>{candidate.salaryExpectations}</Text>
        <Text style={styles.label}>CV:</Text>
        <Text style={styles.value}>{candidate.cv}</Text>
      </View>
      <TouchableOpacity
        style={styles.editButton}
        onPress={() => setIsEditModalOpen(true)}>
        <Text style={styles.editButtonText}>Edit</Text>
      </TouchableOpacity>
      <FormModal
        visible={isEditModalOpen}
        onClose={() => setIsEditModalOpen(prev => !prev)}>
        <CandidateForm
          title={'Edit Profile'}
          candidateData={candidate || undefined}
          onSubmit={onEditCandidate}
          isEditMode={isEditModalOpen}
        />
      </FormModal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginRight: 20,
  },
  headerTextContainer: {
    flex: 1,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.modalTitle,
  },
  position: {
    fontSize: 18,
    color: COLORS.secondary,
    paddingVertical: 10,
  },
  status: {
    color: COLORS.bkg,
    fontWeight: 600,
    fontSize: 16,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 5,
  },
  statusContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 5,
    paddingVertical: 10,
    borderRadius: 50,
  },
  detailsContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.modalTitle,
    marginBottom: 5,
  },
  value: {
    fontSize: 16,
    color: COLORS.text,
    marginBottom: 15,
  },
  editButton: {
    backgroundColor: COLORS.subtext,
    alignItems: 'center',
    paddingHorizontal: 5,
    paddingVertical: 15,
    borderRadius: 50,
  },
  editButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontSize: 18,
    color: 'red',
  },
});

export default CandidateDetailsScreen;
