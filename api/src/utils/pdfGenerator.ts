//@ts-nocheck
import axios from 'axios'
import fs from 'fs'
import FormData from 'form-data'

interface Props {
    leagueFile: fs.ReadStream
    playerFile: fs.ReadStream
    playerName: string
    startDate?: number | string
    endDate?: number | string 
}

export const pdfGenerator = async ({ leagueFile, playerFile, playerName, startDate, endDate }: Props) => {

    const form = new FormData()

    form.append('player-file', playerFile)
    form.append('league-file', leagueFile)
    form.append('player-name', playerName)

    if (startDate !== "undefined") form.append('start-date', startDate)
    if (endDate !== "undefined") form.append('end-date', endDate)

    const data = await axios({
        url: process.env.REPORT_API,
        method: "POST",
        data: form,
        responseType: 'arraybuffer'
    })

    return Buffer.from(data.data, 'base64')
}

