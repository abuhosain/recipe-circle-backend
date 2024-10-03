import catchAsync from '../../utils/catchAsynch'
import { paymentServices } from './payment.service'

const confirmationController = catchAsync(async (req, res) => {
  const { transactionId, status } = req.query
  const result = await paymentServices.confirmationService(
    transactionId as string,
    status as string,
  )
  res.send(result)
})

export const PaymentControllers = {
  confirmationController,
}
