import React from 'react'
import Layout from '../../components/Layout'

function TestPrivate() {
    console.log('test')

    return (
        <Layout>
            <p>private page</p>
        </Layout>
    )
}

export default TestPrivate