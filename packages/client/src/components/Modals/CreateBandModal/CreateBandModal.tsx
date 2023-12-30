import React, { useState } from 'react'
import { Backdrop, Box, Fade } from '@mui/material'
import { Formik, FormikErrors } from 'formik'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { fromError, useMutation, useReactiveVar } from '@apollo/client'
import { v4 } from 'uuid'
import { CREATE_BAND_MUTATION } from '../../../apollo/mutation/band'
import { userInfoVar } from '../../../reactiveVars'
import { storage } from '../../../utils/firebaseInit'
import { createBandSchema } from '../../../validations/createBandSchema'
import { DetailModal } from '../../UI/MuiUI/MainTableContainer.styled/MainTableContainer.styled'
import CreateBandForm from './CreateBandForm'
import './CreateBandModal.scss'

export interface IFormValues {
  name: string
  foundationDate: string
  about: string
  tracks: Array<{
    name: string
    album: string
    year: string
    format: string
    url: string
    genre: string
  }>
  description: string
  image: string
  location: string
  members: string
}

interface IHandleFormSubmit {
  setValues: (
    values: React.SetStateAction<IFormValues>,
    shouldValidate?: boolean,
  ) => Promise<void | FormikErrors<IFormValues>>
}

interface ICreateBandModal {
  handleCloseModal: (state: boolean) => void
  openModal: boolean
}

const CreateBandModal = (props: ICreateBandModal) => {
  const { handleCloseModal, openModal } = props
  const [selectedImg, setSelectedImg] = useState<File | null>(null)

  const userData = useReactiveVar(userInfoVar)

  const [createBandMutation] = useMutation(CREATE_BAND_MUTATION)

  const handleFormSubmit: (
    values: IFormValues,
    { setValues }: IHandleFormSubmit,
  ) => Promise<void> = async (values, { setValues }) => {
    try {
      if (selectedImg) {
        const imageRef = ref(storage, `images/user/${userData.id}/band/${selectedImg.name + v4()}`)
        await uploadBytes(imageRef, selectedImg)
        const userProfileImageUrl = await getDownloadURL(imageRef)
        await setValues({ ...values, image: userProfileImageUrl })
      }

      await createBandMutation({
        variables: { input: values },
      })
      handleCloseModal(false)
    } catch (serverError) {
      console.error('Band creation error', fromError(serverError))
    }
  }

  return (
    <DetailModal
      open={openModal}
      onClose={() => handleCloseModal(false)}
      closeAfterTransition
      disableAutoFocus
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          timeout: 500,
        },
      }}
    >
      <Fade in={openModal}>
        <Box component="div">
          <Formik
            initialValues={{
              name: '',
              foundationDate: '',
              about: '',
              tracks: [{ name: '', album: '', year: '', format: '', url: '', genre: '' }],
              description: '',
              image: '',
              location: '',
              members: '',
            }}
            validationSchema={createBandSchema}
            onSubmit={handleFormSubmit}
          >
            {({ handleSubmit, handleChange, values, errors, touched }) => {
              return (
                <CreateBandForm
                  handleSubmit={handleSubmit}
                  handleChange={handleChange}
                  setSelectedImg={setSelectedImg}
                  values={values}
                  errors={errors}
                  touched={touched}
                />
              )
            }}
          </Formik>
        </Box>
      </Fade>
    </DetailModal>
  )
}

export default CreateBandModal
