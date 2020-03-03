## udemy_react_native_blogs_cap12

## Crear el proyecto 
```
npx expo-cli init blog
cd blog
yarn start
```

## 1. Install React Navigation 
```
yarn add react-navigation
```

## 2. Install Dependencies 
```
yarn add react-native-gesture-handler react-native-reanimated react-native-screens react-native-safe-area-context @react-native-community/masked-view
```

## 3. Install React Navigation Stack 
```
yarn add react-navigation-stack @react-native-community/masked-view
```

## 4. Start the app and clear cache 
```
yarn start -c
```

## Errors? If you are still seeing errors and complaints about packages, do the following:
```
1. rm -r node_modules

2. rm package-lock.json

3. expo upgrade

4. npm start -c
```


## Para iconos: https://github.com/expo/vector-icons , @expo/vector-icons directory, 
## Seleccionamos uno que nos guste, e importamos {Feather/ FontAwesome} from '@expo/vector-icons'
## Para usarlo: <Feather name="trash" /> 