import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  ActivityIndicator,
  Text,
  TouchableOpacity,
  Alert,
  Platform
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { WebView } from 'react-native-webview';
import NetInfo from '@react-native-community/netinfo';
import * as Permissions from 'expo-permissions';

export default function WebViewScreen() {
  const [isLoading, setIsLoading] = useState(true);
  const [isConnected, setIsConnected] = useState(true);
  const [permissionsGranted, setPermissionsGranted] = useState(false);
  const [webViewKey, setWebViewKey] = useState(0);

  const SENJA_URL = 'https://senja.io/p/raby-testimonials/r/aRwfGQ';

  useEffect(() => {
    requestPermissions();
    const unsubscribe = NetInfo.addEventListener(state => {
      setIsConnected(state.isConnected);
    });
    return () => unsubscribe();
  }, []);

  const requestPermissions = async () => {
    try {
      if (Platform.OS === 'ios') {
        const { status: cameraStatus } = await Permissions.askAsync(Permissions.CAMERA);
        const { status: micStatus } = await Permissions.askAsync(Permissions.AUDIO_RECORDING);
        const { status: mediaStatus } = await Permissions.askAsync(Permissions.MEDIA_LIBRARY);

        if (cameraStatus!== 'granted' || micStatus!== 'granted' || mediaStatus!== 'granted') {
          Alert.alert(
            'Permissions Required',
            'Camera, microphone, and photo library access are needed to record and upload your story. Please enable them in Settings.',
            [{ text: 'OK' }]
          );
          setPermissionsGranted(false);
        } else {
          setPermissionsGranted(true);
        }
      } else {
        // Android permissions handled by manifest + WebView
        setPermissionsGranted(true);
      }
    } catch (error) {
      console.error('Permission error:', error);
      Alert.alert('Error', 'Failed to request permissions. Please check your settings.');
      setPermissionsGranted(false);
    }
  };

  const handleRetry = () => {
    NetInfo.fetch().then(state => {
      setIsConnected(state.isConnected);
      if (state.isConnected) {
        setWebViewKey(prev => prev + 1);
        setIsLoading(true);
      }
    });
  };

  if (!isConnected) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.errorContainer}>
          <Text style={styles.errorTitle}>No internet connection</Text>
          <Text style={styles.errorMessage}>
            Please check your network and try again.
          </Text>
          <TouchableOpacity style={styles.retryButton} onPress={handleRetry}>
            <Text style={styles.retryButtonText}>Retry</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  if (!permissionsGranted && Platform.OS === 'ios') {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.errorContainer}>
          <Text style={styles.errorTitle}>Permissions Required</Text>
          <Text style={styles.errorMessage}>
            Camera, microphone, and photo library access are needed to record your story.
          </Text>
          <TouchableOpacity style={styles.retryButton} onPress={requestPermissions}>
            <Text style={styles.retryButtonText}>Grant Permissions</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  if (Platform.OS === 'web') {
    return (
      <iframe 
        src={{ uri: SENJA_URL }}
        style={styles.webFrame} 
        title="Web Content"
      />
    );
  }
  return (
    <SafeAreaView style={styles.container}>
      <WebView
        key={webViewKey}
        source={{ uri: SENJA_URL }}
        style={styles.webview}
        javaScriptEnabled={true}
        allowsInlineMediaPlayback={true}
        mediaPlaybackRequiresUserAction={false}
        allowsFullscreenVideo={true}
        mediaCapturePermissionGrantType="grant"
        onShouldStartLoadWithRequest={() => true}
        onLoadStart={() => setIsLoading(true)}
        onLoadEnd={() => setIsLoading(false)}
        onError={() => {
          setIsConnected(false);
          setIsLoading(false);
        }}
      />
      {isLoading && (
        <View style={styles.loadingOverlay}>
          <ActivityIndicator size="large" color="#000000" />
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  webview: {
    flex: 1,
  },
  loadingOverlay: {
   ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  errorTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#000000',
    marginBottom: 12,
    textAlign: 'center',
  },
  errorMessage: {
    fontSize: 16,
    color: '#666666',
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 24,
  },
  retryButton: {
    backgroundColor: '#000000',
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 8,
  },
  retryButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});
