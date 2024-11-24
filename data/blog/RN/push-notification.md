---
title: expo notification 적용하기
date: '2023-09-04'
tags: ['React-Native', 'expo', 'react']
draft: false
summary: expo-notification을 이용한 로컬 알림 및 푸시 알림
---

# Notification 알아보기

앱 알림에는 크게 `로컬 알림`과 `푸시 알림`이 있다.

`로컬 알림`은 앱이 설치된 기기에서 설치된 앱이 트리거하는 알림이다. 즉, 이 알림은 다른 기기나 사용자가 보내는 것이 아니라 앱이 설치된 기기에서 해당 앱이 트리거하는 알림이다. 

간단히 말해, 알람 앱, 또는 알림 앱, 할 일을 리마인드 해주는 앱 등에서 보내는 알림이라고 생각하면 된다.

![push-notification](https://github.com/wontae99/woncha-typescript/assets/109476712/d3ed5776-515e-48f6-8076-88061f14168b)

`푸시 알림`은 한 기기 내에서 알림을 설정하는 `로컬 알림`과 다르게 한 기기의 앱 인스턴에서 다른 기기의 앱 인스턴스로 보내거나 백앤드에서 다른 기기로 보내고자 할때, 사용되는 알림이다.

우리의 앱과 백엔드는 다른 기기에 직접적으로 알림을 보낼 수 없기 때문에(스팸 등을 방지하기 위한 보안 이유로), 구글이나 애플 같은 회사에선 그들이 제공하는 백엔드를 사용하여 다른 기기에 푸시 알림을 보내도록 강제한다. 따라서 푸시 알림 서버를 통해 알림을 보내야 한다. 

# Reference

[expo-notification 공식문서](https://docs.expo.dev/versions/v49.0.0/sdk/notifications/)

<br/>

# STEP1: 설치

```javascript
expo install expo-notifications
```

<br/>

# STEP2: 앱이 foreground(활성화)에 있을시, 알림을 누를때 수행할 동작 설정

```
import * as Notification from "expo-notifications";

Notification.setNotificationHandler({
  handleNotification: async () => {
    return {
      shouldPlaySound: false,
      shouldSetBadge: true,
      shouldShowAlert: true,
    };
  },
});
```

# STEP3: 권한 설정

iOS에서 알림이 제대로 작동하기 위해서 권한을 요청해야 한다.
`expo-notification`이 제공하는 `getPermissionsAsync()` 메소드를 사용하여 현재 권한 상태를 받고 `requestPermissionsAsync()` 메소드를 사용하여 권한을 요청할 수 있다.

```javascript
useEffect(() => {
  async function configurePushNotification() {
    const { status } = await Notification.getPermissionsAsync()
    let finalStatus = status

    if (finalStatus !== 'granted') {
      const { status } = await Notification.requestPermissionsAsync()
      finalStatus = status
    }

    if (finalStatus !== 'granted') {
      Alert.alert('Permission required', 'Push notification need the appropriate permssions.')
      return
    }

    const pushTokenData = await Notification.getExpoPushTokenAsync({
      projectId: 'c131d92f-63a1-44ce-b674-f6ce2b7c0656',
    })
    console.log('pushTokenData', pushTokenData)
  }

  if (Platform.OS === 'android') {
    Notification.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notification.AndroidImportance.DEFAULT,
    })
  }

  configurePushNotification()
}, [])
```

<br/>

# STEP4: 알람을 발생시킬 UI 및 트리거 함수 구성

- UI 구성
  - 로컬 알림 버튼, 푸시 알림 버튼 각각 하나씩 배치

```javascript
import { StyleSheet, Text, View, Button, Alert, Platform } from 'react-native'

export default function App() {
  return (
    <View style={styles.container}>
      <View style={styles.paddingV}>
        // 푸시알림 트리거 버튼
        <View style={styles.paddingV}>
          <Button title="Push Notification" onPress={sendPushNotificationHandler} />
        </View>
        // 로컬알림 트리거 버튼
        <View style={styles.paddingV}>
          <Button title="Local Notification" onPress={localNotificationHandler} />
        </View>
      </View>
      <Text>푸시 알림 테스트</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paddingV: {
    paddingVertical: 4,
  },
})
```

- 트리거 함수

```javascript
/// 로컬 알림 트리거 함수
function localNotificationHandler() {
  Notification.scheduleNotificationAsync({
    content: {
      title: '로컬 알림',
      subtitle: '로컬 알림 테스트',
      body: '로컬 알림 테스트 바디입니다!',
      data: { userName: 'wontae' }, // data프로퍼티를 통해 notification 객체에 전달할 수 있다.
    },
    trigger: {
      seconds: 2, // 버튼 클릭 후 2초 후에 알림 발생
    },
    // 알림을 딜레이 없이 발생시키고자 할때, trigger 값에 null을 넣으면 된다
    // 또는 특정 날짜, 시간에 알림을 설정하고자 할때, date프로퍼티에 날짜나 Unix 타임스탬프 숫자 값을 넣어준다.
  })
}

// 푸시 알림 트리거 함수
function sendPushNotificationHandler() {
  // Expo에서 제공하는 push 알림 백엔드 주소로 테스트
  fetch('https://exp.host/--/api/v2/push/send', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      to: 'ExponentPushToken[oRH3S5BI2fn0UvhnwcJcBg]',
      title: '푸시알림 테스트',
      body: '푸시알림 테스트 바디입니다!',
      data: { userName: 'server' },
    }),
  })
}
```

<br/>

# STEP5: 수신된 알림 처리하기

앱 사용자가 새 알림을 받을때 마다 특정 동작을 수행하도록 할때, `Notifications.addNotificationReceivedListener()` 메소드에 notification 콜백을 사용할 수 있다.

또한, `Notifications.addNotificationResponseReceivedListener()` 메소드로 알림을 클릭함으로써 동작을 수행하도록 할 수 있다.

```javascript
useEffect(() => {
  // 알림 수신시
  const subscription = Notification.addNotificationReceivedListener((notification) => {
    // data의 userName을 notification 객체에서 받음
    const userName = notification.request.content.data.userName;
    console.log(`Notification received from ${userName}`)
    console.log(notification)
  })
  // 알림 클릭시
  const subscription2 = Notification.addNotificationResponseReceivedListener((response) => {
    console.log('Notification response')
    console.log(response)
  })

  // clean-up function
  return () => {
    subscription.remove()
    subscription2.remove()
  }
}, [])
```

<br/>

# 구현

- 디바이스

![notif-test](https://github.com/wontae99/RN-push-alarm/assets/109476712/138f8a26-bf9e-47ba-ae79-d01ebd006cc1)



- 콘솔 창

![console](https://github.com/wontae99/woncha-typescript/assets/109476712/33821924-1f64-4180-a8a6-f304ba5b3dba)


<br/><br/>

[깃헙 코드](https://github.com/wontae99/RN-push-alarm)