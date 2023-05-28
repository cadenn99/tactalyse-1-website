//@ts-nocheck
import axios from 'axios'
import fs from 'fs'
import FormData from 'form-data'

interface Props {
    leagueFile: fs.ReadStream
    playerFile: fs.ReadStream
    playerName: string
}

export const pdfGenerator = async ({ leagueFile, playerFile, playerName }: Props) => {

    const form = new FormData()

    form.append('player-file', playerFile)
    form.append('league-file', leagueFile)
    form.append('player-name', playerName)

    const data = await axios({
        url: "http://127.0.0.1:5000/pdf",
        method: "POST",
        data: form,
        responseType: 'arraybuffer'
    })

    return Buffer.from(data.data, 'base64')
}

