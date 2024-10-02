/* eslint-disable no-undef */
import { join } from 'path'
import { P_Status } from '../Booking/booking.constance'
import { Booking } from '../Booking/booking.model'
import { verifyPayment } from './payment.utils'
import ejs from 'ejs'

const confirmationService = async (transactionId: string, status: string) => {
  const verifyResponse = await verifyPayment(transactionId)
  //   console.log(verifyResponse)
  let paymentData
  console.log("verifyResponse", verifyResponse)

  if (verifyResponse && verifyResponse.pay_status === 'Successful') {
    const updatedPaymentStatus = await Booking.findOneAndUpdate(
      { transactionId },
      {
        paymentStatus: P_Status.paid,
      },
    )
    paymentData = {
      consumerName: verifyResponse?.cus_name,
      email: verifyResponse?.cus_email,
      phone: verifyResponse?.cus_phone,
      transactionId: verifyResponse?.mer_txnid,
      amount: verifyResponse?.amount,
      currency: 'BDT',
      payment_type: verifyResponse?.payment_type,
      payTime: verifyResponse?.date,
      paymentStatus: verifyResponse?.pay_status,
    }
  }
  if (paymentData && status === 'success') {
    // const filePathSuccess = join(__dirname, '../../../views/confrimation.ejs')
    const filePathSuccess = join(process.cwd(), "views", "confrimation.ejs")
    const template = await ejs.renderFile(filePathSuccess, paymentData)
    return template
  } else {
    // const filePathFaild = join(__dirname, '../../../views/failded.ejs')
    const filePathFaild = join(process.cwd(), "views", "failded.ejs")
    const template = await ejs.renderFile(filePathFaild, {})
    return template
  }
}

export const paymentServices = {
  confirmationService,
}
