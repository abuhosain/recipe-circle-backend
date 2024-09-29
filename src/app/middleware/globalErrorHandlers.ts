 
import { ErrorRequestHandler, NextFunction, Request, Response } from 'express'
import { ZodError } from 'zod'
import { TErrorSources } from '../interface/error'
import config from '../config'

import { handleCastError } from '../errors/handleCastError'
import { handleDuplicateError } from '../errors/handleDuplicateError'
import AppError from '../errors/AppError'
import { handleZodError } from '../errors/handleZodeError'
import { handleValidationError } from '../errors/handleValidationError'

const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
  console.log(err)

  let statusCode = err.statusCode || 500
  let message = err.message || 'Something went wront'
  let errorSources: TErrorSources = [
    {
      path: '',
      message: 'Something went wront',
    },
  ]

  if (err instanceof ZodError) {
    const simplifiedError = handleZodError(err)
    statusCode = simplifiedError?.statusCode
    message = simplifiedError?.message
    errorSources = simplifiedError?.errorSources
  } else if (err?.name === 'ValidationError') {
    const simplifiedError = handleValidationError(err)
    statusCode = simplifiedError?.statusCode
    message = simplifiedError?.message
    errorSources = simplifiedError?.errorSources
  } else if (err?.name === 'CastError') {
    const simplifiedError = handleCastError(err)
    statusCode = simplifiedError?.statusCode
    message = simplifiedError?.message
    errorSources = simplifiedError?.errorSources
  } else if (err?.code === 11000) {
    const simplifiedError = handleDuplicateError(err)
    statusCode = simplifiedError?.statusCode
    message = simplifiedError?.message
    errorSources = simplifiedError?.errorSources
  } else if (err instanceof AppError) {
    statusCode = err?.statusCode
    message = err?.message
    errorSources = [
      {
        path: '',
        message: err?.message,
      },
    ]
  } else if (err instanceof Error) {
    message = err?.message
    errorSources = [
      {
        path: '',
        message: err?.message,
      },
    ]
  }



    // UnAuthorized Error Response
  if (errorSources[0]?.message === 'You have no access to this route') {
    return res.status(statusCode).json({
      succes: false,
      statusCode,
      message,
    });
  }

  // ultimate return
  return res.status(statusCode).json({
    success: false,
    message,
    errorSources,

    stack: config.NODE_ENV === 'development' ? err?.stack : null,
  })
}

export default globalErrorHandler
