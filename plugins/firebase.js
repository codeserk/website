import * as firebase from 'firebase/app'
import 'firebase/analytics'
import 'firebase/performance'

export default (context, inject) => {
  const setupAnalytics = () => {
    const firebaseConfig = {
      apiKey: 'AIzaSyDqkVsOX1DuUJnTj3tgMwHrUhOHakiGRfo',
      authDomain: 'codeserk.firebaseapp.com',
      databaseURL: 'https://codeserk.firebaseio.com',
      projectId: 'codeserk',
      storageBucket: 'codeserk.appspot.com',
      messagingSenderId: '606954279158',
      appId: '1:606954279158:web:f4814d6d4413a625cd5cd7',
      measurementId: 'G-C756HW9QTM',
    }

    // Initialize Firebase
    firebase.initializeApp(firebaseConfig)
    const analytics = firebase.analytics()
    firebase.performance()

    inject('analytics', analytics)
  }

  inject('setupAnalytics', setupAnalytics)

  if (localStorage && localStorage.getItem('use-cookies')) {
    setupAnalytics()
  }
}
