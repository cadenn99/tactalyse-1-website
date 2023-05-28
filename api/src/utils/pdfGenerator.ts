//@ts-nocheck
import axios from 'axios'
import fs from 'fs'
import FormData from 'form-data'

interface Props {
    leagueFile: string
    playerFile: string
    playerName: string
}

export const pdfGenerator = async ({ leagueFile, playerFile, playerName }: Props) => {

    const form = new FormData()

    form.append('league-file', fs.createReadStream(leagueFile))
    form.append('player-file', fs.createReadStream(playerFile))
    form.append('player-name', playerName)

    const data = await axios({
        url: "https://report-api.testalyse.nl/pdf",
        method: "POST",
        data: form,
        responseType: 'arraybuffer',
    })

    return Buffer.from(data.data, 'base64')
}