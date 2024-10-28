import mongoose, {Document} from "mongoose"

export interface IWawancara extends Document{
    tanggalId: mongoose.Types.ObjectId,
    tanggal: Date,
    himakom: boolean,
    sesi: [ISesi]
}

export interface ISlotDivisiPerSesi extends Document{
    backend: IDivisiSlot,
    frontend: IDivisiSlot,
    uiux: IDivisiSlot,
    dsai: IDivisiSlot,
    cp: IDivisiSlot,
    mobapps: IDivisiSlot,
    gamedev: IDivisiSlot 
}
export interface ISesi extends Document{
    jam: Date,
    dipilihOleh: mongoose.Types.ObjectId[],
    slotDivisi: ISlotDivisiPerSesi
}

export interface IDivisiSlot{
    sisaSlot: number,
    lokasi: string
}