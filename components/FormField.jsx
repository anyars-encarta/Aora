import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react';

import { icons } from '../constants';

const FormField = ({ title, value, placeholder, handleChangeText, otherStyles, keyboardType, ...props }) => {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <View className={`${otherStyles} space-y-2`}>
            <Text className='text-base text-gray-100 text-medium'>{title}</Text>

            <View className='border-2 border-black-200 w-full h-16 px-4 bg-black-100 rounded-2xl focus:border-secondary items-center flex-row'>
                <TextInput
                    className='flex-1 text-white font-psemibold text-base'
                    placeholder={placeholder}
                    placeholderTextColor='#7b7b8b'
                    value={value}
                    onChangeText={handleChangeText}
                    secureTextEntry={title === 'Password' && !showPassword}
                />

                {title === 'Password' && (
                    <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                        <Image
                            source={!showPassword ? icons.eye : icons.eyeHide}
                            className='w-6 h-6'
                            resizeMode='contain'
                        />
                    </TouchableOpacity>
                )}
            </View>
        </View>
    )
}

export default FormField

const styles = StyleSheet.create({})