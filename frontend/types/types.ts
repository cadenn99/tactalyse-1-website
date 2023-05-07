/**
 * This interface is used to decode a JWT web token; specifically the one received from our backend.
 */
export interface TokenInterface {
  email: string,
  isEmployee: boolean,
  _id: string
}

export interface OrderInterface {
  _id: string
  playerName: string,
  creationTimestamp: number
  status: string
  completedPayment: boolean
}
/**
 * This interface represents one image to be used in the Carousel component.
 */
export interface CarouselImage {
  id: number,
  image: string,
  alt: string
}

/**
 * This interface is used during the login and register process.
 */
export interface LoginInput {
  email: string,
  password: string,
}

/**
 * This interface is used when requesting a report from the backend.
 */
export interface ReportInput {
  id: string,
  playerFile: FileList,
  leagueFile: FileList
}

export interface ToastInterface {
  message: null | string,
  error: boolean
}