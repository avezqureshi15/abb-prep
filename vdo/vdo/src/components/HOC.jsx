import React, { useEffect } from 'react'

const WithLogging = (WrappedComponent) => {
    return function (props) {
        useEffect(() => {
            console.log(`${WrappedComponent.name} component Mounted`)

            return () => {
                console.log(`${WrappedComponent.name} component Un-Mounted`)
            }
        }, [])

        return <WrappedComponent{...props} />
    }
}

export default WithLogging