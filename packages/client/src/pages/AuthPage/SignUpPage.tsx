import React, { useCallback, useState, useEffect } from 'react'
import { useNavigate } from 'react-router'
import { fromError, useMutation } from '@apollo/client'
import { useFormik } from 'formik'
import { InputAdornment } from '@mui/material'
import { useCookies } from 'react-cookie'

import { SIGN_UP_MUTATION } from '../../apollo/mutation/authPage'

import { signUpSchema } from '../../validations/authPageSchemas'

import { EAuthType } from '../../variables/eNums'
import { LOGIN_PAGE, MAIN_PAGE } from '../../variables/linksUrls'

import LoaderOval from '../../components/UI/Loader/LoaderOval'
import Error from '../../components/UI/Error/Error'

import { AuthTextField } from '../../components/UI/MuiUI/TextFields.styled/AuthTextField.styled'
import { AuthButton } from '../../components/UI/MuiUI/Buttons.styled/AuthButton.styled'

import logoImage from '../../assets/logo.svg'
import VisibilityIcon from '@mui/icons-material/Visibility'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'

import './AuthPage.scss'

const SignUpPage = () => {
  const [showPassword, isShowPassword] = useState<boolean>(true)
  const [showRePassword, isShowRePassword] = useState<boolean>(true)

  const navigate = useNavigate()

  const [RegisterMutation, { data, loading, error }] = useMutation(SIGN_UP_MUTATION)

  const [, setCookie] = useCookies(['token'])

  const formik = useFormik({
    initialValues: {
      username: '',
      email: '',
      password: '',
      rePassword: '',
    },
    validationSchema: signUpSchema,
    onSubmit: async values => {
      try {
        await RegisterMutation({
          variables: values,
        })
      } catch (error) {
        console.error('Sign up error!', fromError(error))
      }
    },
  })

  const { handleSubmit, handleChange, values, errors, touched, isValid } = formik

  const handleVisibilityPassword = useCallback(
    (name: string) => {
      if (name === EAuthType.password) return isShowPassword(!showPassword)
      isShowRePassword(!showRePassword)
    },
    [showPassword, showRePassword],
  )

  const handleNavigate = useCallback((path: string | undefined) => {
    if (path) {
      navigate(path)
    }
  }, [])

  useEffect(() => {
    const hasEmptyFields = Object.values(values).some(value => value === '')
    if (isValid && !hasEmptyFields) {
      console.log(data)
      if (data) {
        setCookie('token', data.register.token)
        handleNavigate(MAIN_PAGE)
      }
    }
  }, [data])

  if (loading) return <LoaderOval height={50} width={50} label="Loading..." />
  if (error) return <Error label={error?.message} />

  return (
    <div className="auth_wrapper">
      <div className="auth_container">
        <img src={logoImage} alt="Logo" className="auth_logo" />
        <h1 className="auth_title">Sign Up</h1>
        <form className="auth_inputs" onSubmit={handleSubmit}>
          <AuthTextField
            variant="outlined"
            type={EAuthType.text}
            margin="none"
            size="small"
            name={EAuthType.username}
            label="Enter your username"
            value={values.username}
            onChange={handleChange}
            error={touched.username && Boolean(errors.username)}
            helperText={touched.username && errors.username}
          />
          <AuthTextField
            variant="outlined"
            type={EAuthType.text}
            margin="none"
            size="small"
            name={EAuthType.email}
            label="Enter your email"
            value={values.email}
            onChange={handleChange}
            error={touched.email && Boolean(errors.email)}
            helperText={touched.email && errors.email}
          />
          <AuthTextField
            variant="outlined"
            type={showPassword ? EAuthType.password : EAuthType.text}
            margin="none"
            size="small"
            name={EAuthType.password}
            label="Enter your password"
            value={values.password}
            onChange={handleChange}
            error={touched.password && Boolean(errors.password)}
            helperText={touched.password && errors.password}
            InputProps={{
              endAdornment: (
                <InputAdornment
                  position="start"
                  className="auth_visibility"
                  onClick={() => {
                    handleVisibilityPassword(EAuthType.password)
                  }}
                >
                  {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                </InputAdornment>
              ),
            }}
          />
          <AuthTextField
            variant="outlined"
            type={showRePassword ? EAuthType.password : EAuthType.text}
            margin="none"
            size="small"
            name={EAuthType.rePassword}
            label="Enter again your password"
            value={values.rePassword}
            onChange={handleChange}
            error={touched.rePassword && Boolean(errors.rePassword)}
            helperText={touched.rePassword && errors.rePassword}
            InputProps={{
              endAdornment: (
                <InputAdornment
                  position="start"
                  className="auth_visibility"
                  onClick={() => {
                    handleVisibilityPassword(EAuthType.rePassword)
                  }}
                >
                  {showRePassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                </InputAdornment>
              ),
            }}
          />
          <div className="auth_buttons">
            <AuthButton variant="contained" className="auth_btn login" type="submit">
              Sign Up
            </AuthButton>
            <AuthButton
              variant="contained"
              className="auth_btn sign_up"
              onClick={() => handleNavigate(LOGIN_PAGE)}
            >
              Login
            </AuthButton>
          </div>
        </form>
      </div>
    </div>
  )
}

export default SignUpPage
