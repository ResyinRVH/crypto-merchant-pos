import { parseUnits } from 'viem'

interface GenerateInvoiceParams {
  merchantAddress: `0x${string}`
  usdtAmount: string
  chainId?: number
  usdtContractAddress: `0x${string}`
}

export function generateERC681URI({
  merchantAddress,
  usdtAmount,
  chainId = 84532,
  usdtContractAddress,
}: GenerateInvoiceParams) {
  const parsedAmount = parseUnits(usdtAmount, 6).toString()

  return `ethereum:${usdtContractAddress}@${chainId}/transfer?address=${merchantAddress}&uint256=${parsedAmount}`
}