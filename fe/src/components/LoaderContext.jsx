import React, { ReactNode, createContext, useState } from 'react'
import { Loader } from './Loader'

export const LoaderContext = createContext(undefined)

export const LoaderProvider = ({ children }) => {
	const [isVisible, setIsVisible] = useState(false)
	const [loaderMessage, setLoaderMessage] = useState('')

	const contextValue = {
		showLoader: message => {
			setLoaderMessage(message)
			setIsVisible(true)
		},
		hideLoader: () => {
			setIsVisible(false)
		},
		isVisible,
	}

	return (
		<LoaderContext.Provider value={contextValue}>
			{isVisible && <Loader message={loaderMessage} />}
			{children}
		</LoaderContext.Provider>
	)
}
