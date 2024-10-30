import DateTimePicker from '@react-native-community/datetimepicker';
import React, {useState} from 'react';
import {
  Alert,
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/MaterialIcons';

import {COLORS} from '../config';
import {Candidate, CandidateName, CandidatePicture} from '../redux/types';
import SaveButton from './Button';

interface CandidateFormProps {
  title: string;
  candidateData: Candidate | undefined;
  onSubmit: (candidate: Candidate) => void;
  isEditMode: boolean;
}

const CandidateForm: React.FC<CandidateFormProps> = ({
  title,
  candidateData = null,
  onSubmit,
  isEditMode,
}) => {
  const [name, setName] = useState<CandidateName>({
    title: candidateData?.name?.title || '',
    first: candidateData?.name?.first || '',
    last: candidateData?.name?.last || '',
  });
  const [birthDate, setBirthDate] = useState<Date>(
    candidateData ? new Date(candidateData.birthDate) : new Date(),
  );
  const [position, setPosition] = useState<string>(
    candidateData?.position || '',
  );
  const [salary, setSalary] = useState<string>(
    candidateData?.salaryExpectations || '',
  );
  const [cv, setCV] = useState<string>(candidateData?.cv || '');
  const [picture, setPicture] = useState<CandidatePicture>(
    candidateData?.picture || {medium: ''},
  );
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleSubmit = () => {
    if (!name.first || !name.last || !position || !salary || !cv) {
      Alert.alert('Validation Error', 'Please fill in all fields.');
      return;
    }

    const candidate: Candidate = {
      id: candidateData?.id || name.first + name.last + Date.now().toString(),
      name,
      birthDate: birthDate.toISOString(),
      position,
      salaryExpectations: salary,
      cv,
      picture,
      status: candidateData?.status || 'In Process',
      email: '',
      location: undefined,
    };
    onSubmit(candidate);
  };

  const handleImagePick = () => {
    launchImageLibrary({mediaType: 'photo'}, response => {
      if (!response.didCancel && !response.errorCode) {
        const selectedAsset = response?.assets?.[0];
        if (selectedAsset?.uri) {
          setPicture({medium: selectedAsset.uri});
        }
      }
    });
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.modalTitle}>{title}</Text>
        <View style={styles.headerContainer}>
          <TouchableOpacity
            onPress={handleImagePick}
            style={styles.imagePicker}>
            {picture.medium ? (
              <>
                <Image
                  source={{uri: picture.medium}}
                  style={styles.candidateImage}
                />
                <TouchableOpacity
                  onPress={handleImagePick}
                  style={styles.editWrapper}>
                  <Icon
                    name="edit"
                    size={20}
                    color={COLORS.placeholder}
                    style={styles.editIcon}
                  />
                </TouchableOpacity>
              </>
            ) : (
              <>
                <Text style={styles.pickerTitle}>Pick Image</Text>
                <Icon
                  name="upload"
                  size={20}
                  color={COLORS.placeholder}
                  style={styles.uploadIcon}
                />
              </>
            )}
          </TouchableOpacity>
          {Platform.OS === 'ios' ? (
            <DateTimePicker
              value={birthDate}
              mode="date"
              display="default"
              onChange={(event, date) => {
                setShowDatePicker(false);
                if (date) setBirthDate(date);
              }}
            />
          ) : (
            <TouchableOpacity
              style={styles.datePickerButton}
              onPress={() => setShowDatePicker(true)}>
              <Text style={styles.datePickerText}>
                {birthDate.toDateString()}
              </Text>
            </TouchableOpacity>
          )}
          {showDatePicker && (
            <DateTimePicker
              value={birthDate}
              mode="date"
              display="default"
              onChange={(event, date) => {
                setShowDatePicker(false);
                if (date) setBirthDate(date);
              }}
            />
          )}
        </View>
        <TextInput
          style={[styles.input, isEditMode && styles.editInput]}
          placeholder="Title"
          placeholderTextColor={COLORS.placeholder}
          value={name.title}
          onChangeText={text => setName({...name, title: text})}
        />
        <TextInput
          style={[styles.input, isEditMode && styles.editInput]}
          placeholder="First Name"
          placeholderTextColor={COLORS.placeholder}
          value={name.first}
          onChangeText={text => setName({...name, first: text})}
        />
        <TextInput
          style={[styles.input, isEditMode && styles.editInput]}
          placeholder="Last Name"
          placeholderTextColor={COLORS.placeholder}
          value={name.last}
          onChangeText={text => setName({...name, last: text})}
        />
        <View style={styles.row}>
          <TextInput
            style={[
              styles.input,
              styles.halfInput,
              isEditMode && styles.editInput,
            ]}
            placeholder="Position"
            placeholderTextColor={COLORS.placeholder}
            value={position}
            onChangeText={setPosition}
          />
          <TextInput
            style={[
              styles.input,
              styles.halfInput,
              isEditMode && styles.editInput,
            ]}
            placeholder="Salary Expectations"
            placeholderTextColor={COLORS.placeholder}
            keyboardType="numeric"
            value={salary.toString()}
            onChangeText={text => setSalary(text)}
          />
        </View>
        <TextInput
          style={[
            styles.input,
            styles.longInput,
            isEditMode && styles.editInput,
          ]}
          placeholder="CV"
          placeholderTextColor={COLORS.placeholder}
          multiline
          value={cv}
          onChangeText={setCV}
        />
      </View>
      <View style={styles.bottomContainer}>
        <SaveButton onButtonPress={handleSubmit} text="Save" />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  modalTitle: {
    fontSize: 24,
    paddingBottom: 10,
    fontWeight: '700',
    marginBottom: 20,
    textAlign: 'center',
    color: COLORS.modalTitle,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  imagePicker: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 100,
    height: 100,
    backgroundColor: COLORS.gray,
    borderRadius: 50,
    marginRight: 20,
  },
  candidateImage: {
    width: 100,
    height: 100,
    resizeMode: 'cover',
    borderRadius: 50,
    marginVertical: 20,
  },
  editWrapper: {
    alignItems: 'center',
    top: -38,
  },
  editIcon: {
    width: 18,
    height: 18,
    marginLeft: 100,
  },
  pickerTitle: {
    fontSize: 12,
    color: COLORS.placeholder,
  },
  uploadIcon: {
    width: 22,
    paddingTop: 4,
    height: 22,
    tintColor: COLORS.placeholder,
  },
  datePickerButton: {
    padding: 10,
    backgroundColor: COLORS.gray,
    borderRadius: 4,
  },
  datePickerText: {
    color: COLORS.thirdary,
    fontWeight: '500',
  },
  input: {
    width: '100%',
    borderBottomWidth: 1,
    borderColor: COLORS.gray,
    borderRadius: 4,
    padding: 10,
    marginBottom: 10,
    color: COLORS.thirdary,
    fontWeight: '500',
  },
  editInput: {
    color: COLORS.text,
    fontWeight: '500',
  },
  longInput: {
    minHeight: 100,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  halfInput: {
    width: '48%',
  },
  bottomContainer: {
    alignItems: 'center',
    paddingBottom: 20,
  },
});

export default CandidateForm;
