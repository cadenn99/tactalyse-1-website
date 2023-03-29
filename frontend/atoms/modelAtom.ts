import { atom } from 'recoil'
import { Report } from '../typings'

export const reportState = atom<Report | null>({
  key: 'reportState',
  default: null,
})