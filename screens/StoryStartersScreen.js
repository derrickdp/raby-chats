import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function StoryStartersScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.content}>
          <Text style={styles.title}>Story starters</Text>
          <Text style={styles.subtitle}>
            A few things others have talked about. Just for thinking — your story can be about anything.
          </Text>

          <View style={styles.questions}>
            <Text style={styles.question}>Were you at any of the 1966 marches?</Text>
            <Text style={styles.question}>What did organizing look like day to day?</Text>
            <Text style={styles.question}>Who taught you the most about the movement?</Text>
            <Text style={styles.question}>What changed in your neighborhood afterward?</Text>
            <Text style={styles.question}>What do you wish younger people understood?</Text>
          </View>
        </View>

        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backButtonText}>Back</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 32,
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#000000',
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 16,
    color: '#333333',
    marginBottom: 32,
    lineHeight: 24,
  },
  questions: {
    gap: 20,
  },
  question: {
    fontSize: 18,
    color: '#000000',
    lineHeight: 26,
  },
  backButton: {
    backgroundColor: '#E5E5E5',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 32,
  },
  backButtonText: {
    color: '#000000',
    fontSize: 16,
    fontWeight: '600',
  },
});