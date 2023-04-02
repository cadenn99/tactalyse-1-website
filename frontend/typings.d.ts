

// TODO: Move all interfaces/enums to this file for project organisation

// This interface is used to decode a JWT web token; specifically the one received from our backend
export interface TokenInterface {
  email: string
  isEmployee: boolean
  _id: string
}