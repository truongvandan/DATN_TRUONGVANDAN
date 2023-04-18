import React from 'react'
import { useField, useFormikContext } from 'formik'
import DropboxChooser from 'react-dropbox-chooser'
import { Box, Button, Image } from '@chakra-ui/react'

const DropboxImageChooser = ({ ...props }) => {
    const { setFieldValue } = useFormikContext();
    const [field] = useField(props);

    const uploadSuccess = (files) => {
        const [file] = files;

        setFieldValue(field.name, file.link.replace('www.dropbox.com', 'dl.dropboxusercontent.com'));
    }

    return (
        <>
            <Image src={field.value || '/images/default.png'} alt="Ảnh vắc xin" className='max-w-full' />
            <Box m={2}>
                <DropboxChooser 
                    appKey={import.meta.env.VITE_DROPBOX_APP_KEY}
                    success={uploadSuccess}
                    extensions={['.jpg', '.png', '.jepg']}
                    className="m-8"
                >
                    <Button>Choose image</Button>
                </DropboxChooser>
            </Box>
        </>
    );
};

export default DropboxImageChooser
