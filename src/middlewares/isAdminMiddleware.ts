import { Request, Response, NextFunction } from 'express'
import AppDataSource from '../data-source'
import User from '../entities/userEntity'
import AppError from '../errors/AppError'
import jwt from 'jsonwebtoken'

const isAdminMiddleware = async (
  req: Request,
  resp: Response,
  next: NextFunction
) => {

  let isAdm = req.user.isAdm

  if (!isAdm) {
    throw new AppError('unauthorized', 403)
  }
  return next()
}

export default isAdminMiddleware
